/**
 * ============================================================================
 * KisanTrace 3D: Express Web Service & Turso API Gateway
 * Designed for Deployment on Render (render.com) and Local Operation
 * ============================================================================
 */

const express = require('express');
const path = require('path');
const { getBatches, getTelemetry, logTelemetry, initDb, seedDb, isCloud, url } = require('./turso_db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// --- API Endpoints ---

// 1. Health & Database Provider Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ONLINE',
    platform: 'KisanTrace 3D Provenance Platform',
    database: {
      provider: isCloud ? 'Turso Cloud (Edge libSQL)' : 'Local libSQL Engine',
      endpoint: isCloud ? url.split('@').pop() : url,
      cloudConnected: isCloud
    },
    version: '3.0.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Batches
app.get('/api/batches', async (req, res) => {
  try {
    const batches = await getBatches();
    res.json({ success: true, count: batches.length, batches });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Telemetry Stream
app.get('/api/telemetry', async (req, res) => {
  try {
    const batchId = req.query.batch_id || 'batch-iffco-2026-x992';
    const logs = await getTelemetry(batchId);
    res.json({ success: true, count: logs.length, logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Log Sensor Reading
app.post('/api/telemetry', async (req, res) => {
  try {
    const { batch_id, node_index, node_name, gps, temperature, humidity } = req.body;
    if (temperature === undefined || humidity === undefined) {
      return res.status(400).json({ success: false, error: 'temperature and humidity are required' });
    }
    const result = await logTelemetry(batch_id, node_index || 0, node_name || 'Manual Sensor', gps || '26.45°N 80.33°E', parseFloat(temperature), parseFloat(humidity));
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Seed / Reset Database
app.post('/api/seed', async (req, res) => {
  try {
    await seedDb();
    res.json({ success: true, message: 'Database initialized and seeded successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize DB and start listening
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`========================================================`);
      console.log(`🌱 KisanTrace 3D Web Service is Live!`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🗄️ Database: ${isCloud ? 'Turso Cloud' : 'Local libSQL (file:kisan_trace.db)'}`);
      console.log(`🚀 Ready for Render.com deployment`);
      console.log(`========================================================`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database on startup:', err);
  });
