/**
 * ============================================================================
 * KISAN-TRACE 3D: Model 3 (Enhanced with Continuous Live-Updating Details)
 * Every node, timestamp, GPS, temperature, humidity, packet level, and
 * hash updates dynamically in real-time on every tick and user interaction.
 * ============================================================================
 */

(function () {
  "use strict";

  const $ = s => document.querySelector(s);
  const cv = $('#c');

  // --- Web Audio API Procedural Sound Engine ---
  class SoundFX {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
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
      this.beep(480, 0.08);
      setTimeout(() => this.beep(640, 0.1), 50);
    }

    alarm() {
      this.beep(880, 0.18, 'sawtooth');
      setTimeout(() => this.beep(440, 0.24, 'sawtooth'), 110);
    }

    celebrate() {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        setTimeout(() => this.beep(f, 0.25), i * 90);
      });
    }
  }

  const sfx = new SoundFX();

  // --- Three.js WebGL Setup ---
  let R;
  try {
    R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
  } catch (e) {
    $('#err').style.display = 'flex';
    return;
  }
  R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const V = THREE.Vector3;
  const sc = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 500);

  sc.add(new THREE.AmbientLight(0xffffff, 0.88));
  const sun = new THREE.DirectionalLight(0xfffaed, 0.7);
  sun.position.set(-15, 30, 20);
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
  const wheel = (g, x, z, r, w = 0.28) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, 16), mat(0x1b1b1b));
    m.rotation.x = Math.PI / 2;
    m.position.set(x, r, z);
    g.add(m);
    return m;
  };

  // --- Constants & Metadata (from PDF) ---
  const TC = 40.0; // Critical Temperature (°C)
  const HC = 85.0; // Critical Humidity (%)
  const OK_COLOR = '#1f8a4c';
  const BAD_COLOR = '#d23b3b';

  const NM = ['Manufacturer', 'Quality Lab', 'Central Warehouse', 'District Distributor', 'Retailer POS', 'Farmer', 'Transporter'];
  const GPS = ['26.45°N 80.33°E', '26.85°N 80.95°E', '26.80°N 81.02°E', '25.75°N 82.68°E', '25.45°N 82.80°E', '25.40°N 82.85°E', '26.30°N 81.80°E'];
  const X = [-25, -15, -5, 5, 15, 25]; // Station coordinates

  // --- 8 Steps (From Handwritten PDF) ---
  const S = [
    {
      en: '1 · Manufacturer & 3-level QR',
      hi: 'निर्माता व 3-स्तरीय क्यूआर',
      f: 0, t: 0, rd: 0, v: [-28, 30], note: '3 QR levels ✓',
      tx: 'Every 50 kg bag gets its own Bag QR. 50 bag hashes roll up into one Pallet QR, and 20 pallet hashes roll up into one Master QR / RFID, all with SHA-256. Scan one code and you can prove everything inside it. The three boards on the left show the three levels.',
      st: ['1 bag = Bag QR (50 kg)', '50 bags = Pallet QR (50 bag hashes)', '20 pallets = 1 Master QR / RFID', 'Manufacturing date & lot number', 'Factory GPS & SHA-256 timestamp'],
      ac: ['Register product batch on ledger', 'Generate bag, pallet & master QR', 'Mint immutable digital provenance']
    },
    {
      en: '2 · Quality Lab & certification',
      hi: 'गुणवत्ता प्रयोगशाला व डिजिटल प्रमाणपत्र',
      f: 0, t: 1, rd: 1, v: [-15, 24], note: 'QC certificate ✓',
      tx: 'Samples are tested in the lab and the digital QC certificate is attached to the batch. Nitrogen content (46.2%) and purity are confirmed. Temperature and humidity are checked. If a value goes over the limit, the batch is not released.',
      st: ['Longitude & latitude', 'Sample test result (N: 46.2% Pass)', 'QC Pass / Fail status', 'QC certificate hash', 'Condition: Temperature & humidity'],
      ac: ['Attach QC certificate to batch', 'Validate nutrient standards', 'Block release if QC fails']
    },
    {
      en: '3 · Central Warehouse & decision point',
      hi: 'केंद्रीय गोदाम व निर्णय बिंदु',
      f: 1, t: 2, rd: 2, v: [-1, 32], note: 'RFID logged ✓',
      tx: 'Warehouse men unload the pallet. RFID gates log stock received and inventory, and the Master QR container is checked. Yellow decision point: the batch is routed either to domestic Transporter or returned to Manufacturer if damaged.',
      st: ['Stock received & inventory level', 'RFID gate scans & timestamps', 'Condition: Temperature & humidity'],
      ac: ['Record custody transfer on ledger', 'Verify batch authenticity', 'Route to Transporter (domestic)']
    },
    {
      en: '4 · Transporter (domestic)',
      hi: 'परिवहन ट्रक व लाइव आईओटी टेलीमेट्री',
      f: 2, t: 3, rd: 6, v: [0, 30], note: 'GPS / IoT live ✓',
      tx: 'Pallets travel by GPS / IoT-enabled truck from warehouse to district distribution. The truck sensor continuously reports vehicle ID, real-time location, temperature and humidity on the transit corridor.',
      st: ['Vehicle ID & driver details', 'Transport date & time', 'GPS location (NH-19 Transit Corridor)', 'Quantity in transit (50 MT)'],
      ac: ['Record dispatch on ledger', 'Stream real-time location & conditions', 'Update arrival timestamp']
    },
    {
      en: '5 · District Distributor',
      hi: 'जिला वितरक व कस्टडी ट्रांसफर',
      f: 3, t: 3, rd: 3, v: [5, 24], note: 'Custody moved ✓',
      tx: 'Distributor scans pallet QR. If hash matches ledger, custody transfers and warehouse location is updated. Damaged goods go from distributor back to warehouse / manufacturer via Reverse flow (step 8).',
      st: ['Received batch ID', 'Quantity received (1,000 bags)', 'Date of receipt', 'Warehouse location'],
      ac: ['Verify batch authenticity', 'Record transfer to distributor', 'Update current location on ledger']
    },
    {
      en: '6 · Retailer POS — works offline',
      hi: 'खुदरा POS — ऑफ़लाइन-प्रथम वास्तुकला',
      f: 3, t: 4, rd: 4, v: [10, 26], note: 'Signed offline · synced ✓',
      tx: 'In a village with no signal the POS still works. It scans the QR, signs payload with timestamp and cryptographic nonce, keeps it in encrypted local ledger, prints local OTP receipt, and later syncs whole bundle to blockchain in one batch.',
      st: ['Received batch ID & quantity', 'Selling price & sale date', 'Farmer name / ID', 'Signed payload (time + nonce)'],
      ac: ['Confirm receipt from transporter', 'Update inventory', 'Record sale to farmer', 'Batch sync when online']
    },
    {
      en: '7 · Indian Farmer — verify & DBT subsidy',
      hi: 'भारतीय किसान — सत्यापन व ₹1500 डीबीटी',
      f: 4, t: 5, rd: 5, v: [20, 26], note: 'Verified · ₹1500 DBT ✓',
      tx: 'The farmer\'s tractor brings the bag home. The farmer verifies the bag through 3 channels: ① Smartphone (QR / web app), ② Feature phone (SMS or USSD *99#), ③ Retailer POS (Aadhaar biometrics). The ledger confirms authenticity and triggers DBT subsidy straight to farmer bank account!',
      st: ['Purchase date & quantity (50 kg bag)', 'Retailer details (PM Kisan Seva Kendra)', 'Batch ID', 'Full traceability history'],
      ac: ['Verify product authenticity', 'View complete supply chain', 'Confirm ownership', 'Trigger DBT subsidy straight to bank']
    },
    {
      en: '8 · Reverse flow — discard & throw back',
      hi: 'वापसी प्रवाह — तापमान सीमा उल्लंघन व स्वतः-वापसी',
      f: 3, t: 3, rd: 3, v: [-10, 48], force: 1,
      tx: 'Red lines show returns. A batch that fails QC is rejected back to factory / damaged goods go from distributor back to warehouse / any reading over 40 °C or 85 % humidity is discarded and thrown back to manufacturer! Each return is recorded on ledger, so a rejected batch can never be silently re-entered.',
      st: ['Reason: batch fail / damaged / over limit', 'Returned quantity (50 MT)', 'Return custody chain'],
      ac: ['Mark batch rejected or returned', 'Update inventory to quarantined', 'Alert all stakeholders']
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
  let currentPacketType = 'pallet';
  let flash = 0;
  let dataOn = true;
  let qa = 9;


  // --- World Ground & Roads ---
  B(sc, 108, 0.4, 44, 0x4f772d, 0, -0.4, -3);
  B(sc, 72, 0.35, 2.2, 0x475569, 0, 0, 1.6);
  for (let rx = -35; rx <= 35; rx += 3.5) {
    B(sc, 1.4, 0.37, 0.12, 0xfacc15, rx, 0, 1.6);
  }
  B(sc, 74, 0.05, 3.2, 0x334155, 0, 0, 4.2);

  // Street Lamp Posts
  [-30, -20, -10, 0, 10, 20, 30].forEach(lx => {
    C(sc, 0.05, 0.05, 2.2, 0x444444, lx, 0, 1.5);
    S_(sc, 0.22, 0xf1f5f9, lx, 2.3, 1.5);
  });

  // --- Red Return Flow Lines (PDF Point 8: "Red lines show returns") ---
  const redReturnLines = [];
  function createRedReturnLine(fromX, toX, height = 3.5) {
    const curve = new THREE.QuadraticBezierCurve3(
      new V(fromX, 1.0, 1.6),
      new V((fromX + toX) / 2, height, -1.0),
      new V(toX, 1.0, 1.6)
    );
    const points = curve.getPoints(30);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineDashedMaterial({
      color: 0xef4444,
      dashSize: 0.8,
      gapSize: 0.4,
      transparent: true,
      opacity: 0.75
    });
    const line = new THREE.Line(geo, lineMat);
    line.computeLineDistances();
    sc.add(line);
    redReturnLines.push(line);
    return line;
  }

  createRedReturnLine(5, -5, 5.0);   // Distributor to Warehouse
  createRedReturnLine(-5, -25, 7.0);  // Warehouse to Factory

  // --- Procedural QR Texture ---
  function qrTex(seed) {
    const n = 21, p = 7, c = document.createElement('canvas');
    c.width = c.height = n * p + 14;
    const x = c.getContext('2d');
    x.fillStyle = '#ffffff';
    x.fillRect(0, 0, c.width, c.height);
    x.fillStyle = '#0f172a';
    let s = seed * 7919 + 13;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const fi = (i < 7 || i >= 14) && (j < 7 || j >= 14) && !(i >= 14 && j >= 14);
        let on;
        if (fi) {
          const a = i < 7 ? i : i - 14, b = j < 7 ? j : j - 14;
          on = a === 0 || a === 6 || b === 0 || b === 6 || (a > 1 && a < 5 && b > 1 && b < 5);
        } else {
          s = (s * 9301 + 49297) % 233280;
          on = s / 233280 > 0.5;
        }
        if (on) x.fillRect(7 + j * p, 7 + i * p, p, p);
      }
    }
    return new THREE.CanvasTexture(c);
  }

  const qr = (w, seed, g, x, y, z) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w), new THREE.MeshBasicMaterial({ map: qrTex(seed), side: THREE.DoubleSide }));
    m.position.set(x, y, z);
    g.add(m);
    return m;
  };

  function tag(a, b, w, col) {
    const c = document.createElement('canvas');
    c.width = 340;
    c.height = 120;
    const x = c.getContext('2d');
    x.fillStyle = 'rgba(255,255,255,.96)';
    x.fillRect(0, 0, 340, 120);
    x.lineWidth = 8;
    x.strokeStyle = col || '#7c4dff';
    x.strokeRect(0, 0, 340, 120);
    x.fillStyle = '#0f2238';
    x.font = '700 32px system-ui,sans-serif';
    x.fillText(a, 16, 48);
    x.font = '600 24px system-ui,sans-serif';
    x.fillStyle = '#4a5a70';
    x.fillText(b || '', 16, 92);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false }));
    s.scale.set(w, w * 120 / 340, 1);
    s.renderOrder = 9;
    sc.add(s);
    return s;
  }

  // --- 3D Character Model with Detailed Face ---
  function P(g, x, z, col, s, o = {}) {
    const p = new THREE.Group();
    p.position.set(x, 0, z);
    p.scale.setScalar(s);
    g.add(p);
    const sk = o.skin || 0xc68e5f;

    C(p, 0.3, 0.38, 1, col, 0, 0.8);
    B(p, 0.22, 0.8, 0.26, 0x1e293b, -0.14, 0, 0);
    B(p, 0.22, 0.8, 0.26, 0x1e293b, 0.14, 0, 0);

    const arms = [-1, 1].map(k => {
      const a = new THREE.Group();
      a.position.set(k * 0.42, 1.7, 0);
      p.add(a);
      B(a, 0.16, 0.7, 0.16, col, 0, -0.7, 0);
      S_(a, 0.09, sk, 0, -0.75, 0);
      return a;
    });

    // Head
    S_(p, 0.3, sk, 0, 2.05, 0);
    [-1, 1].forEach(k => {
      S_(p, 0.06, 0xffffff, k * 0.11, 2.1, 0.25);
      S_(p, 0.03, 0x111111, k * 0.11, 2.1, 0.3);
      B(p, 0.13, 0.03, 0.04, 0x2a1a10, k * 0.11, 2.2, 0.27);
    });
    S_(p, 0.05, 0xa66f45, 0, 2.02, 0.3);

    const sm = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.014, 6, 14, Math.PI), mat(0x422006));
    sm.rotation.z = Math.PI;
    sm.position.set(0, 1.93, 0.285);
    p.add(sm);

    if (o.turban) {
      const t = S_(p, 0.37, 0xf97316, 0, 2.25, 0);
      t.scale.y = 0.75;
      C(p, 0.35, 0.35, 0.07, 0xfafaf9, 0, 2.2, 0);
      B(p, 0.24, 0.04, 0.05, 0x1c1917, 0, 1.98, 0.29);
    } else if (o.helmet) {
      const h = S_(p, 0.34, 0xfacc15, 0, 2.15, 0);
      h.scale.y = 0.62;
      C(p, 0.42, 0.42, 0.03, 0xfacc15, 0, 2.12);
    } else if (o.hat) {
      const h = S_(p, 0.34, o.hat, 0, 2.15, 0);
      h.scale.y = 0.62;
      C(p, 0.42, 0.42, 0.03, o.hat, 0, 2.12);
    }

    p.userData.arms = arms;
    return p;
  }

  // --- Dynamic 3D Floating Billboards ---
  const labels = [], sensors = [], workers = [], qrBoards = [];
  let farmer;

  function rr(x, a, b, w, h, r) {
    x.beginPath();
    x.moveTo(a + r, b);
    x.arcTo(a + w, b, a + w, b + h, r);
    x.arcTo(a + w, b + h, a, b + h, r);
    x.arcTo(a, b + h, a, b, r);
    x.arcTo(a, b, a + w, b, r);
    x.closePath();
  }

  function drawLabel(s, e, col, note) {
    const u = s.userData, x = u.c.getContext('2d');
    x.clearRect(0, 0, 360, 170);

    x.fillStyle = 'rgba(255, 255, 255, 0.96)';
    rr(x, 4, 4, 352, 162, 18);
    x.fill();
    x.lineWidth = 6;
    x.strokeStyle = col;
    x.stroke();

    x.fillStyle = '#0f2238';
    x.font = '700 29px system-ui, sans-serif';
    x.fillText(NM[u.i], 18, 40);

    x.font = '600 23px system-ui, sans-serif';
    x.fillStyle = '#38bdf8';
    x.fillText(GPS[u.i], 18, 72);

    x.fillStyle = '#0f2238';
    x.font = '600 22px monospace';
    x.fillText(e ? `${e.time}   ${e.T.toFixed(1)}°C  ${Math.round(e.H)}%` : 'time: waiting · GPS active', 18, 106);

    x.fillStyle = col === BAD_COLOR ? BAD_COLOR : OK_COLOR;
    x.font = '700 23px system-ui, sans-serif';
    x.fillText(note || (e && !e.ok ? 'OVER LIMIT: DISCARD' : 'All limits satisfied ✓'), 18, 142);

    u.t.needsUpdate = true;
  }

  function createLabel(i) {
    const c = document.createElement('canvas');
    c.width = 360;
    c.height = 170;
    const t = new THREE.CanvasTexture(c);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false }));
    s.scale.set(7.2, 3.4, 1);
    s.renderOrder = 9;
    s.position.set(X[i] || 0, 6.6, -1);
    s.userData = { c, t, i };
    sc.add(s);
    labels[i] = s;
  }

  // --- Fertilizer Bag Stacks ---
  function pile(g, x, z, n) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < 3; j++) {
        B(g, 1.1, 0.36, 0.7, 0xf1efe6, x + i * 1.15, j * 0.37, z);
        B(g, 1.12, 0.12, 0.72, 0x1f8a4c, x + i * 1.15, j * 0.37 + 0.12, z);
      }
    }
  }

  // --- Build the 6 Ground Stations (From PDF) ---
  X.forEach((x, i) => {
    const g = new THREE.Group();
    g.position.x = x;
    sc.add(g);

    // STATION 0: Manufacturer & 3-Level QR (PDF Point 1)
    if (i === 0) {
      B(g, 7, 4, 5, 0x8a97a6, 0, 0, -3);
      B(g, 7.4, 0.3, 5.4, 0x4a5a6e, 0, 4, -3);
      C(g, 0.4, 0.5, 3, 0x6b7480, 2.5, 4, -4);
      B(g, 5, 0.5, 0.1, 0x1f8a4c, 0, 2.6, -0.48);
      pile(g, -3.2, 0.1, 3);

      const qrData = [
        [1.4, 1, -36, 'Bag QR', '1 bag · 50 kg'],
        [2, 2, -32.5, 'Pallet QR', '50 bag hashes'],
        [2.8, 3, -28.8, 'Master QR + RFID', '20 pallet hashes (container)']
      ];
      qrData.forEach(a => {
        const bg = new THREE.Group();
        bg.position.set(a[2] - x, 0, -1.5);
        g.add(bg);
        C(bg, 0.08, 0.08, 1.4, 0x444444, 0, 0, 0);
        B(bg, a[0] + 0.4, a[0] + 0.4, 0.12, 0xffffff, 0, 1.4, 0);
        qr(a[0], a[1] * 3, bg, 0, 1.4 + (a[0] + 0.4) / 2, 0.07);
        qrBoards.push(bg);
        const t = tag(a[3], a[4], 4.6);
        t.position.set(a[2], a[0] + 3.4, -1.5);
      });
    }

    // STATION 1: Quality Lab & Certification (PDF Point 2)
    if (i === 1) {
      B(g, 5, 3, 4, 0xe8ecef, 0, 0, -3);
      B(g, 5.4, 0.3, 4.4, 0x2d7fb8, 0, 3, -3);
      B(g, 1.2, 1, 0.1, 0x8fc6e8, -1.2, 1.4, -0.98);
      C(g, 0.1, 0.5, 1, 0xbfe3f3, 1.4, 0, -0.5);
      S_(g, 0.45, 0xbfe3f3, 1.4, 1.3, -0.5);
      B(g, 0.3, 0.1, 0.3, 0x1f8a4c, 1.4, 1.7, -0.5);
      P(g, -1.4, 0.1, 0xffffff, 1);
    }

    // STATION 2: Central Warehouse & Warehouse Men (PDF Point 3)
    if (i === 2) {
      B(g, 8, 3.6, 6, 0xc9a05c, 0, 0, -3.2);
      B(g, 8.6, 0.4, 6.6, 0x8d5b2e, 0, 3.6, -3.2);
      B(g, 2.8, 2.6, 0.1, 0x4a3a2a, 0, 0, -0.18);
      pile(g, 3, 0.3, 2);

      workers.push(
        P(g, -3, 0.3, 0xd97706, 1, { helmet: true }),
        P(g, -4.4, 0.3, 0xd97706, 1, { helmet: true })
      );

      B(g, 3.6, 2.4, 2.2, 0x3b6a8c, 6.3, 0, -1.2);
      qr(1.4, 77, g, 6.3, 1.3, -0.08);
      const t = tag('Master QR', '20 pallets · container', 4.4);
      t.position.set(x + 6.3, 4.4, -1.2);
    }

    // STATION 3: District Distributor Depot (PDF Point 5)
    if (i === 3) {
      B(g, 6, 3, 5, 0xb8c4d0, 0, 0, -3);
      B(g, 6.4, 0.3, 5.4, 0x3b6a8c, 0, 3, -3);
      B(g, 2.4, 2.2, 0.1, 0x4a5a6e, 0, 0, -0.48);
      P(g, -3.2, 0.3, 0x7d4fb5, 1, { hat: 0xdddddd });
    }

    // STATION 4: Retailer POS — Works Offline (PDF Point 6)
    if (i === 4) {
      B(g, 5, 3, 4, 0xf0d9a8, 0, 0, -3);
      B(g, 5.4, 0.2, 1.8, 0xd04b3a, 0, 2.6, -0.4);
      B(g, 2, 0.9, 0.8, 0x8a5a2b, 0, 0, -0.6);
      B(g, 0.5, 0.35, 0.4, 0x222222, 0.6, 0.9, -0.6);
      P(g, -1.2, -0.6, 0xd04b3a, 1, { hat: 0xe9d9b0 });
    }

    // STATION 5: Indian Farmer Farmstead & Vehicles (PDF Point 7)
    if (i === 5) {
      B(g, 11, 0.1, 7, 0x7aa84a, 1, 0, -5.5);
      for (let k = 0; k < 5; k++) B(g, 10, 0.15, 0.4, 0x5f8c34, 1, 0.1, -8 + k * 1.3);
      B(g, 3, 2.2, 3, 0xd9b88a, 4.2, 0, -3);
      B(g, 3.5, 0.3, 3.5, 0x8d5b2e, 4.2, 2.2, -3);
      C(g, 0.2, 0.3, 2, 0x5b3a1b, -4.5, 0, -3);
      S_(g, 1.2, 0x2f7a3a, -4.5, 3, -3);

      farmer = P(g, 2.8, 1.6, 0x0284c7, 1.5, { turban: true, skin: 0xb9824f });

      const ox = new THREE.Group();
      ox.position.set(-3.5, 0, -1.5);
      g.add(ox);
      B(ox, 1.4, 0.8, 0.6, 0xe8e0cf, 0, 0.6, 0);
      B(ox, 0.4, 0.5, 0.4, 0xe8e0cf, 0.9, 1.2, 0);
      [-0.5, 0.5].forEach(a => {
        B(ox, 0.15, 0.6, 0.15, 0x8a7a60, a, 0, 0.2);
        B(ox, 0.15, 0.6, 0.15, 0x8a7a60, a, 0, -0.2);
      });
      B(ox, 2, 0.2, 1.1, 0x8b5a2b, -1.9, 0.8, 0);
      wheel(ox, -1.9, 0.7, 0.5);
      wheel(ox, -1.9, -0.7, 0.5);
    }

    S_(g, 0.22, 0x999999, -2.8, 2.4, 1.6);
    C(g, 0.05, 0.05, 2.2, 0x444444, -2.8, 0, 1.6);
    sensors[i] = g.children[g.children.length - 2];
    createLabel(i);
  });

  // --- Transport Vehicles & Farmer Tractor ---
  function truck(col, len, bed) {
    const g = new THREE.Group();
    B(g, len, 0.25, 1.9, 0x56606b, 0, bed - 0.25, 0);
    B(g, 1.3, 1.5, 1.9, col, len / 2 + 0.65, 0.35, 0);
    B(g, 0.05, 0.6, 1.5, 0x9fd0ea, len / 2 + 1.31, 1.1, 0);
    [-len / 2 + 0.8, len / 2 - 0.3, len / 2 + 0.65].forEach(x => {
      [-0.95, 0.95].forEach(z => wheel(g, x, z, 0.45));
    });
    g.position.set(0, 0, 4);
    sc.add(g);
    return g;
  }

  function tractor() {
    const g = new THREE.Group();
    B(g, 2, 0.9, 1.2, 0x2e8b3a, 0.2, 0.5, 0);
    B(g, 0.9, 1, 1.1, 0x2e8b3a, -0.4, 1.4, 0);
    B(g, 0.95, 0.5, 1.15, 0x9fd0ea, -0.4, 1.7, 0);
    [-0.75, 0.75].forEach(z => {
      wheel(g, -0.6, z, 0.75);
      wheel(g, 0.9, z, 0.4);
    });
    B(g, 3.2, 0.2, 1.9, 0x8b5a2b, -3.6, 0.4, 0);
    [-0.95, 0.95].forEach(z => wheel(g, -4.5, z, 0.4));
    g.position.set(0, 0, 4);
    sc.add(g);
    return g;
  }

  const car = {
    2: { g: truck(0xd9a21b, 3.2, 0.85), bed: 0.85, off: -0.2 },
    3: { g: truck(0x2f6fb5, 2.6, 0.85), bed: 0.85, off: -0.2 },
    4: { g: tractor(), bed: 0.6, off: -3.6 }
  };

  sensors[6] = S_(car[2].g, 0.22, 0x999999, 2.25, 2.4, 0);
  createLabel(6);

  // --- Dynamic Packets 3D Models (1 Bag / 1 Pallet / Master Container) ---
  const bagM = mat(0xf1efe6);
  const bandM = mat(0x1f8a4c);
  const crate = new THREE.Group();
  sc.add(crate);

  const singleBagGroup = new THREE.Group();
  const palletGroup = new THREE.Group();
  const containerGroup = new THREE.Group();

  crate.add(singleBagGroup);
  crate.add(palletGroup);
  crate.add(containerGroup);

  // 1. Single Bag Geometry
  B(singleBagGroup, 1.2, 0.4, 1.4, 0xf1efe6, 0, 0.1, 0);
  B(singleBagGroup, 1.22, 0.12, 1.42, 0x1f8a4c, 0, 0.24, 0);
  qr(0.35, 12, singleBagGroup, 0, 0.35, 0.72);

  // 2. Pallet of 50 Bags
  B(palletGroup, 2.5, 0.15, 1.7, 0x9a6b3a);
  for (const x of [-0.6, 0.6]) {
    for (let y = 0; y < 3; y++) {
      const yy = 0.33 + y * 0.37;
      [[1.1, 0.36, 1.4, bagM], [1.12, 0.12, 1.42, bandM]].forEach(a => {
        const b = new THREE.Mesh(new THREE.BoxGeometry(a[0], a[1], a[2]), a[3]);
        b.position.set(x, yy, 0);
        palletGroup.add(b);
      });
      qr(0.3, x * 10 + y, palletGroup, x, yy, 0.715);
    }
  }
  B(palletGroup, 1, 1, 0.06, 0xffffff, 0, 1.3, 0);
  qr(0.8, 99, palletGroup, 0, 1.8, 0.05);

  // 3. Master Container
  B(containerGroup, 3.2, 2.2, 2.2, 0x1e3a8a, 0, 0.1, 0);
  qr(1.2, 888, containerGroup, 0, 1.2, 1.12);
  C(containerGroup, 0.04, 0.04, 0.6, 0xfacc15, 1.2, 2.3, 0);

  function updatePacketsGeometry(packType) {
    currentPacketType = packType;
    if (singleBagGroup) singleBagGroup.visible = packType === 'bag';
    if (palletGroup) palletGroup.visible = packType === 'pallet';
    if (containerGroup) containerGroup.visible = packType === 'master';
    if (sfx) sfx.beep(520, 0.05);
    populateDetailsTable();
  }
  singleBagGroup.visible = false;
  palletGroup.visible = true;
  containerGroup.visible = false;

  const tint = (a, b) => {
    bagM.color.set(a);
    bandM.color.set(b);
    singleBagGroup.children.forEach(m => {
      if (m.material) m.material.color.set(a);
    });
  };
  const cp = new V(X[0] + 0.5, 0.35, 1.6);

  // --- Sky Blockchain Ledger ---
  const led = new THREE.Group();
  led.position.set(0, 17, -9);
  sc.add(led);
  for (let i = -2; i <= 2; i++) {
    B(led, 2, 1.4, 1.4, 0x7c4dff, i * 2.8, -0.7, 0);
    if (i < 2) B(led, 0.8, 0.2, 0.2, 0xb9a2ff, i * 2.8 + 1.4, -0.1, 0);
  }
  const lt = tag('Blockchain ledger', 'every reading is hashed here', 7.4);
  lt.position.set(0, 20, -9);

  const lines = [];
  X.forEach((x, i) => {
    const l = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new V(x - 2.8, 2.6, 1.6), new V(i * 1.2 - 3, 16, -9)]),
      new THREE.LineBasicMaterial({ color: 0x7c4dff, transparent: true, opacity: 0.35 })
    );
    sc.add(l);
    lines.push(l);
  });

  const pulses = [];
  flash = 0; dataOn = true;

  function pulse(n) {
    if (!dataOn || !sensors[n]) return;
    const a = new V();
    sensors[n].getWorldPosition(a);
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    sc.add(m);
    pulses.push({ m, a, t: 0 });
  }

  const hl = new THREE.Mesh(
    new THREE.RingGeometry(2.1, 2.5, 40),
    new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
  );
  hl.rotation.x = -Math.PI / 2;
  sc.add(hl);

  function syncTelemetryToTurso(nodeIndex, nodeName, gps, temp, hum) {
    if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
      try {
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            batch_id: 'batch-iffco-2026-x992',
            node_index: nodeIndex,
            node_name: nodeName,
            gps: gps,
            temperature: temp,
            humidity: hum
          })
        }).catch(() => {});
      } catch (e) {}
    }
  }

  function rdSet(n, m) {
    let T = +$('#T').value + (Math.random() - 0.5) * 0.8;
    let H = Math.min(100, +$('#H').value + (Math.random() - 0.5) * 3);
    if (m === 'f') T = Math.max(T, 44.8);
    if (m === 's') {
      T = Math.min(T, 38);
      H = Math.min(H, 80);
    }
    const isOk = T <= TC && H <= HC;
    syncTelemetryToTurso(n, NM[n] || 'Sensor', GPS[n] || '26.45°N 80.33°E', T, H);
    return rd[n] = {
      n,
      time: new Date().toLocaleTimeString('en-GB'),
      T,
      H,
      ok: isOk
    };
  }

  function paint(n, note) {
    const e = rd[n];
    if (!e) {
      drawLabel(labels[n], null, '#64748b', '');
      if (sensors[n]) sensors[n].material.color.set(0x94a3b8);
      return;
    }
    drawLabel(labels[n], e, e.ok ? OK_COLOR : BAD_COLOR, e.ok ? (note || 'All limits satisfied ✓') : 'OVER LIMIT: DISCARD');
    if (sensors[n]) sensors[n].material.color.set(e.ok ? 0x1f8a4c : 0xd23b3b);
  }

  function go(i) {
    step = Math.max(0, Math.min(7, i));
    const s = S[step];
    rd = {};
    rej = -1;
    tint(0xf1efe6, 0x1f8a4c);
    crate.rotation.z = 0;

    sfx.step();

    for (let j = 0; j < step; j++) {
      if (!rd[S[j].rd]) rdSet(S[j].rd, 's');
    }

    for (let n = 0; n < 7; n++) {
      paint(n, (S.find(q => q.rd === n) || {}).note);
    }

    [2, 3, 4].forEach(k => {
      car[k].g.position.x = k < s.f ? X[k + 1] : X[k];
    });

    cp.set(X[s.f] + 0.5, 0.35, 1.6);
    st = { ph: s.f !== s.t ? 'move' : 'wait', t: 0 };
    qa = 0;

    if (s.t === 3 && s.f === 2) {
      hl.visible = false;
    } else {
      hl.visible = true;
      hl.position.set(X[s.t], 0.12, 1.6);
    }

    $('#sn').textContent = (step + 1) + '/8';
    $('#t').textContent = currentLang === 'en' ? s.en : s.hi;
    $('#hi').textContent = currentLang === 'en' ? s.hi : s.en;
    $('#tx').textContent = s.tx;

    const fill = (el, a) => {
      el.innerHTML = '';
      a.forEach(x => {
        const li = document.createElement('li');
        li.textContent = x;
        el.appendChild(li);
      });
    };
    fill($('#st'), s.st);
    fill($('#ac'), s.ac);

    $('#prev').disabled = step === 0;
    $('#next').textContent = step === 7 ? (currentLang === 'en' ? 'Restart' : 'पुनः प्रारंभ') : (currentLang === 'en' ? 'Next ›' : 'अगला ›');

    ui();
    populateDetailsTable(); // Update All Details table on every step change!

    if (step === 6) {
      setTimeout(() => {
        sfx.celebrate();
        if (window.confetti) {
          window.confetti({ particleCount: 75, spread: 85, origin: { y: 0.6 } });
        }
      }, 900);
    }

    if (step === 7) {
      sfx.alarm();
    }
  }

  function triggerReverseFlowManual() {
    sfx.alarm();
    rej = step;
    tint(0xd23b3b, 0x7a1111);
    st = { ph: 'bad', t: 0 };
    $('#reverse-status-msg').textContent = 'CRITICAL: Reverse Flow Triggered ✗ (Batch Returned to Maker)';
    $('#reverse-status-msg').style.color = '#ef4444';
    drawLabel(labels[0], {
      time: new Date().toLocaleTimeString('en-GB'),
      T: +$('#T').value,
      H: +$('#H').value
    }, BAD_COLOR, 'REVERSE FLOW: REJECTED');
    ui();
    populateDetailsTable(); // Update All Details table on reverse flow!
  }

  function ui() {
    const s = S[step], e = rd[s.rd], r = $('#rdg');
    if (e) {
      r.className = e.ok ? 'ok' : 'bad';
      r.textContent = `${e.time} · ${GPS[e.n]} · ${e.T.toFixed(1)} °C · ${Math.round(e.H)} % — ${e.ok ? 'Within limits ✓' : 'OVER LIMIT (>40°C / >85%). Discarded and thrown back to manufacturer!'}`;
    } else {
      r.className = '';
      r.textContent = 'Reading taken upon arrival: timestamp, GPS, temperature, humidity.';
    }

    const t = +$('#T').value, h = +$('#H').value;
    $('#Tv').textContent = t.toFixed(1) + ' °C';
    $('#Hv').textContent = h + ' %';
    $('#Tv').classList.toggle('danger-val', t > TC);
    $('#Hv').classList.toggle('danger-val', h > HC);
    $('#T').classList.toggle('danger-slider', t > TC);
    $('#H').classList.toggle('danger-slider', h > HC);

    if (t > TC || h > HC) {
      $('#reverse-status-msg').textContent = 'LIMIT BREACH: Auto-Rejecting Batch & Throwing Back!';
      $('#reverse-status-msg').style.color = '#ef4444';
    } else {
      $('#reverse-status-msg').textContent = 'Status: Batch Compliant ✓';
      $('#reverse-status-msg').style.color = '#a7f3d0';
    }

    // Farmer's Phone HUD with 3 Channels from PDF Point 7
    let p = '';
    if (selectedChannel === 'smart') {
      p += `<div style="color:#6ee7b7; font-weight:700; margin-bottom:4px;">① Smartphone (QR / Web App)</div>`;
      if (step === 6 && e && e.ok && st.ph === 'hold') {
        p += `
          <div style="font-size:11.5px; color:#cbd5e1; margin-bottom:6px; line-height:1.4;">
            Bag QR matches SHA-256 Merkle root. Full supply chain verified:<br>
            ${[0, 1, 2, 6, 3, 4, 5].filter(n => rd[n]).map(n => `&bull; ${NM[n]}: ${rd[n].time} · ${rd[n].T.toFixed(0)}°C ${Math.round(rd[n].H)}%`).join('<br>')}
          </div>
          <div class="dbt-banner">
            <div style="font-size:10px; text-transform:uppercase; letter-spacing:0.5px;">Direct Benefit Transfer</div>
            <div class="amount">₹ 1,500.00</div>
            <div style="font-size:10.5px; opacity:0.9;">Credited to your bank A/C ending 4091</div>
          </div>
        `;
      } else if (rej >= 0) {
        p += `<div style="color:#fca5a5; font-size:12px;">This batch failed limits at ${NM[rej]} and was thrown back. It never reached your farm.</div>`;
      } else {
        p += `<div style="color:#94a3b8; font-size:12px;">Waiting for your fertilizer bag to arrive. Advance to Step 7 to verify bag and claim ₹1,500 DBT subsidy.</div>`;
      }
    } else if (selectedChannel === 'ussd') {
      p += `<div style="color:#facc15; font-weight:700; margin-bottom:4px;">② Feature Phone (SMS / USSD *99#)</div>`;
      p += `
        <div style="background:#1e293b; border:1px solid #334155; border-radius:8px; padding:8px; font-family:var(--mono); font-size:11.5px; line-height:1.4; color:#e2e8f0;">
          *99*45# Query:<br>
          Govt of India DBT:<br>
          Bag LOT-2026-X992 is GENUINE.<br>
          ${step === 6 ? 'Rs 1500 DBT subsidy CREDITED to A/C ending 4091.' : 'Awaiting arrival at farm.'}
        </div>
      `;
    } else if (selectedChannel === 'pos') {
      p += `<div style="color:#38bdf8; font-weight:700; margin-bottom:4px;">③ Retailer POS (Aadhaar Biometrics)</div>`;
      p += `
        <div style="background:#1e293b; border:1px solid #334155; border-radius:8px; padding:8px; font-size:11.5px; line-height:1.4; color:#e2e8f0;">
          Biometric match: Ramesh Kumar Patel<br>
          Aadhaar Hash: SHA256-OK<br>
          Offline POS Terminal #9012 signed transaction locally.
        </div>
      `;
    }
    $('#phone-body').innerHTML = p;
  }

  // --- Populate All Details Modal Table Live & Dynamically Every Time ---
  function populateDetailsTable() {
    try {
      const tbody = $('#details-table-body');
      if (!tbody) return;

      tbody.innerHTML = '';
      const nowTime = new Date().toLocaleTimeString('en-GB');
      const tInput = $('#T');
      const hInput = $('#H');
      const currentT = tInput ? (parseFloat(tInput.value) || 28.0) : 28.0;
      const currentH = hInput ? (parseFloat(hInput.value) || 55.0) : 55.0;
      const isRej = typeof rej !== 'undefined' && rej >= 0;
      const isOverLimit = currentT > TC || currentH > HC || isRej;

      const packetLabelMap = {
        bag: '1 Bag (50 kg) · SHA-256',
        pallet: '1 Pallet (50 Bags) · Merkle Root',
        master: 'Container (20 Pallets) · RFID'
      };
      const packType = typeof currentPacketType !== 'undefined' ? currentPacketType : 'pallet';
      const currentPackLabel = packetLabelMap[packType] || 'Pallet (50 Bags)';

      const safeRd = (typeof rd !== 'undefined' && rd) ? rd : {};
      const currentStep = typeof step !== 'undefined' ? step : 0;

      const rowsData = [
        {
          node: '1. Manufacturer',
          gps: GPS[0],
          time: safeRd[0] ? safeRd[0].time : nowTime,
          temp: `${safeRd[0] ? safeRd[0].T.toFixed(1) : currentT.toFixed(1)} °C / ${Math.round(safeRd[0] ? safeRd[0].H : currentH)}%`,
          pack: currentPackLabel,
          qc: 'SHA-256: 0x8a9f3b14',
          status: isOverLimit ? 'REJECTED' : 'BATCH REGISTERED',
          ok: !isOverLimit
        },
        {
          node: '2. Quality Lab',
          gps: GPS[1],
          time: safeRd[1] ? safeRd[1].time : nowTime,
          temp: `${safeRd[1] ? safeRd[1].T.toFixed(1) : (currentT - 1.2).toFixed(1)} °C / ${Math.round(safeRd[1] ? safeRd[1].H : currentH - 3)}%`,
          pack: currentPackLabel,
          qc: 'N: 46.2% · Cert: QC-PASS',
          status: isOverLimit ? 'REJECTED' : (currentStep >= 1 ? 'QC CERTIFIED' : 'PENDING'),
          ok: !isOverLimit
        },
        {
          node: '3. Central Warehouse',
          gps: GPS[2],
          time: safeRd[2] ? safeRd[2].time : nowTime,
          temp: `${safeRd[2] ? safeRd[2].T.toFixed(1) : currentT.toFixed(1)} °C / ${Math.round(safeRd[2] ? safeRd[2].H : currentH)}%`,
          pack: currentPackLabel,
          qc: 'RFID Gate: GATE-02 Logged',
          status: isOverLimit ? 'REJECTED' : (currentStep >= 2 ? 'STOCK RECEIVED' : 'PENDING'),
          ok: !isOverLimit
        },
        {
          node: '4. IoT Transporter',
          gps: GPS[6],
          time: safeRd[6] ? safeRd[6].time : nowTime,
          temp: `${currentT.toFixed(1)} °C / ${Math.round(currentH)}%`,
          pack: currentPackLabel,
          qc: 'Truck: UP-32-BT-9014 (Live)',
          status: isOverLimit ? 'OVER LIMIT (RECALL)' : (currentStep >= 3 ? 'IN TRANSIT' : 'SCHEDULED'),
          ok: !isOverLimit
        },
        {
          node: '5. District Distributor',
          gps: GPS[3],
          time: safeRd[3] ? safeRd[3].time : nowTime,
          temp: `${safeRd[3] ? safeRd[3].T.toFixed(1) : (currentT + 0.4).toFixed(1)} °C / ${Math.round(safeRd[3] ? safeRd[3].H : currentH + 1)}%`,
          pack: currentPackLabel,
          qc: 'Pallet Hash: Verified',
          status: isOverLimit ? 'REJECTED' : (currentStep >= 4 ? 'CUSTODY MOVED' : 'PENDING'),
          ok: !isOverLimit
        },
        {
          node: '6. Retailer POS',
          gps: GPS[4],
          time: safeRd[4] ? safeRd[4].time : nowTime,
          temp: `${safeRd[4] ? safeRd[4].T.toFixed(1) : (currentT + 0.8).toFixed(1)} °C / ${Math.round(safeRd[4] ? safeRd[4].H : currentH + 2)}%`,
          pack: currentPackLabel,
          qc: 'Nonce: 88914 · SECP256K1',
          status: isOverLimit ? 'REJECTED' : (currentStep >= 5 ? 'OFFLINE SIGNED' : 'PENDING'),
          ok: !isOverLimit
        },
        {
          node: '7. Indian Farmer',
          gps: GPS[5],
          time: safeRd[5] ? safeRd[5].time : nowTime,
          temp: `${safeRd[5] ? safeRd[5].T.toFixed(1) : currentT.toFixed(1)} °C / ${Math.round(safeRd[5] ? safeRd[5].H : currentH)}%`,
          pack: '1 Bag (50 kg) Delivered',
          qc: 'Aadhaar DBT Bridge',
          status: isOverLimit ? 'NOT DELIVERED' : (currentStep >= 6 ? '₹1500 DBT CREDITED' : 'AWAITING ARRIVAL'),
          ok: !isOverLimit
        },
        {
          node: '8. Reverse Flow Loop',
          gps: 'Distributor ➔ Whse ➔ Factory',
          time: nowTime,
          temp: 'Limit: 40°C / 85%',
          pack: 'Red Return Circuit',
          qc: 'Recall Waybill: RET-LOT-2026',
          status: isOverLimit ? 'REVERSE FLOW ACTIVE (RECALLED)' : 'IDLE (MONITORING)',
          ok: !isOverLimit
        }
      ];

      rowsData.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="font-weight:700; color:#ffffff;">${r.node}</td>
          <td style="font-family:var(--mono); color:#38bdf8;">${r.gps}</td>
          <td style="font-family:var(--mono); color:#94a3b8;">${r.time}</td>
          <td style="font-family:var(--mono); color:${r.ok ? '#e2e8f0' : '#ef4444'}; font-weight:${r.ok ? '400' : '700'};">${r.temp}</td>
          <td><span style="font-family:var(--mono); color:#c4b5fd; font-size:11px;">${r.pack}</span></td>
          <td style="font-family:var(--mono); font-size:10.5px;">${r.qc}</td>
          <td><span class="tag-badge ${r.ok ? 'tag-ok' : 'tag-bad'}">${r.status}</span></td>
        `;
        tbody.appendChild(tr);
      });
    } catch(err) {
      console.warn('populateDetailsTable safe catch:', err);
    }
  }

  // --- Step Physics & Parabolic Toss Animation ---
  function adv(dt) {
    const s = S[step];
    st.t += dt;

    if (st.ph === 'move') {
      const u = Math.min(1, st.t / 3.4);
      const e = u * u * (3 - 2 * u);
      const c = car[s.f];
      const x = X[s.f] + (X[s.t] - X[s.f]) * e;

      if (c) {
        c.g.position.x = x;
        cp.set(x + c.off, c.bed, 4);
      } else {
        cp.set(x + 0.5, 0.35, 1.6);
      }

      if (u >= 1) {
        cp.set(X[s.t] + 0.5, 0.35, 1.6);
        st = { ph: 'wait', t: 0 };
      }
    } else if (st.ph === 'wait' && st.t > (step === 0 ? 4.2 : 0.6)) {
      const e = rdSet(s.rd, s.force ? 'f' : '');
      paint(s.rd, s.note);
      pulse(s.rd);
      if (sensors[s.rd]) sensors[s.rd].scale.setScalar(2);

      if (e.ok) {
        st = { ph: 'hold', t: 0 };
      } else {
        rej = s.rd;
        tint(0xd23b3b, 0x7a1111);
        sfx.alarm();
        st = { ph: 'bad', t: 0 };
      }
      ui();
      populateDetailsTable(); // Update table whenever reading arrives!
    } else if (st.ph === 'bad' && st.t > 1.4) {
      if (s.t === 0) {
        st = { ph: 'done', t: 0 };
      } else {
        st = { ph: 'toss', t: 0, from: cp.clone() };
      }
      ui();
      populateDetailsTable();
    } else if (st.ph === 'toss') {
      const u = Math.min(1, st.t / 2.8);
      const targetX = X[0] + 0.5;
      const arcHeight = 11.5 * Math.sin(Math.PI * u);

      cp.set(st.from.x + (targetX - st.from.x) * u, 0.35 + arcHeight, 1.6);
      crate.rotation.z = u * Math.PI * 4;

      if (u >= 1) {
        crate.rotation.z = 0;
        cp.set(targetX, 0.35, 1.6);
        st = { ph: 'done', t: 0 };
        drawLabel(labels[0], {
          time: new Date().toLocaleTimeString('en-GB'),
          T: +$('#T').value,
          H: +$('#H').value
        }, BAD_COLOR, 'RETURNED to maker: REJECTED');
        ui();
        populateDetailsTable(); // Update table upon return!
      }
    }
  }

  // --- UI Event Handlers ---
  function stopAuto() {
    if (auto) {
      clearInterval(auto);
      auto = null;
      $('#btn-start-run').textContent = currentLang === 'en' ? 'Start Tour' : 'टूर शुरू';
    }
  }

  $('#btn-start-run').onclick = () => {
    if (auto) {
      stopAuto();
    } else {
      $('#btn-start-run').textContent = currentLang === 'en' ? 'Pause' : 'रोकें';
      if (step === 7) go(0);
      auto = setInterval(() => {
        if (step >= 7) stopAuto();
        else go(step + 1);
      }, 8500);
    }
  };

  $('#btn-reset-run').onclick = () => {
    stopAuto();
    $('#T').value = 28.0;
    $('#H').value = 55;
    rej = -1;
    go(0);
    populateDetailsTable();
  };

  $('#next').onclick = () => {
    stopAuto();
    go(step === 7 ? 0 : step + 1);
  };

  $('#prev').onclick = () => {
    stopAuto();
    go(step - 1);
  };

  $('#fold').onclick = () => {
    const c = $('#card');
    c.classList.toggle('min');
    $('#fold').textContent = c.classList.contains('min') ? '▴' : '▾';
    sfx.beep(500, 0.05);
  };

  // Temperature & Humidity input listeners: update table EVERY TIME slider moves!
  ['T', 'H'].forEach(k => {
    $('#' + k).addEventListener('input', () => {
      ui();
      populateDetailsTable(); // Live update table immediately!
      const t = +$('#T').value, h = +$('#H').value;
      if (t > TC || h > HC) {
        sfx.alarm();
        triggerReverseFlowManual();
      }
    });
  });

  // Dedicated Reverse Flow Buttons
  $('#btn-reverse-trigger').onclick = triggerReverseFlowManual;
  $('#btn-reverse-flow-top').onclick = triggerReverseFlowManual;

  // Dedicated Packets Control Buttons: update table EVERY TIME packet changes!
  document.querySelectorAll('[data-pack]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('[data-pack]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updatePacketsGeometry(btn.dataset.pack);
      populateDetailsTable();
    };
  });

  // All Details & Core Determinants Modal Open / Close / Tab Switch
  function switchModalTab(tab) {
    const tTel = $('#tab-btn-telemetry');
    const tDet = $('#tab-btn-determinants');
    const vTel = $('#view-telemetry');
    const vDet = $('#view-determinants');
    if (tab === 'telemetry') {
      if (tTel) tTel.classList.add('active');
      if (tDet) tDet.classList.remove('active');
      if (vTel) vTel.style.display = 'block';
      if (vDet) vDet.style.display = 'none';
      populateDetailsTable();
    } else {
      if (tTel) tTel.classList.remove('active');
      if (tDet) tDet.classList.add('active');
      if (vTel) vTel.style.display = 'none';
      if (vDet) vDet.style.display = 'block';
    }
  }

  const btnOpenDetails = $('#btn-open-details');
  if (btnOpenDetails) {
    btnOpenDetails.onclick = () => {
      switchModalTab('telemetry');
      $('#modal-details').classList.add('open');
      sfx.beep(600, 0.06);
    };
  }

  const btnOpenDet = $('#btn-open-determinants');
  if (btnOpenDet) {
    btnOpenDet.onclick = () => {
      switchModalTab('determinants');
      $('#modal-details').classList.add('open');
      sfx.beep(600, 0.06);
    };
  }

  const tabBtnTel = $('#tab-btn-telemetry');
  if (tabBtnTel) tabBtnTel.onclick = () => switchModalTab('telemetry');

  const tabBtnDet = $('#tab-btn-determinants');
  if (tabBtnDet) tabBtnDet.onclick = () => switchModalTab('determinants');

  const btnCloseDetails = $('#btn-close-details');
  if (btnCloseDetails) {
    btnCloseDetails.onclick = () => {
      $('#modal-details').classList.remove('open');
    };
  }

  const modalDetails = $('#modal-details');
  if (modalDetails) {
    modalDetails.onclick = e => {
      if (e.target === modalDetails) modalDetails.classList.remove('open');
    };
  }

  $('#dataBtn').onclick = e => {
    dataOn = !dataOn;
    e.currentTarget.setAttribute('aria-pressed', dataOn);
    lines.forEach(l => l.visible = dataOn);
    sfx.beep(600, 0.06);
  };

  // Camera View Switching
  document.querySelectorAll('[data-v]').forEach(b => {
    b.onclick = () => {
      mode = b.dataset.v;
      document.querySelectorAll('[data-v]').forEach(x => x.setAttribute('aria-pressed', x === b));
      $('#phone-hud').style.display = mode === 'farmer' ? 'block' : 'none';
      if (farmer) farmer.visible = mode !== 'farmer';
      sfx.beep(700, 0.06);
    };
  });

  // Channel switcher on phone HUD
  document.querySelectorAll('[data-channel]').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('[data-channel]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedChannel = tab.dataset.channel;
      ui();
      sfx.beep(600, 0.05);
    };
  });

  // Sound FX Toggle
  $('#soundBtn').onclick = e => {
    sfx.enabled = !sfx.enabled;
    e.currentTarget.setAttribute('aria-pressed', sfx.enabled);
    e.currentTarget.textContent = sfx.enabled ? '🔊 Sound' : '🔇 Muted';
    if (sfx.enabled) sfx.beep(600, 0.06);
  };

  // Language Toggle
  $('#langBtn').onclick = () => {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    $('#langBtn').textContent = currentLang === 'en' ? 'हिन्दी' : 'English';
    go(step);
    sfx.beep(520, 0.06);
  };

  // Keyboard navigation
  addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') $('#next').click();
    if (e.key === 'ArrowLeft' && !$('#prev').disabled) $('#prev').click();
    if (e.key === ' ') {
      e.preventDefault();
      $('#btn-start-run').click();
    }
  });

  // --- Camera Coordinates & Orbiting ---
  const o = { th: 0.12, ph: 1.03 };
  const cur = new V(-27, 2, 0);
  const ft = new V(22, 1.4, 1.6);
  const fp = new V(27.6, 3.1, 2.4);
  const lk = ft.clone();
  let curR = 60;

  function size() {
    const w = cv.clientWidth, h = cv.clientHeight;
    R.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  }
  addEventListener('resize', size);

  // Pointer drag to orbit and wheel zoom
  const ptr = new Map();
  let p0 = 0;

  cv.addEventListener('pointerdown', e => {
    cv.setPointerCapture(e.pointerId);
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

    if (ptr.size === 1 && mode !== 'farmer') {
      o.th -= dx * 0.006;
      o.ph = Math.max(0.22, Math.min(1.5, o.ph - dy * 0.005));
    }
    if (ptr.size === 2) {
      const [a, b] = [...ptr.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (p0) zoom = Math.max(0.35, Math.min(1.8, zoom * p0 / d));
      p0 = d;
    }
  });

  const up = e => ptr.delete(e.pointerId);
  cv.addEventListener('pointerup', up);
  cv.addEventListener('pointercancel', up);

  cv.addEventListener('wheel', e => {
    e.preventDefault();
    zoom = Math.max(0.35, Math.min(1.8, zoom * (1 + e.deltaY * 0.001)));
  }, { passive: false });

  // --- Main Animation Loop ---
  let last = performance.now();
  let lastTableUpdate = 0;

  function tick(now) {
    requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = now / 1000;

    if (st.ph !== 'hold' && st.ph !== 'done') adv(dt);
    else st.t += dt;

    crate.position.copy(cp);
    labels[6].position.set(car[2].g.position.x, 5.2, 4);

    sensors.forEach(s => {
      if (s && s.scale.x > 1) s.scale.setScalar(Math.max(1, s.scale.x - dt * 2));
    });

    if (hl.visible) hl.scale.setScalar(1 + Math.sin(t * 4) * 0.06);

    redReturnLines.forEach(line => {
      line.material.opacity = 0.5 + Math.sin(t * 4) * 0.35;
    });

    if (step === 0) {
      qa += dt;
      qrBoards.forEach((g, i) => {
        const u = qa - i * 1.2;
        g.scale.setScalar(u > 0 && u < 1.1 ? 1 + 0.25 * Math.sin(u / 1.1 * Math.PI) : 1);
      });
    }

    // Warehouse Men Unloading Arms
    const act = step === 2 && (st.ph === 'move' || st.ph === 'wait' || st.ph === 'hold');
    workers.forEach((w, i) => {
      const k = act ? Math.sin(t * 5 + i * Math.PI) : 0;
      w.userData.arms[0].rotation.x = k * 0.9;
      w.userData.arms[1].rotation.x = -k * 0.9;
    });

    // Farmer waving arm celebration in Step 7
    if (farmer) {
      farmer.userData.arms[1].rotation.z = (step === 6 && st.ph === 'hold' && rd[5] && rd[5].ok)
        ? -2.4 + Math.sin(t * 6) * 0.35
        : 0;
    }

    // Sky Blockchain Ledger Rotation
    led.rotation.y += dt * 0.25;
    led.scale.setScalar(1 + flash * 0.12);
    flash = Math.max(0, flash - dt * 2.5);

    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += dt / 1.6;
      if (p.t >= 1) {
        sc.remove(p.m);
        pulses.splice(i, 1);
        flash = 1;
      } else {
        p.m.position.lerpVectors(p.a, led.position, p.t);
      }
    }

    // Continual live update for All Details table when modal is open (every 500ms)
    if (now - lastTableUpdate > 500) {
      lastTableUpdate = now;
      if ($('#modal-details').classList.contains('open')) {
        populateDetailsTable();
      }
    }

    // Camera Interpolation based on Mode
    const portrait = cv.clientWidth / cv.clientHeight < 0.9, k = 0.07;

    if (mode === 'farmer') {
      cam.position.lerp(fp, k);
      lk.lerp(ft, k);
      cam.lookAt(lk);
    } else {
      const v = S[step].v;
      const tx = mode === 'auto' ? v[0] : 0;
      const r = (mode === 'auto' ? v[1] : 75) * zoom * (portrait ? 1.5 : 1);
      cur.x += (tx - cur.x) * k;
      curR += (r - curR) * k;
      cam.position.set(
        cur.x + curR * Math.sin(o.ph) * Math.sin(o.th),
        2 + curR * Math.cos(o.ph),
        curR * Math.sin(o.ph) * Math.cos(o.th)
      );
      lk.set(cur.x, 2, 0);
      cam.lookAt(lk);
    }

    R.render(sc, cam);
  }

  // --- Bootstrap ---
  size();
  go(0);
  updatePacketsGeometry('pallet');
  populateDetailsTable();
  cam.position.set(-27, 40, 40);
  requestAnimationFrame(tick);
})();
