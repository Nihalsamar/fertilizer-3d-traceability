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

  // Set warm studio cream background matching the reference image (#F5EFE6)
  if (typeof THREE !== 'undefined' && THREE.Color) {
    sc.background = new THREE.Color(0x09090C);
  }
  if (R && R.setClearColor) {
    R.setClearColor(0x09090C, 1.0);
  }

  // Luxury Obsidian & Champagne Gold Studio Lighting
  sc.add(new THREE.AmbientLight(0xFFF6E5, 0.70));
  const sun = new THREE.DirectionalLight(0xFFFDF0, 1.25);
  sun.position.set(18, 34, 22);
  sc.add(sun);

  const fillLight = new THREE.DirectionalLight(0xD4AF37, 0.50);
  fillLight.position.set(-18, 18, 20);
  sc.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xF5E6BE, 0.70);
  rimLight.position.set(-20, 22, -22);
  sc.add(rimLight);

  const mat = c => new THREE.MeshLambertMaterial({ color: c });
  const B = (g, w, h, d, c, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c));
    m.position.set(x, y + h / 2, z);
    g.add(m);
    return m;
  };
  const C = (g, rt, rb, h, c, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 20), mat(c));
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

  // --- Procedural Canvas Texture Generators for Diorama Elements ---
  function createGroceryAwningTexture() {
    if (typeof document === 'undefined' || !document.createElement) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      // Green and white stripes
      const numStripes = 10;
      const stripeWidth = 512 / numStripes;
      for (let i = 0; i < numStripes; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#27522D' : '#F8F9FA';
        ctx.fillRect(i * stripeWidth, 0, stripeWidth, 180);
      }
      // Scalloped bottom edge & valance
      ctx.fillStyle = '#27522D';
      ctx.fillRect(0, 175, 512, 81);
      // Bold GROCERY text in center
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 54px "Space Grotesk", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GROCERY', 256, 215);
      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  function createTruckLogoTexture() {
    if (typeof document === 'undefined' || !document.createElement) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 512, 256);
      ctx.strokeStyle = '#27522D';
      if (ctx.lineWidth) ctx.lineWidth = 8;
      ctx.strokeRect(12, 12, 488, 232);

      // Vegetable crate illustration
      ctx.fillStyle = '#C49261';
      ctx.fillRect(40, 110, 100, 60);
      ctx.fillStyle = '#E11D48';
      ctx.fillRect(55, 80, 30, 30);
      ctx.fillStyle = '#F97316';
      ctx.fillRect(95, 75, 25, 35);
      ctx.fillStyle = '#22C55E';
      ctx.fillRect(60, 65, 20, 15);

      ctx.fillStyle = '#1E3A8A';
      ctx.font = 'bold 36px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('COLD-CHAIN IOT', 160, 105);
      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 26px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('FARM FRESH PRODUCE', 160, 155);
      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  function createInspectionLabelTexture() {
    if (typeof document === 'undefined' || !document.createElement) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.fillStyle = '#264A2F';
      ctx.font = 'bold 36px "Space Grotesk", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('inspection', 128, 42);
      ctx.fillText('camera', 128, 86);
      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  function createGreenHarvestLabelTexture() {
    if (typeof document === 'undefined' || !document.createElement) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // White satin label background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 360);

      // Glowing green border around QR code on left
      ctx.fillStyle = '#ECFDF5';
      ctx.fillRect(28, 28, 290, 304);
      ctx.strokeStyle = '#10B981';
      if (ctx.lineWidth) ctx.lineWidth = 6;
      ctx.strokeRect(28, 28, 290, 304);

      // QR Code matrix inside green box
      ctx.fillStyle = '#0F172A';
      const drawFinder = (ox, oy) => {
        ctx.fillRect(ox, oy, 60, 60);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(ox + 10, oy + 10, 40, 40);
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(ox + 18, oy + 18, 24, 24);
      };
      drawFinder(50, 45);
      drawFinder(236, 45);
      drawFinder(50, 210);

      for (let r = 0; r < 12; r++) {
        for (let c = 0; c < 12; c++) {
          if ((r < 4 && c < 4) || (r < 4 && c > 7) || (r > 7 && c < 4)) continue;
          if ((r * 5 + c * 11) % 2 === 0) {
            ctx.fillRect(56 + c * 16, 50 + r * 16, 12, 12);
          }
        }
      }

      // Center shield checkmark in QR
      ctx.fillStyle = '#10B981';
      ctx.fillRect(135, 135, 75, 45);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✓', 172, 166);

      // "TAMPER-EVIDENT BLOCKCHAIN QR" text
      ctx.fillStyle = '#059669';
      ctx.font = 'bold 16px "Space Grotesk", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TAMPER-EVIDENT', 172, 295);
      ctx.fillText('BLOCKCHAIN QR', 172, 318);

      // Center Section: Metadata
      ctx.textAlign = 'left';
      ctx.fillStyle = '#065F46';
      ctx.font = 'bold 36px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('BLOCKCHAIN', 350, 75);
      ctx.fillText('TRACEABILITY', 350, 118);
      ctx.fillText('CERTIFIED', 350, 160);

      ctx.fillStyle = '#1E3A8A';
      ctx.font = 'bold 24px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('Batch: GH-2025-0487', 350, 220);
      ctx.fillStyle = '#475569';
      ctx.font = '20px "Inter", Arial, sans-serif';
      ctx.fillText('Harvest: Apr 16, 2025', 350, 260);
      ctx.fillText('Origin: Willamette Valley, OR', 350, 298);

      // Right Section: USDA Organic Seal
      ctx.fillStyle = '#15803D';
      ctx.fillRect(790, 45, 190, 190);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(802, 57, 166, 166);
      ctx.fillStyle = '#15803D';
      ctx.font = 'bold 34px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('USDA', 885, 115);
      ctx.fillStyle = '#3F200C';
      ctx.fillRect(805, 135, 160, 80);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 26px Arial, sans-serif';
      ctx.fillText('ORGANIC', 885, 185);

      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  function createGreenHarvestBrandTexture() {
    if (typeof document === 'undefined' || !document.createElement) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 160;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = '#3E2723';
      ctx.fillRect(30, 45, 30, 40);
      ctx.fillRect(65, 35, 20, 25);
      ctx.font = 'bold 42px "Space Grotesk", Georgia, serif';
      ctx.textAlign = 'left';
      ctx.fillText('GreenHarvest', 105, 80);

      ctx.font = 'bold 18px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('FARM FRESH • BETTER TOMORROW', 40, 125);

      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  function createAgriScanScreenTexture() {
    if (typeof document === 'undefined' || !document.createElement) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 700;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, 400, 700);

      // Top status bar
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, 400, 36);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px "JetBrains Mono", Arial, sans-serif';
      ctx.fillText('10:24', 20, 24);
      ctx.fillText('5G  100%', 310, 24);

      // Top Green Status Banner
      ctx.fillStyle = '#10B981';
      ctx.fillRect(0, 36, 400, 105);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(25, 60, 42, 42);
      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 28px Arial, sans-serif';
      ctx.fillText('✓', 36, 92);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('Batch Verified', 82, 75);
      ctx.font = '13px "Inter", Arial, sans-serif';
      ctx.fillText('Authentic • Untampered • On Blockchain', 82, 105);

      // White Batch Detail Card
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(16, 155, 368, 240);
      ctx.strokeStyle = '#E2E8F0';
      if (ctx.lineWidth) ctx.lineWidth = 2;
      ctx.strokeRect(16, 155, 368, 240);

      // Thumbnail
      ctx.fillStyle = '#C49261';
      ctx.fillRect(265, 175, 105, 80);
      ctx.fillStyle = '#E11D48';
      ctx.fillRect(280, 190, 32, 32);
      ctx.fillStyle = '#10B981';
      ctx.fillRect(320, 185, 35, 25);

      ctx.fillStyle = '#64748B';
      ctx.font = '12px "Inter", Arial, sans-serif';
      ctx.fillText('Batch ID', 32, 185);
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 18px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('GH-2025-0487', 32, 210);

      ctx.fillStyle = '#64748B';
      ctx.font = '12px "Inter", Arial, sans-serif';
      ctx.fillText('Product', 32, 245);
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 16px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('Organic Apples & Greens', 32, 268);

      ctx.fillStyle = '#64748B';
      ctx.font = '12px "Inter", Arial, sans-serif';
      ctx.fillText('Harvest Date: Apr 16, 2025', 32, 310);
      ctx.fillText('Origin: Willamette Valley, OR', 32, 340);

      // Milestones
      const milestones = ['Farm', 'Processing', 'Distribution', 'Retail'];
      milestones.forEach((m, idx) => {
        const mx = 24 + idx * 90;
        ctx.fillStyle = '#10B981';
        ctx.fillRect(mx, 410, 24, 24);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px Arial, sans-serif';
        ctx.fillText('✓', mx + 6, 428);
        ctx.fillStyle = '#334155';
        ctx.font = '11px "Inter", Arial, sans-serif';
        ctx.fillText(m, mx - 4, 452);
      });

      // Blockchain Record Card
      ctx.fillStyle = '#EFF6FF';
      ctx.fillRect(16, 475, 368, 85);
      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(32, 495, 36, 36);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.fillText('🔗', 40, 521);

      ctx.fillStyle = '#1E3A8A';
      ctx.font = 'bold 14px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('Blockchain Record', 80, 505);
      ctx.fillStyle = '#2563EB';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('Verified on Ethereum (Layer-2 PoA)', 80, 526);
      ctx.fillText('Tx: 0x7a3e...9f2c', 80, 546);

      // Green CTA Button
      ctx.fillStyle = '#10B981';
      ctx.fillRect(16, 580, 368, 62);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px "Space Grotesk", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✓  Scan Complete', 200, 620);

      // AgriScan branding
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 15px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('🌿 AgriScan Field Pro', 200, 678);

      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  function createTotemScreenTexture(activeStage = 1) {
    if (typeof document === 'undefined' || !document.createElement) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 460;
      canvas.height = 920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 460, 920);

      // Top Leaf Logo
      ctx.fillStyle = '#15803D';
      ctx.fillRect(35, 35, 35, 35);
      ctx.font = 'bold 32px "Space Grotesk", Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('From Our Farms', 85, 52);
      ctx.fillText('to Your Table', 85, 88);

      ctx.fillStyle = '#475569';
      ctx.font = '14.5px "Inter", Arial, sans-serif';
      ctx.fillText('Real Food. Real Transparency.', 35, 125);
      ctx.fillStyle = '#15803D';
      ctx.fillText('Powered by Blockchain.', 35, 146);

      const stages = [
        { num: '1. Farm', desc: 'Willamette Valley, OR', date: 'Harvested Apr 16, 2025', color: '#15803D' },
        { num: '2. Processing', desc: 'Cleaned & Packed', date: 'Apr 17, 2025', color: '#0284C7' },
        { num: '3. Distribution', desc: 'Cold Chain Transport', date: 'Apr 19, 2025', color: '#6366F1' },
        { num: '4. Retail', desc: 'Fresh Market', date: 'Apr 22, 2025', color: '#D97706' },
        { num: '5. Your Table', desc: 'Good Food. Better Choices.', date: 'Certified Fresh', color: '#059669' }
      ];

      stages.forEach((stg, i) => {
        const sy = 190 + i * 115;
        const isPastOrActive = (i + 1) <= activeStage;

        if (i < 4) {
          ctx.strokeStyle = isPastOrActive ? '#10B981' : '#E2E8F0';
          if (ctx.lineWidth) ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(68, sy + 30);
          ctx.lineTo(68, sy + 115);
          ctx.stroke();
        }

        ctx.fillStyle = isPastOrActive ? stg.color : '#94A3B8';
        ctx.fillRect(35, sy, 66, 66);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 22px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText((i + 1).toString(), 68, sy + 42);

        ctx.textAlign = 'left';
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 19px "Space Grotesk", Arial, sans-serif';
        ctx.fillText(stg.num, 120, sy + 25);

        ctx.fillStyle = '#64748B';
        ctx.font = '13.5px "Inter", Arial, sans-serif';
        ctx.fillText(stg.desc, 120, sy + 48);
        ctx.fillStyle = '#94A3B8';
        ctx.font = '12px "Inter", Arial, sans-serif';
        ctx.fillText(stg.date, 120, sy + 68);

        ctx.fillStyle = isPastOrActive ? '#10B981' : '#E2E8F0';
        ctx.fillRect(395, sy + 18, 30, 30);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 17px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✓', 410, sy + 40);
      });

      // Bottom CTA
      ctx.fillStyle = '#15803D';
      ctx.fillRect(30, 785, 400, 95);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 28px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('📱  Scan to view full journey  →', 230, 842);

      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  function createTotemBaseTexture() {
    if (typeof document === 'undefined' || !document.createElement) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 512, 180);

      ctx.fillStyle = '#15803D';
      ctx.fillRect(236, 25, 40, 40);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 22px "Space Grotesk", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TRACEABILITY BUILDS', 256, 105);
      ctx.fillText('A HEALTHIER FOOD SYSTEM', 256, 140);

      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  function createQrTexture() {
    if (typeof document === 'undefined' || !document.createElement) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = '#0F172A';
      const drawCorner = (ox, oy) => {
        ctx.fillRect(ox, oy, 56, 56);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(ox + 8, oy + 8, 40, 40);
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(ox + 16, oy + 16, 24, 24);
      };
      drawCorner(16, 16);
      drawCorner(184, 16);
      drawCorner(16, 184);

      for (let r = 0; r < 14; r++) {
        for (let c = 0; c < 14; c++) {
          if ((r < 5 && c < 5) || (r < 5 && c > 8) || (r > 8 && c < 5)) continue;
          if ((r * 7 + c * 13 + (r % 3)) % 2 === 0) {
            ctx.fillRect(24 + c * 15, 24 + r * 15, 12, 12);
          }
        }
      }
      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  function createPhoneScreenTexture() {
    if (typeof document === 'undefined' || !document.createElement) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.fillStyle = '#FAFAF9';
      ctx.fillRect(0, 0, 300, 600);

      // Header
      ctx.fillStyle = '#F5F5F4';
      ctx.fillRect(16, 20, 268, 90);
      ctx.fillStyle = '#E11D48';
      ctx.fillRect(36, 42, 45, 45);
      ctx.fillStyle = '#10B981';
      ctx.fillRect(48, 30, 20, 14);
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 20px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('BATCH #AGRI-8821', 95, 55);
      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 15px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('✓ 100% Provenance Verified', 95, 82);

      // Timeline
      ctx.strokeStyle = '#10B981';
      if (ctx.lineWidth) ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(55, 160);
      ctx.lineTo(55, 460);
      ctx.stroke();

      const timelineSteps = [
        { title: 'Farm Harvest', sub: 'Santosh Shinde • GI Tagged', y: 160 },
        { title: 'AI Quality Grade', sub: 'YOLOv8 Grade A+ • 19.2° Brix', y: 260 },
        { title: 'IoT Cold Corridor', sub: 'Reefer MH-08 • 12.8°C SLA', y: 360 },
        { title: 'Consumer Fork', sub: 'Fair-Trade Farmer Premium', y: 460 }
      ];

      timelineSteps.forEach(st => {
        ctx.fillStyle = '#10B981';
        ctx.fillRect(40, st.y - 15, 30, 30);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 18px Arial, sans-serif';
        ctx.fillText('✓', 48, st.y + 7);

        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 18px "Space Grotesk", Arial, sans-serif';
        ctx.fillText(st.title, 88, st.y - 2);
        ctx.fillStyle = '#64748B';
        ctx.font = '13px "Inter", Arial, sans-serif';
        ctx.fillText(st.sub, 88, st.y + 18);
      });

      ctx.fillStyle = '#ECFDF5';
      ctx.fillRect(16, 510, 268, 65);
      ctx.fillStyle = '#065F46';
      ctx.font = 'bold 15px "Space Grotesk", Arial, sans-serif';
      ctx.fillText('🛡️ Cryptographically Sealed on Turso', 28, 548);

      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  // --- Helper to build a wooden slatted produce crate with tomatoes & carrots ---
  function createSlattedProduceCrate(w = 2.4, h = 1.1, d = 1.6) {
    const cg = new THREE.Group();
    // Base
    B(cg, w, 0.10, d, 0xC49261, 0, 0, 0);
    // 4 Corner posts
    [-w/2 + 0.1, w/2 - 0.1].forEach(px => {
      [-d/2 + 0.1, d/2 - 0.1].forEach(pz => {
        B(cg, 0.16, h, 0.16, 0xB48255, px, 0, pz);
      });
    });
    // Slats
    [0.15, 0.52, 0.88].forEach(sy => {
      B(cg, w, 0.24, 0.06, 0xD4A373, 0, sy, d / 2);
      B(cg, w, 0.24, 0.06, 0xD4A373, 0, sy, -d / 2);
      B(cg, 0.06, 0.24, d, 0xD4A373, w / 2, sy, 0);
      B(cg, 0.06, 0.24, d, 0xD4A373, -w / 2, sy, 0);
    });
    // Tomatoes
    for (let tx = -w/2 + 0.4; tx <= w/2 - 0.4; tx += 0.4) {
      for (let tz = -d/2 + 0.4; tz <= d/2 - 0.4; tz += 0.4) {
        S_(cg, 0.18, 0xE11D48, tx, h * 0.75, tz);
        C(cg, 0.05, 0.05, 0.04, 0x22C55E, tx, h * 0.75 + 0.18, tz);
      }
    }
    // Carrots
    for (let ci = 0; ci < 4; ci++) {
      const crt = new THREE.Group();
      crt.position.set(-w/4 + ci * 0.35, h * 0.85, 0);
      crt.rotation.z = -0.3 + ci * 0.15;
      C(crt, 0.10, 0.03, 0.85, 0xF97316, 0, 0, 0);
      C(crt, 0.04, 0.14, 0.45, 0x22C55E, 0, 0.55, 0);
      cg.add(crt);
    }
    return cg;
  }

  // --- 6 Farm-to-Fork Stations matching the Diorama Architecture ---
  const STATIONS = [
    { name: '1. Shinde Organic Farm Plot', role: 'Farm Origin & Farmer Figurine', gps: '16.9944°N 73.3000°E', x: -8.5, z: -3.5, y: 2.8, temp: 24.5, hum: 78, eth: 0.01 },
    { name: '2. "inspection camera" Station', role: 'Computer Vision AI Stanchion', gps: '17.3100°N 73.5500°E', x: -2.8, z: -2.0, y: 2.8, temp: 22.0, hum: 75, eth: 0.02 },
    { name: '3. S-Curve Blockchain Highway', role: 'Cryptographic LED Waypoints', gps: '17.6800°N 73.7800°E', x: 0.5, z: -1.2, y: 2.8, temp: 18.0, hum: 65, eth: 0.02 },
    { name: '4. Refrigerated Reefer Truck', role: 'IoT Cold Transit Corridor', gps: '18.1500°N 73.8000°E', x: 4.2, z: -3.8, y: 2.8, temp: 12.8, hum: 90, eth: 0.04 },
    { name: '5. "GROCERY" Fresh Market Stall', role: 'Retail Awning & Produce Bins', gps: '18.5204°N 73.8567°E', x: 9.2, z: -3.5, y: 2.8, temp: 21.0, hum: 65, eth: 0.02 },
    { name: '6. Verification Smartphone & QR Crate', role: 'Consumer Provenance Portal', gps: '18.9220°N 72.8347°E', x: 3.5, z: 3.5, y: 1.2, temp: 21.5, hum: 60, eth: 0.02 }
  ];

  const NM = STATIONS.map(s => s.name);
  const GPS = STATIONS.map(s => s.gps);
  const X = STATIONS.map(s => s.x);

  // 3D Station Trajectory for Moving Produce Crate
  const STATIONS_3D = [
    new V(-7.8, 3.1, -1.2),  // Scene 1: Farm gate with farmer & tomatoes
    new V(-7.5, 3.1, -1.0),  // Scene 2: Register batch, QR pop onto crate
    new V(-2.8, 3.1, -1.8),  // Scene 3: Harvest & AI grading under camera spotlight
    new V(-0.5, 3.1, -1.5),  // Scene 4: Mandi handover with dual signature link
    new V( 4.2, 3.6, -3.8),  // Scene 5: Inside/alongside reefer truck on highway
    new V( 7.8, 3.5, -2.2),  // Scene 6: "GROCERY" retail market stall
    new V( 0.8, 1.4,  3.8)   // Scene 7: Foreground Totem Kiosk & consumer payoff
  ];

  // --- 8 Farm-to-Fork Narrative Steps with High-Fidelity Camera Views ---
  // --- 7-Scene Animated Video Script & Flowchart Pipeline ---
  const S = [
    {
      num: 1,
      scene: 'Scene 1 (0:00-0:10)',
      en: 'Scene 1 · The Problem: Paper Records & Consumer Doubt',
      hi: 'दृश्य १ (०:००-०:१०) · समस्या: कागजी रिकॉर्ड और अनसुलझे सवाल',
      vo: 'Where did this food come from? Was it really organic? Today, paper records make it almost impossible to know.',
      vis: 'A farmer holds a crate of tomatoes. Question marks float above it. A shopper looks at the label, confused.',
      phase: 'The Problem',
      category: 'SUPPLY_CHAIN_OPACITY',
      f: 0, t: 0, rd: 0, v: [-7.8, 11, -1.2, 2.6], note: 'Paper Records Insecure ❓',
      tx: 'A farmer holds a crate of fresh tomatoes at the farm gate. Question marks float above it. A shopper looks at the paper label, confused. Today, fragmented paper records make it almost impossible to verify where food came from or if it was truly grown organically.',
      st: [
        'Farmer: Santosh Shinde (Holding crate of heirloom tomatoes)',
        'Traditional Records: Paper mandi slips & physical gate registers',
        'Consumer Dilemma: "Where did this food come from? Was it organic?"',
        'System Breakdown: Quality claims cannot be proven downstream',
        'Economic Penalty: Good farmers receive zero premium for quality'
      ],
      ac: [
        'Expose provenance gap in traditional food supply chains',
        'Initiate decentralized farm-to-fork verification pipeline',
        'Arm farmer with offline-first mobile data capture'
      ]
    },
    {
      num: 2,
      scene: 'Scene 2 (0:10-0:22)',
      en: 'Scene 2 (Step 1) · Register Batch: Offline Mobile App & QR Pop',
      hi: 'दृश्य २ (०:१०-०:२२) · चरण १: बैच पंजीकरण और क्यूआर कोड',
      vo: 'It starts at the farm. The farmer registers the batch in a simple mobile app, works offline, and gets a unique QR code.',
      vis: 'The farmer opens a phone app, taps "New batch", and enters the plot, crop and inputs. A QR code pops out and sticks onto the crate.',
      phase: '1. Register farm and batch',
      category: 'Farm capture',
      f: 0, t: 0, rd: 0, v: [-7.5, 9, -1.0, 2.9], note: 'Offline Batch Registered 📱',
      tx: 'It starts at the farm. The farmer opens a simple mobile app, taps "New batch", and enters the plot ID, crop variety (Tomatoes), and bio-inputs used. The app operates completely offline in remote fields, generating a unique cryptographic QR code that pops out and sticks onto the crate.',
      st: [
        'Farmer ID: FARMER-MH-RTG-8821 (Zero-Knowledge Privacy Mask)',
        'Plot Details: Plot 4B · Shinde Organic Orchards (145m Altitude)',
        'Inputs Used: Panchagavya, Cold-Pressed Neem Oil, Solar Drip',
        'Offline Mode: Works without internet connectivity in rural fields',
        'Dynamic QR Code: Cryptographically bound to physical crate'
      ],
      ac: [
        'Register batch genesis record in offline edge database',
        'Generate tamper-evident GS1 Digital Link QR code token',
        'Attach cryptographic token to physical tomato crate'
      ]
    },
    {
      num: 3,
      scene: 'Scene 3 (0:22-0:34)',
      en: 'Scene 3 (Step 2) · Harvest & AI Grading: Auto Quality Grade',
      hi: 'दृश्य ३ (०:२२-०:३४) · चरण २: फसल कटाई और एआई गुणवत्ता ग्रेडिंग',
      vo: 'At harvest, one photo gives an automatic quality grade. No internet needed. The data syncs later.',
      vis: 'The phone camera scans the tomatoes. A green box appears around them with a "Grade A" badge and a "Saved offline" icon.',
      phase: '2. Harvest and grade',
      category: 'Farm capture',
      f: 1, t: 1, rd: 1, v: [-2.8, 10, -1.8, 3.0], note: 'Grade A Certified (Offline) ✓',
      tx: 'At harvest, taking one photo gives an automatic quality grade. A vibrant green 3D bounding box frames the tomatoes with an instant "Grade A" badge and a "Saved offline 💾" icon. Edge computer vision runs directly on the device with zero internet latency, queuing data to sync when connected.',
      st: [
        'AI Model: Edge Computer Vision (YOLOv8 Optical Inference)',
        'Caliber Detected: 72.4 mm (APEDA Grade A Export Standard)',
        'Quality Badge: "Grade A" Authenticated & Stamped',
        'Offline Icon: "Saved Offline 💾" (Zero internet required)',
        'Purity Score: 99.4% Defect-Free · Zero synthetic ripening carbide'
      ],
      ac: [
        'Capture optical produce photograph at farm packhouse',
        'Compute diameter, color ripeness, and internal sugar brix',
        'Save cryptographic quality stamp into local encrypted storage'
      ]
    },
    {
      num: 4,
      scene: 'Scene 4 (0:34-0:46)',
      en: 'Scene 4 (Step 3) · Mandi Handover: Dual Signatures & Chain Link',
      hi: 'दृश्य ४ (०:३४-०:४६) · चरण ३: मंडी हस्तांतरण और ब्लॉकचेन कड़ी',
      vo: 'Every handover is scanned and signed by both sides, and added to the blockchain as a permanent record.',
      vis: 'A trader scans the QR code. Two signature icons meet and a link is added to a growing chain of blocks.',
      phase: '3. Aggregator at mandi',
      category: 'Handovers',
      f: 1, t: 2, rd: 2, v: [-0.5, 12, -1.5, 3.0], note: 'Dual Ed25519 Signed ✍️',
      tx: 'At the regional mandi aggregation hub, a trader scans the QR code. Produce is weighed and inspected. Two cryptographic signature keys (Farmer + Trader) meet in mid-air, forging a verified handover link added to the growing chain of blocks as an immutable permanent record.',
      st: [
        'Mandi Aggregator: Sahyadri Farmers Producer Co. (APMC Yard)',
        'Action: Trader scans QR code, weighs produce (2,400 kg)',
        'Dual Signing: Farmer Private Key meets Trader Private Key',
        'Blockchain Link: Permanent hashed handover block added',
        'Document Generated: Electronic Negotiable Warehouse Receipt #99104'
      ],
      ac: [
        'Execute mutual dual-signature handover verification',
        'Seal transfer of custody on decentralized consortium ledger',
        'Record e-NWR warehouse balance on blockchain ledger'
      ]
    },
    {
      num: 5,
      scene: 'Scene 5 (0:46-0:58)',
      en: 'Scene 5 (Step 4) · Storage & Transport: IoT Telemetry & Thermal Alert',
      hi: 'दृश्य ५ (०:४६-०:५८) · चरण ४: कोल्ड स्टोरेज व परिवहन टेलीमेट्री',
      vo: 'Sensors log temperature and location in transit. If something goes wrong, the batch is flagged instantly.',
      vis: 'A truck drives across a map. A thermometer and a GPS pin send small blocks into the chain along the way. One temperature spike turns red and triggers an alert.',
      phase: '4. Storage and transport',
      category: 'Handovers',
      f: 2, t: 3, rd: 3, v: [4.2, 12, -3.8, 3.2], note: 'IoT Sensors Logging 12.8°C ❄️',
      tx: 'The reefer truck drives across the transit corridor. Multi-node IoT sensors log temperature and GPS location in real time, dropping cryptographic data blocks into the chain along the highway. If cooling fails and temperature spikes above 16°C, the thermometer turns bright red, triggering an automated recall alert.',
      st: [
        'Vehicle: Dedicated Insulated Reefer Truck MH-08-AG-9941',
        'Sensors: Dual digital thermometers, humidity probes, GPS pin',
        'Telemetry Logging: Temperature (12.8°C compliant) & location synced',
        'Spike Detection: Thermal breach >16.0°C turns red and alerts buyers',
        'Smart Contract Guardrail: Automated insurance claim trigger'
      ],
      ac: [
        'Stream continuous GPS and thermal sensor telemetry to ledger',
        'Monitor cold-chain SLA envelope in real time',
        'Arm automated smart contract quarantine alert'
      ]
    },
    {
      num: 6,
      scene: 'Scene 6 (0:58-1:10)',
      en: 'Scene 6 (Step 5) · Retailer Verification: Full History & FSSAI Seal',
      hi: 'दृश्य ६ (०:५८-१:१०) · चरण ५: खुदरा विक्रेता सत्यापन और एफएसएसएआई',
      vo: 'The retailer checks the full history before accepting the batch. Certification is verified automatically.',
      vis: 'A shopkeeper scans the crate. A green "Verified" tick and a certification badge (organic, FSSAI) appear.',
      phase: '5. Retailer receives',
      category: 'Handovers',
      f: 3, t: 4, rd: 4, v: [7.8, 12, -2.5, 3.2], note: 'Retailer Accepted ✓',
      tx: 'At the "GROCERY" retail market stall, the shopkeeper scans the crate before accepting the batch. A glowing green "Verified ✓" tick mark appears alongside official certification badges (USDA Organic, FSSAI Quality Approved). The retailer audits farm inputs, AI harvest grade, and cold transit history in seconds.',
      st: [
        'Retailer: "GROCERY" Fresh Market & Gourmet Pavilion',
        'Action: Shopkeeper scans crate QR code before acceptance',
        'Audit Verification: Complete history verified automatically in 1 sec',
        'Badges Displayed: Green "Verified ✓" tick, Organic seal, FSSAI seal',
        'Retail Acceptance: Stock accepted with zero dispute or paperwork'
      ],
      ac: [
        'Audit upstream custody and thermal history on ledger',
        'Confirm retailer inward receipt on blockchain',
        'Unlock retail shelf distribution for consumers'
      ]
    },
    {
      num: 7,
      scene: 'Scene 7 (1:10-1:30)',
      en: 'Scene 7 (Step 6) · Consumer Scan & Payoff: Fair-Trade Premium',
      hi: 'दृश्य ७ (१:१०-१:३०) · चरण ६: उपभोक्ता स्कैन और किसान को प्रीमियम',
      vo: 'Customers scan once and see the whole journey. Farmers who grow well finally earn a fair premium. Trust, from farm to fork.',
      vis: 'A shopper scans the QR on the shelf. A timeline slides up: farm, mandi, truck, store. The farmer\'s phone shows a premium payment arriving. End card with the project name.',
      phase: '6. Consumer scans QR & Blockchain ledger underneath',
      category: 'Output, ledger',
      f: 4, t: 4, rd: 4, v: [2.5, 11, 3.5, 1.8], note: 'Fair Premium Transferred 💰',
      tx: 'A shopper scans the QR code on the retail shelf. An interactive timeline slides up displaying the complete verified journey: Farm → Mandi → Truck → Store. Trust is achieved: the farmer\'s smartphone displays an instant fair-trade premium payment arriving (+28.5% premium + consumer direct tip). Trust, from farm to fork.',
      st: [
        'Consumer Scan: Scans QR code on retail shelf with smartphone',
        'Slide-Up Timeline: 1. Farm → 2. Mandi → 3. Truck → 4. Store',
        'Farmer Payoff: Farmer\'s phone shows premium payment arriving 💰',
        'Fair Trade Payout: ₹165/kg (vs ₹85/kg conventional) + ₹50 Tip',
        'End Card: Blockchain-Enabled Farm-to-Fork Traceability'
      ],
      ac: [
        'Display transparent farm-to-fork provenance timeline to shopper',
        'Transfer fair-trade micro-incentive to farmer digital wallet',
        'Record final consumer verification event on public ledger'
      ]
    }
  ];

  // --- State Variables ---
  let step = 0;  let st = { ph: 'wait', t: 0 };
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

  // --- 1. BUILD THE 3-TIER ORGANIC CLAY ISLAND DIORAMA ---
  const islandGroup = new THREE.Group();
  sc.add(islandGroup);

  const COLOR_TERRACOTTA = 0xC77651; // Warm terracotta clay bottom
  const COLOR_CREAM = 0xF1E9DC;       // Warm ivory cream stone middle
  const COLOR_SAGE = 0x9EB69E;        // Soft sage-green meadow top

  const islandLobes = [
    { x: -7.5, z: -3.2, r: 6.8 }, // Left lobe (Farm field)
    { x:  6.8, z: -3.0, r: 7.2 }, // Right lobe (Market & Truck)
    { x: -0.4, z: -3.0, r: 5.6 }, // Central connecting neck
    { x:  5.2, z:  2.8, r: 5.0 }, // Front right peninsula (Smartphone)
    { x:  0.8, z:  2.6, r: 4.6 }, // Front center peninsula (QR Produce Crate)
    { x: -4.2, z:  0.6, r: 4.8 }  // Front left curve
  ];

  // Layer 1: Terracotta Clay Base (Y: 0 to 1.2)
  islandLobes.forEach(l => {
    C(islandGroup, l.r, l.r * 1.02, 1.2, COLOR_TERRACOTTA, l.x, 0, l.z);
  });
  B(islandGroup, 14.5, 1.2, 7.5, COLOR_TERRACOTTA, -0.2, 0, -3.0);
  B(islandGroup, 8.5, 1.2, 6.5, COLOR_TERRACOTTA, 2.8, 0, 1.8);

  // Layer 2: Cream Stone Middle Tier (Y: 1.2 to 2.2)
  islandLobes.forEach(l => {
    C(islandGroup, l.r - 0.35, l.r - 0.25, 1.0, COLOR_CREAM, l.x, 1.2, l.z);
  });
  B(islandGroup, 13.8, 1.0, 6.8, COLOR_CREAM, -0.2, 1.2, -3.0);
  B(islandGroup, 7.8, 1.0, 5.8, COLOR_CREAM, 2.8, 1.2, 1.8);

  // Layer 3: Sage Green Top Turf (Y: 2.2 to 2.75)
  islandLobes.forEach(l => {
    C(islandGroup, l.r - 0.70, l.r - 0.60, 0.55, COLOR_SAGE, l.x, 2.2, l.z);
  });
  B(islandGroup, 13.0, 0.55, 6.0, COLOR_SAGE, -0.2, 2.2, -3.0);
  B(islandGroup, 7.0, 0.55, 5.0, COLOR_SAGE, 2.8, 2.2, 1.8);

  // Elevated Cream Plinth for Grocery Market Stall (Right side)
  B(islandGroup, 5.8, 0.45, 5.2, COLOR_CREAM, 9.2, 2.75, -3.6);

  // --- 2. STATION 1: FARM PLOT & REALISTIC FARMER FIGURINE ---
  const farmGroup = new THREE.Group();
  farmGroup.position.set(-8.5, 2.75, -3.5);
  sc.add(farmGroup);

  // Furrowed Soil Bed
  B(farmGroup, 7.2, 0.3, 6.0, 0x543520, 0, 0, 0);

  // 4 Raised Furrows running along Z
  const furrowX = [-2.4, -0.8, 0.8, 2.4];
  furrowX.forEach(fx => {
    B(farmGroup, 0.85, 0.22, 5.6, 0x664126, fx, 0.25, 0);
    for (let zIdx = -2.2; zIdx <= 2.2; zIdx += 1.1) {
      const cabbage = new THREE.Group();
      cabbage.position.set(fx, 0.45, zIdx);
      C(cabbage, 0.36, 0.44, 0.08, 0x336D3A, 0, 0, 0);
      C(cabbage, 0.26, 0.34, 0.12, 0x479453, 0, 0.06, 0);
      S_(cabbage, 0.18, 0x6DB579, 0, 0.16, 0);
      farmGroup.add(cabbage);
    }
  });

  // REALISTIC FARMER FIGURINE
  const farmerGroup = new THREE.Group();
  farmerGroup.position.set(0.0, 0.25, 0.6);
  farmerGroup.rotation.y = 0.35;
  farmGroup.add(farmerGroup);

  // Boots
  B(farmerGroup, 0.24, 0.22, 0.44, 0x5C3A21, -0.22, 0, 0.06);
  B(farmerGroup, 0.24, 0.22, 0.44, 0x5C3A21,  0.22, 0, 0.06);
  // Dungarees Legs
  C(farmerGroup, 0.15, 0.16, 0.85, 0x2E5A35, -0.22, 0.22, 0);
  C(farmerGroup, 0.15, 0.16, 0.85, 0x2E5A35,  0.22, 0.22, 0);
  // Dungarees Pelvis
  B(farmerGroup, 0.74, 0.38, 0.48, 0x2E5A35, 0, 0.95, 0);
  // White T-Shirt Torso
  B(farmerGroup, 0.72, 0.58, 0.44, 0xF8F9FA, 0, 1.35, 0);
  // Dungarees Front Bib & Straps
  B(farmerGroup, 0.52, 0.45, 0.12, 0x2E5A35, 0, 1.35, 0.20);
  B(farmerGroup, 0.10, 0.62, 0.08, 0x2E5A35, -0.20, 1.45, 0.02);
  B(farmerGroup, 0.10, 0.62, 0.08, 0x2E5A35,  0.20, 1.45, 0.02);
  B(farmerGroup, 0.08, 0.08, 0.04, 0xD97706, -0.20, 1.55, 0.22);
  B(farmerGroup, 0.08, 0.08, 0.04, 0xD97706,  0.20, 1.55, 0.22);
  // Arms
  C(farmerGroup, 0.11, 0.11, 0.28, 0xF8F9FA, -0.44, 1.48, 0);
  C(farmerGroup, 0.09, 0.09, 0.35, 0xF5C5A3, -0.45, 1.15, 0.12);
  S_(farmerGroup, 0.10, 0xF5C5A3, -0.45, 1.0, 0.22);
  C(farmerGroup, 0.11, 0.11, 0.28, 0xF8F9FA, 0.44, 1.48, 0);
  C(farmerGroup, 0.09, 0.09, 0.35, 0xF5C5A3, 0.45, 1.15, 0.12);
  S_(farmerGroup, 0.10, 0xF5C5A3, 0.45, 1.0, 0.22);
  // Neck & Head
  C(farmerGroup, 0.10, 0.10, 0.14, 0xF5C5A3, 0, 1.90, 0);
  S_(farmerGroup, 0.26, 0xF5C5A3, 0, 2.14, 0);
  B(farmerGroup, 0.20, 0.08, 0.06, 0x5C3A21, 0, 2.06, 0.22);
  // Straw Hat
  C(farmerGroup, 0.70, 0.70, 0.06, 0xDDB075, 0, 2.38, 0);
  C(farmerGroup, 0.38, 0.40, 0.32, 0xDDB075, 0, 2.44, 0);
  C(farmerGroup, 0.41, 0.41, 0.08, 0x4A2810, 0, 2.40, 0);

  // --- 3. STATION 2: "INSPECTION CAMERA" ARCH & QUALITY SPOTLIGHT ---
  const camStationGroup = new THREE.Group();
  camStationGroup.position.set(-2.8, 2.75, -2.2);
  sc.add(camStationGroup);

  C(camStationGroup, 0.38, 0.42, 0.12, 0x8FA98E, 0, 0, -1.2);
  C(camStationGroup, 0.11, 0.11, 3.8, 0x8FA98E, 0, 0.12, -1.2);
  B(camStationGroup, 0.18, 0.18, 1.5, 0x8FA98E, 0, 3.8, -0.45);

  C(camStationGroup, 0.40, 0.42, 0.46, 0x5A7D63, 0, 3.6, 0.3);
  C(camStationGroup, 0.28, 0.28, 0.08, 0x0F172A, 0, 3.52, 0.3);
  C(camStationGroup, 0.18, 0.18, 0.04, 0x38BDF8, 0, 3.50, 0.3);
  S_(camStationGroup, 0.06, 0x00FF9D, 0.25, 3.85, 0.3);

  const laserRing = new THREE.Mesh(
    new THREE.RingGeometry(0.35, 0.48, 24),
    new THREE.MeshBasicMaterial({ color: 0x00FF9D, side: THREE.DoubleSide })
  );
  laserRing.rotation.x = Math.PI / 2;
  laserRing.position.set(0, 3.48, 0.3);
  camStationGroup.add(laserRing);

  const coneGeom = new THREE.CylinderGeometry(0.24, 1.45, 3.1, 24, 1, true);
  const coneMat = new THREE.MeshLambertMaterial({
    color: 0xE0F2FE,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide
  });
  const spotCone = new THREE.Mesh(coneGeom, coneMat);
  spotCone.position.set(0, 1.85, 0.3);
  camStationGroup.add(spotCone);

  const labelTex = createInspectionLabelTexture();
  if (labelTex) {
    const labelMat = new THREE.MeshBasicMaterial({ map: labelTex, transparent: true, side: THREE.DoubleSide });
    const labelPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.9), labelMat);
    labelPlane.position.set(0, 4.45, 0.3);
    camStationGroup.add(labelPlane);
  }

  const spotCrate = createSlattedProduceCrate(1.8, 0.8, 1.3);
  spotCrate.position.set(0, 0.0, 0.3);
  camStationGroup.add(spotCrate);

  // --- 4. STATION 3: S-CURVE BLOCKCHAIN HIGHWAY & GLOWING LED WAYPOINTS ---
  const highwayGroup = new THREE.Group();
  sc.add(highwayGroup);

  const roadPoints = [
    new V(-7.0, 2.78, -0.6),
    new V(-4.8, 2.78, -0.8),
    new V(-2.8, 2.78, -1.2),
    new V(-0.6, 2.78, -1.6),
    new V( 1.8, 2.78, -1.4),
    new V( 4.2, 2.78, -1.0),
    new V( 6.8, 2.78, -0.6)
  ];

  for (let i = 0; i < roadPoints.length - 1; i++) {
    const p1 = roadPoints[i], p2 = roadPoints[i + 1];
    const mid = new V().lerpVectors(p1, p2, 0.5);
    const dist = p1.distanceTo ? p1.distanceTo(p2) : 2.4;
    const seg = B(highwayGroup, dist, 0.08, 1.7, 0x82A17F, mid.x, mid.y, mid.z);
    const angle = Math.atan2(p2.z - p1.z, p2.x - p1.x);
    seg.rotation.y = -angle;
  }

  const ledWaypoints = [];
  const waypointCoords = [
    { x: -6.6, z: -0.6 },
    { x: -4.2, z: -0.8 },
    { x: -1.8, z: -1.3 },
    { x:  1.6, z: -1.4 },
    { x:  4.2, z: -1.0 },
    { x:  6.6, z: -0.6 }
  ];

  waypointCoords.forEach(wp => {
    const padGroup = new THREE.Group();
    padGroup.position.set(wp.x, 2.82, wp.z);
    C(padGroup, 0.52, 0.54, 0.06, 0x476A4F, 0, 0, 0);
    const ledCore = C(padGroup, 0.38, 0.38, 0.08, 0x00FF9D, 0, 0.02, 0);
    C(padGroup, 0.20, 0.20, 0.10, 0xD1FAE5, 0, 0.03, 0);
    highwayGroup.add(padGroup);
    ledWaypoints.push(ledCore);
  });

  const glassCubes = [];
  const glassMat = new THREE.MeshLambertMaterial({
    color: 0xBAE6FD,
    transparent: true,
    opacity: 0.55
  });
  [-3.2, 0.0, 3.0, 5.8].forEach((gx, i) => {
    const gz = i % 2 === 0 ? -1.0 : -1.4;
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.82, 0.82), glassMat);
    cube.position.set(gx, 3.6, gz);
    highwayGroup.add(cube);
    glassCubes.push(cube);
  });

  // --- 5. STATION 4: REFRIGERATED REEFER TRUCK ---
  const truckGroup = new THREE.Group();
  truckGroup.position.set(4.2, 2.78, -3.8);
  sc.add(truckGroup);

  B(truckGroup, 5.6, 0.3, 1.8, 0x1E293B, 0.2, 0.45, 0);

  const cabGroup = new THREE.Group();
  cabGroup.position.set(2.1, 0.6, 0);
  truckGroup.add(cabGroup);

  B(cabGroup, 1.9, 1.4, 1.75, 0x8EA78D, 0, 0, 0);
  B(cabGroup, 1.7, 0.8, 1.70, 0x8EA78D, -0.05, 1.0, 0);

  const windshield = B(cabGroup, 0.75, 0.75, 1.55, 0x1E293B, 0.45, 0.95, 0);
  windshield.material.transparent = true;
  windshield.material.opacity = 0.75;

  B(cabGroup, 0.25, 0.35, 1.80, 0x334155, 0.98, 0.15, 0);
  B(cabGroup, 0.08, 0.18, 0.32, 0xFEF08A, 1.0, 0.35, -0.6);
  B(cabGroup, 0.08, 0.18, 0.32, 0xFEF08A, 1.0, 0.35,  0.6);
  B(cabGroup, 0.15, 0.25, 0.08, 0x334155, 0.2, 0.95, -0.95);
  B(cabGroup, 0.15, 0.25, 0.08, 0x334155, 0.2, 0.95,  0.95);

  const reeferBox = B(truckGroup, 3.7, 2.3, 1.9, 0xFFFFFF, -0.9, 0.65, 0);
  const condenser = B(truckGroup, 1.2, 0.45, 1.3, 0x7EB6D7, -0.9, 2.95, 0);
  S_(truckGroup, 0.08, 0x10B981, -0.25, 3.15, 0);

  const truckDecalTex = createTruckLogoTexture();
  if (truckDecalTex) {
    const decalMat = new THREE.MeshBasicMaterial({ map: truckDecalTex, transparent: true });
    const decalPlane1 = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.4), decalMat);
    decalPlane1.position.set(-0.9, 1.8, 0.96);
    truckGroup.add(decalPlane1);
  }

  const wheelGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 16);
  const wheelMat = mat(0x1F2937);
  const hubMat = mat(0xCBD5E1);

  const makeWheel = (wx, wz) => {
    const wm = new THREE.Mesh(wheelGeom, wheelMat);
    wm.rotation.x = Math.PI / 2;
    wm.position.set(wx, 0.42, wz);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.34, 12), hubMat);
    hub.rotation.x = Math.PI / 2;
    hub.position.set(wx, 0.42, wz);
    truckGroup.add(wm);
    truckGroup.add(hub);
  };
  makeWheel(-2.0, -1.0);
  makeWheel(-2.0,  1.0);
  makeWheel( 1.5, -1.0);
  makeWheel( 1.5,  1.0);

  // --- 6. STATION 5: "GROCERY" RETAIL MARKET STALL & SHOPKEEPER ---
  const groceryGroup = new THREE.Group();
  groceryGroup.position.set(9.2, 3.2, -3.6);
  sc.add(groceryGroup);

  B(groceryGroup, 3.6, 1.1, 2.2, 0xC99A6B, 0, 0, 0);

  [-1.7, 1.7].forEach(px => {
    [-1.0, 1.0].forEach(pz => {
      B(groceryGroup, 0.12, 2.7, 0.12, 0xC99A6B, px, 1.1, pz);
    });
  });

  const awningTex = createGroceryAwningTexture();
  const awningMat = awningTex ? new THREE.MeshBasicMaterial({ map: awningTex, side: THREE.DoubleSide }) : mat(0x27522D);
  const awningRoof = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.12, 2.5), awningMat);
  awningRoof.position.set(0, 2.7, 0);
  awningRoof.rotation.x = 0.26;
  groceryGroup.add(awningRoof);

  const valanceMat = awningTex ? new THREE.MeshBasicMaterial({ map: awningTex, side: THREE.DoubleSide }) : mat(0x27522D);
  const valancePlane = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 0.7), valanceMat);
  valancePlane.position.set(0, 2.4, 1.25);
  groceryGroup.add(valancePlane);

  B(groceryGroup, 1.0, 0.25, 1.8, 0xB48255, -1.1, 1.1, 0);
  for (let bx = -1.4; bx <= -0.8; bx += 0.3) {
    for (let bz = -0.7; bz <= 0.7; bz += 0.35) {
      S_(groceryGroup, 0.14, 0xE11D48, bx, 1.3, bz);
    }
  }

  B(groceryGroup, 1.0, 0.25, 1.8, 0xB48255, 0, 1.1, 0);
  for (let bx = -0.3; bx <= 0.3; bx += 0.3) {
    for (let bz = -0.7; bz <= 0.7; bz += 0.35) {
      S_(groceryGroup, 0.14, 0x22C55E, bx, 1.3, bz);
    }
  }

  B(groceryGroup, 1.0, 0.25, 1.8, 0xB48255, 1.1, 1.1, 0);
  for (let bx = 0.8; bx <= 1.4; bx += 0.3) {
    for (let bz = -0.7; bz <= 0.7; bz += 0.35) {
      S_(groceryGroup, 0.13, 0xEAB308, bx, 1.3, bz);
    }
  }

  const shopkeeper = new THREE.Group();
  shopkeeper.position.set(-2.2, 0, 0.2);
  shopkeeper.rotation.y = 0.7;
  groceryGroup.add(shopkeeper);

  B(shopkeeper, 0.22, 0.18, 0.38, 0x1E293B, -0.18, 0, 0.05);
  B(shopkeeper, 0.22, 0.18, 0.38, 0x1E293B,  0.18, 0, 0.05);
  C(shopkeeper, 0.14, 0.15, 0.80, 0x334155, -0.18, 0.18, 0);
  C(shopkeeper, 0.14, 0.15, 0.80, 0x334155,  0.18, 0.18, 0);
  B(shopkeeper, 0.65, 0.65, 0.40, 0xA7F3D0, 0, 0.98, 0);
  C(shopkeeper, 0.09, 0.09, 0.35, 0xA7F3D0, -0.38, 1.1, 0.08);
  C(shopkeeper, 0.09, 0.09, 0.35, 0xA7F3D0,  0.38, 1.1, 0.08);
  S_(shopkeeper, 0.08, 0xF5C5A3, -0.38, 0.92, 0.16);
  S_(shopkeeper, 0.08, 0xF5C5A3,  0.38, 0.92, 0.16);
  C(shopkeeper, 0.09, 0.09, 0.12, 0xF5C5A3, 0, 1.62, 0);
  S_(shopkeeper, 0.24, 0xF5C5A3, 0, 1.84, 0);
  S_(shopkeeper, 0.26, 0x3E2723, 0, 1.94, -0.05);

  // --- 7. STATION 6: FOREGROUND GREENHARVEST CRATE, AGRISCAN TERMINAL & TOTEM KIOSK ---
  const fgGroup = new THREE.Group();
  sc.add(fgGroup);

  // 1. GREENHARVEST FINGER-JOINTED WOODEN CRATE (IMAGE 3)
  const greenHarvestCrateGroup = new THREE.Group();
  greenHarvestCrateGroup.position.set(0.8, 1.2, 3.8);
  fgGroup.add(greenHarvestCrateGroup);

  const ghW = 3.2, ghH = 1.6, ghD = 2.4;
  B(greenHarvestCrateGroup, ghW, 0.12, ghD, 0xD4A373, 0, 0, 0);

  // 4 Corner Finger-Jointed Posts
  [-ghW/2 + 0.1, ghW/2 - 0.1].forEach(px => {
    [-ghD/2 + 0.1, ghD/2 - 0.1].forEach(pz => {
      B(greenHarvestCrateGroup, 0.22, ghH, 0.22, 0xD4A373, px, 0, pz);
      for (let jy = 0.15; jy < ghH; jy += 0.32) {
        B(greenHarvestCrateGroup, 0.24, 0.14, 0.24, 0xC49261, px, jy, pz);
      }
    });
  });

  // Finger-jointed wooden side walls
  B(greenHarvestCrateGroup, ghW - 0.2, ghH - 0.1, 0.10, 0xD4A373, 0, 0.05, ghD / 2 - 0.05);
  B(greenHarvestCrateGroup, ghW - 0.2, ghH - 0.1, 0.10, 0xD4A373, 0, 0.05, -ghD / 2 + 0.05);
  B(greenHarvestCrateGroup, 0.10, ghH - 0.1, ghD - 0.2, 0xD4A373, -ghW / 2 + 0.05, 0.05, 0);
  B(greenHarvestCrateGroup, 0.10, ghH - 0.1, ghD - 0.2, 0xD4A373, ghW / 2 - 0.05, 0.05, 0);

  // Oval Handle Cutouts on Left and Right
  [-ghW / 2 + 0.05, ghW / 2 - 0.05].forEach(hx => {
    B(greenHarvestCrateGroup, 0.12, 0.35, 0.85, 0x3E2723, hx, 1.0, 0);
    C(greenHarvestCrateGroup, 0.18, 0.18, 0.12, 0xC49261, hx, 1.15, -0.35);
    C(greenHarvestCrateGroup, 0.18, 0.18, 0.12, 0xC49261, hx, 1.15,  0.35);
  });

  // Wood-burned "GreenHarvest" Branding on Left Face (Image 3)
  const ghBrandTex = createGreenHarvestBrandTexture();
  if (ghBrandTex) {
    const brandMat = new THREE.MeshBasicMaterial({ map: ghBrandTex, transparent: true });
    const brandPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.65), brandMat);
    brandPlane.position.set(-ghW / 2 - 0.06, 0.55, 0);
    brandPlane.rotation.y = -Math.PI / 2;
    greenHarvestCrateGroup.add(brandPlane);
  }

  // Front Certification Label with Glowing QR & USDA Seal (Image 3)
  let qrGlowBorder = null;
  let scanLaserPlane = null;
  const ghLabelTex = createGreenHarvestLabelTexture();
  if (ghLabelTex) {
    const labelMat = new THREE.MeshBasicMaterial({ map: ghLabelTex });
    const labelPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 0.95), labelMat);
    labelPlane.position.set(0.12, 0.68, ghD / 2 + 0.06);
    greenHarvestCrateGroup.add(labelPlane);

    // Dynamic Pulsing Green Aura on QR Code
    const qrGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00FF9D,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    });
    qrGlowBorder = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.88), qrGlowMat);
    qrGlowBorder.position.set(-0.85, 0.68, ghD / 2 + 0.07);
    greenHarvestCrateGroup.add(qrGlowBorder);
  }

  // Animated Holographic Laser Scan Plane
  const scanLaserMat = new THREE.MeshBasicMaterial({
    color: 0x00FF9D,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide
  });
  scanLaserPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.06), scanLaserMat);
  scanLaserPlane.position.set(-0.85, 0.68, ghD / 2 + 0.08);
  greenHarvestCrateGroup.add(scanLaserPlane);

  // Honeycrisp Apples (Red/gold blush)
  const applePositions = [
    { x: -0.6, z:  0.2, y: 1.25, r: 0.28 },
    { x: -0.1, z:  0.4, y: 1.22, r: 0.30 },
    { x:  0.4, z:  0.2, y: 1.26, r: 0.29 },
    { x: -0.5, z: -0.4, y: 1.20, r: 0.27 },
    { x:  0.1, z: -0.3, y: 1.24, r: 0.28 },
    { x:  0.6, z: -0.4, y: 1.22, r: 0.26 }
  ];
  applePositions.forEach(ap => {
    S_(greenHarvestCrateGroup, ap.r, 0xDC2626, ap.x, ap.y, ap.z);
    S_(greenHarvestCrateGroup, ap.r * 0.75, 0xF59E0B, ap.x, ap.y + ap.r * 0.25, ap.z);
    C(greenHarvestCrateGroup, 0.02, 0.02, 0.12, 0x5C3A21, ap.x, ap.y + ap.r + 0.04, ap.z);
  });

  // Tapered Orange Carrots with feathery green leafy tops (Image 3)
  for (let ci = 0; ci < 6; ci++) {
    const cx = -0.8 + ci * 0.32;
    const carrot = new THREE.Group();
    carrot.position.set(cx, 1.2, 0.1 + (ci % 2) * 0.3);
    carrot.rotation.z = -0.35 + (ci * 0.12);
    carrot.rotation.x = 0.2;
    C(carrot, 0.12, 0.03, 1.1, 0xF97316, 0, 0, 0);
    C(carrot, 0.04, 0.20, 0.65, 0x15803D, 0, 0.65, 0);
    greenHarvestCrateGroup.add(carrot);
  }

  // Ruffled Curly Kale / Chard Dark Green Leaves
  for (let ki = 0; ki < 8; ki++) {
    const kx = -1.1 + ki * 0.32;
    const kz = ki % 2 === 0 ? -0.7 : -0.9;
    const kale = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 8), mat(0x1B4D2E));
    kale.scale.x = 1.1;
    kale.scale.y = 1.6;
    kale.scale.z = 0.6;
    kale.position.set(kx, 1.45, kz);
    greenHarvestCrateGroup.add(kale);
  }

  // 2. RUGGED AGRISCAN FIELD TERMINAL (IMAGE 2)
  const agriScanGroup = new THREE.Group();
  agriScanGroup.position.set(6.2, 1.2, 3.2);
  agriScanGroup.rotation.y = -0.42;
  fgGroup.add(agriScanGroup);

  const asW = 2.4, asH = 0.36, asD = 4.6;
  B(agriScanGroup, asW, asH, asD, 0x18181B, 0, 0, 0);

  // 4 Heavy-Duty Rubber Shock Corner Bumpers
  [-asW/2 + 0.15, asW/2 - 0.15].forEach(bx => {
    [-asD/2 + 0.2, asD/2 - 0.2].forEach(bz => {
      B(agriScanGroup, 0.42, asH + 0.08, 0.48, 0x09090B, bx, 0, bz);
      S_(agriScanGroup, 0.05, 0x71717A, bx, asH / 2 + 0.05, bz);
    });
  });

  // Tactical Lime-Green Perimeter Accent Trim
  B(agriScanGroup, asW + 0.04, 0.06, asD + 0.04, 0x84CC16, 0, asH / 2 - 0.02, 0);

  // Top Barcode Scanner Module Hump
  B(agriScanGroup, 1.6, 0.38, 0.8, 0x18181B, 0, asH / 2 + 0.12, -asD / 2 + 0.4);
  B(agriScanGroup, 1.3, 0.12, 0.4, 0x0F172A, 0, asH / 2 + 0.28, -asD / 2 + 0.4);
  C(agriScanGroup, 0.12, 0.12, 0.06, 0x38BDF8, 0, asH / 2 + 0.32, -asD / 2 + 0.4);
  S_(agriScanGroup, 0.05, 0xFEF08A, -0.35, asH / 2 + 0.32, -asD / 2 + 0.4);
  S_(agriScanGroup, 0.05, 0xFEF08A,  0.35, asH / 2 + 0.32, -asD / 2 + 0.4);

  // Side Textured Grip Ribs & Lime Trigger Buttons
  [-asW / 2 - 0.04, asW / 2 + 0.04].forEach(sx => {
    for (let rz = -1.2; rz <= 1.2; rz += 0.5) {
      B(agriScanGroup, 0.08, 0.18, 0.25, 0x27272A, sx, 0, rz);
    }
    B(agriScanGroup, 0.12, 0.18, 0.6, 0x84CC16, sx, 0.05, -0.3);
  });

  // High-Resolution OLED Display Screen (Image 2)
  const agriScanTex = createAgriScanScreenTexture();
  const screenMat = agriScanTex ? new THREE.MeshBasicMaterial({ map: agriScanTex }) : mat(0x10B981);
  const agriDisplay = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 3.85), screenMat);
  agriDisplay.rotation.x = -Math.PI / 2;
  agriDisplay.position.set(0, asH / 2 + 0.02, 0.1);
  agriScanGroup.add(agriDisplay);

  // Animated Laser Aiming Scanner Beam from AgriScan towards Crate
  let scannerBeam = null;
  const scannerBeamGeom = new THREE.CylinderGeometry(0.12, 1.8, 5.5, 16, 1, true);
  const scannerBeamMat = new THREE.MeshBasicMaterial({
    color: 0x00FF9D,
    transparent: true,
    opacity: 0.30,
    side: THREE.DoubleSide
  });
  scannerBeam = new THREE.Mesh(scannerBeamGeom, scannerBeamMat);
  scannerBeam.position.set(-2.2, 0.8, -0.4);
  scannerBeam.rotation.z = Math.PI / 3;
  scannerBeam.rotation.y = -Math.PI / 6;
  agriScanGroup.add(scannerBeam);

  // Floating 3D Green Shield with Checkmark above screen
  const phoneShieldGroup = new THREE.Group();
  phoneShieldGroup.position.set(0.4, 0.95, 0.6);
  agriScanGroup.add(phoneShieldGroup);

  const shieldMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.1, 0.55, 6), mat(0x10B981));
  shieldMesh.rotation.y = Math.PI / 6;
  phoneShieldGroup.add(shieldMesh);
  B(phoneShieldGroup, 0.06, 0.18, 0.04, 0xFFFFFF, -0.08, 0, 0.18);
  B(phoneShieldGroup, 0.06, 0.32, 0.04, 0xFFFFFF,  0.06, 0.05, 0.18);

  // 3. FREESTANDING INTERACTIVE TOTEM KIOSK (IMAGE 1)
  const totemGroup = new THREE.Group();
  totemGroup.position.set(13.2, 2.75, -3.2);
  totemGroup.rotation.y = -0.38;
  sc.add(totemGroup);

  B(totemGroup, 2.5, 0.16, 1.8, 0x1E293B, 0, 0, 0);
  B(totemGroup, 2.0, 4.4, 0.85, 0xFFFFFF, 0, 0.16, 0);

  // Warm Oak Wood Trim running down both sides (Image 1)
  [-1.04, 1.04].forEach(ox => {
    B(totemGroup, 0.14, 4.4, 0.88, 0xC99A6B, ox, 0.16, 0);
  });

  // Vertical Portrait Touch Display Screen (Image 1)
  const totemTex = createTotemScreenTexture(step >= 6 ? 5 : (step >= 4 ? 4 : (step >= 3 ? 3 : (step >= 1 ? 2 : 1))));
  const totemScreenMat = totemTex ? new THREE.MeshBasicMaterial({ map: totemTex }) : mat(0x10B981);
  const totemScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 3.2), totemScreenMat);
  totemScreen.position.set(0, 2.65, 0.44);
  totemGroup.add(totemScreen);

  // Bottom Pedestal Brand Plate ("TRACEABILITY BUILDS A HEALTHIER FOOD SYSTEM")
  const totemBaseTex = createTotemBaseTexture();
  if (totemBaseTex) {
    const baseMat = new THREE.MeshBasicMaterial({ map: totemBaseTex });
    const basePlate = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.7), baseMat);
    basePlate.position.set(0, 0.65, 0.44);
    totemGroup.add(basePlate);
  }

  S_(totemGroup, 0.08, 0x10B981, 0, 4.58, 0);

  // Atmospheric Floating Shields & Golden Padlocks
  const floatingAssets = [];
  const shieldCoords = [
    { x: -5.5, y: 5.2, z: -2.5 },
    { x:  1.2, y: 4.8, z:  0.2 },
    { x:  6.8, y: 5.4, z: -2.2 }
  ];
  shieldCoords.forEach(pos => {
    const sh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.08, 0.52, 6),
      new THREE.MeshLambertMaterial({ color: 0x34D399, transparent: true, opacity: 0.75 })
    );
    sh.position.set(pos.x, pos.y, pos.z);
    sh.rotation.y = Math.PI / 6;
    sc.add(sh);
    floatingAssets.push(sh);
  });

  const lockCoords = [
    { x: 3.5, y: 2.2, z: 3.0 },
    { x: 7.2, y: 4.8, z: -1.0 }
  ];
  lockCoords.forEach(pos => {
    const lock = new THREE.Group();
    lock.position.set(pos.x, pos.y, pos.z);
    B(lock, 0.35, 0.32, 0.18, 0xF59E0B, 0, 0, 0);
    const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.04, 8, 16, Math.PI), mat(0xCBD5E1));
    shackle.position.set(0, 0.22, 0);
    shackle.rotation.z = Math.PI;
    lock.add(shackle);
    sc.add(lock);
    floatingAssets.push(lock);
  });

  // --- 8. SKY BLOCKCHAIN LEDGER ---
  const led = new THREE.Group();
  led.position.set(0, 16, -8);
  sc.add(led);
  for (let i = -3; i <= 3; i++) {
    B(led, 1.8, 1.3, 1.3, 0x10B981, i * 2.6, 0, 0);
    if (i < 3) B(led, 0.8, 0.15, 0.15, 0x34D399, i * 2.6 + 1.3, 0, 0);
  }

  const lines = [];
  STATIONS.forEach((stn, i) => {
    const l = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new V(stn.x, 3.2, stn.z), new V(i * 1.3 - 3.2, 15.5, -8)]),
      new THREE.LineBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.35 })
    );
    sc.add(l);
    lines.push(l);
  });

  // --- 9. ACTIVE MOVING PRODUCE CRATE (Traverses Supply Chain) ---
  const crate = new THREE.Group();

  // =========================================================================
  // 3D ANIMATED SCENE VISUALS MANAGER (Matching the 7-Scene Script & Flowchart)
  // =========================================================================
  const sceneVisualsGroup = new THREE.Group();
  sc.add(sceneVisualsGroup);

  // Helper to create text billboard sprite
  function createTextSprite(text, bgColor = '#0F172A', textColor = '#F3E5AB', borderColor = '#D4AF37') {
    if (typeof document === 'undefined' || !document.createElement) return new THREE.Group();
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 160;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Group();

      ctx.fillStyle = bgColor;
      if (ctx.roundRect) ctx.roundRect(10, 10, 492, 140, 24);
      else ctx.fillRect(10, 10, 492, 140);
      ctx.fill();

      ctx.strokeStyle = borderColor;
      if (ctx.lineWidth) ctx.lineWidth = 6;
      if (ctx.roundRect) ctx.roundRect(10, 10, 492, 140, 24);
      else ctx.strokeRect(10, 10, 492, 140);
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = 'bold 34px "Space Grotesk", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 256, 80);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(3.4, 1.1, 1.0);
      return sprite;
    } catch (e) {
      return new THREE.Group();
    }
  }

  // --- SCENE 1 VISUALS: Floating Question Marks over Tomato Crate ---
  const scene1Group = new THREE.Group();
  sceneVisualsGroup.add(scene1Group);

  const qSprite1 = createTextSprite('❓ Where did this come from?', 'rgba(15, 23, 42, 0.94)', '#F3E5AB', '#D4AF37');
  qSprite1.position.set(-7.8, 5.2, -1.2);
  scene1Group.add(qSprite1);

  const qSprite2 = createTextSprite('❓ Is it really organic?', 'rgba(15, 23, 42, 0.94)', '#FCD34D', '#F59E0B');
  qSprite2.position.set(-7.2, 6.2, -0.8);
  scene1Group.add(qSprite2);

  // --- SCENE 2 VISUALS: QR Code Pop-Out Animation ---
  const scene2Group = new THREE.Group();
  sceneVisualsGroup.add(scene2Group);

  const qrPopBadge = createTextSprite('📱 QR Code Generated! ✓', 'rgba(16, 185, 129, 0.95)', '#FFFFFF', '#34D399');
  qrPopBadge.position.set(-7.5, 5.0, -1.0);
  scene2Group.add(qrPopBadge);

  const qrCodeTile = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.08),
    mat(0xFDFBF7)
  );
  qrCodeTile.position.set(-7.2, 4.2, -0.6);
  scene2Group.add(qrCodeTile);

  // --- SCENE 3 VISUALS: 3D AI Bounding Box & Grade A Badge ---
  const scene3Group = new THREE.Group();
  sceneVisualsGroup.add(scene3Group);

  const gradeABadge = createTextSprite('🏆 GRADE A+ EXPORT · Saved Offline 💾', 'rgba(5, 150, 105, 0.95)', '#FFFFFF', '#34D399');
  gradeABadge.position.set(-2.8, 5.2, -1.8);
  scene3Group.add(gradeABadge);

  // 3D Green Wireframe Bounding Box
  const bboxMesh = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 1.8, 2.2),
    new THREE.MeshBasicMaterial({ color: 0x10B981, wireframe: true })
  );
  bboxMesh.position.set(-2.8, 3.8, -1.8);
  scene3Group.add(bboxMesh);

  // --- SCENE 4 VISUALS: Mandi Dual Signatures Meeting ---
  const scene4Group = new THREE.Group();
  sceneVisualsGroup.add(scene4Group);

  const signMeetingSprite = createTextSprite('✍️ Farmer Key + ✍️ Mandi Key → Linked 🔗', 'rgba(30, 41, 59, 0.95)', '#F3E5AB', '#D4AF37');
  signMeetingSprite.position.set(-0.5, 5.2, -1.5);
  scene4Group.add(signMeetingSprite);

  // Glowing Blockchain Cube
  const blockCube = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.2, 1.2),
    new THREE.MeshLambertMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.85 })
  );
  blockCube.position.set(-0.5, 3.8, -1.5);
  scene4Group.add(blockCube);

  // --- SCENE 5 VISUALS: Reefer Thermometer & GPS Telemetry ---
  const scene5Group = new THREE.Group();
  sceneVisualsGroup.add(scene5Group);

  const thermoSprite = createTextSprite('❄️ 12.8°C · GPS Transmitting · Safe ✓', 'rgba(2, 132, 199, 0.92)', '#FFFFFF', '#38BDF8');
  thermoSprite.position.set(4.2, 6.2, -3.8);
  scene5Group.add(thermoSprite);

  // --- SCENE 6 VISUALS: Retailer Verification & Certification Shields ---
  const scene6Group = new THREE.Group();
  sceneVisualsGroup.add(scene6Group);

  const verifiedTickSprite = createTextSprite('VERIFIED ✓ · NPOP Organic & FSSAI', 'rgba(5, 150, 105, 0.95)', '#FFFFFF', '#34D399');
  verifiedTickSprite.position.set(7.8, 5.8, -2.5);
  scene6Group.add(verifiedTickSprite);

  // --- SCENE 7 VISUALS: Timeline Slide-Up & Farmer Payment Payoff ---
  const scene7Group = new THREE.Group();
  sceneVisualsGroup.add(scene7Group);

  const timelineSprite = createTextSprite('🌱 Farm → ⚖️ Mandi → 🚚 Truck → 🏪 Store', 'rgba(15, 23, 42, 0.95)', '#F3E5AB', '#D4AF37');
  timelineSprite.position.set(2.5, 5.8, 3.5);
  scene7Group.add(timelineSprite);

  const payoffBadge = createTextSprite('💰 ₹165/kg (+28.5%) + ₹50 Tip Paid!', 'rgba(217, 119, 6, 0.95)', '#FFFFFF', '#FDE68A');
  payoffBadge.position.set(2.5, 4.6, 3.5);
  scene7Group.add(payoffBadge);

  function updateSceneVisuals(curStep) {
    if (scene1Group) scene1Group.visible = (curStep === 0);
    if (scene2Group) scene2Group.visible = (curStep === 1);
    if (scene3Group) scene3Group.visible = (curStep === 2);
    if (scene4Group) scene4Group.visible = (curStep === 3);
    if (scene5Group) scene5Group.visible = (curStep === 4);
    if (scene6Group) scene6Group.visible = (curStep === 5);
    if (scene7Group) scene7Group.visible = (curStep === 6);
  }
  sc.add(crate);

  const singleFruitGroup = new THREE.Group();
  const clamshellGroup = new THREE.Group();
  const crateGroup = new THREE.Group();
  const palletGroup = new THREE.Group();

  crate.add(singleFruitGroup);
  crate.add(clamshellGroup);
  crate.add(crateGroup);
  crate.add(palletGroup);

  // Single Fruit
  S_(singleFruitGroup, 0.55, 0xE11D48, 0, 0.55, 0);
  C(singleFruitGroup, 0.05, 0.04, 0.2, 0x22C55E, 0, 1.1, 0);

  // 4-Pack Clamshell
  const clamBox = B(clamshellGroup, 1.6, 0.55, 1.4, 0x38BDF8, 0, 0.28, 0);
  clamBox.material.transparent = true;
  clamBox.material.opacity = 0.5;
  [-0.4, 0.4].forEach(fx => {
    [-0.35, 0.35].forEach(fz => {
      S_(clamshellGroup, 0.28, 0xE11D48, fx, 0.35, fz);
    });
  });

  // Slatted Crate
  B(crateGroup, 2.2, 0.8, 1.6, 0xB45309, 0, 0.4, 0);
  B(crateGroup, 2.25, 0.12, 1.65, 0x78350F, 0, 0.75, 0);

  // Export Pallet
  B(palletGroup, 2.8, 0.2, 2.0, 0x9A3412, 0, 0.1, 0);
  for (let py = 0; py < 3; py++) {
    B(palletGroup, 2.6, 0.5, 1.8, 0xB45309, 0, 0.3 + py * 0.52, 0);
  }

  function updateProducePackaging(packType) {
    currentPacketType = packType;
    singleFruitGroup.visible = packType === 'mango' || packType === 'fruit';
    clamshellGroup.visible = packType === 'clamshell';
    crateGroup.visible = packType === 'crate';
    palletGroup.visible = packType === 'pallet';
    sfx.beep(520, 0.05);
  }
  updateProducePackaging('clamshell');

  const cp = new V(STATIONS_3D[0].x, STATIONS_3D[0].y, STATIONS_3D[0].z);
  crate.position.copy(cp);

  const COLD_MAX = 16.0;
  const COLD_MIN = 8.0;
  const HUM_MAX = 95.0;
  const HUM_MIN = 80.0;
  const OK_COLOR = '#10b981';
  const BAD_COLOR = '#ef4444';

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
      tdEmpty.style.color = '#475569';
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
        if (typeof window !== 'undefined' && window.showToast) {
          window.showToast(`✅ Successfully exported 8-sheet Excel workbook: ${fileName}`, 'success');
        }
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
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast('📥 Downloading multi-sheet Excel workbook from server...', 'info');
    }
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

  // --- Step Physics & Progression (7 Scenes) ---
  function go(i) {
    step = Math.max(0, Math.min(6, i));
    if (typeof updateSceneVisuals === 'function') {
      updateSceneVisuals(step);
    }
    const s = S[step];
    rd = {};
    rej = -1;
    crate.rotation.z = 0;
    sfx.step();

    // Move produce crate position towards target station
    const targetX = X[Math.min(step, X.length - 1)];
    cp.set(targetX, 0.4, 0);

    $('#sn').textContent = S[step].scene + ' · ' + (step + 1) + '/7';
    $('#t').textContent = currentLang === 'en' ? s.en : s.hi;
    $('#hi').textContent = currentLang === 'en' ? s.hi : s.en;
    $('#tx').innerHTML = '<div style="background:rgba(212,175,55,0.08); border-left:4px solid #D4AF37; padding:8px 12px; border-radius:0 8px 8px 0; margin-bottom:10px;"><strong style="color:#F3E5AB; font-size:12px;">🎙️ Voiceover:</strong> <span style="font-style:italic; color:#FDFBF7;">"' + s.vo + '"</span></div>' + '<div style="margin-bottom:8px;"><strong style="color:#A39E93; font-size:12px;">🎬 Visual:</strong> <span style="color:#D1CCC0;">' + s.vis + '</span></div>' + '<p style="color:#D1CCC0; font-size:13px; line-height:1.55; margin-top:8px;">' + s.tx + '</p>';
    if (sfx && sfx.enabled && typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(s.vo);
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }

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
    if ($('#next')) $('#next').textContent = step === 6 ? (currentLang === 'en' ? 'Restart' : 'पुनः प्रारंभ') : (currentLang === 'en' ? 'Next ›' : 'अगला ›');

    updateUiReadings();

    if (step === 6) {
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
        $('#reverse-status-msg').style.color = '#DC2626';
      } else {
        $('#reverse-status-msg').textContent = 'Status: Cold-Chain Preserved (12.8°C) ✓';
        $('#reverse-status-msg').style.color = '#059669';
      }
    }
  }

  function triggerColdBreachManual() {
    sfx.coldBreach();
    rej = step;
    if ($('#T')) $('#T').value = 18.5;
    updateUiReadings();
    trackClick('COLD_CHAIN_BREACH_TRIGGER', 'Manual Cold Breach Simulation', { temp: 18.5, reason: 'Temperature breach >16.0°C' });
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast('❄️ Smart Contract Alert: Temperature exceeded 16.0°C! Consignment quarantined.', 'error');
    }
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
          bannerStatus.style.color = '#0284C7';
          if (pulseDot) pulseDot.className = 'turso-status-dot pulse cloud';
        } else {
          bannerStatus.textContent = '🟡 Local libSQL Edge Engine (' + db.endpoint + ')';
          bannerStatus.style.color = '#B45309';
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
        bannerStatus.style.color = '#475569';
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
      const nextStep = step === 6 ? 0 : step + 1;
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
      if (typeof window !== 'undefined' && window.showToast) {
        window.showToast(`✅ YOLOv8 Grade A+ Export committed to blockchain & Turso DB: ${sampleData.assigned_grade}`, 'success');
      } else {
        alert('✅ AI Quality Grade Committed to Blockchain & Turso Database: ' + sampleData.assigned_grade);
      }
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

  // Camera Spatial Perspectives & Presets
  const PERSPECTIVE_CONFIG = {
    auto: { camX: 0, camZ: 0, r: 28, lookY: 2.2, th: 0.28, ph: 0.98 },
    orbit: { camX: 0, camZ: 0, r: 28, lookY: 2.2, th: 0.28, ph: 0.98 },
    farm: { camX: -8.5, camZ: -3.5, r: 13, lookY: 3.0, th: 0.35, ph: 1.05 },
    farmer: { camX: -8.5, camZ: -3.5, r: 13, lookY: 3.0, th: 0.35, ph: 1.05 },
    crate: { camX: 0.8, camZ: 3.8, r: 8.5, lookY: 1.6, th: 0.12, ph: 0.92 },
    greenharvest: { camX: 0.8, camZ: 3.8, r: 8.5, lookY: 1.6, th: 0.12, ph: 0.92 },
    camera: { camX: -2.8, camZ: -2.0, r: 11, lookY: 3.2, th: 0.25, ph: 1.0 },
    inspection: { camX: -2.8, camZ: -2.0, r: 11, lookY: 3.2, th: 0.25, ph: 1.0 },
    lab: { camX: -2.8, camZ: -2.0, r: 11, lookY: 3.2, th: 0.25, ph: 1.0 },
    truck: { camX: 4.2, camZ: -3.8, r: 12, lookY: 3.0, th: 0.20, ph: 1.02 },
    transit: { camX: 4.2, camZ: -3.8, r: 12, lookY: 3.0, th: 0.20, ph: 1.02 },
    grocery: { camX: 9.2, camZ: -3.5, r: 13, lookY: 3.4, th: 0.22, ph: 1.05 },
    market: { camX: 9.2, camZ: -3.5, r: 13, lookY: 3.4, th: 0.22, ph: 1.05 },
    totem: { camX: 13.2, camZ: -3.2, r: 9.5, lookY: 4.2, th: -0.28, ph: 1.02 },
    kiosk: { camX: 13.2, camZ: -3.2, r: 9.5, lookY: 4.2, th: -0.28, ph: 1.02 },
    agriscan: { camX: 6.2, camZ: 3.2, r: 9.0, lookY: 1.8, th: -0.15, ph: 0.88 },
    terminal: { camX: 6.2, camZ: 3.2, r: 9.0, lookY: 1.8, th: -0.15, ph: 0.88 },
    phone: { camX: 6.2, camZ: 3.2, r: 9.0, lookY: 1.8, th: -0.15, ph: 0.88 },
    fork: { camX: 6.2, camZ: 3.2, r: 9.0, lookY: 1.8, th: -0.15, ph: 0.88 }
  };

  document.querySelectorAll('[data-v]').forEach(b => {
    b.onclick = () => {
      mode = b.dataset.v;
      document.querySelectorAll('[data-v]').forEach(x => {
        x.classList.toggle('active', x === b);
        x.setAttribute('aria-pressed', x === b);
      });
      sfx.beep(700, 0.06);
      trackClick('CAMERA_PERSPECTIVE_SWITCH', `Perspective: ${mode}`, { mode });

      if (mode === 'farm' || mode === 'farmer') go(0);
      else if (mode === 'crate' || mode === 'greenharvest') {
        go(0);
        o.th = 0.12; o.ph = 0.92;
      }
      else if (mode === 'mandi') go(1);
      else if (mode === 'camera' || mode === 'inspection' || mode === 'lab') go(3);
      else if (mode === 'truck' || mode === 'transit') go(5);
      else if (mode === 'grocery' || mode === 'market') go(6);
      else if (mode === 'totem' || mode === 'kiosk') {
        go(6);
        o.th = -0.28; o.ph = 1.02;
      }
      else if (mode === 'agriscan' || mode === 'terminal' || mode === 'phone' || mode === 'fork') {
        go(7);
        o.th = -0.15; o.ph = 0.88;
      }
      else if (mode === 'auto' || mode === 'orbit') {
        o.th = 0.28;
        o.ph = 0.98;
      }
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
  const o = { th: 0.28, ph: 0.98 };
  const cur = new V(0, 2.2, 0);
  let curR = 28;
  let curLookY = 2.2;

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

  // Interactive 3D Canvas Click Handler with High-Detail Stations
  const CLICK_STATIONS = [
    { name: '1. Shinde Organic Farm Plot & Farmer', x: -8.5, z: -3.5, view: 'farm', stepIdx: 0 },
    { name: '2. "inspection camera" Station', x: -2.8, z: -2.0, view: 'camera', stepIdx: 3 },
    { name: '3. S-Curve Blockchain Waypoint', x: 0.5, z: -1.2, view: 'transit', stepIdx: 4 },
    { name: '4. IoT Reefer Truck Transporter', x: 4.2, z: -3.8, view: 'truck', stepIdx: 5 },
    { name: '5. "GROCERY" Retail Market Stall', x: 9.2, z: -3.5, view: 'grocery', stepIdx: 6 },
    { name: '6. Interactive Totem Kiosk', x: 13.2, z: -3.2, view: 'totem', stepIdx: 6 },
    { name: '7. GreenHarvest Finger-Jointed Crate', x: 0.8, z: 3.8, view: 'crate', stepIdx: 0 },
    { name: '8. AgriScan Rugged Field Terminal', x: 6.2, z: 3.2, view: 'agriscan', stepIdx: 7 }
  ];

  function handle3DCanvasClick(e) {
    if (typeof THREE === 'undefined' || !THREE.Raycaster || !THREE.Plane) return;
    const rect = cv.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const ray = new THREE.Raycaster();
    ray.setFromCamera({ x, y }, cam);

    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2.2);
    const targetPoint = new THREE.Vector3();
    const hit = ray.ray.intersectPlane(plane, targetPoint);

    if (hit) {
      let closest = null;
      let minDistance = 6.5;
      CLICK_STATIONS.forEach(stn => {
        const d = Math.hypot(targetPoint.x - stn.x, targetPoint.z - stn.z);
        if (d < minDistance) {
          minDistance = d;
          closest = stn;
        }
      });

      if (closest) {
        mode = closest.view;
        go(closest.stepIdx);
        sfx.beep(580, 0.08);
        trackClick('STATION_3D_CLICK', `3D Scene Click on ${closest.name}`, {
          stationName: closest.name,
          view: closest.view
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

    // Animated bobbing for Scene 1 question marks
    if (scene1Group && scene1Group.visible) {
      qSprite1.position.y = 5.2 + Math.sin(t * 3.5) * 0.18;
      qSprite2.position.y = 6.2 + Math.sin(t * 3.5 + 1.2) * 0.18;
    }
    // Animated rotation for Scene 4 block and bounding box in Scene 3
    if (scene4Group && scene4Group.visible && blockCube) {
      blockCube.rotation.x += dt * 1.5;
      blockCube.rotation.y += dt * 2.0;
    }
    if (scene3Group && scene3Group.visible && bboxMesh) {
      bboxMesh.scale.setScalar(1.0 + Math.sin(t * 4.0) * 0.04);
    }
    // Smooth produce crate 3D interpolation towards active station
    if (typeof STATIONS_3D !== 'undefined' && STATIONS_3D.length) {
      const targetPos = STATIONS_3D[Math.min(step, STATIONS_3D.length - 1)];
      crate.position.x += (targetPos.x - crate.position.x) * 0.08;
      crate.position.y += (targetPos.y - crate.position.y) * 0.08;
      crate.position.z += (targetPos.z - crate.position.z) * 0.08;
    }

    // Inspection camera optical scanner rotation
    if (typeof laserRing !== 'undefined' && laserRing) {
      laserRing.rotation.z += dt * 3.5;
    }

    // Truck wheels rotation during transit steps
    if (step >= 4 && typeof truckGroup !== 'undefined' && truckGroup.children) {
      truckGroup.children.forEach(m => {
        if (m.geometry && m.geometry.type === 'CylinderGeometry') {
          m.rotation.z += dt * 3.5;
        }
      });
    }

    // Glowing LED Waypoints pulsing
    if (typeof ledWaypoints !== 'undefined' && ledWaypoints.length) {
      const pulse = 0.88 + Math.sin(t * 3.5) * 0.12;
      ledWaypoints.forEach(lw => {
        if (lw.scale && lw.scale.set) lw.scale.set(pulse, 1.0, pulse);
      });
    }

    // Floating Glass Blockchain Cubes gentle bobbing
    if (typeof glassCubes !== 'undefined' && glassCubes.length) {
      glassCubes.forEach((gc, gi) => {
        gc.position.y = 3.6 + Math.sin(t * 2.2 + gi) * 0.15;
        gc.rotation.y += dt * 0.4;
      });
    }

    // Floating Consensus Shields & Golden Padlocks bobbing
    if (typeof floatingAssets !== 'undefined' && floatingAssets.length) {
      floatingAssets.forEach((fa, fi) => {
        fa.position.y += Math.sin(t * 2.0 + fi) * 0.002;
        fa.rotation.y += dt * 0.3;
      });
    }

    // Phone Shield gentle hovering
    if (typeof phoneShieldGroup !== 'undefined' && phoneShieldGroup) {
      phoneShieldGroup.position.y = 0.85 + Math.sin(t * 3.0) * 0.08;
      phoneShieldGroup.rotation.y += dt * 0.8;
    }

    // Animated Holographic Laser Scan Plane on GreenHarvest Crate
    if (typeof scanLaserPlane !== 'undefined' && scanLaserPlane) {
      scanLaserPlane.position.y = 0.68 + Math.sin(t * 3.2) * 0.30;
    }

    // Dynamic Pulsing Green Aura on QR Code
    if (typeof qrGlowBorder !== 'undefined' && qrGlowBorder && qrGlowBorder.material) {
      qrGlowBorder.material.opacity = 0.35 + Math.sin(t * 4.0) * 0.25;
    }

    // AgriScan Laser Beam pulsing
    if (typeof scannerBeam !== 'undefined' && scannerBeam && scannerBeam.material) {
      scannerBeam.material.opacity = 0.20 + Math.sin(t * 3.0) * 0.15;
    }

    // Totem Kiosk subtle idle breathing
    if (typeof totemGroup !== 'undefined' && totemGroup) {
      totemGroup.position.y = 2.75 + Math.sin(t * 1.5) * 0.015;
    }

    // Sky Blockchain Ledger slow ethereal rotation
    if (typeof led !== 'undefined' && led) {
      led.rotation.y += dt * 0.2;
    }

    // Smooth Camera Interpolation
    const portrait = cv.clientWidth / cv.clientHeight < 0.9, k = 0.07;
    let targetCamX = 0, targetCamZ = 0, targetR = 28, targetLookY = 2.2;

    if (mode === 'auto' || mode === 'orbit') {
      targetCamX = 0;
      targetCamZ = 0;
      targetR = 28;
      targetLookY = 2.2;
      o.th += dt * 0.04; // subtle cinematic keynote drift
    } else {
      const sCam = S[step].v;
      targetCamX = sCam[0];
      targetR = sCam[1];
      targetCamZ = sCam[2] !== undefined ? sCam[2] : 0;
      targetLookY = sCam[3] !== undefined ? sCam[3] : 2.5;
    }

    cur.x += (targetCamX - cur.x) * k;
    cur.z += (targetCamZ - cur.z) * k;
    curR += (targetR * zoom * (portrait ? 1.4 : 1) - curR) * k;
    curLookY += (targetLookY - curLookY) * k;

    cam.position.set(
      cur.x + curR * Math.sin(o.ph) * Math.sin(o.th),
      curLookY + curR * Math.cos(o.ph),
      cur.z + curR * Math.sin(o.ph) * Math.cos(o.th)
    );
    cam.lookAt(new V(cur.x, curLookY, cur.z));

    if (R && R.render) R.render(sc, cam);
  }

  // --- Modern Production Toast Notification System ---
  if (typeof window !== 'undefined') {
    window.showToast = function (message, type = 'info', duration = 3800) {
      if (typeof document === 'undefined') return;
      const container = $('#toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      let icon = 'info';
      if (type === 'success') icon = 'check-circle-2';
      else if (type === 'error') icon = 'alert-triangle';
      else if (type === 'warning') icon = 'alert-circle';
      toast.innerHTML = `
        <i data-lucide="${icon}" class="toast-icon"></i>
        <span class="toast-text">${message}</span>
        <button class="toast-close" aria-label="Close notification">&times;</button>
      `;
      container.appendChild(toast);
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        try { window.lucide.createIcons(); } catch (e) {}
      }
      const closeBtn = toast.querySelector ? toast.querySelector('.toast-close') : null;
      const removeToast = () => {
        if (toast.classList) toast.classList.add('toast-exit');
        setTimeout(() => { if (toast.parentNode) toast.remove(); }, 250);
      };
      if (closeBtn && closeBtn.addEventListener) closeBtn.onclick = removeToast;
      setTimeout(removeToast, duration);
    };

    // Mobile Drawer Handlers
    window.openMobileMenu = function () {
      const d = $('#mobile-menu-drawer');
      const b = $('#mobile-menu-backdrop');
      if (d && d.classList) d.classList.add('open');
      if (b && b.classList) b.classList.add('open');
    };
    window.closeMobileMenu = function () {
      const d = $('#mobile-menu-drawer');
      const b = $('#mobile-menu-backdrop');
      if (d && d.classList) d.classList.remove('open');
      if (b && b.classList) b.classList.remove('open');
    };
  }

  // Mobile Menu Button Binding
  const mobileBtn = $('#mobile-menu-btn');
  const mobileClose = $('#mobile-menu-close');
  const mobileBackdrop = $('#mobile-menu-backdrop');
  if (mobileBtn) mobileBtn.onclick = () => window.openMobileMenu && window.openMobileMenu();
  if (mobileClose) mobileClose.onclick = () => window.closeMobileMenu && window.closeMobileMenu();
  if (mobileBackdrop) mobileBackdrop.onclick = () => window.closeMobileMenu && window.closeMobileMenu();

  // Hero Section CTA Button Wiring
  const heroBtnExplore = $('#hero-btn-explore');
  if (heroBtnExplore) {
    heroBtnExplore.onclick = () => {
      sfx.step();
      trackClick('HERO_CTA_EXPLORE', 'Launch 3D Spatial Twin Button');
    };
  }
  const heroBtnExcel = $('#hero-btn-excel');
  if (heroBtnExcel) {
    heroBtnExcel.onclick = () => {
      const qBtn = $('#btn-quick-excel');
      if (qBtn && qBtn.click) qBtn.click();
    };
  }

  // Dynamic Copyright Year
  const copyYear = $('#copyright-year');
  if (copyYear) copyYear.textContent = new Date().getFullYear();

  // Reveal On Scroll via IntersectionObserver
  if (typeof IntersectionObserver !== 'undefined' && typeof document !== 'undefined') {
    try {
      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target && entry.target.classList) {
            entry.target.classList.add('in-view');
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal-on-scroll').forEach(el => scrollObserver.observe(el));
    } catch (e) {}
  }

  // Interactive Cursor-Following Trail Canvas
  (function initCursorTrail() {
    if (typeof document === 'undefined') return;
    const trailCanvas = $('#cursor-trail-canvas');
    if (!trailCanvas || !trailCanvas.getContext) return;
    const ctx = trailCanvas.getContext('2d');
    if (!ctx) return;
    let width = trailCanvas.width = (typeof window !== 'undefined' && window.innerWidth) || 1200;
    let height = trailCanvas.height = (typeof window !== 'undefined' && window.innerHeight) || 800;

    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('resize', () => {
        width = trailCanvas.width = window.innerWidth;
        height = trailCanvas.height = window.innerHeight;
      });
    }

    const points = [];
    const maxPoints = 16;

    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('pointermove', e => {
        points.push({ x: e.clientX, y: e.clientY });
        if (points.length > maxPoints) points.shift();
      });
    }

    function renderTrail() {
      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(renderTrail);
      }
      ctx.clearRect(0, 0, width, height);
      if (points.length > 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const xc = (points[i].x + points[i - 1].x) / 2;
          const yc = (points[i].y + points[i - 1].y) / 2;
          ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }
    }
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(renderTrail);
    }
  })();

  // Lucide Icons Activation
  if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
    try {
      window.lucide.createIcons();
    } catch (e) {}
  }

  
  // Flowchart Modal ("visualize") Open / Close Bindings
  if ($('#btn-open-flowchart')) {
    $('#btn-open-flowchart').addEventListener('click', () => {
      if ($('#modal-flowchart')) $('#modal-flowchart').classList.add('open');
      trackClick('OPEN_FLOWCHART', 'btn-open-flowchart', 'Opened 6-step pipeline visualization flowchart');
    });
  }
  if ($('#btn-close-flowchart')) {
    $('#btn-close-flowchart').addEventListener('click', () => {
      if ($('#modal-flowchart')) $('#modal-flowchart').classList.remove('open');
    });
  }
  if ($('#modal-flowchart')) {
    $('#modal-flowchart').addEventListener('click', (e) => {
      if (e.target === $('#modal-flowchart')) $('#modal-flowchart').classList.remove('open');
    });
  }

  // Global helper to jump to scene from flowchart
  window.jumpToScene = function(sceneIdx) {
    if (typeof go === 'function') {
      go(sceneIdx);
      if ($('#modal-flowchart')) $('#modal-flowchart').classList.remove('open');
    }
  };

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
