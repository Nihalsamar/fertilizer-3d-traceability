import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Scan, RotateCcw, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Farmer3DBag({ lang = 'hi', onScanComplete, activeBatchId = 'BATCH-UREA-2026-9041' }) {
  const mountRef = useRef(null);
  const [viewMode, setViewMode] = useState('bag'); // 'bag' | 'pallet'
  const [isScanning, setIsScanning] = useState(false);
  const scanProgressRef = useRef(0);
  const isScanningRef = useRef(false);
  const viewModeRef = useRef('bag');
  viewModeRef.current = viewMode;

  // Generate Procedural Realistic Fertilizer Bag Texture
  const createFertilizerBagTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 1. Base Woven HDPE Polymer Bag Texture (Off-white / pale cream)
    ctx.fillStyle = '#F8F9FA';
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle woven criss-cross texture pattern
    ctx.fillStyle = 'rgba(0, 0, 0, 0.025)';
    for (let x = 0; x < 1024; x += 8) {
      ctx.fillRect(x, 0, 4, 1024);
    }
    for (let y = 0; y < 1024; y += 8) {
      ctx.fillRect(0, y, 1024, 4);
    }

    // Outer margin stitching guide
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 8]);
    ctx.strokeRect(36, 36, 952, 952);
    ctx.setLineDash([]);

    // 2. Top Header Band: Indian Saffron & Green Stripes
    ctx.fillStyle = '#FF6A1A';
    ctx.fillRect(40, 40, 944, 40);
    ctx.fillStyle = '#10B981';
    ctx.fillRect(40, 80, 944, 45);

    // Header text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('भारत सरकार अनुमोदित &bull; GOVT OF INDIA APPROVED', 512, 110);

    // 3. Main Brand Header: BHARAT UREA (NEEM COATED)
    ctx.fillStyle = '#15803D';
    ctx.font = 'bold 64px "Arial Black", Arial, sans-serif';
    ctx.fillText('भारत यूरिया', 512, 210);

    ctx.fillStyle = '#1E3A8A';
    ctx.font = 'bold 50px "Arial Black", Arial, sans-serif';
    ctx.fillText('BHARAT UREA', 512, 270);

    // Pill badge for Neem Coated
    ctx.fillStyle = '#DCFCE7';
    ctx.fillRect(280, 295, 464, 46);
    ctx.strokeStyle = '#16A34A';
    ctx.lineWidth = 3;
    ctx.strokeRect(280, 295, 464, 46);

    ctx.fillStyle = '#166534';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillText('🌿 NEEM COATED &bull; नीम लेपित', 512, 328);

    // 4. Central Nutrient Composition Box
    ctx.fillStyle = '#F3F4F6';
    ctx.fillRect(80, 370, 864, 150);
    ctx.strokeStyle = '#9CA3AF';
    ctx.lineWidth = 2;
    ctx.strokeRect(80, 370, 864, 150);

    ctx.fillStyle = '#111827';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.fillText('NITROGEN (N) : 46.0% MIN.', 512, 420);

    ctx.fillStyle = '#4B5563';
    ctx.font = '22px Arial, sans-serif';
    ctx.fillText('Moisture: 0.3% Max &bull; Biuret: 0.8% Max', 512, 460);

    ctx.fillStyle = '#DC2626';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillText('NET WEIGHT : 50 kg &bull; शुद्ध वजन : 50 कि.ग्रा.', 512, 500);

    // 5. Subsidy & Price Notice Box (Very important for farmers!)
    ctx.fillStyle = '#FEF3C7';
    ctx.fillRect(80, 545, 864, 90);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(80, 545, 864, 90);

    ctx.fillStyle = '#92400E';
    ctx.font = 'bold 26px Arial, sans-serif';
    ctx.fillText('अधिकतम खुदरा मूल्य (MRP): ₹266.50 (प्रति बोरी)', 512, 582);

    ctx.fillStyle = '#065F46';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText('सरकार द्वारा देय सब्सिडी (Govt Subsidy): ₹1,500.00 / Bag', 512, 616);

    // 6. Lower Left: Massive High-Tech Serialized QR Code
    const qrX = 110;
    const qrY = 660;
    const qrSize = 250;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 5;
    ctx.strokeRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);

    // Draw QR Finder Patterns
    const drawFinder = (fx, fy) => {
      ctx.fillStyle = '#111827';
      ctx.fillRect(fx, fy, 60, 60);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(fx + 10, fy + 10, 40, 40);
      ctx.fillStyle = '#111827';
      ctx.fillRect(fx + 18, fy + 18, 24, 24);
    };
    drawFinder(qrX + 10, qrY + 10);
    drawFinder(qrX + qrSize - 70, qrY + 10);
    drawFinder(qrX + 10, qrY + qrSize - 70);

    // Draw simulated QR matrix bits
    ctx.fillStyle = '#1F2937';
    for (let r = 0; r < 14; r++) {
      for (let c = 0; c < 14; c++) {
        if ((r < 4 && c < 4) || (r < 4 && c > 9) || (r > 9 && c < 4)) continue;
        if ((r * 7 + c * 13) % 2 === 0) {
          ctx.fillRect(qrX + 20 + c * 15, qrY + 20 + r * 15, 12, 12);
        }
      }
    }

    // QR Center Shield
    ctx.fillStyle = '#10B981';
    ctx.fillRect(qrX + 90, qrY + 95, 70, 50);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✓', qrX + 125, qrY + 132);

    // QR Label below code
    ctx.fillStyle = '#065F46';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText('स्कैन करें &bull; SCAN FOR DBT ₹1500', qrX + 115, qrY + qrSize + 30);

    // 7. Lower Right: Lot details & Quality Seals
    ctx.textAlign = 'left';
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText('बैच संख्या (Batch No):', 400, 700);
    ctx.font = 'bold 28px "Courier New", monospace';
    ctx.fillStyle = '#FF6A1A';
    ctx.fillText(activeBatchId, 400, 735);

    ctx.fillStyle = '#4B5563';
    ctx.font = '19px Arial, sans-serif';
    ctx.fillText('निर्माता: National Fertilizers Limited (NFL)', 400, 780);
    ctx.fillText('उत्पादन तिथि: 10/2026  &bull;  समाप्ति: 10/2029', 400, 815);
    ctx.fillText('यूनिट टोकन: SHA-256 KISAN-9041-TOKEN', 400, 850);

    // CFQCTI Quality Seal Badge
    ctx.fillStyle = '#059669';
    ctx.fillRect(400, 880, 240, 48);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText('CFQCTI LAB TEST: PASS ✓', 415, 911);

    // Hook prohibited icon text
    ctx.fillStyle = '#DC2626';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText('⚠️ DO NOT USE HOOKS / हुक न लगाएं', 670, 911);

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.5, 4.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting: Studio 3-point light with warm rim
    const amb = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(amb);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimOrange = new THREE.DirectionalLight(0xff6a1a, 3.2);
    rimOrange.position.set(-4, 2, -3);
    scene.add(rimOrange);

    const fillGreen = new THREE.PointLight(0x3ddc84, 1.8, 10);
    fillGreen.position.set(2, -2, 2);
    scene.add(fillGreen);

    // Bag Texture & Materials
    const bagTexture = createFertilizerBagTexture();
    const bagFrontMat = new THREE.MeshStandardMaterial({
      map: bagTexture,
      roughness: 0.65,
      metalness: 0.08,
      bumpScale: 0.02
    });

    const bagFabricMat = new THREE.MeshStandardMaterial({
      color: 0xF3F4F6,
      roughness: 0.8,
      metalness: 0.05
    });

    const materials = [
      bagFabricMat, // right
      bagFabricMat, // left
      bagFabricMat, // top
      bagFabricMat, // bottom
      bagFrontMat,  // front with label & QR
      bagFabricMat  // back
    ];

    // Helper: Create a realistic fertilizer bag with natural rounded volume
    const createBagMesh = (w = 1.45, h = 1.95, d = 0.44) => {
      const g = new THREE.Group();

      // Main Sack Body
      const geo = new THREE.BoxGeometry(w, h, d, 8, 8, 4);
      // Soften corners to give natural bag sag & volume
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);

        // Bulge center out slightly
        const bulge = Math.cos((x / w) * Math.PI) * Math.cos((y / h) * Math.PI) * 0.12;
        if (z > 0) pos.setZ(i, z + bulge);
        if (z < 0) pos.setZ(i, z - bulge);
      }
      geo.computeVertexNormals();

      const mesh = new THREE.Mesh(geo, materials);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      g.add(mesh);

      // Top Stitch Seam (cylinder)
      const seamGeo = new THREE.CylinderGeometry(0.045, 0.045, w * 1.05, 16);
      seamGeo.rotateZ(Math.PI / 2);
      const seamMat = new THREE.MeshStandardMaterial({ color: 0xDC2626 }); // Red industrial stitch thread
      const seam = new THREE.Mesh(seamGeo, seamMat);
      seam.position.y = h / 2 + 0.02;
      g.add(seam);

      // Bottom sealed fold seam
      const bSeam = new THREE.Mesh(seamGeo, seamMat);
      bSeam.position.y = -h / 2 - 0.02;
      g.add(bSeam);

      return g;
    };

    // Root model groups
    const singleBagGroup = new THREE.Group();
    const mainBag = createBagMesh();
    singleBagGroup.add(mainBag);

    // Laser Scan Beam Line (Glowing Emerald)
    const scanBarGeo = new THREE.BoxGeometry(1.3, 0.035, 0.52);
    const scanBarMat = new THREE.MeshBasicMaterial({
      color: 0x3DDC84,
      transparent: true,
      opacity: 0
    });
    const scanBar = new THREE.Mesh(scanBarGeo, scanBarMat);
    scanBar.position.set(0, 0, 0);
    singleBagGroup.add(scanBar);

    // Scanning Light
    const scanLight = new THREE.PointLight(0x3DDC84, 0, 4);
    scanBar.add(scanLight);

    // Pallet Group (50 Bags Stacked on Wooden Pallet)
    const palletGroup = new THREE.Group();

    // Wooden Pallet Base
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8B5A2B, roughness: 0.85 });
    // Bottom skids
    for (let i = -1; i <= 1; i++) {
      const skidGeo = new THREE.BoxGeometry(0.12, 0.15, 2.2);
      const skid = new THREE.Mesh(skidGeo, woodMat);
      skid.position.set(i * 0.9, -1.1, 0);
      palletGroup.add(skid);
    }
    // Top deck boards
    for (let j = -4; j <= 4; j++) {
      const boardGeo = new THREE.BoxGeometry(2.1, 0.04, 0.18);
      const board = new THREE.Mesh(boardGeo, woodMat);
      board.position.set(0, -1.01, j * 0.24);
      palletGroup.add(board);
    }

    // Stacked Bags on Pallet (5 layers x 2 bags)
    const palletBagMat = new THREE.MeshStandardMaterial({ color: 0xF3F4F6, roughness: 0.75 });
    for (let layer = 0; layer < 5; layer++) {
      for (let side = -1; side <= 1; side += 2) {
        const pBagGeo = new THREE.BoxGeometry(0.85, 0.26, 1.8);
        const pBag = new THREE.Mesh(pBagGeo, palletBagMat);
        pBag.position.set(side * 0.46, -0.85 + layer * 0.28, 0);
        palletGroup.add(pBag);
      }
    }

    // Yellow Pallet QR Tag attached to front
    const tagGeo = new THREE.BoxGeometry(0.4, 0.5, 0.02);
    const tagMat = new THREE.MeshStandardMaterial({ color: 0xFBBF24 });
    const tag = new THREE.Mesh(tagGeo, tagMat);
    tag.position.set(0, -0.1, 0.95);
    palletGroup.add(tag);

    scene.add(singleBagGroup);
    scene.add(palletGroup);
    palletGroup.visible = false;

    // Mouse Drag Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      targetRotY += deltaX * 0.01;
      prevMouseX = e.clientX;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile farmers
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      targetRotY += deltaX * 0.012;
      prevMouseX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth Rotation Lerp
      singleBagGroup.rotation.y += (targetRotY - singleBagGroup.rotation.y) * 0.08;
      palletGroup.rotation.y += (targetRotY - palletGroup.rotation.y) * 0.08;

      // Gentle auto-float if not dragging
      if (!isDragging) {
        targetRotY += 0.003;
        singleBagGroup.position.y = Math.sin(elapsed * 1.5) * 0.04;
      }

      // Laser Scan Animation
      if (isScanningRef.current) {
        scanProgressRef.current += delta * 1.4;
        scanBarMat.opacity = Math.sin(scanProgressRef.current * Math.PI) * 0.9;
        scanLight.intensity = Math.sin(scanProgressRef.current * Math.PI) * 4;

        // Move bar vertically from top of QR to bottom
        scanBar.position.y = 0.2 - scanProgressRef.current * 0.7;

        if (scanProgressRef.current >= 1.0) {
          isScanningRef.current = false;
          setIsScanning(false);
          scanBarMat.opacity = 0;
          scanLight.intensity = 0;
          if (onScanComplete) onScanComplete();
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeBatchId]);

  // Handle Scan Trigger
  const triggerScan = () => {
    setIsScanning(true);
    isScanningRef.current = true;
    scanProgressRef.current = 0;
  };

  return (
    <div className="relative w-full h-[440px] sm:h-[520px] rounded-3xl glass-panel border border-white/10 overflow-hidden flex flex-col items-center justify-between p-4">
      {/* Top Controls: 1 Bag vs Pallet Toggle */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            {lang === 'hi' ? '3D असली खाद बोरी (50 कि.ग्रा.)' : '3D Authentic 50kg Bag Model'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-white/10 text-xs">
          <button
            onClick={() => setViewMode('bag')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              viewMode === 'bag' ? 'bg-[#FF6A1A] text-white shadow-glow-orange' : 'text-white/60 hover:text-white'
            }`}
          >
            {lang === 'hi' ? '📦 1 बोरी' : '📦 1 Bag'}
          </button>
          <button
            onClick={() => setViewMode('pallet')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              viewMode === 'pallet' ? 'bg-[#10B981] text-white shadow-glow-green' : 'text-white/60 hover:text-white'
            }`}
          >
            {lang === 'hi' ? '🧱 50 बोरी (पट्टा)' : '🧱 50 Bags (Pallet)'}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive Laser Scan Button & Hint */}
      <div className="w-full flex items-center justify-between gap-4 z-10 pt-2 border-t border-white/10">
        <span className="text-[11.5px] text-[#A1A1AA] flex items-center gap-1 font-light">
          <span>👆</span>
          <span>
            {lang === 'hi' ? 'घुमाकर देखने के लिए खींचें (360° Drag to Rotate)' : 'Drag to rotate 360°'}
          </span>
        </span>

        <button
          onClick={triggerScan}
          disabled={isScanning}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-semibold text-xs hover:opacity-90 transition-all shadow-glow-green flex items-center gap-2 disabled:opacity-50"
        >
          <Scan className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>
            {isScanning
              ? (lang === 'hi' ? 'क्यूआर स्कैन हो रहा है...' : 'Scanning QR Code...')
              : (lang === 'hi' ? '📷 बोरी का QR स्कैन करें' : '📷 Scan Bag QR Code')}
          </span>
        </button>
      </div>
    </div>
  );
}
