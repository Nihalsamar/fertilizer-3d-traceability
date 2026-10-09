# 🌱 KisanTrace 3D — Blockchain Fertilizer Traceability Platform

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

An interactive, high-fidelity 3D web application and provenance engine demonstrating end-to-end supply chain traceability for fertilizers, hierarchical 3-level QR serialization, IoT telemetry tripwires, Turso/libSQL edge database storage, and Direct Benefit Transfer (DBT) subsidy disbursement for Indian agriculture.

---

## 🌟 Core Determinants & System Parameters

### 1. Product Authenticity & Composition Integrity Layer
- **Raw Material Provenance:** Chemical source tracking for Haber-Bosch synthesized Nitrogen ($NH_3$), mined rock phosphate (Jordan/Rajasthan), and Potash (MOP/SOP).
- **Chemical Formulation Percentages:** Guaranteed nutrient stoichiometry (e.g., Neem-Coated Urea 46.2% N, DAP 18-46-0). Maximum tolerances: Biuret $\le 1.5\%$, moisture $\le 0.5\%$, particle size $1.0 - 2.8\text{ mm}$.
- **Lab-Tested Quality Records:** Pre-dispatch HPLC & spectrometry assays, cryptographically signed with accredited lab Ed25519 private keys.

### 2. Unique Identification & Data Capture Layer
- **Hierarchical 3-Level Packaging Serialization:**
  - **Level 1 (Unit Bag - 50 kg):** Serialized SHA-256 Bag QR code.
  - **Level 2 (Pallet - 50 Bags / 2.5 MT):** Merkle tree root aggregating 50 individual bag hashes into 1 Pallet QR.
  - **Level 3 (Master Container / Wagon - 20 Pallets / 50 MT):** Aggregated Merkle root linked to EPCglobal Gen2 UHF RFID tag.
- **IoT Sensor Integration:** Real-time environmental tracking (temperature, relative humidity, multi-axis shock, GPS coordinates).
- **Active Tripwire Guardrails:** Threshold breach ($T > 40.0^\circ\text{C}$ or $RH > 85.0\%$) triggers automatic quarantine and reverse-flow recall.

### 3. Supply Chain Stage Mapping
- **Manufacturing / Production:** Inward raw material batch verification, mixing, automated bagging, and genesis block minting.
- **Warehousing / Storage:** Overhead portal RFID scanning at `GATE-02`, stock inward custody logging, and decision routing.
- **Logistics / Transport:** Heavy vehicle binding (`UP-32-BT-9014`), continuous GPS transit corridor telemetry (NH-19), tamper-seal verification.
- **District Distribution:** Pallet QR scan for bulk custody handoff, sub-lot splitting, reverse-flow staging for damaged goods.
- **Retailer POS (Works Offline):** Village-resilient local SQLite cache, signed with timestamp + monotonic nonce, local OTP receipt, batch sync upon reconnection.
- **Farmer & DBT Subsidy:** 3 Citizen channels (① Smartphone QR, ② Feature phone SMS/USSD `*99#`, ③ Aadhaar biometric POS) release ₹1,500 DBT subsidy straight into the farmer's bank account.
- **Reverse Flow Circuit:** Red return routes (Distributor $\to$ Warehouse $\to$ Factory) for off-spec or damaged batches.

### 4. Blockchain Architecture & Governance
- **Network Topology:** Permissioned consortium blockchain (Hyperledger Fabric / Enterprise EVM). Private Data Collections (PDCs) protect commercial margins.
- **Consensus Mechanism:** Practical Byzantine Fault Tolerance (PBFT) / Proof-of-Authority (PoA) with sub-second finality ($<1.2\text{ s}$), $\ge 2,500\text{ TPS}$, and zero mining energy waste.
- **Smart Contracts:** Automated compliance rules, multi-sig custody transfer, and single-use cryptographic token burn preventing counterfeit bag refilling.

### 5. Regulatory Oversight & National Compliance
- **National Policy Integration:** Synchronized with India's Integrated Fertilizer Management System (iFMS) and statutory MRP ceiling checks.
- **Subsidy Fraud Prevention:** Acreage-based quotas cross-referenced with digital land records (Bhulekh API) to prevent hoarding and black marketing.
- **Environmental & Runoff Governance:** Soil Health Card (SHC) nutrient matching, agricultural runoff monitoring, and carbon footprint audits.

---

## 🗄️ Turso Database Integration

The application connects to **Turso Database** (libSQL edge SQLite) via `@libsql/client`.

### Database Schema (`schema.sql`)
- `batches`: Manufacturing batch details, N-P-K purity, moisture, and genesis transaction hashes.
- `packaging_hierarchy`: Unit bag serials, pallet Merkle roots, and master RFID EPCs.
- `telemetry_logs`: Real-time temperature, humidity, GPS coordinates, and breach flags.
- `custody_chain`: Ownership handovers, carrier vehicle IDs, and cryptographic nonces.
- `dbt_disbursements`: Farmer Aadhaar hashes, subsidy amounts (₹1,500), and disbursement status.
- `reverse_flow_events`: Batch recalls, trigger temperatures/humidities, and return waybills.

### Connecting to Turso Cloud
1. Create a database on [Turso](https://turso.tech):
   ```bash
   turso db create kisantrace-db
   turso db show --url kisantrace-db
   turso db tokens create kisantrace-db
   ```
2. Set the environment variables:
   ```bash
   TURSO_DATABASE_URL="libsql://kisantrace-db-[org].turso.io"
   TURSO_AUTH_TOKEN="[your-auth-token]"
   ```
3. Initialize and seed tables:
   ```bash
   npm run seed
   ```
*(If no credentials are provided, the system automatically falls back to local libSQL file storage: `file:kisan_trace.db`).*

---

## 🌐 Deploying to Render (render.com)

This repository includes a native **Render Blueprint** (`render.yaml`).

### Option 1: 1-Click Blueprint Deploy
1. Sign in to [Render](https://dashboard.render.com).
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub repository (`Nihalsamar/fertilizer-3d-traceability`).
4. Click **Apply**. Render will automatically detect `render.yaml`, build, and host the web service!

### Option 2: Manual Web Service Deploy
1. On Render, click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/status`
4. Under **Environment Variables**, add:
   - `TURSO_DATABASE_URL` (optional: your Turso Cloud URL)
   - `TURSO_AUTH_TOKEN` (optional: your Turso Auth Token)
5. Click **Create Web Service**.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/status` | System health and Turso DB connection status |
| `GET` | `/api/batches` | List all fertilizer batches and chemical specifications |
| `GET` | `/api/telemetry` | Stream live telemetry logs and environmental audit trail |
| `POST` | `/api/telemetry` | Ingest sensor readings (auto-evaluates thermal tripwires) |
| `POST` | `/api/seed` | Reset and re-seed the database |

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone https://github.com/Nihalsamar/fertilizer-3d-traceability.git
cd fertilizer-3d-traceability

# 2. Install dependencies
npm install

# 3. Seed database
npm run seed

# 4. Start web server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
MIT License &bull; Developed for Indian Agricultural Supply Chain Transparency.
