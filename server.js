/**
 * ============================================================================
 * KisanTrace 3D: Hardened Express Web Service & Turso API Gateway
 * Designed for Deployment on Render (render.com) and Local Operation
 * Enhanced with Security Guards, File Sandboxing, Rate Limiting & Query Caching
 * ============================================================================
 */

const express = require('express');
const path = require('path');
const {
  getBatches,
  getTelemetry,
  logTelemetry,
  logClickEvent,
  initDb,
  seedDb,
  getTablesStatus,
  getAllDatabaseRecords,
  parseGps,
  updateClientConfig,
  invalidateCache,
  isCloud,
  url,
  getAgriBatches,
  getCvGradingLogs,
  logCvGrading,
  getColdChainTelemetry,
  logColdChainTelemetry,
  logFarmCustodyHop,
  logConsumerScan
} = require('./turso_db');
const { generateExcelXml, generateTelemetryCsv } = require('./excel_export');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'kisantrace-admin-2026';

// ----------------------------------------------------------------------------
// 1. Security Headers Middleware
// ----------------------------------------------------------------------------
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.removeHeader('X-Powered-By');
  next();
});

// ----------------------------------------------------------------------------
// 2. Request Payload Size Hardening
// ----------------------------------------------------------------------------
app.use(express.json({ limit: '15kb' }));

// Handle JSON parse errors safely
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload rejected' });
  }
  next(err);
});

// ----------------------------------------------------------------------------
// 3. Sensitive Files & Path Traversal Guard
// ----------------------------------------------------------------------------
const BLOCKED_FILENAMES = new Set([
  '.env',
  'server.js',
  'turso_db.js',
  'package.json',
  'package-lock.json',
  'render.yaml',
  'schema.sql',
  'test_runner.js',
  'bundle.js',
  'load_test.js',
  'excel_export.js',
  'kisan_trace.db',
  'temp_hist.db'
]);

const BLOCKED_EXTENSIONS = new Set([
  '.db',
  '.sqlite',
  '.sql',
  '.yaml',
  '.yml',
  '.lock',
  '.env'
]);

app.use((req, res, next) => {
  // Normalize url path and resolve basename
  const decodedPath = decodeURIComponent(req.path);
  const normalized = path.normalize(decodedPath).replace(/^(\.\.[\/\\])+/, '');
  const basename = path.basename(normalized).toLowerCase();
  const ext = path.extname(normalized).toLowerCase();

  // Deny dotfiles (.env, .git, etc.)
  if (basename.startsWith('.')) {
    return res.status(403).json({ success: false, error: 'Forbidden: Access to hidden files is denied' });
  }

  // Deny sensitive database and config extensions
  if (BLOCKED_EXTENSIONS.has(ext)) {
    return res.status(403).json({ success: false, error: 'Forbidden: Direct access to database/system files is denied' });
  }

  // Deny server-side source files
  if (BLOCKED_FILENAMES.has(basename)) {
    return res.status(403).json({ success: false, error: 'Forbidden: Direct access to backend server code is denied' });
  }

  next();
});

// Serve legitimate static web assets (HTML, CSS, client JS, images)
app.use(express.static(__dirname, { dotfiles: 'deny', index: 'index.html' }));

// ----------------------------------------------------------------------------
// 4. In-Memory Sliding-Window Rate Limiting (Shield against brute force / floods)
// ----------------------------------------------------------------------------
function createRateLimiter({ windowMs, maxRequests, message }) {
  const clients = new Map(); // ip -> { count, resetTime }

  // Periodic garbage collection of expired IP windows
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of clients.entries()) {
      if (now > entry.resetTime) {
        clients.delete(ip);
      }
    }
  }, 30000);
  cleanupTimer.unref();

  return (req, res, next) => {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const ip = String(rawIp).split(',')[0].trim();
    const now = Date.now();

    let entry = clients.get(ip);
    if (!entry || now > entry.resetTime) {
      entry = { count: 1, resetTime: now + windowMs };
      clients.set(ip, entry);
    } else {
      entry.count++;
    }

    const remaining = Math.max(0, maxRequests - entry.count);
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', Math.ceil(entry.resetTime / 1000));

    if (entry.count > maxRequests) {
      const retryAfter = Math.max(1, Math.ceil((entry.resetTime - now) / 1000));
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({
        success: false,
        error: message || 'Too many requests. Rate limit exceeded, please slow down.',
        retryAfter
      });
    }

    next();
  };
}

// Rate Limiter Tiers
const generalLimiter = createRateLimiter({
  windowMs: 15 * 1000,
  maxRequests: 120, // 120 requests per 15s
  message: 'Read query rate limit exceeded. Please throttle automated polling.'
});

const telemetryLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 60, // 60 logs per minute
  message: 'Telemetry ingestion limit exceeded. Sensor throttling active.'
});

const adminLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 8, // 8 operations per minute
  message: 'Administrative endpoint rate limit exceeded.'
});

// ----------------------------------------------------------------------------
// 5. Admin Authentication Guard Middleware
// ----------------------------------------------------------------------------
function requireAdminAuth(req, res, next) {
  const providedKey = req.headers['x-admin-key'] || req.body?.adminKey || req.query?.adminKey;
  if (!providedKey || providedKey !== ADMIN_KEY) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Valid Admin Security Key required for this operation.'
    });
  }
  next();
}

// ----------------------------------------------------------------------------
// 6. Hardened API Endpoints
// ----------------------------------------------------------------------------

// 1. Health & Database Provider Status (Protected by generalLimiter & TTL cache in turso_db.js)
app.get('/api/status', generalLimiter, async (req, res) => {
  try {
    const tableCounts = await getTablesStatus();
    res.json({
      status: 'ONLINE',
      platform: 'KisanTrace 3D Provenance Platform',
      security: {
        rateLimiterActive: true,
        staticGuardActive: true,
        cachingActive: true
      },
      database: {
        provider: isCloud() ? 'Turso Cloud (Edge libSQL)' : 'Local libSQL Engine',
        endpoint: isCloud() ? url().split('@').pop() : url(),
        cloudConnected: isCloud(),
        tableCounts
      },
      version: '3.2.0-hardened',
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    res.json({
      status: 'ONLINE',
      platform: 'KisanTrace 3D Provenance Platform',
      database: {
        provider: isCloud() ? 'Turso Cloud' : 'Local libSQL Engine',
        error: e.message
      }
    });
  }
});

// 2. Turso Connect & Update API (Admin Auth Protected & Rate Limited)
app.post('/api/turso/connect', adminLimiter, requireAdminAuth, async (req, res) => {
  try {
    const { url: dbUrl, authToken } = req.body || {};
    if (!dbUrl) {
      return res.status(400).json({ success: false, error: 'Database URL is required' });
    }

    console.log('[Server] Authorized request to connect Turso database:', dbUrl);
    updateClientConfig(dbUrl, authToken);

    // Run schema and force-seed records into the new database
    await seedDb(true);
    const tables = await getTablesStatus(true);

    res.json({
      success: true,
      message: 'Successfully connected to Turso database and populated all 6 tables!',
      database: {
        url: dbUrl,
        cloudConnected: isCloud(),
        tables
      }
    });
  } catch (err) {
    console.error('[Server] Turso connect error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Batches (TTL Cached in turso_db.js)
app.get('/api/batches', generalLimiter, async (req, res) => {
  try {
    const batches = await getBatches();
    res.json({ success: true, count: batches.length, batches });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Telemetry Stream
app.get('/api/telemetry', generalLimiter, async (req, res) => {
  try {
    const rawBatchId = req.query.batch_id || 'batch-iffco-2026-x992';
    const batchId = String(rawBatchId).slice(0, 100).replace(/[^a-zA-Z0-9_\-\.]/g, '');
    const logs = await getTelemetry(batchId);
    res.json({ success: true, count: logs.length, logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Log Sensor Reading (Validated, Bounds Checked, Throttled)
app.post('/api/telemetry', telemetryLimiter, async (req, res) => {
  try {
    const { batch_id, node_index, node_name, gps, temperature, humidity } = req.body || {};

    if (temperature === undefined || humidity === undefined) {
      return res.status(400).json({ success: false, error: 'temperature and humidity are required fields' });
    }

    const tempNum = Number(temperature);
    const humNum = Number(humidity);

    if (!Number.isFinite(tempNum) || tempNum < -50 || tempNum > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid temperature: must be a valid number between -50°C and 100°C'
      });
    }

    if (!Number.isFinite(humNum) || humNum < 0 || humNum > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid humidity: must be a valid number between 0% and 100%'
      });
    }

    const safeBatchId = String(batch_id || 'batch-iffco-2026-x992').slice(0, 100).replace(/[^a-zA-Z0-9_\-\.]/g, '');
    const safeNodeIndex = Math.min(Math.max(0, parseInt(node_index, 10) || 0), 20);
    const safeNodeName = String(node_name || 'Manual Sensor').slice(0, 100);
    const safeGps = String(gps || '26.45°N 80.33°E').slice(0, 60);

    const result = await logTelemetry(
      safeBatchId,
      safeNodeIndex,
      safeNodeName,
      safeGps,
      tempNum,
      humNum
    );

    res.json({ success: true, ...result });
  } catch (err) {
    if (err.message && err.message.includes('FOREIGN KEY constraint failed')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid batch_id: Specified batch does not exist in provenance ledger'
      });
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Capture Single-Click Interactions & Events to Turso Cloud DB
app.post('/api/click-event', telemetryLimiter, async (req, res) => {
  try {
    const {
      batch_id,
      batchId,
      action_type,
      actionType,
      target_element,
      targetElement,
      node_index,
      nodeIndex,
      node_name,
      nodeName,
      gps,
      gpsCoordinates,
      temperature,
      humidity,
      details
    } = req.body || {};

    const safeBatchId = String(batch_id || batchId || 'batch-iffco-2026-x992').slice(0, 100).replace(/[^a-zA-Z0-9_\-\.]/g, '');
    const safeActionType = String(action_type || actionType || 'SINGLE_CLICK').slice(0, 80);
    const safeTarget = String(target_element || targetElement || 'UI_INTERACTION').slice(0, 120);
    const safeNodeName = String(node_name || nodeName || 'Facility').slice(0, 100);
    const safeGps = String(gps || gpsCoordinates || '26.45°N 80.33°E').slice(0, 60);
    const safeDetails = String(details || 'User interaction captured').slice(0, 250);

    const result = await logClickEvent(
      safeBatchId,
      safeActionType,
      safeTarget,
      parseInt(node_index, 10) || 0,
      safeNodeName,
      safeGps,
      temperature,
      humidity,
      safeDetails
    );

    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Force Seed / Update All Records (Admin Auth Protected & Rate Limited)
app.post('/api/seed', adminLimiter, requireAdminAuth, async (req, res) => {
  try {
    await seedDb(true);
    const tables = await getTablesStatus(true);
    res.json({ success: true, message: 'Database tables verified and records updated successfully.', tables });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Dedicated Route to load previous Fertilizer Model 3 application safely
app.get('/fertilizer', (req, res) => {
  res.sendFile(path.join(__dirname, 'fertilizer.html'));
});

// ----------------------------------------------------------------------------
// AgriProduce Farm-to-Fork API Endpoints
// ----------------------------------------------------------------------------
app.get('/api/agri/batches', generalLimiter, async (req, res) => {
  try {
    const batches = await getAgriBatches();
    res.json({ success: true, count: batches.length, batches });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/agri/cv-grading', generalLimiter, async (req, res) => {
  try {
    const batchId = req.query.batch_id || 'BATCH-AGRI-2026-F2F-091';
    const logs = await getCvGradingLogs(batchId);
    res.json({ success: true, count: logs.length, logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/agri/cv-grading', telemetryLimiter, async (req, res) => {
  try {
    const {
      batch_id,
      sample_item_code,
      produce_type,
      detection_confidence,
      caliber_diameter_mm,
      estimated_weight_g,
      ripeness_color_pct,
      sugar_brix_rating,
      defect_count,
      defect_type,
      defect_area_pct,
      mrl_pesticide_ppm,
      assigned_grade,
      quality_cert_hash
    } = req.body || {};

    const result = await logCvGrading(
      batch_id,
      sample_item_code,
      produce_type,
      detection_confidence,
      caliber_diameter_mm,
      estimated_weight_g,
      ripeness_color_pct,
      sugar_brix_rating,
      defect_count,
      defect_type,
      defect_area_pct,
      mrl_pesticide_ppm,
      assigned_grade,
      quality_cert_hash
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/agri/coldchain', generalLimiter, async (req, res) => {
  try {
    const batchId = req.query.batch_id || 'BATCH-AGRI-2026-F2F-091';
    const logs = await getColdChainTelemetry(batchId);
    res.json({ success: true, count: logs.length, logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/agri/coldchain', telemetryLimiter, async (req, res) => {
  try {
    const {
      batch_id,
      stage_node,
      vehicle_id,
      gps,
      temperature,
      humidity,
      ethylene,
      is_breached,
      note
    } = req.body || {};

    const result = await logColdChainTelemetry(
      batch_id,
      stage_node,
      vehicle_id,
      gps,
      temperature,
      humidity,
      ethylene,
      is_breached,
      note
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/agri/verify-scan', generalLimiter, async (req, res) => {
  try {
    const { batch_id, qr_code, channel, location, fair_trade_tip } = req.body || {};
    const result = await logConsumerScan(batch_id, qr_code, channel, location, 1, fair_trade_tip);
    res.json({
      success: true,
      verified: true,
      provenance: {
        produce: 'Organic Alphonso Mango (GI Tagged)',
        origin: 'Shinde Organic Orchards, Ratnagiri',
        farmer: 'Santosh Shinde',
        organic_cert: 'NPOP/NAB/0019/2026/8912',
        grade: 'GRADE A+ EXPORT CERTIFIED',
        mrl_status: 'ZERO CHEMICAL DETECTED (<0.005 ppm)',
        carbon_footprint: '0.18 kg CO2e / kg',
        cold_chain: '100% COMPLIANT (12.4°C - 13.1°C)'
      },
      ...result
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Full Database Export API (JSON with parsed Latitude, Longitude, and Timestamps)
app.get('/api/export/all', generalLimiter, async (req, res) => {
  try {
    const data = await getAllDatabaseRecords();
    res.json({
      success: true,
      platform: 'KisanTrace Spatial Farm-to-Fork Platform',
      timestamp: new Date().toISOString(),
      counts: {
        clicks: data.clicks?.length || 0,
        timeline: data.timeline?.length || 0,
        agri_batches: data.agri_batches?.length || 0,
        cv_grading: data.cv_grading?.length || 0,
        coldchain_telemetry: data.coldchain_telemetry?.length || 0,
        farm_custody: data.farm_custody?.length || 0,
        consumer_scans: data.consumer_scans?.length || 0,
        telemetry: data.telemetry?.length || 0,
        batches: data.batches?.length || 0,
        custody: data.custody?.length || 0,
        dbt: data.dbt?.length || 0,
        reverse_flow: data.reverse_flow?.length || 0,
        packaging: data.packaging?.length || 0
      },
      data
    });
  } catch (err) {
    console.error('[Server] Export all error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Native Multi-Sheet Excel Workbook Export (SpreadsheetML .xls)
app.get('/api/export/excel', generalLimiter, async (req, res) => {
  try {
    const data = await getAllDatabaseRecords();
    const xml = generateExcelXml(data);
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `KisanTrace_Turso_Database_Export_${dateStr}.xls`;

    res.setHeader('Content-Type', 'application/vnd.ms-excel; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(xml);
  } catch (err) {
    console.error('[Server] Excel export error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Telemetry & GPS Sensor Logs CSV Export
app.get('/api/export/csv', generalLimiter, async (req, res) => {
  try {
    const data = await getAllDatabaseRecords();
    const csv = generateTelemetryCsv(data.telemetry);
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `KisanTrace_Telemetry_Logs_${dateStr}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (err) {
    console.error('[Server] CSV export error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fallback to index.html for SPA routes (with safety check against dotfile paths)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server with resilient retry
async function startServerWithRetry(maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await initDb();
      break;
    } catch (err) {
      console.warn(`[Startup] DB init attempt ${attempt}/${maxRetries} notice:`, err.message);
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  app.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(`🛡️  KisanTrace 3D Hardened Web Service is Live!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🗄️ Database: ${isCloud() ? 'Turso Cloud' : 'Local libSQL (file:kisan_trace.db)'}`);
    console.log(`📊 Features: Excel Multi-Sheet Export | Rate Limiting | Cache`);
    console.log(`🚀 Ready for Render.com deployment`);
    console.log(`========================================================`);
  });
}

startServerWithRetry();
