/**
 * KisanTrace Mock & Seed Datasets
 * Authentic Indian Fertilizer Supply Chain Records with Merkle Roots & Telemetry
 */

export const BATCHES_DATA = [
  {
    batchId: "BATCH-UREA-2026-9041",
    productName: "Neem Coated Urea (46.2% N)",
    manufacturer: "National Fertilizers Limited (NFL), Vijaipur Unit",
    factoryGps: "26.4521° N, 80.3318° E",
    mfgDate: "2026-10-15",
    expiryDate: "2029-10-14",
    quantity: "50,000 Bags (2,500 MT)",
    unitSize: "50 kg HDPE Laminated Bag",
    labCertification: {
      labName: "Central Fertilizer Quality Control & Training Institute (CFQCTI)",
      nitrogenContent: "46.28% (Standard: >= 46.0%)",
      biuretContent: "0.82% (Standard: <= 1.5%)",
      moistureContent: "0.31% (Standard: <= 0.5%)",
      status: "PASSED_A_GRADE",
      certHash: "0x89fa3b6c7294e1d0f55c48b76251ec8f7009312d8a56a6ec15d86ef8a4c10972",
      signatory: "Dr. R. K. Sharma (Chief Analyst, Ed25519 Verified)"
    },
    merkleRoot: "0x4b789012a9bcdef0123456789abcdef0123456789abcdef0123456789abcdef0",
    packaging: {
      bagQr: "QR-BAG-9041-001 (SHA-256 Unique Token)",
      palletQr: "PLT-9041-A2 (50 Bags Merkle Leaf)",
      masterRfid: "RFID-EPC-GEN2-9041-X01 (Container 20 Pallets)"
    },
    currentStage: "Farmer Delivered & DBT Verified",
    status: "DELIVERED",
    currentTemp: 28.4,
    currentHumidity: 58.2,
    tripwireTripped: false,
    stages: [
      {
        id: 1,
        title: "Genesis Batch Minted",
        location: "NFL Factory, Vijaipur (26.45° N, 80.33° E)",
        timestamp: "2026-10-15 08:30 IST",
        hash: "0x110a7b4f2c98d3...",
        status: "COMPLETED",
        note: "50 kg bags tagged with SHA-256 Bag QR; Pallet & Master RFID mapped."
      },
      {
        id: 2,
        title: "Lab Testing & Ed25519 Certification",
        location: "CFQCTI Testing Lab (26.85° N, 80.95° E)",
        timestamp: "2026-10-16 11:15 IST",
        hash: "0x228f4c9a1d82e4...",
        status: "COMPLETED",
        note: "Spectroscopy confirmed 46.28% N, 0.82% Biuret. Digital cert anchored."
      },
      {
        id: 3,
        title: "Central Warehousing & Inward RFID Log",
        location: "CWC Depot, Lucknow (26.80° N, 81.02° E)",
        timestamp: "2026-10-18 14:40 IST",
        hash: "0x337b5e1a8f90c2...",
        status: "COMPLETED",
        note: "RFID gate confirmed 100% pallet match. Environmental baseline checked."
      },
      {
        id: 4,
        title: "Cold Chain Transport Corridor (NH-19)",
        location: "GPS In Transit: Varanasi Corridor (26.30° N, 81.80° E)",
        timestamp: "2026-10-21 17:05 IST",
        hash: "0x446c8d2b9e01f3...",
        status: "COMPLETED",
        note: "Continuous IoT ping. Ambient temp peaked at 31.2°C (well under 40°C limit)."
      },
      {
        id: 5,
        title: "District Distributor Intake",
        location: "IFFCO District Depot, Jaunpur (25.75° N, 82.68° E)",
        timestamp: "2026-10-24 09:20 IST",
        hash: "0x555d9e3c0f12a4...",
        status: "COMPLETED",
        note: "Bulk custody transfer verified. Sub-lot allocation to village Kendra."
      },
      {
        id: 6,
        title: "Retailer POS Offline Sale",
        location: "PM Kisan Seva Kendra, Badlapur (25.45° N, 82.80° E)",
        timestamp: "2026-10-27 12:10 IST",
        hash: "0x664e0f4d1a23b5...",
        status: "COMPLETED",
        note: "Offline SQLite transaction signed with device nonce. Synced upon 4G reconnect."
      },
      {
        id: 7,
        title: "Farmer DBT Subsidy Release",
        location: "Farmer Ram Charan, Badlapur (25.40° N, 82.85° E)",
        timestamp: "2026-10-29 15:45 IST",
        hash: "0x773f1a5e2b34c6...",
        status: "COMPLETED",
        note: "Aadhaar biometrics POS match released ₹1,500 DBT subsidy instantly to bank."
      }
    ]
  },
  {
    batchId: "BATCH-DAP-2026-8812",
    productName: "Diammonium Phosphate (DAP 18-46-0)",
    manufacturer: "Coromandel International Ltd, Kakinada Unit",
    factoryGps: "16.9891° N, 82.2475° E",
    mfgDate: "2026-10-18",
    expiryDate: "2029-10-17",
    quantity: "40,000 Bags (2,000 MT)",
    unitSize: "50 kg HDPE Bag",
    labCertification: {
      labName: "National Test House Laboratory",
      nitrogenContent: "18.15% (Standard: >= 18.0%)",
      phosphorusContent: "46.10% (Standard: >= 46.0%)",
      moistureContent: "0.42% (Standard: <= 1.5%)",
      status: "PASSED_A_GRADE",
      certHash: "0x99ec7120fa8d39201bc89a7410294fc6b372e9124a91cf8e1920ac39db8812ff",
      signatory: "Dr. P. Venkat (Senior Chemist)"
    },
    merkleRoot: "0x8812acb9012489e...dap001",
    packaging: {
      bagQr: "QR-BAG-8812-409",
      palletQr: "PLT-8812-B7",
      masterRfid: "RFID-EPC-8812-M03"
    },
    currentStage: "Retailer POS Stocked",
    status: "IN_STOCK",
    currentTemp: 29.1,
    currentHumidity: 62.4,
    tripwireTripped: false,
    stages: [
      {
        id: 1,
        title: "Genesis Batch Minted",
        location: "Coromandel Port Plant, Kakinada",
        timestamp: "2026-10-18 09:00 IST",
        hash: "0x881a7b4f2c98d3...",
        status: "COMPLETED",
        note: "Rock phosphate Jordan origin hashed; serialized bag QRs attached."
      },
      {
        id: 2,
        title: "Lab QC Testing",
        location: "Coromandel QA Lab",
        timestamp: "2026-10-19 14:00 IST",
        hash: "0x882f4c9a1d82e4...",
        status: "COMPLETED",
        note: "18.15% N & 46.10% P confirmed. Moisture 0.42%."
      },
      {
        id: 3,
        title: "Regional Warehouse Hub",
        location: "Nagpur Multi-Modal Logistics Hub",
        timestamp: "2026-10-23 10:30 IST",
        hash: "0x883b5e1a8f90c2...",
        status: "COMPLETED",
        note: "RFID pallet inventory recorded. Temperature logged at 27.5°C."
      },
      {
        id: 4,
        title: "Transport to Retailer",
        location: "Kisan Kendra, Amravati",
        timestamp: "2026-10-26 16:15 IST",
        hash: "0x884c8d2b9e01f3...",
        status: "COMPLETED",
        note: "Stock received at Village Kendra POS. Available for Aadhaar farmer purchase."
      }
    ]
  },
  {
    batchId: "BATCH-NPK-2026-RECALL-773",
    productName: "NPK Complex (12-32-16) - RECALLED BATCH",
    manufacturer: "Paradeep Phosphates Limited (PPL)",
    factoryGps: "20.2961° N, 86.6745° E",
    mfgDate: "2026-10-10",
    expiryDate: "2029-10-09",
    quantity: "20,000 Bags (1,000 MT)",
    unitSize: "50 kg Bag",
    labCertification: {
      labName: "State Soil & Fertilizer Testing Center",
      nitrogenContent: "11.10% (FLAGGED: Low N)",
      status: "TEMPERATURE_HUMIDITY_VIOLATION",
      certHash: "0x773ee120fa8d...tripwire_recalled",
      signatory: "SYSTEM_TRIPWIRE_AUTOMATED"
    },
    merkleRoot: "0x773recall...root",
    packaging: {
      bagQr: "QR-BAG-773-REV",
      palletQr: "PLT-773-QUARANTINE",
      masterRfid: "RFID-773-BLOCKED"
    },
    currentStage: "Reverse Flow Activated (Quarantine Recall)",
    status: "RECALLED",
    currentTemp: 44.5, // EXCEEDS 40°C TRIPWIRE
    currentHumidity: 88.0, // EXCEEDS 85% TRIPWIRE
    tripwireTripped: true,
    stages: [
      {
        id: 1,
        title: "Batch Genesis",
        location: "PPL Paradeep Plant",
        timestamp: "2026-10-10 10:00 IST",
        hash: "0x773a1...",
        status: "COMPLETED",
        note: "Initial packaging generated."
      },
      {
        id: 2,
        title: "Transit Sensor Violation",
        location: "Transit NH-16 (Bhubaneswar Corridor)",
        timestamp: "2026-10-13 13:45 IST",
        hash: "0x773_ALARM_EVENT...",
        status: "FAILED",
        note: "IoT edge telemetry recorded 44.5°C & 88% humidity. Smart contract tripped automatically!"
      },
      {
        id: 3,
        title: "Smart Contract Automated Recall",
        location: "Reverse Flow Corridor",
        timestamp: "2026-10-13 14:00 IST",
        hash: "0x773_BURN_TOKEN...",
        status: "REVERSED",
        note: "Tokens revoked. Red return manifest issued back to Paradeep factory."
      }
    ]
  }
];

export const SUPPLY_CHAIN_STAGES = [
  {
    step: 1,
    key: 'manufacturer',
    name: 'Manufacturer & 3-Level QR',
    hindi: 'निर्माता व 3-स्तरीय क्यूआर',
    gps: '26.4521° N, 80.3318° E',
    location: 'NFL Vijaipur Factory',
    badge: 'Genesis Mint',
    color: '#FF6A1A',
    description: 'Every 50 kg bag gets a unique SHA-256 Bag QR. 50 bag hashes roll into one Pallet QR Merkle root, and 20 pallet hashes roll into one Master RFID container tag. Scan one code to prove every grain inside.',
    dataStored: [
      '1 Unit Bag = Bag QR (50 kg SHA-256)',
      '50 Bags = Pallet QR (Merkle Tree Leaf)',
      '20 Pallets = Master RFID (50 MT)',
      'Manufacturing Date, Lot #, Stoichiometry',
      'Factory Geostamp & Ed25519 Signature'
    ],
    blockchainAction: [
      'Mint digital twin NFT batch on Hyperledger Fabric',
      'Anchor 3-level hierarchical Merkle tree roots',
      'Emit GenesisBatchCreated event to national portal'
    ]
  },
  {
    step: 2,
    key: 'lab',
    name: 'Quality Lab & HPLC Certification',
    hindi: 'गुणवत्ता प्रयोगशाला व डिजिटल प्रमाणपत्र',
    gps: '26.8500° N, 80.9500° E',
    location: 'CFQCTI Testing Lab',
    badge: 'QC Ed25519 Signed',
    color: '#3DDC84',
    description: 'Pre-dispatch HPLC & spectroscopy testing confirms exact Nitrogen stoichiometry (46.2% N) and verifies Biuret < 1.5%. Results are digitally signed by certified chemists directly into the batch certificate.',
    dataStored: [
      'HPLC & Spectroscopy Chromatography Logs',
      'Nutrient Ratio: 46.2% N (Pass: >= 46.0%)',
      'Moisture 0.31%, Biuret 0.82%',
      'Accredited Laboratory Ed25519 Public Key'
    ],
    blockchainAction: [
      'Attach cryptographic QC certificate to batch',
      'Enforce automated threshold compliance smart contract',
      'Lock batch if chemical tolerances exceed limits'
    ]
  },
  {
    step: 3,
    key: 'warehouse',
    name: 'Central Warehouse & RFID Gate',
    hindi: 'केंद्रीय गोदाम व निर्णय बिंदु',
    gps: '26.8000° N, 81.0200° E',
    location: 'CWC Lucknow Hub',
    badge: 'RFID Inward Scan',
    color: '#38BDF8',
    description: 'Automated RFID portal reads 20 pallets simultaneously at container intake. Sensor nodes confirm cold-chain integrity and route sound stock to regional transporters or flag damaged stock for reverse flow.',
    dataStored: [
      'EPC Gen2 RFID Portal Scans (20 Pallets)',
      'Inward Inventory Handoff Timestamp',
      'Environmental Status: 28.0°C / 55% RH'
    ],
    blockchainAction: [
      'Execute multi-signature custody transfer',
      'Verify physical-to-digital inventory match',
      'Route to domestic transit corridor'
    ]
  },
  {
    step: 4,
    key: 'transporter',
    name: 'IoT Transit Corridor (NH-19)',
    hindi: 'परिवहन ट्रक व लाइव आईओटी टेलीमेट्री',
    gps: '26.3000° N, 81.8000° E',
    location: 'NH-19 Highway Corridor',
    badge: 'Live IoT Telemetry',
    color: '#F59E0B',
    description: 'Cellular 4G/NB-IoT sensors continuously stream GPS corridor position, cabin temperature, humidity, and tamper accelerometer shocks. Exceeding 40°C or 85% RH triggers automatic smart contract recall.',
    dataStored: [
      'Vehicle Telemetry: UP-32-BT-9014',
      'Real-time GPS Track & Speed (48 km/h)',
      'Dual Sensor Readings (Temp & Humidity)',
      'E-Way Bill & Transit Permit Tokens'
    ],
    blockchainAction: [
      'Stream live location state updates to ledger',
      'Evaluate tripwire rules: Alert if T > 40°C or H > 85%',
      'Trigger automated reverse-flow throw back if violated'
    ]
  },
  {
    step: 5,
    key: 'distributor',
    name: 'District Distributor Intake',
    hindi: 'जिला वितरक व कस्टडी ट्रांसफर',
    gps: '25.7500° N, 82.6800° E',
    location: 'IFFCO District Depot',
    badge: 'Pallet Handshake',
    color: '#A855F7',
    description: 'District warehouse scans pallet QR. System validates Merkle tree leaf hashes, logs custody shift, and dispatches sub-lots to local village cooperative Kendras.',
    dataStored: [
      'Received Pallet QR Token Identifiers',
      'Sub-lot Split Log (1,000 Bags Allocated)',
      'Warehouse Bay Coordinates & Time of Arrival'
    ],
    blockchainAction: [
      'Transfer consignment ownership to distributor',
      'Authorize sub-lot division tokens for retail outlets',
      'Update national fertilizer portal (iFMS)'
    ]
  },
  {
    step: 6,
    key: 'retailer',
    name: 'Retailer POS — Works Offline',
    hindi: 'खुदरा POS — ऑफ़लाइन-प्रथम वास्तुकला',
    gps: '25.4500° N, 82.8000° E',
    location: 'PM Kisan Seva Kendra',
    badge: 'Offline-First SQLite',
    color: '#EC4899',
    description: 'Village POS operates in zero-connectivity areas. Transactions are signed with hardware nonces in an encrypted SQLite store. Local OTP receipts print immediately; transactions sync to blockchain when connectivity restores.',
    dataStored: [
      'Device Nonce & Local SQLite Cryptographic Hash',
      'MRP Ceiling Verification & Subsidized Price',
      'Local OTP Receipt Generated for Farmer',
      'Pending Offline Sync Queue'
    ],
    blockchainAction: [
      'Store cryptographically signed receipt in local ledger',
      'Atomic batch-sync to main chain when 4G connects',
      'Prevent duplicate redemption via nonce verification'
    ]
  },
  {
    step: 7,
    key: 'farmer',
    name: 'Farmer Verification & DBT Subsidy',
    hindi: 'भारतीय किसान — सत्यापन व ₹1500 डीबीटी',
    gps: '25.4000° N, 82.8500° E',
    location: 'Badlapur Agricultural Cluster',
    badge: '₹1,500 DBT Credited',
    color: '#10B981',
    description: 'Farmer verifies fertilizer authenticity via 3 channels: ① Smartphone QR scanner, ② Feature phone SMS / USSD (*99#), or ③ POS Aadhaar Biometrics. Ledger validation releases ₹1,500 DBT subsidy straight to the farmer\'s bank account!',
    dataStored: [
      'Purchase Quantity: 1 Bag (50 kg Neem Coated Urea)',
      'Farmer Aadhaar UID (Masked: XXXX-XXXX-4819)',
      'Acreage Cap Verification (Bhulekh Land Records)',
      'Direct Benefit Transfer (DBT) Reference ID'
    ],
    blockchainAction: [
      'Burn unit bag single-use token (prevents bag refill fraud)',
      'Trigger smart contract release of ₹1,500 DBT to farmer bank',
      'Deliver green authenticity tick to farmer screen'
    ]
  }
];

export const CORE_DETERMINANTS = [
  {
    part: "Part 1",
    title: "Product Authenticity & Composition Data",
    icon: "🧪",
    layer: "Chemical Integrity Layer",
    points: [
      "Upstream Raw Material Provenance: Upstream origin hashing for Nitrogen (Haber-Bosch natural gas), Phosphorus (rock phosphate mines in Jordan/Rajasthan), and Potash (MOP/SOP sources).",
      "Chemical Stoichiometry: Guaranteed N-P-K ratios (Urea 46.2% N, DAP 18-46-0). Maximum tolerances: Biuret <= 1.5%, moisture <= 0.5%, particle size 1.0-2.8 mm.",
      "HPLC Quality Certification: Pre-dispatch chromatography logs cryptographically signed with accredited lab Ed25519 private keys."
    ]
  },
  {
    part: "Part 2",
    title: "Unique Identification & Data Capture",
    icon: "🏷️",
    layer: "Hardware & Serialization Layer",
    points: [
      "Hierarchical 3-Level Identifiers: 1 Bag (50 kg) -> Bag QR (SHA-256); 50 Bags -> Pallet QR (50 Hashes Merkle Root); 20 Pallets (50 MT) -> Master RFID (EPC Gen2).",
      "IoT Edge Sensor Telemetry: Continuous monitoring of temperature, relative humidity, multi-axis shock, and cellular GPS coordinates.",
      "Active Threshold Tripwires: Critical guardrail at T > 40.0°C or H > 85.0%. Over-limit triggers instant quarantine and reverse-flow recall."
    ]
  },
  {
    part: "Part 3",
    title: "Supply Chain Stage Mapping & Custody",
    icon: "🚚",
    layer: "Lifecycle & Custody Layer",
    points: [
      "Manufacturing & Packaging: Automated batch minting, bag filling timestamps, factory GPS stamping.",
      "Warehouse Inward & Outward: RFID portal logging with dual custody transfer verification.",
      "Offline-Resilient POS: Village SQLite local transaction signing with timestamp + nonce, local OTP, atomic sync on reconnect.",
      "Farmer Direct Benefit Transfer: 3 Citizen channels release ₹1,500 DBT subsidy straight to farmer bank accounts."
    ]
  },
  {
    part: "Part 4",
    title: "Blockchain Architecture & Consensus",
    icon: "⛓️",
    layer: "Consortium & Smart Contract Layer",
    points: [
      "Consortium Topology: Permissioned Hyperledger Fabric / Enterprise EVM network connecting fertilizer plants, regulators, and banks.",
      "High Efficiency Consensus: Raft / PBFT consensus with sub-second finality, 2,500+ TPS, and zero energy-waste mining.",
      "Single-Use Token Burn: Prevents recycled bag packaging fraud by burning the unit bag token upon farmer receipt."
    ]
  },
  {
    part: "Part 5",
    title: "Regulatory & Environmental Governance",
    icon: "🏛️",
    layer: "Governance & ESG Layer",
    points: [
      "iFMS & DBT Integration: Direct API hooks into India's national fertilizer subsidy framework.",
      "Anti-Hoarding Acreage Limits: Land record (Bhulekh) coupling prevents illegal industrial diversion.",
      "Nutrient Runoff Mitigation: Soil Health Card recommendation checks ensure optimal nitrogen application."
    ]
  }
];
