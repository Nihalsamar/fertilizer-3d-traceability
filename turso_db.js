/**
 * ============================================================================
 * Turso Database Client & Service Layer
 * Supports both Turso Cloud (libsql://...) and local libSQL/SQLite (file:...)
 * ============================================================================
 */

const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

// Auto-load .env file if present
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envText = fs.readFileSync(envPath, 'utf8');
    envText.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = (match[2] || '').trim();
        val = val.replace(/^['"](.*)['"]$/, '$1');
        process.env[key] = val;
      }
    });
  } catch (e) {
    console.warn('[Turso DB] Could not read .env file:', e.message);
  }
}

let url = process.env.TURSO_DATABASE_URL || 'file:kisan_trace.db';
let authToken = process.env.TURSO_AUTH_TOKEN || undefined;
let isCloud = url.startsWith('libsql://') || url.startsWith('https://');

let client = createClient({
  url,
  authToken
});

console.log(`[Turso DB] Initialized client connected to: ${isCloud ? 'Turso Cloud (' + url + ')' : 'Local libSQL file (' + url + ')'}`);

function updateClientConfig(newUrl, newAuthToken) {
  if (!newUrl) throw new Error('Database URL is required');
  url = newUrl.trim();
  authToken = newAuthToken ? newAuthToken.trim() : undefined;
  isCloud = url.startsWith('libsql://') || url.startsWith('https://');

  client = createClient({
    url,
    authToken
  });

  // Persist to .env
  const envContent = `TURSO_DATABASE_URL=${url}\nTURSO_AUTH_TOKEN=${authToken || ''}\n`;
  try {
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('[Turso DB] Saved new credentials to .env');
  } catch (e) {
    console.warn('[Turso DB] Could not write .env:', e.message);
  }

  console.log(`[Turso DB] Reconfigured client to: ${isCloud ? 'Turso Cloud (' + url + ')' : 'Local libSQL file (' + url + ')'}`);
  return { isCloud, url: maskUrl(url) };
}

function maskUrl(u) {
  if (!u) return '';
  if (!u.startsWith('libsql://') && !u.startsWith('https://')) return u;
  const parts = u.split('@');
  return parts.length > 1 ? 'libsql://***@' + parts[1] : u;
}

async function initDb() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Split schema into individual executable statements
  const statements = schemaSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of statements) {
    try {
      await client.execute(statement);
    } catch (err) {
      console.error('[Turso DB] Error executing schema statement:', err.message);
      throw err;
    }
  }
  console.log('[Turso DB] All schema tables verified successfully.');
}

async function seedDb(force = false) {
  await initDb();

  const batchId = 'batch-iffco-2026-x992';

  if (!force) {
    const existing = await client.execute({
      sql: 'SELECT id FROM batches WHERE id = ?',
      args: [batchId]
    });

    if (existing.rows.length > 0) {
      console.log('[Turso DB] Seed batch already exists. Skipping insertion.');
      return;
    }
  } else {
    // If force, clean up existing sample records first
    try {
      await client.execute({ sql: 'DELETE FROM reverse_flow_events WHERE batch_id = ?', args: [batchId] });
      await client.execute({ sql: 'DELETE FROM dbt_disbursements WHERE batch_id = ?', args: [batchId] });
      await client.execute({ sql: 'DELETE FROM custody_chain WHERE batch_id = ?', args: [batchId] });
      await client.execute({ sql: 'DELETE FROM telemetry_logs WHERE batch_id = ?', args: [batchId] });
      await client.execute({ sql: 'DELETE FROM packaging_hierarchy WHERE batch_id = ?', args: [batchId] });
      await client.execute({ sql: 'DELETE FROM batches WHERE id = ?', args: [batchId] });
    } catch (e) {}
  }

  // Insert Batch
  await client.execute({
    sql: `INSERT INTO batches (
      id, batch_number, formulation, nitrogen_pct, moisture_pct, biuret_pct,
      quantity_bags, total_weight_mt, manufacturer_name, plant_gps,
      genesis_tx_hash, qc_cert_hash, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      batchId,
      'LOT-2026-X992',
      'Neem-Coated Urea (46.2% N)',
      46.2,
      0.42,
      1.15,
      1000,
      50.0,
      'IFFCO Phulpur Production Unit',
      '26.45°N 80.33°E',
      '0x8a9f3b14e92a83c7104b901fc88a10427e1892b189a7401c9018e7492a83c710',
      '0xqc462pass99014aef72c81093bc71a0912f8471c90081e7492a83c7104b901fc8',
      'ACTIVE'
    ]
  });

  // Packaging Hierarchy
  const packagingLevels = [
    {
      id: 'pack-bag-01',
      level: 'BAG',
      code: 'BAG-2026-X992-0001',
      parent_code: 'PALLET-2026-X992-01',
      merkle_root: '0x3a91e47f01c9a8b72c9182d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',
      rfid_epc: null,
      weight_kg: 50.0
    },
    {
      id: 'pack-pallet-01',
      level: 'PALLET',
      code: 'PALLET-2026-X992-01',
      parent_code: 'CONTAINER-2026-X992',
      merkle_root: '0x7b14e92a83c7104b901fc88a10427e1892b189a7401c9018e7492a83c710e47f',
      rfid_epc: 'EPC96-3008-0001-A992',
      weight_kg: 2500.0
    },
    {
      id: 'pack-container-01',
      level: 'MASTER_CONTAINER',
      code: 'CONTAINER-2026-X992',
      parent_code: null,
      merkle_root: '0x99014aef72c81093bc71a0912f8471c90081e7492a83c7104b901fc88a9f3b14',
      rfid_epc: 'EPC96-3008-CONT-992',
      weight_kg: 50000.0
    }
  ];

  for (const p of packagingLevels) {
    await client.execute({
      sql: `INSERT INTO packaging_hierarchy (id, batch_id, level, code, parent_code, merkle_root, rfid_epc, weight_kg)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [p.id, batchId, p.level, p.code, p.parent_code, p.merkle_root, p.rfid_epc, p.weight_kg]
    });
  }

  // Telemetry stream
  const telemetries = [
    { node_index: 0, node_name: 'Manufacturer Plant', gps: '26.45°N 80.33°E', temp: 28.4, hum: 52.0, note: 'Batch generated & sealed' },
    { node_index: 1, node_name: 'Quality Lab', gps: '26.85°N 80.95°E', temp: 27.2, hum: 49.0, note: '46.2% N purity certified' },
    { node_index: 2, node_name: 'Central Warehouse', gps: '26.80°N 81.02°E', temp: 28.1, hum: 54.0, note: 'RFID inward gate logged' },
    { node_index: 6, node_name: 'IoT Transporter (Truck)', gps: '26.30°N 81.80°E', temp: 29.5, hum: 56.0, note: 'Live highway transit NH-19' },
    { node_index: 3, node_name: 'District Distributor', gps: '25.75°N 82.68°E', temp: 28.8, hum: 55.0, note: 'Pallet custody verified' },
    { node_index: 4, node_name: 'Retailer POS (Kisan Kendra)', gps: '25.45°N 82.80°E', temp: 29.1, hum: 57.0, note: 'Offline transaction signed' },
    { node_index: 5, node_name: 'Indian Farmer Farmstead', gps: '25.40°N 82.85°E', temp: 28.5, hum: 55.0, note: 'Aadhaar verified & DBT credited' }
  ];

  for (const t of telemetries) {
    await client.execute({
      sql: `INSERT INTO telemetry_logs (batch_id, node_index, node_name, gps_coordinates, temperature, humidity, is_breached, status_note)
            VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
      args: [batchId, t.node_index, t.node_name, t.gps, t.temp, t.hum, t.note]
    });
  }

  // Custody steps
  const custodySteps = [
    { stage: 1, from: 'IFFCO Synthesis', to: 'QC Quality Control', loc: 'Phulpur Plant', veh: null, tx: '0x101a...991a', offline: 0 },
    { stage: 2, from: 'QC Lab', to: 'Central Warehouse', loc: 'Lucknow Hub', veh: 'UP-32-BT-9014', tx: '0x202b...882b', offline: 0 },
    { stage: 3, from: 'Central Warehouse', to: 'District Distributor', loc: 'Varanasi Central', veh: 'UP-65-AR-4011', tx: '0x303c...773c', offline: 0 },
    { stage: 4, from: 'District Distributor', to: 'Kisan Seva Kendra', loc: 'Chiraigaon Rural', veh: 'UP-65-T-1288', tx: '0x404d...664d', offline: 1 }
  ];

  for (const c of custodySteps) {
    await client.execute({
      sql: `INSERT INTO custody_chain (batch_id, stage_number, from_entity, to_entity, location_name, carrier_vehicle_id, tx_hash, nonce, is_offline_signed)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      args: [batchId, c.stage, c.from, c.to, c.loc, c.veh, c.tx, c.offline]
    });
  }

  // DBT Disbursement
  await client.execute({
    sql: `INSERT INTO dbt_disbursements (id, batch_id, bag_code, farmer_name, farmer_aadhaar_hash, bank_account_last4, subsidy_amount, verification_channel, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      'dbt-tx-88912',
      batchId,
      'BAG-2026-X992-0001',
      'Ramesh Kumar Patel',
      '0xaadhaar7f201948bc819e01f2984c90',
      '4091',
      1500.0,
      'SMARTPHONE_QR',
      'CREDITED'
    ]
  });

  console.log('[Turso DB] Seed data populated successfully for batch LOT-2026-X992.');
}

async function getTablesStatus() {
  const tableNames = ['batches', 'packaging_hierarchy', 'telemetry_logs', 'custody_chain', 'dbt_disbursements', 'reverse_flow_events'];
  const summary = {};

  for (const name of tableNames) {
    try {
      const res = await client.execute(`SELECT count(*) as cnt FROM ${name}`);
      summary[name] = res.rows[0].cnt;
    } catch (e) {
      summary[name] = 0;
    }
  }
  return summary;
}

// Service helper methods
async function getBatches() {
  const result = await client.execute('SELECT * FROM batches ORDER BY created_at DESC');
  return result.rows;
}

async function getTelemetry(batchId) {
  const result = await client.execute({
    sql: 'SELECT * FROM telemetry_logs WHERE batch_id = ? ORDER BY id ASC',
    args: [batchId || 'batch-iffco-2026-x992']
  });
  return result.rows;
}

async function logTelemetry(batchId, nodeIndex, nodeName, gps, temp, hum) {
  const isBreached = temp > 40.0 || hum > 85.0 ? 1 : 0;
  const note = isBreached ? 'BREACH: Critical Limit Exceeded' : 'Condition Compliant';

  const res = await client.execute({
    sql: `INSERT INTO telemetry_logs (batch_id, node_index, node_name, gps_coordinates, temperature, humidity, is_breached, status_note)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [batchId || 'batch-iffco-2026-x992', nodeIndex, nodeName, gps, temp, hum, isBreached, note]
  });

  if (isBreached) {
    await client.execute({
      sql: `INSERT INTO reverse_flow_events (batch_id, trigger_node, reason, trigger_temperature, trigger_humidity, return_waybill)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        batchId || 'batch-iffco-2026-x992',
        nodeName,
        `Sensor threshold breach: ${temp.toFixed(1)}°C, ${hum.toFixed(1)}%`,
        temp,
        hum,
        'RET-LOT-2026-' + Math.floor(Math.random() * 90000 + 10000)
      ]
    });
  }

  return { success: true, isBreached };
}

module.exports = {
  client: () => client,
  initDb,
  seedDb,
  getBatches,
  getTelemetry,
  logTelemetry,
  getTablesStatus,
  updateClientConfig,
  isCloud: () => isCloud,
  url: () => url
};

if (require.main === module) {
  seedDb()
    .then(() => {
      console.log('[Turso DB] Completed setup and seeding.');
      process.exit(0);
    })
    .catch(err => {
      console.error('[Turso DB] Error:', err);
      process.exit(1);
    });
}
