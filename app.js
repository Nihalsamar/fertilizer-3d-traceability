/**
 * ============================================================================
 * KISAN-TRACE SPATIAL 3D: Farm-to-Fork Traceability & Quality Certification
 * Category: Software Technology | Bucket: Blockchain, QR Tracking, Computer Vision
 *
 * Implements:
 * 1. 3D Spatial Computing Environment across 6 interconnected agricultural hubs.
 * 2. Computer Vision AI Quality Grading Simulation (YOLOv8 Caliber, Brix, Defect).
 * 3. Consumer & Buyer Fork Verification Portal with Fair-Trade Farmer Premium.
 * 4. Cold-Chain IoT Telemetry Tracking (Reefer 12-14°C & Ethylene Monitoring).
 * 5. Single-Click Interaction Audit Trail logged to Turso Cloud DB.
 * 6. 1-Click Multi-Sheet Excel Workbook Export (XLSX / Native SpreadsheetML).
 * 7. Continuous background telemetry updates streaming every 12 seconds.
 * ============================================================================
 */

(function () {
  "use strict";

  const $ = s => document.querySelector(s);
  const cv = $('#c');

  // --- Procedural Spatial Audio Engine ---
  class SpatialSoundFX {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }

    init() {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          try {
            this.ctx = new AudioContext();
          } catch (e) {}
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    beep(f, dur = 0.1, type = 'sine') {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);
        g.gain.setValueAtTime(0.08, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + dur);
      } catch (e) {}
    }

    step() {
      this.beep(520, 0.08);
      setTimeout(() => this.beep(680, 0.09), 60);
    }

    aiScan() {
      this.beep(880, 0.06, 'triangle');
      setTimeout(() => this.beep(1174, 0.08, 'sine'), 80);
      setTimeout(() => this.beep(1480, 0.12, 'sine'), 160);
    }

    coldBreach() {
      this.beep(880, 0.18, 'sawtooth');
      setTimeout(() => this.beep(440, 0.24, 'sawtooth'), 110);
    }

    celebrate() {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => {
        setTimeout(() => this.beep(f, 0.22), i * 85);
      });
    }
  }

  const sfx = new SpatialSoundFX();

  // --- Three.js WebGL Spatial Setup ---
  let R;
  try {
    R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
  } catch (e) {
    if ($('#err')) $('#err').style.display = 'flex';
    return;
  }
  if (R && R.setPixelRatio) {
    R.setPixelRatio(Math.min(typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1, 2));
  }

  const V = THREE.Vector3;
  const sc = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 600);

  // Spatial Ambient & Directional Sun Lighting
  sc.add(new THREE.AmbientLight(0xffffff, 0.82));
  const sun = new THREE.DirectionalLight(0xfff5e6, 0.85);
  sun.position.set(-20, 35, 25);
  sc.add(sun);

  const mat = c => new THREE.MeshLambertMaterial({ color: c });
  const B = (g, w, h, d, c, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c));
    m.position.set(x, y + h / 2, z);
    g.add(m);
    return m;
  };
  const C = (g, rt, rb, h, c, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 16), mat(c));
    m.position.set(x, y + h / 2, z);
    g.add(m);
    return m;
  };
  const S_ = (g, r, c, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 12), mat(c));
    m.position.set(x, y, z);
    g.add(m);
    return m;
  };

  // --- System Constants & Farm-to-Fork Determinants ---
  const COLD_MAX = 16.0; // Critical Cold-Chain SLA Limit (°C)
  const COLD_MIN = 8.0;
  const HUM_MAX = 95.0;
  const HUM_MIN = 80.0;
  const OK_COLOR = '#10b981';
  const BAD_COLOR = '#ef4444';

  const STATIONS = [
    { name: '1. Shinde Organic Orchard', role: 'Farm Origin', gps: '16.9944°N 73.3000°E', x: -25, temp: 24.5, hum: 78, eth: 0.01 },
    { name: '2. Sahyadri FPO Mandi Hub', role: 'Mandi Aggregator', gps: '17.3100°N 73.5500°E', x: -15, temp: 22.0, hum: 75, eth: 0.02 },
    { name: '3. Packhouse & AI Vision Lab', role: 'CV Quality Grading', gps: '17.6800°N 73.7800°E', x: -5, temp: 18.0, hum: 65, eth: 0.02 },
    { name: '4. Cold Logistics Pre-Cooling', role: 'Cold Storage SLA', gps: '18.1500°N 73.8000°E', x: 5, temp: 12.4, hum: 91, eth: 0.03 },
    { name: '5. IoT Reefer Truck (NH-48)', role: 'Cold Transit Corridor', gps: '18.5204°N 73.8567°E', x: 15, temp: 12.8, hum: 90, eth: 0.04 },
    { name: '6. Gourmet Supermarket / Fork', role: 'Consumer Verification', gps: '18.9220°N 72.8347°E', x: 25, temp: 21.5, hum: 60, eth: 0.02 }
  ];

  const NM = STATIONS.map(s => s.name);
  const GPS = STATIONS.map(s => s.gps);
  const X = STATIONS.map(s => s.x);

  // --- 8 Farm-to-Fork Narrative Steps ---
  const S = [
    {
      en: '1 · Organic Farm Origin & Harvest Genesis',
      hi: 'जैविक खेत उत्पत्ति व डिजिटल उद्भव ब्लॉक',
      f: 0, t: 0, rd: 0, v: [-26, 26], note: 'Organic GI Tagged ✓',
      tx: 'Farmer Santosh Shinde harvests GI-tagged Ratnagiri Alphonso Mangoes at Shinde Organic Orchards. Soil health card (NPK 240-45-310), non-GMO seed lineage, Panchagavya inputs, and harvest timestamp are sealed into the genesis blockchain block.',
      st: ['Farmer: Santosh Shinde (FARMER-MH-RTG-8821)', 'Geo-Fenced Orchard: 16.9944°N, 73.3000°E (4.2 Ha)', 'Soil Health: NPK 240-45-310 | pH 6.4 | OC 1.1%', 'Inputs: Panchagavya, Neem Oil, Drip Solar', 'NPOP Organic Cert: NPOP/NAB/0019/2026/8912'],
      ac: ['Mint Genesis Batch BATCH-AGRI-2026-F2F-091', 'Generate GS1 Digital Link Dynamic QR', 'Anchor Farm Geolocation Polygon on Ledger']
    },
    {
      en: '2 · APMC Mandi Aggregation & e-NWR Handover',
      hi: 'एपीएमसी मंडी एकत्रीकरण व इलेक्ट्रॉनिक रसीद',
      f: 0, t: 1, rd: 1, v: [-16, 24], note: 'e-NWR Handover ✓',
      tx: '120 wooden crates (2,400 kg) arrive at Sahyadri FPO Mandi Hub. Crates are weighed on electronic scales. The farmer signs handover with an offline Ed25519 key, generating an Electronic Negotiable Warehouse Receipt (e-NWR #99104).',
      st: ['Aggregator: Sahyadri Farmers Producer Co.', 'Quantity Received: 120 Crates (2,400 kg)', 'e-NWR Receipt: eNWR-MH-2026-99104', 'Fair Trade Base Price: ₹165/kg (+28.5% premium)', 'Farmer Privacy: Zero-Knowledge Identity Mask'],
      ac: ['Transfer custody from Farmer to Mandi Aggregator', 'Verify offline Ed25519 signature', 'Record e-NWR warehouse balance on blockchain']
    },
    {
      en: '3 · Packhouse Intake & Hydro-Precooling',
      hi: 'पैकहाउस आगमन व हाइड्रो-प्रीकूलिंग कक्ष',
      f: 1, t: 2, rd: 2, v: [-6, 24], note: 'Pre-cooled 12.4°C ✓',
      tx: 'Produce enters the modern post-harvest cleanroom facility. Crates undergo controlled hydro-cooling, dropping core fruit pulp temperature from field heat (24°C) to 12.4°C, slowing respiration and extending shelf life by 14 days.',
      st: ['Facility: Vashi Post-Harvest Cleanroom', 'Pre-Cooling Target: 12.0°C – 13.5°C', 'Core Pulp Temp: 12.4°C Achieved in 45 mins', 'Relative Humidity: 91% (Prevents fruit shrivel)', 'Washing: Ozone-enriched organic sterilization'],
      ac: ['Log thermal pull-down profile to blockchain', 'Verify organic post-harvest washing compliance', 'Queue crates for automated Computer Vision conveyor']
    },
    {
      en: '4 · Computer Vision AI Quality Grading & Sizing',
      hi: 'कंप्यूटर विज़न एआई गुणवत्ता ग्रेडिंग व छंटाई',
      f: 2, t: 2, rd: 2, v: [-5, 20], note: 'Grade A+ Export Certified ✓',
      tx: 'Optical conveyor carries fruit under high-speed multi-spectral cameras running YOLOv8. AI evaluates caliber diameter (72.4mm), ripeness color (88.2% saffron hue), sugar Brix rating (19.2°), and surface defect area (0.0%), stamping Grade A+ Export Certificate.',
      st: ['AI Model: AgriVision-YOLOv8-FruitGrading-v3', 'Detection Confidence: 99.4%', 'Caliber Size: 72.4 mm (Export Threshold >70mm)', 'Sugar Content: 19.2° Brix (Refractometer verified)', 'MRL Pesticide Residue: <0.005 ppm (Pesticide-Free)'],
      ac: ['Generate Cryptographic Quality Certificate 0xqc994', 'Sort into Grade A+ Export vs Domestic Clamshells', 'Attach Quality Hash to Merkle Root on Ledger']
    },
    {
      en: '5 · Cold Storage & Ethylene Gas Management',
      hi: 'कोल्ड स्टोरेज व एथिलीन गैस नियंत्रण',
      f: 2, t: 3, rd: 3, v: [4, 26], note: 'Ethylene <0.04 ppm ✓',
      tx: 'Graded clamshells are stacked in the cold storage warehouse under continuous environmental telemetry. Industrial scrubbers maintain Ethylene gas below 0.04 ppm to prevent premature over-ripening while relative humidity stays at 89.5%.',
      st: ['Chamber: Cold Hub Staging Room #A1', 'Temperature: 12.8°C (Optimal envelope)', 'Relative Humidity: 89.5% (Ideal moisture retention)', 'Ethylene (C2H4): 0.04 ppm (Scrubber active)', 'Dynamic Shelf-Life Estimate: 14 Days Remaining'],
      ac: ['Stream real-time environmental IoT hashes to Turso', 'Update inventory status to EXPORT_PACKAGED', 'Issue Cold Logistics Dispatch Clearance']
    },
    {
      en: '6 · IoT Cold-Chain Reefer Truck Transit (NH-48)',
      hi: 'आईओटी रीफर ट्रक कोल्ड-चेन परिवहन',
      f: 3, t: 4, rd: 4, v: [15, 26], note: 'Cold-Chain Intact 12.8°C ✓',
      tx: 'Pallets travel inside dedicated IoT reefer truck MH-08-AG-9941 along NH-48 express corridor to the Mumbai export terminal. Dual temperature probes, humidity sensors, and GPS stream continuous telemetry. Smart contract trips if temperature breaches >16°C.',
      st: ['Carrier: MH-08-AG-9941 (Dedicated Reefer)', 'Corridor: NH-48 Express Transit (Ratnagiri -> Mumbai)', 'Cold-Chain SLA: 12.0°C – 14.0°C (Breach >16.0°C)', 'Real-Time Telemetry: 12.8°C / 90% RH', 'Tamper Seal: Digital RFID Cryptographic E-Lock'],
      ac: ['Record transit custody handover on ledger', 'Stream continuous GPS and thermal sensor hashes', 'Auto-execute insurance quarantine if SLA breached']
    },
    {
      en: '7 · Gourmet Supermarket & Phytosanitary Seal',
      hi: 'सुपरमार्केट शेल्फ व पादप-स्वच्छता मुहर',
      f: 4, t: 5, rd: 5, v: [24, 24], note: 'APEDA Phytosanitary Approved ✓',
      tx: 'Produce arrives at Nature\'s Basket Gourmet Hypermarket & Mumbai Cargo Export Terminal. Export phytosanitary inspectors scan GS1 Digital Link QR codes, verifying unbroken cold-chain history and organic pesticide-free certifications.',
      st: ['Retailer: Nature\'s Basket Flagship / Export Cargo', 'Packaging: 4-Pack Clamshell (GS1 Digital Link)', 'Phytosanitary Clearance: APEDA Export Approved', 'Transit Distance: 342 km (Food Miles: 0.18 kg CO2e)', 'Shelf Status: Fresh / Optimal Ripeness for Consumer'],
      ac: ['Confirm retailer inward stock receipt on blockchain', 'Bind individual clamshell QRs to retail inventory', 'Publish public provenance record for consumer scan']
    },
    {
      en: '8 · Consumer Fork Verification & Fair-Trade Premium',
      hi: 'उपभोक्ता सत्यापन व किसान पारदर्शी लाभ',
      f: 5, t: 5, rd: 5, v: [25, 22], note: 'Farm-to-Fork Verified ✓',
      tx: 'At the dining table, the consumer scans the clamshell QR code using any smartphone camera. The screen reveals the complete journey: farmer Santosh Shinde, soil health card, computer vision grade, chemical purity, and transparent fair-trade premium proof.',
      st: ['Consumer Scan: GS1 Digital Link URI Resolved', 'Farmer Received: ₹165/kg (vs conventional ₹85/kg)', 'GI Provenance: Ratnagiri Hapus #124 Authenticated', 'HPLC Residue Test: 100% Pesticide-Free (<0.005 ppm)', 'Consumer Direct Tip: ₹50.00 transferred to farmer'],
      ac: ['Verify end-to-end cryptographic provenance chain', 'Execute fair-trade micro-incentive to farmer wallet', 'Log consumer verification event to public ledger']
    }
  ];

  // --- State Variables ---
  let step = 0;
  let st = { ph: 'wait', t: 0 };
  let rd = {};
  let rej = -1;
  let mode = 'auto';
  let zoom = 1;
  let auto = null;
  let currentLang = 'en';
  let selectedChannel = 'smart';
  let currentPacketType = 'clamshell';
  let dataOn = true;
  let flash = 0;

  // --- World Ground, Farm Soils & Roads ---
  // Lush agricultural terrain
  B(sc, 110, 0.4, 46, 0x2d5a27, 0, -0.4, -2);
  // Red Konkan soil farm area on left
  B(sc, 28, 0.42, 28, 0x8b3a2b, -25, -0.38, -2);
  // Highway road corridor
  B(sc, 80, 0.35, 2.4, 0x334155, 0, 0, 2.0);
  for (let rx = -38; rx <= 38; rx += 3.5) {
    B(sc, 1.4, 0.37, 0.12, 0xfacc15, rx, 0, 2.0);
  }

  // --- Station 1: Organic Farmstead & Orchard (X = -25) ---
  const farmGroup = new THREE.Group();
  farmGroup.position.set(-25, 0, 0);
  sc.add(farmGroup);
  // Traditional Konkan farmhouse
  B(farmGroup, 4.5, 2.8, 3.5, 0xd97706, -2, 0, -5);
  // Terracotta roof
  B(farmGroup, 4.8, 0.8, 3.8, 0xb45309, -2, 2.8, -5);
  // Solar water pump panel
  const solarPanel = B(farmGroup, 2.2, 0.1, 1.4, 0x1e3a8a, -5.5, 1.8, -3);
  solarPanel.rotation.x = 0.4;
  C(farmGroup, 0.08, 0.08, 1.8, 0x64748b, -5.5, 0, -3);
  // Orchard Mango Trees
  const makeTree = (gx, gz) => {
    C(farmGroup, 0.25, 0.35, 2.2, 0x78350f, gx, 0, gz);
    S_(farmGroup, 1.6, 0x15803d, gx, 2.8, gz);
    // Golden mango fruits hanging
    S_(farmGroup, 0.22, 0xf59e0b, gx - 0.7, 2.4, gz + 0.9);
    S_(farmGroup, 0.22, 0xf59e0b, gx + 0.8, 2.2, gz - 0.8);
    S_(farmGroup, 0.22, 0xf59e0b, gx + 0.3, 3.2, gz + 1.1);
  };
  makeTree(2.5, -4);
  makeTree(5.5, -6);
  makeTree(3.0, -9);
  makeTree(-5.5, -8);
  // Wooden produce crates at farm gate
  B(farmGroup, 1.4, 0.6, 0.9, 0xb45309, 1.5, 0, 0.5);
  B(farmGroup, 1.4, 0.6, 0.9, 0x9a3412, 1.5, 0.6, 0.5);

  // --- Station 2: Sahyadri FPO Mandi & Aggregator Hub (X = -15) ---
  const mandiGroup = new THREE.Group();
  mandiGroup.position.set(-15, 0, 0);
  sc.add(mandiGroup);
  // Covered Mandi Auction Shed
  B(mandiGroup, 6.5, 0.2, 5.0, 0x475569, 0, 0, -3.5);
  // Shed Pillars
  [-2.8, 2.8].forEach(px => {
    [-1.5, -5.5].forEach(pz => {
      C(mandiGroup, 0.12, 0.12, 3.2, 0x94a3b8, px, 0, pz);
    });
  });
  // Canopy Roof
  const mandiRoof = B(mandiGroup, 7.0, 0.3, 5.4, 0x0284c7, 0, 3.2, -3.5);
  // Electronic Weighing Scale Platform
  B(mandiGroup, 1.8, 0.15, 1.8, 0x1e293b, -1.2, 0.1, -2.5);
  C(mandiGroup, 0.05, 0.05, 1.2, 0x38bdf8, -0.4, 0.1, -1.8);
  // e-NWR Digital Ledger Terminal
  B(mandiGroup, 0.6, 0.9, 0.4, 0x0f172a, 2.0, 0, -2);
  B(mandiGroup, 0.5, 0.35, 0.05, 0x38bdf8, 2.0, 0.6, -1.8);

  // --- Station 3: Packhouse & Computer Vision AI Quality Lab (X = -5) ---
  const packGroup = new THREE.Group();
  packGroup.position.set(-5, 0, 0);
  sc.add(packGroup);
  // Cleanroom Building
  B(packGroup, 6.8, 3.4, 5.5, 0xf8fafc, 0, 0, -4);
  B(packGroup, 6.9, 0.4, 5.6, 0x0f172a, 0, 3.4, -4);
  // Translucent blue glass cleanroom window
  const glassWin = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 1.8, 0.1),
    new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 })
  );
  glassWin.position.set(0, 1.8, -1.2);
  packGroup.add(glassWin);
  // Optical Conveyor Belt
  B(packGroup, 4.8, 0.4, 0.8, 0x1e293b, 0, 0.6, 0);
  // AI Optical Scanner Portal Tunnel
  const scannerTunnel = B(packGroup, 1.4, 1.5, 1.2, 0x06b6d4, 0, 0.7, 0);
  scannerTunnel.material.transparent = true;
  scannerTunnel.material.opacity = 0.85;
  // Holographic laser beam ring
  const laserRing = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 0.65, 24),
    new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide })
  );
  laserRing.rotation.y = Math.PI / 2;
  laserRing.position.set(0, 1.1, 0);
  packGroup.add(laserRing);

  // --- Station 4: Industrial Pre-Cooling & Cold Storage (X = 5) ---
  const coldGroup = new THREE.Group();
  coldGroup.position.set(5, 0, 0);
  sc.add(coldGroup);
  // Heavy Insulated Cold Storage Warehouse
  B(coldGroup, 6.5, 3.8, 5.5, 0x0f172a, 0, 0, -4);
  B(coldGroup, 6.7, 0.3, 5.7, 0x38bdf8, 0, 3.8, -4);
  // Rooftop Industrial Cooling Condensers
  [-1.5, 1.5].forEach(cx => {
    B(coldGroup, 1.4, 0.9, 1.4, 0x475569, cx, 4.0, -3.8);
    C(coldGroup, 0.4, 0.4, 0.2, 0x94a3b8, cx, 4.9, -3.8);
  });
  // Digital Cold-Chain Temperature Gauge on facade
  const tempGauge = B(coldGroup, 1.6, 0.8, 0.1, 0x064e3b, 0, 2.2, -1.2);

  // --- Station 5: IoT Reefer Truck Transporter (X = 15) ---
  const truckGroup = new THREE.Group();
  truckGroup.position.set(15, 0, 2.0);
  sc.add(truckGroup);
  // Truck Cabin
  B(truckGroup, 2.0, 2.2, 1.8, 0x1e3a8a, -2.4, 0.6, 0);
  // Front Windshield
  const windshield = B(truckGroup, 0.8, 0.8, 1.6, 0x38bdf8, -3.0, 1.6, 0);
  windshield.material.transparent = true;
  windshield.material.opacity = 0.7;
  // Heavy Insulated Reefer Container
  const reeferBox = B(truckGroup, 4.8, 2.6, 2.0, 0xf1f5f9, 1.0, 0.8, 0);
  // Green IoT Cold-Chain Status Strip
  const reeferStrip = B(truckGroup, 4.6, 0.2, 2.05, 0x10b981, 1.0, 2.2, 0);
  // Wheels
  const wheelMat = mat(0x18181b);
  const makeWheel = (wx, wz) => {
    const wm = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.3, 16), wheelMat);
    wm.rotation.x = Math.PI / 2;
    wm.position.set(wx, 0.45, wz);
    truckGroup.add(wm);
  };
  makeWheel(-2.6, 1.0);
  makeWheel(-2.6, -1.0);
  makeWheel(0.6, 1.05);
  makeWheel(0.6, -1.05);
  makeWheel(2.4, 1.05);
  makeWheel(2.4, -1.05);

  // --- Station 6: Gourmet Supermarket & Consumer Fork (X = 25) ---
  const retailGroup = new THREE.Group();
  retailGroup.position.set(25, 0, 0);
  sc.add(retailGroup);
  // Gourmet Retail Store facade
  B(retailGroup, 6.2, 3.4, 4.8, 0x1e293b, 0, 0, -4);
  B(retailGroup, 6.4, 0.4, 5.0, 0x10b981, 0, 3.4, -4);
  // Dining & Verification Table
  B(retailGroup, 3.2, 0.15, 2.0, 0xb45309, 0, 1.1, 0);
  // Table legs
  [-1.3, 1.3].forEach(tx => {
    [-0.8, 0.8].forEach(tz => {
      C(retailGroup, 0.06, 0.06, 1.1, 0x78350f, tx, 0, tz);
    });
  });
  // Fruit Bowl with Fresh Produce
  C(retailGroup, 0.65, 0.35, 0.3, 0xf8fafc, 0, 1.25, 0);
  S_(retailGroup, 0.26, 0xf59e0b, 0, 1.5, 0);
  S_(retailGroup, 0.24, 0xf59e0b, -0.2, 1.45, 0.15);
  S_(retailGroup, 0.24, 0xef4444, 0.2, 1.45, -0.15);
  // Consumer Smartphone Scanner Stand
  B(retailGroup, 0.3, 0.6, 0.05, 0x0f172a, -0.8, 1.25, 0.4);
  const phoneScreen = B(retailGroup, 0.26, 0.5, 0.02, 0x10b981, -0.8, 1.3, 0.43);

  // --- Sky Blockchain Ledger ---
  const led = new THREE.Group();
  led.position.set(0, 18, -10);
  sc.add(led);
  for (let i = -3; i <= 3; i++) {
    B(led, 1.8, 1.3, 1.3, 0x7c4dff, i * 2.6, 0, 0);
    if (i < 3) B(led, 0.8, 0.15, 0.15, 0x06b6d4, i * 2.6 + 1.3, 0, 0);
  }

  // Laser streams connecting stations to sky ledger
  const lines = [];
  X.forEach((x, i) => {
    const l = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new V(x, 2.2, 0), new V(i * 1.3 - 3.2, 17.5, -10)]),
      new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.4 })
    );
    sc.add(l);
    lines.push(l);
  });

  // --- Active Produce Crate Mesh (Moves along supply chain) ---
  const crate = new THREE.Group();
  sc.add(crate);

  const singleFruitGroup = new THREE.Group();
  const clamshellGroup = new THREE.Group();
  const crateGroup = new THREE.Group();
  const palletGroup = new THREE.Group();

  crate.add(singleFruitGroup);
  crate.add(clamshellGroup);
  crate.add(crateGroup);
  crate.add(palletGroup);

  // 1. Single Alphonso Mango
  S_(singleFruitGroup, 0.55, 0xf59e0b, 0, 0.55, 0);
  C(singleFruitGroup, 0.05, 0.04, 0.2, 0x78350f, 0, 1.1, 0);
  // Leaf
  const leaf = B(singleFruitGroup, 0.35, 0.04, 0.15, 0x15803d, 0.15, 1.12, 0);
  leaf.rotation.z = -0.4;

  // 2. 4-Pack Clamshell
  const clamBox = B(clamshellGroup, 1.6, 0.55, 1.4, 0x38bdf8, 0, 0.28, 0);
  clamBox.material.transparent = true;
  clamBox.material.opacity = 0.5;
  [-0.4, 0.4].forEach(fx => {
    [-0.35, 0.35].forEach(fz => {
      S_(clamshellGroup, 0.28, 0xf59e0b, fx, 0.35, fz);
    });
  });

  // 3. 20kg Wooden Crate
  B(crateGroup, 2.2, 0.8, 1.6, 0xb45309, 0, 0.4, 0);
  B(crateGroup, 2.25, 0.12, 1.65, 0x78350f, 0, 0.75, 0);

  // 4. Export Pallet of 50 Crates
  B(palletGroup, 2.8, 0.2, 2.0, 0x9a3412, 0, 0.1, 0);
  for (let py = 0; py < 3; py++) {
    B(palletGroup, 2.6, 0.5, 1.8, 0xb45309, 0, 0.3 + py * 0.52, 0);
  }

  function updateProducePackaging(packType) {
    currentPacketType = packType;
    singleFruitGroup.visible = packType === 'mango';
    clamshellGroup.visible = packType === 'clamshell';
    crateGroup.visible = packType === 'crate';
    palletGroup.visible = packType === 'pallet';
    sfx.beep(520, 0.05);
  }
  updateProducePackaging('clamshell');

  const cp = new V(X[0], 0.4, 0);

  // --- Excel Export & Turso Cloud Sync Module ---
  const excelState = {
    data: null,
    activeSheet: 'clicks',
    searchQuery: '',
    loading: false
  };

  function parseCoordinateString(coords) {
    if (!coords) return { lat: '16.9944°N', lng: '73.3000°E', decLat: '16.994400', decLng: '73.300000' };
    const str = String(coords).trim();
    const match = str.match(/([0-9.]+)\s*°?\s*([NSns])\s*,?\s*([0-9.]+)\s*°?\s*([EWew])/);
    if (match) {
      const latVal = parseFloat(match[1]);
      const latDir = match[2].toUpperCase();
      const lngVal = parseFloat(match[3]);
      const lngDir = match[4].toUpperCase();
      return {
        lat: `${latVal}°${latDir}`,
        lng: `${lngVal}°${lngDir}`,
        decLat: (latDir === 'S' ? -latVal : latVal).toFixed(6),
        decLng: (lngDir === 'W' ? -lngVal : lngVal).toFixed(6)
      };
    }
    return { lat: str, lng: '', decLat: '', decLng: '' };
  }

  function trackClick(actionType, targetElement, details = {}) {
    const nodeIdx = typeof step === 'number' ? step : 0;
    const nodeName = NM[nodeIdx] || 'Global View';
    const gps = GPS[nodeIdx] || '16.9944°N 73.3000°E';
    const tempInput = $('#T');
    const humInput = $('#H');
    const temp = tempInput ? (parseFloat(tempInput.value) || 12.8) : 12.8;
    const hum = humInput ? (parseFloat(humInput.value) || 90.0) : 90.0;
    const detailsStr = typeof details === 'string' ? details : JSON.stringify(details);

    const payload = {
      batch_id: 'BATCH-AGRI-2026-F2F-091',
      action_type: actionType,
      target_element: targetElement,
      node_index: nodeIdx,
      node_name: nodeName,
      gps: gps,
      temperature: temp,
      humidity: hum,
      details: detailsStr
    };

    if (excelState && excelState.data) {
      if (!Array.isArray(excelState.data.clicks)) excelState.data.clicks = [];
      if (!Array.isArray(excelState.data.timeline)) excelState.data.timeline = [];

      const coords = parseCoordinateString(gps);
      const clickedAt = new Date().toISOString().replace('T', ' ').slice(0, 19);
      const newClickRecord = {
        id: excelState.data.clicks.length + 1,
        batch_id: payload.batch_id,
        action_type: actionType,
        target_element: targetElement,
        node_index: nodeIdx,
        node_name: nodeName,
        gps_coordinates: gps,
        latitude: coords.lat,
        longitude: coords.lng,
        decimal_latitude: coords.decLat,
        decimal_longitude: coords.decLng,
        temperature: temp,
        humidity: hum,
        details: detailsStr,
        clicked_at: clickedAt
      };
      excelState.data.clicks.unshift(newClickRecord);

      excelState.data.timeline.unshift({
        event_id: `CLK-${newClickRecord.id}`,
        timestamp: clickedAt,
        category: 'SINGLE_CLICK_ACTION',
        action_or_type: actionType,
        facility_name: nodeName,
        target_element: targetElement,
        latitude: coords.lat,
        longitude: coords.lng,
        decimal_latitude: coords.decLat,
        decimal_longitude: coords.decLng,
        temperature: temp,
        humidity: hum,
        status: 'CAPTURED',
        notes: detailsStr
      });

      renderExcelCounts();
      if ($('#modal-details') && $('#modal-details').classList.contains('open') && (excelState.activeSheet === 'clicks' || excelState.activeSheet === 'timeline')) {
        renderExcelGridTable();
      }
    }

    if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
      try {
        fetch('/api/click-event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch (e) {}
    }
  }

  function getFallbackExcelData() {
    const now = new Date();
    return {
      clicks: [
        { id: 1, batch_id: 'BATCH-AGRI-2026-F2F-091', action_type: 'AI_VISION_SCAN', target_element: 'YOLOv8 Optical Sorter', node_index: 2, node_name: 'Packhouse & AI Vision Lab', gps_coordinates: '17.6800°N 73.7800°E', latitude: '17.68°N', longitude: '73.78°E', decimal_latitude: '17.680000', decimal_longitude: '73.780000', temperature: 18.0, humidity: 65.0, details: 'Grade A+ Export Certified (72.4mm / 19.2° Brix)', clicked_at: new Date(now.getTime() - 3600000).toISOString().replace('T', ' ').slice(0, 19) },
        { id: 2, batch_id: 'BATCH-AGRI-2026-F2F-091', action_type: 'FORK_VERIFY_SCAN', target_element: 'GS1 Digital Link Consumer Scan', node_index: 5, node_name: 'Gourmet Supermarket / Fork', gps_coordinates: '18.9220°N 72.8347°E', latitude: '18.92°N', longitude: '72.83°E', decimal_latitude: '18.922000', decimal_longitude: '72.834700', temperature: 21.5, humidity: 60.0, details: 'Consumer verified GI Alphonso #124; ₹50 tip transferred', clicked_at: new Date(now.getTime() - 1800000).toISOString().replace('T', ' ').slice(0, 19) }
      ],
      timeline: [
        { event_id: 'FORK-SCAN-1', timestamp: '2026-10-29 09:45:00', category: 'CONSUMER_FORK_VERIFICATION', action_or_type: 'GS1 Digital Link Verification', facility_name: 'Nature Basket Supermarket', target_element: 'Clamshell QR #890103009124', latitude: '18.92°N', longitude: '72.83°E', decimal_latitude: '18.922000', decimal_longitude: '72.834700', temperature: 21.5, humidity: 60.0, status: 'VERIFIED_ORGANIC', notes: 'Pesticide-free certified | +28.5% fair payout' },
        { event_id: 'CV-GRADE-1', timestamp: '2026-10-28 16:45:00', category: 'COMPUTER_VISION_AI_GRADING', action_or_type: 'GRADE_A_PLUS_EXPORT', facility_name: 'Vashi Agro Packhouse AI Lab', target_element: 'Alphonso Mango Sample #001', latitude: '17.68°N', longitude: '73.78°E', decimal_latitude: '17.680000', decimal_longitude: '73.780000', temperature: 18.0, humidity: 65.0, status: 'GRADE_A_PLUS_EXPORT', notes: 'Caliber: 72.4mm | Brix: 19.2° | Defect: 0.0%' },
        { event_id: 'HARVEST-1', timestamp: '2026-10-28 06:30:00', category: 'AGRI_FARM_HARVEST', action_or_type: 'Organic Harvest & Genesis Block Minted', facility_name: 'Shinde Organic Orchards', target_element: 'Organic Alphonso Mango (GI Tagged)', latitude: '16.99°N', longitude: '73.30°E', decimal_latitude: '16.994400', decimal_longitude: '73.300000', temperature: 24.5, humidity: 78.0, status: 'GENESIS_MINTED', notes: 'Farmer: Santosh Shinde | Soil: NPK 240-45-310' }
      ],
      agri_batches: [{
        id: 'BATCH-AGRI-2026-F2F-091',
        batch_number: 'LOT-2026-F2F-091',
        produce_name: 'Organic Alphonso Mango (GI Tagged)',
        variety: 'Ratnagiri Hapus (GI Reg #124)',
        farm_name: 'Shinde Organic Orchards, Ratnagiri',
        farmer_name: 'Santosh Shinde',
        farmer_id: 'FARMER-MH-RTG-8821',
        farm_gps: '16.9944°N 73.3000°E',
        soil_health_index: 'NPK: 240-45-310 kg/ha | pH: 6.4 | OC: 1.1%',
        organic_cert_number: 'NPOP/NAB/0019/2026/8912',
        inputs_used: 'Panchagavya, Cold-Pressed Neem Oil, Drip Solar',
        harvest_date: '2026-10-28 06:30:00',
        total_crates: 120,
        total_weight_kg: 2400.0,
        fair_trade_premium_pct: 28.5,
        farmer_payout_per_kg: 165.0,
        genesis_tx_hash: '0x7f14a89bc0192e48dc7104b901fc88a10427e1892b189a7401c9018e7492a83c',
        quality_cert_hash: '0xqc994pass_alphonso_export_grade_a_plus_apeda_certified',
        status: 'EXPORT_CERTIFIED'
      }],
      cv_grading: [
        { id: 1, batch_id: 'BATCH-AGRI-2026-F2F-091', sample_item_code: 'FRUIT-ALPH-091-0001', produce_type: 'Alphonso Mango', model_name: 'AgriVision-YOLOv8-FruitGrading-v3', detection_confidence: 0.994, caliber_diameter_mm: 72.4, estimated_weight_g: 265.0, ripeness_color_pct: 88.2, sugar_brix_rating: 19.2, defect_count: 0, defect_type: 'None / Zero Defects', defect_area_pct: 0.0, mrl_pesticide_ppm: 0.002, mrl_status: 'PASSED_APEDA_EXPORT_STANDARD', assigned_grade: 'GRADE_A_PLUS_EXPORT', quality_cert_hash: '0xqc994pass_0001', graded_at: '2026-10-28 16:45:00' }
      ],
      coldchain_telemetry: [
        { id: 1, batch_id: 'BATCH-AGRI-2026-F2F-091', stage_node: 'Reefer Truck In-Transit', vehicle_id: 'MH-08-AG-9941', gps_coordinates: '18.5204°N 73.8567°E', latitude: '18.52°N', longitude: '73.85°E', decimal_latitude: '18.520400', decimal_longitude: '73.856700', temperature_celsius: 12.8, relative_humidity_pct: 90.0, ethylene_level_ppm: 0.04, is_cold_chain_breached: 0, status_note: 'Compliant: Cold-Chain Preserved', recorded_at: '2026-10-29 04:30:00' }
      ],
      farm_custody: [
        { id: 1, batch_id: 'BATCH-AGRI-2026-F2F-091', hop_sequence: 1, from_stakeholder: 'Santosh Shinde (Farmer)', to_stakeholder: 'Sahyadri FPO Mandi Hub', location_name: 'Ratnagiri APMC Yard', custody_document: 'e-NWR Electronic Warehouse Receipt #99104', carrier_vehicle_id: 'MH-08-B-4411', tx_hash: '0x101a...881a', is_offline_signed: 1, verified_at: '2026-10-28 11:15:00' }
      ],
      consumer_scans: [
        { id: 1, batch_id: 'BATCH-AGRI-2026-F2F-091', scanned_qr_code: 'GS1-DL-890103009124', scan_channel: 'Consumer Smartphone PWA', consumer_location: 'Nature Basket Supermarket', provenance_verified: 1, fair_trade_farmer_tip: 50.0, scanned_at: '2026-10-29 09:45:00' }
      ],
      fertilizer_legacy: [
        { id: 'batch-iffco-2026-x992', batch_number: 'LOT-2026-X992', formulation: 'Neem-Coated Urea (46.2% N)', nitrogen_pct: 46.2, total_weight_mt: 50.0, manufacturer_name: 'IFFCO Phulpur Production Unit', status: 'ACTIVE' }
      ]
    };
  }

  async function loadExcelDataHub(forceRefresh = false) {
    const statusMsg = $('#excel-status-msg');
    if (statusMsg) statusMsg.textContent = '⏳ Querying Turso Cloud database for all records...';

    if (!forceRefresh && excelState.data) {
      renderExcelCounts();
      renderExcelGridTable();
      return;
    }

    excelState.loading = true;
    try {
      const res = await fetch('/api/export/all');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      if (json.success && json.data) {
        excelState.data = json.data;
        if (statusMsg) {
          statusMsg.innerHTML = `🟢 <strong>Live Turso Connected:</strong> ${json.counts?.clicks || 0} clicks, ${json.counts?.timeline || 0} timeline events, ${json.counts?.cv_grading || 0} CV grades extracted at ${new Date().toLocaleTimeString()}.`;
        }
      } else {
        throw new Error(json.error || 'Invalid database payload');
      }
    } catch (e) {
      excelState.data = getFallbackExcelData();
      if (statusMsg) {
        statusMsg.textContent = `🟡 Loaded local gathered records. Connected to edge engine.`;
      }
    } finally {
      excelState.loading = false;
      renderExcelCounts();
      renderExcelGridTable();
    }
  }

  function renderExcelCounts() {
    if (!excelState.data) return;
    const {
      clicks = [],
      timeline = [],
      agri_batches = [],
      cv_grading = [],
      coldchain_telemetry = [],
      farm_custody = [],
      consumer_scans = [],
      batches = []
    } = excelState.data;

    if ($('#cnt-tab-clicks')) $('#cnt-tab-clicks').textContent = clicks.length;
    if ($('#cnt-tab-timeline')) $('#cnt-tab-timeline').textContent = timeline.length;
    if ($('#cnt-tab-agri-batches')) $('#cnt-tab-agri-batches').textContent = agri_batches.length;
    if ($('#cnt-tab-cv-grading')) $('#cnt-tab-cv-grading').textContent = cv_grading.length;
    if ($('#cnt-tab-coldchain')) $('#cnt-tab-coldchain').textContent = coldchain_telemetry.length;
    if ($('#cnt-tab-custody')) $('#cnt-tab-custody').textContent = farm_custody.length;
    if ($('#cnt-tab-consumer-scans')) $('#cnt-tab-consumer-scans').textContent = consumer_scans.length;
    if ($('#cnt-tab-fertilizer')) $('#cnt-tab-fertilizer').textContent = batches.length;
  }

  function renderExcelGridTable() {
    const thead = $('#excel-grid-thead');
    const tbody = $('#excel-grid-tbody');
    const rowBadge = $('#excel-row-count-badge');
    if (!thead || !tbody || !excelState.data) return;

    thead.innerHTML = '';
    tbody.innerHTML = '';

    const sheet = excelState.activeSheet;
    let rows = (excelState.data[sheet] || []);
    const q = (excelState.searchQuery || '').toLowerCase().trim();

    if (q) {
      rows = rows.filter(r => Object.values(r).some(val => String(val || '').toLowerCase().includes(q)));
    }

    if (rowBadge) rowBadge.textContent = `${rows.length} rows`;

    let columns = [];
    if (sheet === 'clicks') {
      columns = [
        { title: '#Click ID', key: 'id' },
        { title: 'Clicked Timestamp', key: 'clicked_at' },
        { title: 'Action Type', key: 'action_type' },
        { title: 'Target Element / Control', key: 'target_element' },
        { title: 'Station / Node', key: 'node_name' },
        { title: 'Latitude (°N)', key: 'latitude' },
        { title: 'Longitude (°E)', key: 'longitude' },
        { title: 'Temp (°C)', key: 'temperature', fmt: v => v != null ? `${Number(v).toFixed(1)}°C` : '-' },
        { title: 'Humidity (%)', key: 'humidity', fmt: v => v != null ? `${Number(v).toFixed(1)}%` : '-' },
        { title: 'Audit Details', key: 'details' }
      ];
    } else if (sheet === 'timeline') {
      columns = [
        { title: 'Event ID', key: 'event_id' },
        { title: 'Timestamp', key: 'timestamp' },
        { title: 'Category', key: 'category' },
        { title: 'Action / Type', key: 'action_or_type' },
        { title: 'Facility Location', key: 'facility_name' },
        { title: 'Target Subject', key: 'target_element' },
        { title: 'Status', key: 'status', render: r => `<span class="excel-badge-ok">${r.status || 'OK'}</span>` },
        { title: 'Audit Trace & Notes', key: 'notes' }
      ];
    } else if (sheet === 'agri_batches') {
      columns = [
        { title: 'Batch ID', key: 'id' },
        { title: 'Produce Name', key: 'produce_name' },
        { title: 'Variety', key: 'variety' },
        { title: 'Orchard Name', key: 'farm_name' },
        { title: 'Farmer Name', key: 'farmer_name' },
        { title: 'Farm GPS', key: 'farm_gps' },
        { title: 'Organic Cert #', key: 'organic_cert_number' },
        { title: 'Farmer Payout', key: 'farmer_payout_per_kg', fmt: v => `₹${v}/kg (+28.5%)` },
        { title: 'Status', key: 'status' }
      ];
    } else if (sheet === 'cv_grading') {
      columns = [
        { title: '#Grade ID', key: 'id' },
        { title: 'Produce Sample', key: 'sample_item_code' },
        { title: 'Confidence', key: 'detection_confidence', fmt: v => `${(Number(v) * 100).toFixed(1)}%` },
        { title: 'Caliber (mm)', key: 'caliber_diameter_mm', fmt: v => `${v} mm` },
        { title: 'Ripeness %', key: 'ripeness_color_pct', fmt: v => `${v}%` },
        { title: 'Brix (°)', key: 'sugar_brix_rating', fmt: v => `${v}° Brix` },
        { title: 'Defect %', key: 'defect_area_pct', fmt: v => `${v}%` },
        { title: 'MRL Chemical', key: 'mrl_pesticide_ppm', fmt: v => `${v} ppm` },
        { title: 'Assigned Grade', key: 'assigned_grade', render: () => `<span class="excel-badge-ok">GRADE A+ EXPORT</span>` }
      ];
    } else if (sheet === 'coldchain_telemetry') {
      columns = [
        { title: '#Log ID', key: 'id' },
        { title: 'Stage Node', key: 'stage_node' },
        { title: 'Vehicle / Chamber', key: 'vehicle_id' },
        { title: 'Temp (°C)', key: 'temperature_celsius', fmt: v => `${v}°C` },
        { title: 'Humidity (%)', key: 'relative_humidity_pct', fmt: v => `${v}%` },
        { title: 'Ethylene (ppm)', key: 'ethylene_level_ppm', fmt: v => `${v} ppm` },
        { title: 'Status', key: 'is_cold_chain_breached', render: r => r.is_cold_chain_breached ? `<span class="excel-badge-breach">BREACHED</span>` : `<span class="excel-badge-ok">COMPLIANT</span>` },
        { title: 'Recorded Timestamp', key: 'recorded_at' }
      ];
    } else if (sheet === 'farm_custody') {
      columns = [
        { title: '#Hop', key: 'hop_sequence' },
        { title: 'From Stakeholder', key: 'from_stakeholder' },
        { title: 'To Stakeholder', key: 'to_stakeholder' },
        { title: 'Location', key: 'location_name' },
        { title: 'Custody Doc', key: 'custody_document' },
        { title: 'Vehicle', key: 'carrier_vehicle_id' },
        { title: 'Tx Hash', key: 'tx_hash', fmt: v => v ? String(v).slice(0, 16) + '...' : '-' }
      ];
    } else if (sheet === 'consumer_scans') {
      columns = [
        { title: '#Scan ID', key: 'id' },
        { title: 'Scanned GS1 Code', key: 'scanned_qr_code' },
        { title: 'Channel', key: 'scan_channel' },
        { title: 'Location', key: 'consumer_location' },
        { title: 'Provenance Verified', key: 'provenance_verified', render: () => `<span class="excel-badge-ok">VERIFIED ✓</span>` },
        { title: 'Farmer Tip', key: 'fair_trade_farmer_tip', fmt: v => `₹${v}` }
      ];
    } else {
      // Legacy fertilizer
      columns = [
        { title: 'Batch ID', key: 'id' },
        { title: 'Lot Number', key: 'batch_number' },
        { title: 'Formulation', key: 'formulation' },
        { title: 'Total MT', key: 'total_weight_mt' },
        { title: 'Manufacturer', key: 'manufacturer_name' }
      ];
    }

    const trHead = document.createElement('tr');
    columns.forEach(c => {
      const th = document.createElement('th');
      th.textContent = c.title;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);

    if (rows.length === 0) {
      const trEmpty = document.createElement('tr');
      const tdEmpty = document.createElement('td');
      tdEmpty.colSpan = columns.length;
      tdEmpty.style.textAlign = 'center';
      tdEmpty.style.padding = '24px';
      tdEmpty.style.color = '#94a3b8';
      tdEmpty.textContent = q ? `No records matching "${q}" found.` : 'No records available in this table.';
      trEmpty.appendChild(tdEmpty);
      tbody.appendChild(trEmpty);
      return;
    }

    rows.forEach(r => {
      const tr = document.createElement('tr');
      columns.forEach(c => {
        const td = document.createElement('td');
        if (c.render) {
          td.innerHTML = c.render(r);
        } else {
          const raw = r[c.key];
          td.textContent = c.fmt ? c.fmt(raw) : (raw != null ? raw : '-');
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  async function downloadFullExcelWorkbook() {
    sfx.beep(750, 0.08);
    const statusMsg = $('#excel-status-msg');
    if (statusMsg) statusMsg.textContent = '⏳ Preparing multi-sheet Excel export...';

    if (!excelState.data) {
      try {
        const res = await fetch('/api/export/all');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) excelState.data = json.data;
        }
      } catch (e) {}
    }

    const data = excelState.data || getFallbackExcelData();
    const dateStr = new Date().toISOString().slice(0, 10);
    const fileName = `KisanTrace_FarmToFork_Export_${dateStr}.xlsx`;

    if (typeof window !== 'undefined' && window.XLSX) {
      try {
        const wb = window.XLSX.utils.book_new();

        if (data.clicks && data.clicks.length > 0) {
          window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(data.clicks), 'Single_Click_Audit_Log');
        }
        if (data.timeline && data.timeline.length > 0) {
          window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(data.timeline), 'Master_Event_Timeline');
        }
        if (data.agri_batches && data.agri_batches.length > 0) {
          window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(data.agri_batches), 'Farm_Produce_Batches');
        }
        if (data.cv_grading && data.cv_grading.length > 0) {
          window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(data.cv_grading), 'CV_Quality_Grading');
        }
        if (data.coldchain_telemetry && data.coldchain_telemetry.length > 0) {
          window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(data.coldchain_telemetry), 'ColdChain_IoT_Telemetry');
        }
        if (data.farm_custody && data.farm_custody.length > 0) {
          window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(data.farm_custody), 'Farm_Custody_Handovers');
        }
        if (data.consumer_scans && data.consumer_scans.length > 0) {
          window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(data.consumer_scans), 'Consumer_Fork_Scans');
        }

        window.XLSX.writeFile(wb, fileName);
        sfx.celebrate();
        if (statusMsg) statusMsg.textContent = `✅ Successfully exported multi-sheet workbook: ${fileName}`;
        return;
      } catch (err) {
        console.warn('[Excel Export] SheetJS export fallback:', err.message);
      }
    }

    // Server Fallback
    const link = document.createElement('a');
    link.href = '/api/export/excel';
    link.download = `KisanTrace_FarmToFork_Export_${dateStr}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    sfx.celebrate();
  }

  // --- Computer Vision Live Canvas Simulation ---
  function drawCvSample(sampleKey) {
    const cvCanvas = $('#cv-canvas');
    if (!cvCanvas || !cvCanvas.getContext) return;
    const ctx = cvCanvas.getContext('2d');
    const w = cvCanvas.width;
    const h = cvCanvas.height;

    ctx.clearRect(0, 0, w, h);

    // Draw dark cleanroom background
    ctx.fillStyle = '#050b14';
    ctx.fillRect(0, 0, w, h);

    // Draw conveyor belt lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    for (let y = 30; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const cx = w / 2;
    const cy = h / 2;

    if (sampleKey === 'tomato-export') {
      // Draw Vine Tomato
      const grad = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, 70);
      grad.addColorStop(0, '#f87171');
      grad.addColorStop(0.6, '#dc2626');
      grad.addColorStop(1, '#991b1b');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.fill();

      // Green stem
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(cx, cy - 65, 12, 0, Math.PI * 2);
      ctx.fill();

      $('#cv-tag-name').textContent = 'Heritage Tomato';
      $('#cv-tag-conf').textContent = '98.9%';
      $('#cv-tag-caliber').textContent = '68.0 mm';
      $('#cv-tag-ripeness').textContent = '94.0% (Ruby Red)';
      $('#cv-tag-defect').textContent = '0.0% (Clean)';
      $('#cv-val-grade').textContent = 'Grade A Export';
      $('#cv-val-caliber').textContent = '68.0 mm (Grade A Std)';
      $('#cv-val-weight').textContent = '195 grams';
      $('#cv-val-brix').textContent = '6.4° Brix (Sweet Acidic)';
      $('#cv-val-color').textContent = '94.0% Crimson Red';
      $('#cv-val-defect').textContent = '0.0% (Zero Blemish)';
      $('#cv-badge-grade').textContent = '🌟 GRADE A EXPORT CERTIFIED';
    } else if (sampleKey === 'mango-blemish') {
      // Draw Blemished Mango
      const grad = ctx.createRadialGradient(cx - 25, cy - 25, 15, cx, cy, 75);
      grad.addColorStop(0, '#fde047');
      grad.addColorStop(0.7, '#eab308');
      grad.addColorStop(1, '#ca8a04');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 78, 62, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Minor surface scratch mark
      ctx.strokeStyle = '#713f12';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy + 10);
      ctx.lineTo(cx + 15, cy + 22);
      ctx.stroke();

      $('#cv-tag-name').textContent = 'Alphonso Mango';
      $('#cv-tag-conf').textContent = '97.6%';
      $('#cv-tag-caliber').textContent = '68.2 mm';
      $('#cv-tag-ripeness').textContent = '82.0% (Ripe)';
      $('#cv-tag-defect').textContent = '0.4% (Minor Scratch)';
      $('#cv-val-grade').textContent = 'Grade B Domestic';
      $('#cv-val-caliber').textContent = '68.2 mm (Domestic Market)';
      $('#cv-val-weight').textContent = '242 grams';
      $('#cv-val-brix').textContent = '18.1° Brix';
      $('#cv-val-color').textContent = '82.0% Saffron Gold';
      $('#cv-val-defect').textContent = '0.4% Non-punctured scratch';
      $('#cv-badge-grade').textContent = '📦 GRADE B DOMESTIC CERTIFIED';
    } else {
      // Default: Grade A+ Export Alphonso Mango
      const grad = ctx.createRadialGradient(cx - 30, cy - 30, 20, cx, cy, 80);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.4, '#f59e0b');
      grad.addColorStop(0.85, '#d97706');
      grad.addColorStop(1, '#b45309');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 85, 66, 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Glossy specular highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.ellipse(cx - 30, cy - 20, 22, 10, -0.4, 0, Math.PI * 2);
      ctx.fill();

      $('#cv-tag-name').textContent = 'Alphonso Mango';
      $('#cv-tag-conf').textContent = '99.4%';
      $('#cv-tag-caliber').textContent = '72.4 mm';
      $('#cv-tag-ripeness').textContent = '88.2% (Golden Saffron)';
      $('#cv-tag-defect').textContent = '0.0% (Clean Surface)';
      $('#cv-val-grade').textContent = 'Grade A+ Export';
      $('#cv-val-caliber').textContent = '72.4 mm (>70mm Export Std)';
      $('#cv-val-weight').textContent = '265 grams';
      $('#cv-val-brix').textContent = '19.2° Brix (Sweetest Quality)';
      $('#cv-val-color').textContent = '88.2% Saffron Gold';
      $('#cv-val-defect').textContent = '0.0% (APEDA Compliant)';
      $('#cv-badge-grade').textContent = '🌟 GRADE A+ EXPORT CERTIFIED';
    }
  }

  // --- Dynamic Procedural QR Generator ---
  function drawForkQr() {
    const canvas = $('#fork-qr-canvas');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#0f172a';
    const n = 21;
    const cellSize = w / n;

    // Corner Finder Patterns
    const drawFinder = (rx, ry) => {
      ctx.fillRect(rx * cellSize, ry * cellSize, 7 * cellSize, 7 * cellSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect((rx + 1) * cellSize, (ry + 1) * cellSize, 5 * cellSize, 5 * cellSize);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect((rx + 2) * cellSize, (ry + 2) * cellSize, 3 * cellSize, 3 * cellSize);
    };
    drawFinder(1, 1);
    drawFinder(13, 1);
    drawFinder(1, 13);

    // Procedural Data Dots
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if ((r < 8 && c < 8) || (r < 8 && c > 12) || (r > 12 && c < 8)) continue;
        if ((r * 7 + c * 13 + 5) % 3 === 0) {
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  // --- Step Physics & Progression ---
  function go(i) {
    step = Math.max(0, Math.min(7, i));
    const s = S[step];
    rd = {};
    rej = -1;
    crate.rotation.z = 0;
    sfx.step();

    // Move produce crate position towards target station
    const targetX = X[Math.min(step, X.length - 1)];
    cp.set(targetX, 0.4, 0);

    $('#sn').textContent = (step + 1) + '/8';
    $('#t').textContent = currentLang === 'en' ? s.en : s.hi;
    $('#hi').textContent = currentLang === 'en' ? s.hi : s.en;
    $('#tx').textContent = s.tx;

    const fill = (el, a) => {
      if (!el) return;
      el.innerHTML = '';
      a.forEach(x => {
        const li = document.createElement('li');
        li.textContent = x;
        el.appendChild(li);
      });
    };
    fill($('#st'), s.st);
    fill($('#ac'), s.ac);

    if ($('#prev')) $('#prev').disabled = step === 0;
    if ($('#next')) $('#next').textContent = step === 7 ? (currentLang === 'en' ? 'Restart' : 'पुनः प्रारंभ') : (currentLang === 'en' ? 'Next ›' : 'अगला ›');

    updateUiReadings();

    if (step === 7) {
      setTimeout(() => {
        sfx.celebrate();
        if (typeof window !== 'undefined' && window.confetti) {
          window.confetti({ particleCount: 80, spread: 85, origin: { y: 0.6 } });
        }
      }, 700);
    }
  }

  function updateUiReadings() {
    const r = $('#rdg');
    if (!r) return;
    const curTemp = parseFloat($('#T') ? $('#T').value : 12.8) || 12.8;
    const curHum = parseFloat($('#H') ? $('#H').value : 90.0) || 90.0;
    const isColdBreach = curTemp > COLD_MAX || curHum < HUM_MIN || rej >= 0;

    r.className = isColdBreach ? 'bad' : 'ok';
    r.textContent = `${new Date().toLocaleTimeString('en-GB')} · ${GPS[Math.min(step, GPS.length - 1)]} · ${curTemp.toFixed(1)} °C · ${Math.round(curHum)}% RH · Ethylene: 0.04 ppm — ${isColdBreach ? 'COLD-CHAIN BREACH (>16.0°C). Consignment Quarantined!' : 'Within Cold Chain Envelope (12-14°C) ✓'}`;

    if ($('#Tv')) $('#Tv').textContent = curTemp.toFixed(1) + ' °C';
    if ($('#Hv')) $('#Hv').textContent = curHum + ' %';
    if ($('#reverse-status-msg')) {
      if (isColdBreach) {
        $('#reverse-status-msg').textContent = 'CRITICAL: Cold-Chain SLA Breached (>16°C). Automated Recall Triggered ✗';
        $('#reverse-status-msg').style.color = '#ef4444';
      } else {
        $('#reverse-status-msg').textContent = 'Status: Cold-Chain Preserved (12.8°C) ✓';
        $('#reverse-status-msg').style.color = '#a7f3d0';
      }
    }
  }

  function triggerColdBreachManual() {
    sfx.coldBreach();
    rej = step;
    if ($('#T')) $('#T').value = 18.5;
    updateUiReadings();
    trackClick('COLD_CHAIN_BREACH_TRIGGER', 'Manual Cold Breach Simulation', { temp: 18.5, reason: 'Temperature breach >16.0°C' });
  }

  // --- Details Modal Table Population ---
  function populateDetailsTable() {
    const tbody = $('#details-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const curTemp = parseFloat($('#T') ? $('#T').value : 12.8) || 12.8;
    const curHum = parseFloat($('#H') ? $('#H').value : 90.0) || 90.0;
    const nowTime = new Date().toLocaleTimeString('en-GB');

    STATIONS.forEach((stn, idx) => {
      const isBreached = curTemp > COLD_MAX && idx >= 3;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight:700; color:#ffffff;">${stn.name}</td>
        <td style="font-family:var(--mono); color:#38bdf8;">${stn.gps}</td>
        <td style="font-family:var(--mono); color:#94a3b8;">${nowTime}</td>
        <td style="font-family:var(--mono); color:${isBreached ? '#ef4444' : '#6ee7b7'}; font-weight:700;">
          ${(idx >= 3 ? curTemp : stn.temp).toFixed(1)} °C / ${(idx >= 3 ? curHum : stn.hum).toFixed(0)}%
        </td>
        <td><span style="font-family:var(--mono); color:#c4b5fd; font-size:11px;">4-Pack Clamshell</span></td>
        <td style="font-family:var(--mono); font-size:10.5px;">${idx === 2 ? 'YOLOv8: Grade A+ 72.4mm' : (idx === 0 ? 'NPOP/NAB/0019/2026' : '0xqc994...passed')}</td>
        <td><span class="tag-badge ${isBreached ? 'tag-bad' : 'tag-ok'}">${isBreached ? 'COLD BREACH' : 'COMPLIANT ✓'}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // --- Modal Navigation Tabs ---
  function switchModalTab(tab) {
    const tTel = $('#tab-btn-telemetry');
    const tDet = $('#tab-btn-determinants');
    const tTur = $('#tab-btn-turso');
    const tExc = $('#tab-btn-excel');
    const vTel = $('#view-telemetry');
    const vDet = $('#view-determinants');
    const vTur = $('#view-turso');
    const vExc = $('#view-excel');

    [tTel, tDet, tTur, tExc].forEach(b => { if (b) b.classList.remove('active'); });
    if (vTel) vTel.style.display = 'none';
    if (vDet) vDet.style.display = 'none';
    if (vTur) vTur.style.display = 'none';
    if (vExc) vExc.style.display = 'none';

    if (tab === 'telemetry') {
      if (tTel) tTel.classList.add('active');
      if (vTel) vTel.style.display = 'block';
      populateDetailsTable();
    } else if (tab === 'determinants') {
      if (tDet) tDet.classList.add('active');
      if (vDet) vDet.style.display = 'block';
    } else if (tab === 'turso') {
      if (tTur) tTur.classList.add('active');
      if (vTur) vTur.style.display = 'block';
      refreshTursoStatus();
    } else if (tab === 'excel') {
      if (tExc) tExc.classList.add('active');
      if (vExc) vExc.style.display = 'block';
      loadExcelDataHub();
    }
  }

  async function refreshTursoStatus() {
    const bannerStatus = $('#turso-banner-status');
    const pulseDot = $('#turso-pulse-dot');
    if (bannerStatus) bannerStatus.textContent = 'Querying database status...';

    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('API offline');
      const data = await res.json();
      const db = data.database || {};
      const counts = db.tableCounts || {};

      if (bannerStatus) {
        if (db.cloudConnected) {
          bannerStatus.textContent = '🟢 Connected to Turso Cloud (' + db.endpoint + ')';
          bannerStatus.style.color = '#38bdf8';
          if (pulseDot) pulseDot.className = 'turso-status-dot pulse cloud';
        } else {
          bannerStatus.textContent = '🟡 Local libSQL Edge Engine (' + db.endpoint + ')';
          bannerStatus.style.color = '#f59e0b';
          if (pulseDot) pulseDot.className = 'turso-status-dot pulse local';
        }
      }

      if ($('#stat-cnt-agri-batches')) $('#stat-cnt-agri-batches').textContent = counts.agri_produce_batches ?? 1;
      if ($('#stat-cnt-cv-grading')) $('#stat-cnt-cv-grading').textContent = counts.cv_quality_grading_logs ?? 3;
      if ($('#stat-cnt-coldchain')) $('#stat-cnt-coldchain').textContent = counts.coldchain_telemetry_logs ?? 4;
      if ($('#stat-cnt-custody')) $('#stat-cnt-custody').textContent = counts.farm_custody_hops ?? 4;
      if ($('#stat-cnt-consumer-scans')) $('#stat-cnt-consumer-scans').textContent = counts.consumer_verifications ?? 1;
      if ($('#stat-cnt-clicks')) $('#stat-cnt-clicks').textContent = counts.click_audit_logs ?? 0;
    } catch (e) {
      if (bannerStatus) {
        bannerStatus.textContent = '⚪ Standalone / Offline Client Mode';
        bannerStatus.style.color = '#94a3b8';
      }
    }
  }

  // --- Periodic Background Telemetry Stream (Every 12 seconds) ---
  let telemetryInterval = null;
  function startPeriodicTelemetryStream() {
    if (telemetryInterval) clearInterval(telemetryInterval);
    telemetryInterval = setInterval(async () => {
      try {
        const curStep = typeof step === 'number' ? step : 0;
        const station = STATIONS[Math.min(curStep, STATIONS.length - 1)];
        const curTemp = parseFloat($('#T') ? $('#T').value : 12.8) || 12.8;
        const curHum = parseFloat($('#H') ? $('#H').value : 90.0) || 90.0;

        // Apply realistic ambient micro-drift
        const driftT = +(curTemp + (Math.random() - 0.5) * 0.4).toFixed(1);
        const driftH = +Math.max(40, Math.min(100, curHum + (Math.random() - 0.5) * 1.5)).toFixed(1);

        fetch('/api/agri/coldchain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            batch_id: 'BATCH-AGRI-2026-F2F-091',
            stage_node: station.name,
            vehicle_id: 'MH-08-AG-9941',
            gps: station.gps,
            temperature: driftT,
            humidity: driftH,
            ethylene: 0.04,
            is_breached: driftT > COLD_MAX ? 1 : 0,
            note: driftT > COLD_MAX ? 'Cold-Chain SLA Breached' : 'Cold-Chain Preserved (Optimal 12-14°C)'
          })
        }).catch(() => {});

        // If Excel Hub modal is open, refresh view silently
        if ($('#modal-details') && $('#modal-details').classList.contains('open') && excelState.data) {
          const res = await fetch('/api/export/all');
          if (res.ok) {
            const json = await res.json();
            if (json.success && json.data) {
              excelState.data = json.data;
              renderExcelCounts();
              renderExcelGridTable();
            }
          }
        }
      } catch (err) {}
    }, 12000);
  }
  startPeriodicTelemetryStream();

  // --- Event Handlers & Button Wiring ---
  // Tour navigation
  if ($('#btn-start-run')) {
    $('#btn-start-run').onclick = () => {
      trackClick('TOUR_START', 'Start Spatial Tour');
      sfx.beep(550, 0.08);
      if (auto) {
        clearInterval(auto);
        auto = null;
        $('#btn-start-run').textContent = 'Start Tour';
      } else {
        $('#btn-start-run').textContent = 'Pause Tour';
        auto = setInterval(() => {
          if (step >= 7) {
            clearInterval(auto);
            auto = null;
            $('#btn-start-run').textContent = 'Start Tour';
          } else {
            go(step + 1);
          }
        }, 7500);
      }
    };
  }

  if ($('#btn-reset-run')) {
    $('#btn-reset-run').onclick = () => {
      if (auto) { clearInterval(auto); auto = null; }
      if ($('#btn-start-run')) $('#btn-start-run').textContent = 'Start Tour';
      if ($('#T')) $('#T').value = 12.8;
      if ($('#H')) $('#H').value = 90;
      rej = -1;
      go(0);
      trackClick('TOUR_RESET', 'Reset Spatial Tour');
    };
  }

  if ($('#next')) {
    $('#next').onclick = () => {
      if (auto) { clearInterval(auto); auto = null; }
      const nextStep = step === 7 ? 0 : step + 1;
      go(nextStep);
      trackClick('TOUR_NEXT', 'Next Station Button', { targetStep: nextStep });
    };
  }

  if ($('#prev')) {
    $('#prev').onclick = () => {
      if (auto) { clearInterval(auto); auto = null; }
      const prevStep = Math.max(0, step - 1);
      go(prevStep);
      trackClick('TOUR_PREV', 'Previous Station Button', { targetStep: prevStep });
    };
  }

  if ($('#fold')) {
    $('#fold').onclick = () => {
      const c = $('#card');
      if (c) {
        c.classList.toggle('min');
        $('#fold').textContent = c.classList.contains('min') ? '▴' : '▾';
      }
      sfx.beep(500, 0.05);
      trackClick('HUD_TOGGLE', 'Collapse/Expand Narrative HUD');
    };
  }

  // Packaging hierarchy buttons
  document.querySelectorAll('[data-pack]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('[data-pack]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateProducePackaging(btn.dataset.pack);
      trackClick('PACKAGING_SELECT', `Selected Level: ${btn.dataset.pack}`, { level: btn.dataset.pack });
    };
  });

  // Reefer Temperature and Humidity Sliders
  ['T', 'H'].forEach(k => {
    const el = $('#' + k);
    if (el) {
      el.addEventListener('input', () => {
        updateUiReadings();
        populateDetailsTable();
        const t = parseFloat($('#T').value);
        if (t > COLD_MAX) {
          triggerColdBreachManual();
        }
      });
      el.addEventListener('change', () => {
        trackClick('REEFER_SLIDER_CHANGE', `Slider ${k} set to ${el.value}`, { slider: k, value: el.value });
      });
    }
  });

  if ($('#btn-reverse-trigger')) {
    $('#btn-reverse-trigger').onclick = triggerColdBreachManual;
  }

  // Computer Vision Scanner Modal Controls
  const modalCv = $('#modal-cv-scanner');
  if ($('#btn-open-cv-scanner')) {
    $('#btn-open-cv-scanner').onclick = () => {
      if (modalCv) modalCv.classList.add('open');
      drawCvSample('mango-export');
      sfx.aiScan();
      trackClick('MODAL_OPEN_CV_SCANNER', 'Open Computer Vision Grading Portal');
    };
  }
  if ($('#btn-close-cv')) {
    $('#btn-close-cv').onclick = () => {
      if (modalCv) modalCv.classList.remove('open');
    };
  }
  if (modalCv) {
    modalCv.onclick = e => { if (e.target === modalCv) modalCv.classList.remove('open'); };
  }

  document.querySelectorAll('.cv-sample-btn').forEach(b => {
    b.onclick = () => {
      document.querySelectorAll('.cv-sample-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      drawCvSample(b.dataset.sample);
      sfx.aiScan();
      trackClick('CV_SAMPLE_SWITCH', `Tested Sample: ${b.dataset.sample}`, { sample: b.dataset.sample });
    };
  });

  if ($('#btn-cv-record-log')) {
    $('#btn-cv-record-log').onclick = async () => {
      sfx.celebrate();
      const activeSample = $('.cv-sample-btn.active');
      const sampleKey = activeSample ? activeSample.dataset.sample : 'mango-export';
      const sampleData = {
        batch_id: 'BATCH-AGRI-2026-F2F-091',
        sample_item_code: 'FRUIT-ALPH-091-' + Math.floor(Math.random() * 9000 + 1000),
        produce_type: sampleKey === 'tomato-export' ? 'Heritage Tomato' : 'Alphonso Mango',
        detection_confidence: sampleKey === 'mango-blemish' ? 0.976 : 0.994,
        caliber_diameter_mm: sampleKey === 'tomato-export' ? 68.0 : (sampleKey === 'mango-blemish' ? 68.2 : 72.4),
        estimated_weight_g: sampleKey === 'tomato-export' ? 195.0 : (sampleKey === 'mango-blemish' ? 242.0 : 265.0),
        ripeness_color_pct: sampleKey === 'tomato-export' ? 94.0 : (sampleKey === 'mango-blemish' ? 82.0 : 88.2),
        sugar_brix_rating: sampleKey === 'tomato-export' ? 6.4 : (sampleKey === 'mango-blemish' ? 18.1 : 19.2),
        defect_count: sampleKey === 'mango-blemish' ? 1 : 0,
        defect_type: sampleKey === 'mango-blemish' ? 'Minor scratch' : 'None / Zero Defects',
        defect_area_pct: sampleKey === 'mango-blemish' ? 0.4 : 0.0,
        mrl_pesticide_ppm: 0.002,
        assigned_grade: sampleKey === 'mango-blemish' ? 'GRADE_B_DOMESTIC' : 'GRADE_A_PLUS_EXPORT',
        quality_cert_hash: '0xqc' + Math.random().toString(16).slice(2, 18)
      };

      try {
        await fetch('/api/agri/cv-grading', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sampleData)
        });
      } catch (e) {}

      trackClick('CV_COMMIT_BLOCKCHAIN', 'Committed AI Grade to Blockchain', sampleData);
      alert('✅ AI Quality Grade Committed to Blockchain & Turso Database: ' + sampleData.assigned_grade);
    };
  }

  // Consumer Fork Verification Modal Controls
  const modalFork = $('#modal-consumer-fork');
  if ($('#btn-open-fork-modal')) {
    $('#btn-open-fork-modal').onclick = () => {
      if (modalFork) modalFork.classList.add('open');
      drawForkQr();
      sfx.beep(640, 0.08);
      trackClick('MODAL_OPEN_FORK_PORTAL', 'Open Consumer Fork Verification Portal');
    };
  }
  if ($('#btn-close-fork')) {
    $('#btn-close-fork').onclick = () => {
      if (modalFork) modalFork.classList.remove('open');
    };
  }
  if (modalFork) {
    modalFork.onclick = e => { if (e.target === modalFork) modalFork.classList.remove('open'); };
  }

  // Details Modal and Sub-Tabs
  if ($('#btn-open-details')) {
    $('#btn-open-details').onclick = () => {
      switchModalTab('telemetry');
      if ($('#modal-details')) $('#modal-details').classList.add('open');
      trackClick('MODAL_OPEN_DETAILS', 'All Details & Telemetry Modal');
    };
  }
  if ($('#btn-open-determinants')) {
    $('#btn-open-determinants').onclick = () => {
      switchModalTab('determinants');
      if ($('#modal-details')) $('#modal-details').classList.add('open');
      trackClick('MODAL_OPEN_DETERMINANTS', 'Core Determinants Modal');
    };
  }
  if ($('#btn-open-turso')) {
    $('#btn-open-turso').onclick = () => {
      switchModalTab('turso');
      if ($('#modal-details')) $('#modal-details').classList.add('open');
      trackClick('MODAL_OPEN_TURSO', 'Turso DB Manager Modal');
    };
  }
  if ($('#btn-open-excel')) {
    $('#btn-open-excel').onclick = () => {
      switchModalTab('excel');
      if ($('#modal-details')) $('#modal-details').classList.add('open');
      trackClick('MODAL_OPEN_EXCEL_HUB', 'Excel Database Hub Modal');
    };
  }

  if ($('#btn-close-details')) {
    $('#btn-close-details').onclick = () => {
      if ($('#modal-details')) $('#modal-details').classList.remove('open');
    };
  }

  const modalDetails = $('#modal-details');
  if (modalDetails) {
    modalDetails.onclick = e => { if (e.target === modalDetails) modalDetails.classList.remove('open'); };
  }

  if ($('#tab-btn-telemetry')) $('#tab-btn-telemetry').onclick = () => switchModalTab('telemetry');
  if ($('#tab-btn-determinants')) $('#tab-btn-determinants').onclick = () => switchModalTab('determinants');
  if ($('#tab-btn-turso')) $('#tab-btn-turso').onclick = () => switchModalTab('turso');
  if ($('#tab-btn-excel')) $('#tab-btn-excel').onclick = () => switchModalTab('excel');

  // Excel Toolbar Actions
  if ($('#btn-quick-excel')) {
    $('#btn-quick-excel').onclick = () => {
      trackClick('QUICK_EXCEL_DOWNLOAD', '1-Click Top Bar Excel Download');
      downloadFullExcelWorkbook();
    };
  }

  if ($('#btn-download-excel-full')) {
    $('#btn-download-excel-full').onclick = () => {
      trackClick('MODAL_EXCEL_DOWNLOAD', 'Excel Hub Full Workbook Download');
      downloadFullExcelWorkbook();
    };
  }

  if ($('#btn-refresh-excel-data')) {
    $('#btn-refresh-excel-data').onclick = () => {
      sfx.beep(600, 0.05);
      loadExcelDataHub(true);
      trackClick('EXCEL_REFRESH', 'Manual Refresh from Turso DB');
    };
  }

  if ($('#excel-search-input')) {
    $('#excel-search-input').oninput = e => {
      excelState.searchQuery = e.target.value;
      renderExcelGridTable();
    };
  }

  document.querySelectorAll('.excel-sub-tab').forEach(b => {
    b.onclick = () => {
      document.querySelectorAll('.excel-sub-tab').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      excelState.activeSheet = b.dataset.sheet;
      sfx.step();
      renderExcelGridTable();
      trackClick('EXCEL_SHEET_SWITCH', `Switched to Sheet: ${b.dataset.sheet}`, { sheet: b.dataset.sheet });
    };
  });

  // Turso Connection & Sync
  if ($('#btn-turso-connect')) {
    $('#btn-turso-connect').onclick = async () => {
      const urlInput = $('#turso-url-input');
      const tokenInput = $('#turso-token-input');
      const adminKeyInput = $('#turso-admin-key-input');
      const msgBox = $('#turso-msg');
      const dbUrl = urlInput ? urlInput.value.trim() : '';
      const authToken = tokenInput ? tokenInput.value.trim() : '';
      const adminKey = adminKeyInput ? adminKeyInput.value.trim() : 'kisantrace-admin-2026';

      if (msgBox) {
        msgBox.style.display = 'block';
        msgBox.className = 'turso-msg-box';
        msgBox.textContent = '⏳ Connecting to Turso database and applying schema tables...';
      }
      sfx.beep(520, 0.05);

      try {
        const res = await fetch('/api/turso/connect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
          body: JSON.stringify({ url: dbUrl || 'file:kisan_trace.db', authToken, adminKey })
        });
        const data = await res.json();
        if (data.success) {
          if (msgBox) {
            msgBox.className = 'turso-msg-box ok';
            msgBox.innerHTML = '✅ <strong>Connected &amp; Updated!</strong> All tables verified and seeded with blockchain provenance records.';
          }
          sfx.celebrate();
          refreshTursoStatus();
        } else {
          if (msgBox) {
            msgBox.className = 'turso-msg-box err';
            msgBox.textContent = '❌ Failed to connect: ' + (data.error || 'Unknown error');
          }
        }
      } catch (err) {
        if (msgBox) {
          msgBox.className = 'turso-msg-box err';
          msgBox.textContent = '❌ Error reaching Turso server endpoint: ' + err.message;
        }
      }
    };
  }

  if ($('#btn-turso-sync')) {
    $('#btn-turso-sync').onclick = async () => {
      const adminKeyInput = $('#turso-admin-key-input');
      const adminKey = adminKeyInput ? adminKeyInput.value.trim() : 'kisantrace-admin-2026';
      const msgBox = $('#turso-msg');
      if (msgBox) {
        msgBox.style.display = 'block';
        msgBox.className = 'turso-msg-box';
        msgBox.textContent = '⏳ Re-syncing all tables in Turso...';
      }
      try {
        const res = await fetch('/api/seed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
          body: JSON.stringify({ adminKey })
        });
        const data = await res.json();
        if (data.success) {
          if (msgBox) {
            msgBox.className = 'turso-msg-box ok';
            msgBox.innerHTML = '✅ <strong>Sync Complete!</strong> Records updated in Turso database.';
          }
          sfx.step();
          refreshTursoStatus();
        }
      } catch (e) {}
    };
  }

  if ($('#btn-turso-push-current')) {
    $('#btn-turso-push-current').onclick = () => {
      const curTemp = parseFloat($('#T') ? $('#T').value : 12.8) || 12.8;
      const curHum = parseFloat($('#H') ? $('#H').value : 90.0) || 90.0;
      fetch('/api/agri/coldchain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batch_id: 'BATCH-AGRI-2026-F2F-091',
          stage_node: NM[step] || 'Reefer Truck',
          vehicle_id: 'MH-08-AG-9941',
          gps: GPS[step] || '18.5204°N 73.8567°E',
          temperature: curTemp,
          humidity: curHum,
          ethylene: 0.04,
          is_breached: curTemp > COLD_MAX ? 1 : 0,
          note: 'Pushed from Spatial UI Controls'
        })
      }).catch(() => {});
      sfx.beep(640, 0.08);
      alert(`✅ Pushed cold-chain telemetry: ${curTemp.toFixed(1)}°C, ${curHum}% RH at ${NM[step]}`);
    };
  }

  if ($('#btn-refresh-turso-status')) {
    $('#btn-refresh-turso-status').onclick = () => {
      refreshTursoStatus();
      sfx.beep(550, 0.05);
    };
  }

  // Camera Spatial Perspectives
  document.querySelectorAll('[data-v]').forEach(b => {
    b.onclick = () => {
      mode = b.dataset.v;
      document.querySelectorAll('[data-v]').forEach(x => {
        x.classList.toggle('active', x === b);
        x.setAttribute('aria-pressed', x === b);
      });
      sfx.beep(700, 0.06);
      trackClick('CAMERA_PERSPECTIVE_SWITCH', `Perspective: ${mode}`, { mode });

      if (mode === 'farm') go(0);
      else if (mode === 'mandi') go(1);
      else if (mode === 'lab') go(3);
      else if (mode === 'transit') go(5);
      else if (mode === 'fork') go(7);
    };
  });

  if ($('#soundBtn')) {
    $('#soundBtn').onclick = e => {
      sfx.enabled = !sfx.enabled;
      e.currentTarget.setAttribute('aria-pressed', sfx.enabled);
      e.currentTarget.textContent = sfx.enabled ? '🔊 Sound' : '🔇 Muted';
      if (sfx.enabled) sfx.beep(600, 0.06);
      trackClick('SOUND_TOGGLE', sfx.enabled ? 'Sound On' : 'Sound Off');
    };
  }

  if ($('#langBtn')) {
    $('#langBtn').onclick = () => {
      currentLang = currentLang === 'en' ? 'hi' : 'en';
      $('#langBtn').textContent = currentLang === 'en' ? 'हिन्दी' : 'English';
      go(step);
      sfx.beep(520, 0.06);
      trackClick('LANG_TOGGLE', `Language: ${currentLang}`);
    };
  }

  if ($('#dataBtn')) {
    $('#dataBtn').onclick = e => {
      dataOn = !dataOn;
      e.currentTarget.setAttribute('aria-pressed', dataOn);
      lines.forEach(l => l.visible = dataOn);
      sfx.beep(600, 0.06);
      trackClick('DATA_LINES_TOGGLE', dataOn ? 'Data Lines On' : 'Data Lines Off');
    };
  }

  // --- Spatial Camera Orbiting & Drag Controls ---
  const o = { th: 0.15, ph: 1.05 };
  const cur = new V(-25, 2, 0);
  let curR = 55;

  function size() {
    if (!cv || !cv.clientWidth) return;
    const w = cv.clientWidth, h = cv.clientHeight;
    if (R && R.setSize) R.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  }
  if (typeof addEventListener !== 'undefined') {
    addEventListener('resize', size);
  }

  const ptr = new Map();
  let downPos = { x: 0, y: 0 };
  let p0 = 0;

  if (cv && cv.addEventListener) {
    cv.addEventListener('pointerdown', e => {
      downPos = { x: e.clientX, y: e.clientY };
      if (cv.setPointerCapture) cv.setPointerCapture(e.pointerId);
      ptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (ptr.size === 2) {
        const [a, b] = [...ptr.values()];
        p0 = Math.hypot(a.x - b.x, a.y - b.y);
      }
    });

    cv.addEventListener('pointermove', e => {
      const p = ptr.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      p.x = e.clientX;
      p.y = e.clientY;

      if (ptr.size === 1) {
        o.th -= dx * 0.006;
        o.ph = Math.max(0.22, Math.min(1.48, o.ph - dy * 0.005));
      }
      if (ptr.size === 2) {
        const [a, b] = [...ptr.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (p0) zoom = Math.max(0.35, Math.min(1.8, zoom * p0 / d));
        p0 = d;
      }
    });

    const up = e => {
      ptr.delete(e.pointerId);
      if (Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) < 6) {
        handle3DCanvasClick(e);
      }
    };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);

    cv.addEventListener('wheel', e => {
      e.preventDefault();
      zoom = Math.max(0.35, Math.min(1.8, zoom * (1 + e.deltaY * 0.001)));
    }, { passive: false });
  }

  function handle3DCanvasClick(e) {
    if (typeof THREE === 'undefined' || !THREE.Raycaster || !THREE.Plane) return;
    const rect = cv.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const ray = new THREE.Raycaster();
    ray.setFromCamera({ x, y }, cam);

    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const targetPoint = new THREE.Vector3();
    const hit = ray.ray.intersectPlane(plane, targetPoint);

    if (hit) {
      let closestIdx = -1;
      let minDistance = 7.0;
      X.forEach((stX, idx) => {
        const d = Math.abs(targetPoint.x - stX);
        if (d < minDistance) {
          minDistance = d;
          closestIdx = idx;
        }
      });

      if (closestIdx !== -1) {
        go(closestIdx);
        sfx.beep(580, 0.08);
        trackClick('STATION_3D_CLICK', `3D Scene Click on Station #${closestIdx + 1}: ${NM[closestIdx]}`, {
          stationIndex: closestIdx,
          stationName: NM[closestIdx],
          gps: GPS[closestIdx]
        });
      }
    }
  }

  // --- Main Spatial Animation Loop ---
  let last = typeof performance !== 'undefined' ? performance.now() : Date.now();

  function tick(now) {
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(tick);
    }
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = now / 1000;

    // Smooth produce crate interpolation towards active station
    const targetStationX = X[Math.min(step, X.length - 1)];
    crate.position.x += (targetStationX - crate.position.x) * 0.08;

    // Laser optical scanner rotation at packhouse
    laserRing.rotation.z += dt * 3.5;

    // Truck wheel rotation during transit
    if (step >= 4 && truckGroup.children) {
      truckGroup.children.forEach(m => {
        if (m.geometry && m.geometry.type === 'CylinderGeometry') {
          m.rotation.z += dt * 4.0;
        }
      });
    }

    // Sky Blockchain Ledger slow ethereal rotation
    led.rotation.y += dt * 0.2;

    // Camera Interpolation based on Spatial Perspective
    const portrait = cv.clientWidth / cv.clientHeight < 0.9, k = 0.07;
    const targetCamX = S[step].v[0];
    const targetR = S[step].v[1] * zoom * (portrait ? 1.5 : 1);

    cur.x += (targetCamX - cur.x) * k;
    curR += (targetR - curR) * k;

    cam.position.set(
      cur.x + curR * Math.sin(o.ph) * Math.sin(o.th),
      2 + curR * Math.cos(o.ph),
      curR * Math.sin(o.ph) * Math.cos(o.th)
    );
    cam.lookAt(new V(cur.x, 2, 0));

    if (R && R.render) R.render(sc, cam);
  }

  // --- Bootstrap ---
  size();
  go(0);
  populateDetailsTable();
  drawForkQr();
  cam.position.set(-25, 30, 35);
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(tick);
  }
})();
