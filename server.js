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
  initDb,
  seedDb,
  getTablesStatus,
  updateClientConfig,
  invalidateCache,
  isCloud,
  url
} = require('./turso_db');

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

// 6. Force Seed / Update All Records (Admin Auth Protected & Rate Limited)
app.post('/api/seed', adminLimiter, requireAdminAuth, async (req, res) => {
  try {
    await seedDb(true);
    const tables = await getTablesStatus(true);
    res.json({ success: true, message: 'Database tables verified and records updated successfully.', tables });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fallback to index.html for SPA routes (with safety check against dotfile paths)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`========================================================`);
      console.log(`🛡️  KisanTrace 3D Hardened Web Service is Live!`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🗄️ Database: ${isCloud() ? 'Turso Cloud' : 'Local libSQL (file:kisan_trace.db)'}`);
      console.log(`🔒 Security: Rate Limiting ON | Static Guard ON | Cache ON`);
      console.log(`🚀 Ready for Render.com deployment`);
      console.log(`========================================================`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database on startup:', err);
  });
