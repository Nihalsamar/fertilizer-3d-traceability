-- ============================================================================
-- KisanTrace 3D: Turso / libSQL Database Schema
-- Blockchain Traceable Supply Chain System for Fertilizers
-- ============================================================================

-- 1. Batches Table
CREATE TABLE IF NOT EXISTS batches (
    id TEXT PRIMARY KEY,
    batch_number TEXT UNIQUE NOT NULL,
    formulation TEXT NOT NULL DEFAULT 'Neem-Coated Urea (46.2% N)',
    nitrogen_pct REAL NOT NULL DEFAULT 46.2,
    moisture_pct REAL NOT NULL DEFAULT 0.42,
    biuret_pct REAL NOT NULL DEFAULT 1.15,
    quantity_bags INTEGER NOT NULL DEFAULT 1000,
    total_weight_mt REAL NOT NULL DEFAULT 50.0,
    manufacturer_name TEXT NOT NULL DEFAULT 'IFFCO Phulpur Unit',
    plant_gps TEXT NOT NULL DEFAULT '26.45°N 80.33°E',
    genesis_tx_hash TEXT NOT NULL,
    qc_cert_hash TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Packaging Hierarchy Table (3-Level QR Serialization)
CREATE TABLE IF NOT EXISTS packaging_hierarchy (
    id TEXT PRIMARY KEY,
    batch_id TEXT NOT NULL,
    level TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    parent_code TEXT,
    merkle_root TEXT,
    rfid_epc TEXT,
    weight_kg REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(batch_id) REFERENCES batches(id)
);

-- 3. Telemetry Logs Table (IoT Edge Sensor Stream)
CREATE TABLE IF NOT EXISTS telemetry_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id TEXT NOT NULL,
    node_index INTEGER NOT NULL,
    node_name TEXT NOT NULL,
    gps_coordinates TEXT NOT NULL,
    temperature REAL NOT NULL,
    humidity REAL NOT NULL,
    is_breached INTEGER NOT NULL DEFAULT 0,
    status_note TEXT,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(batch_id) REFERENCES batches(id)
);

-- 4. Custody Chain Table (Multi-Hop Transfers)
CREATE TABLE IF NOT EXISTS custody_chain (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id TEXT NOT NULL,
    stage_number INTEGER NOT NULL,
    from_entity TEXT NOT NULL,
    to_entity TEXT NOT NULL,
    location_name TEXT NOT NULL,
    carrier_vehicle_id TEXT,
    tx_hash TEXT NOT NULL,
    nonce INTEGER NOT NULL DEFAULT 0,
    is_offline_signed INTEGER NOT NULL DEFAULT 0,
    verified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(batch_id) REFERENCES batches(id)
);

-- 5. DBT Disbursements Table (Farmer Verification & Subsidy)
CREATE TABLE IF NOT EXISTS dbt_disbursements (
    id TEXT PRIMARY KEY,
    batch_id TEXT NOT NULL,
    bag_code TEXT NOT NULL,
    farmer_name TEXT NOT NULL DEFAULT 'Ramesh Kumar Patel',
    farmer_aadhaar_hash TEXT NOT NULL,
    bank_account_last4 TEXT NOT NULL DEFAULT '4091',
    subsidy_amount REAL NOT NULL DEFAULT 1500.0,
    verification_channel TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'CREDITED',
    disbursed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(batch_id) REFERENCES batches(id)
);

-- 6. Reverse Flow Events Table (Quality / Thermal Breach Recalls)
CREATE TABLE IF NOT EXISTS reverse_flow_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id TEXT NOT NULL,
    trigger_node TEXT NOT NULL,
    reason TEXT NOT NULL,
    trigger_temperature REAL,
    trigger_humidity REAL,
    return_route TEXT NOT NULL DEFAULT 'Distributor -> Warehouse -> Factory',
    return_waybill TEXT NOT NULL,
    quarantined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(batch_id) REFERENCES batches(id)
);
