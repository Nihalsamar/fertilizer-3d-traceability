import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Journey3DCanvas({ activeStep = 0, isReverseFlow = false, onStepSelect }) {
  const mountRef = useRef(null);
  const targetCamPosRef = useRef(new THREE.Vector3(-21, 3.2, 6.8));
  const targetLookAtRef = useRef(new THREE.Vector3(-21, 0.8, 0));
  const activeStepRef = useRef(activeStep);
  activeStepRef.current = activeStep;

  // Station Coordinates in 3D Space (X axis across 7 distinct stations)
  const stations = [
    { id: 1, x: -21, name: '1. Manufacturer', nameHi: '1. खाद फैक्ट्री' },
    { id: 2, x: -14, name: '2. Quality Lab', nameHi: '2. गुणवत्ता लैब' },
    { id: 3, x: -7,  name: '3. Warehouse', nameHi: '3. केंद्रीय गोदाम' },
    { id: 4, x: 0,   name: '4. Transit Truck', nameHi: '4. जीपीएस ट्रक' },
    { id: 5, x: 7,   name: '5. Distributor', nameHi: '5. जिला वितरक' },
    { id: 6, x: 14,  name: '6. Retailer POS', nameHi: '6. खुदरा केंद्र' },
    { id: 7, x: 21,  name: '7. Farmer Field', nameHi: '7. किसान व खेत' }
  ];

  // Update target camera position whenever activeStep changes
  useEffect(() => {
    const idx = Math.min(Math.max(activeStep, 0), stations.length - 1);
    const st = stations[idx];
    targetCamPosRef.current.set(st.x, 2.8, 6.2);
    targetLookAtRef.current.set(st.x, 0.75, 0);
  }, [activeStep]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(-21, 3.2, 6.8);

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

    // Studio Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(amb);

    const sun = new THREE.DirectionalLight(0xfff7ed, 2.2);
    sun.position.set(10, 25, 20);
    sun.castShadow = true;
    scene.add(sun);

    const orangeRim = new THREE.PointLight(0xff6a1a, 3.5, 40);
    orangeRim.position.set(-10, 8, 4);
    scene.add(orangeRim);

    const greenAccent = new THREE.PointLight(0x10b981, 3.5, 40);
    greenAccent.position.set(15, 8, 4);
    scene.add(greenAccent);

    // Spotlight following the active stage
    const stageSpot = new THREE.SpotLight(0xffffff, 5, 20, Math.PI / 6, 0.3);
    stageSpot.position.set(-21, 6, 3);
    scene.add(stageSpot);
    scene.add(stageSpot.target);

    // Ground Platform
    const groundGeo = new THREE.BoxGeometry(52, 0.4, 10);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x121214, roughness: 0.9, metalness: 0.1 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.set(0, -0.2, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    // Highway Corridor with Yellow Dashes
    const roadGeo = new THREE.BoxGeometry(48, 0.05, 2.2);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e1e24, roughness: 0.8 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set(0, 0.03, 1.2);
    road.receiveShadow = true;
    scene.add(road);

    for (let rx = -23; rx <= 23; rx += 2.8) {
      const stripeGeo = new THREE.BoxGeometry(1.2, 0.06, 0.1);
      const stripeMat = new THREE.MeshBasicMaterial({ color: 0xff6a1a });
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      stripe.position.set(rx, 0.04, 1.2);
      scene.add(stripe);
    }

    // Street Lamps along highway
    [-18, -10, -2, 6, 14, 22].forEach(lx => {
      const poleGeo = new THREE.CylinderGeometry(0.04, 0.05, 2.4, 12);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x4b5563 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(lx, 1.2, 2.4);
      scene.add(pole);

      const lampGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const lampMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const lamp = new THREE.Mesh(lampGeo, lampMat);
      lamp.position.set(lx, 2.4, 2.4);
      scene.add(lamp);
    });

    // =========================================================================
    // STEP 1: MANUFACTURER / FACTORY (X = -21)
    // =========================================================================
    const factoryGroup = new THREE.Group();
    factoryGroup.position.set(-21, 0, -1.2);

    // Main Factory Hall
    const fMainGeo = new THREE.BoxGeometry(2.4, 1.6, 1.8);
    const fMainMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.6 }); // Red brick factory
    const fMain = new THREE.Mesh(fMainGeo, fMainMat);
    fMain.position.y = 0.8;
    factoryGroup.add(fMain);

    // Corrugated Roof
    const fRoofGeo = new THREE.ConeGeometry(1.8, 0.6, 4);
    fRoofGeo.rotateY(Math.PI / 4);
    const fRoofMat = new THREE.MeshStandardMaterial({ color: 0x374151 });
    const fRoof = new THREE.Mesh(fRoofGeo, fRoofMat);
    fRoof.position.y = 1.9;
    factoryGroup.add(fRoof);

    // Industrial Smokestack with Smoke Particle Ring
    const chimneyGeo = new THREE.CylinderGeometry(0.2, 0.28, 2.2, 16);
    const chimneyMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
    const chimney = new THREE.Mesh(chimneyGeo, chimneyMat);
    chimney.position.set(0.8, 1.5, -0.5);
    factoryGroup.add(chimney);

    // Conveyor Belt with fertilizer bags
    const convGeo = new THREE.BoxGeometry(1.4, 0.15, 0.5);
    const convMat = new THREE.MeshStandardMaterial({ color: 0x1f2937 });
    const conv = new THREE.Mesh(convGeo, convMat);
    conv.position.set(0, 0.1, 1.2);
    factoryGroup.add(conv);

    // 3 Floating Holographic QR Level Boards (Bag, Pallet, Master)
    const qrBoardMat = new THREE.MeshBasicMaterial({ color: 0xff6a1a });
    for (let q = 0; q < 3; q++) {
      const qGeo = new THREE.BoxGeometry(0.35, 0.35, 0.03);
      const qMesh = new THREE.Mesh(qGeo, qrBoardMat);
      qMesh.position.set(-0.5 + q * 0.5, 2.2, 0.6);
      factoryGroup.add(qMesh);
    }
    scene.add(factoryGroup);

    // =========================================================================
    // STEP 2: QUALITY TESTING LAB & HPLC (X = -14)
    // =========================================================================
    const labGroup = new THREE.Group();
    labGroup.position.set(-14, 0, -1.2);

    // Cleanroom Glass Lab Cube
    const labMainGeo = new THREE.BoxGeometry(2.2, 1.5, 1.6);
    const labGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      transmission: 0.7,
      transparent: true,
      roughness: 0.1,
      ior: 1.4
    });
    const labMain = new THREE.Mesh(labMainGeo, labGlassMat);
    labMain.position.y = 0.75;
    labGroup.add(labMain);

    // HPLC Chromatography Tower Apparatus inside
    const hplcGeo = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 16);
    const hplcMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.2 });
    const hplc = new THREE.Mesh(hplcGeo, hplcMat);
    hplc.position.set(0, 0.6, 0);
    labGroup.add(hplc);

    // Floating Green "46.2% N PASS ✓" Hologram Sign
    const labSignGeo = new THREE.BoxGeometry(1.2, 0.35, 0.04);
    const labSignMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const labSign = new THREE.Mesh(labSignGeo, labSignMat);
    labSign.position.set(0, 1.85, 0);
    labGroup.add(labSign);
    scene.add(labGroup);

    // =========================================================================
    // STEP 3: CENTRAL WAREHOUSE & DECISION POINT (X = -7)
    // =========================================================================
    const warehouseGroup = new THREE.Group();
    warehouseGroup.position.set(-7, 0, -1.2);

    // High-Bay Hangar
    const wMainGeo = new THREE.BoxGeometry(2.6, 1.6, 2.0);
    const wMainMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 }); // Blue logistics bay
    const wMain = new THREE.Mesh(wMainGeo, wMainMat);
    wMain.position.y = 0.8;
    warehouseGroup.add(wMain);

    // Arching RFID Scanner Gate
    const rfidArchGeo = new THREE.TorusGeometry(0.8, 0.08, 16, 32, Math.PI);
    const rfidMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const rfidArch = new THREE.Mesh(rfidArchGeo, rfidMat);
    rfidArch.position.set(0, 0.8, 1.1);
    warehouseGroup.add(rfidArch);

    // Yellow Decision Point Junction Arrow
    const arrowGeo = new THREE.ConeGeometry(0.25, 0.5, 4);
    arrowGeo.rotateZ(-Math.PI / 2);
    const arrowMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const arrow = new THREE.Mesh(arrowGeo, arrowMat);
    arrow.position.set(1.4, 0.5, 0.8);
    warehouseGroup.add(arrow);
    scene.add(warehouseGroup);

    // =========================================================================
    // STEP 4: IOT TRANSIT CORRIDOR WITH REEFER TRUCK (X = 0)
    // =========================================================================
    const truckGroup = new THREE.Group();
    truckGroup.position.set(0, 0.05, 1.2);

    // Truck Cabin
    const cabinGeo = new THREE.BoxGeometry(0.8, 0.7, 0.7);
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0xff6a1a });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0.8, 0.55, 0);
    truckGroup.add(cabin);

    // Headlights
    [-0.22, 0.22].forEach(hz => {
      const hlGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const hlMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
      const hl = new THREE.Mesh(hlGeo, hlMat);
      hl.position.set(1.22, 0.45, hz);
      truckGroup.add(hl);
    });

    // Insulated Cargo Trailer
    const trailerGeo = new THREE.BoxGeometry(2.0, 0.95, 0.75);
    const trailerMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
    const trailer = new THREE.Mesh(trailerGeo, trailerMat);
    trailer.position.set(-0.6, 0.68, 0);
    truckGroup.add(trailer);

    // Blinking 4G GPS Cellular Antenna Beacon
    const beaconGeo = new THREE.SphereGeometry(0.09, 14, 14);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0.8, 1.05, 0);
    truckGroup.add(beacon);

    // 6 Truck Wheels
    [-1.2, -0.3, 0.7].forEach(wx => {
      [-0.4, 0.4].forEach(wz => {
        const wheelGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 16);
        wheelGeo.rotateX(Math.PI / 2);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b });
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.position.set(wx, 0.2, wz);
        truckGroup.add(wheel);
      });
    });
    scene.add(truckGroup);

    // =========================================================================
    // STEP 5: DISTRICT DISTRIBUTOR DEPOT (X = 7)
    // =========================================================================
    const distGroup = new THREE.Group();
    distGroup.position.set(7, 0, -1.2);

    // Regional Depot Hub
    const distMainGeo = new THREE.BoxGeometry(2.4, 1.5, 1.8);
    const distMainMat = new THREE.MeshStandardMaterial({ color: 0x6d28d9, roughness: 0.5 }); // Purple depot
    const distMain = new THREE.Mesh(distMainGeo, distMainMat);
    distMain.position.y = 0.75;
    distGroup.add(distMain);

    // Pallet Stack outside
    const pBoxGeo = new THREE.BoxGeometry(0.6, 0.5, 0.6);
    const pBoxMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
    const pBox = new THREE.Mesh(pBoxGeo, pBoxMat);
    pBox.position.set(1.4, 0.25, 0.5);
    distGroup.add(pBox);

    // Digital Pallet Scan Beacon
    const dScanGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4, 12);
    const dScanMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const dScan = new THREE.Mesh(dScanGeo, dScanMat);
    dScan.position.set(-1.3, 0.7, 0.8);
    distGroup.add(dScan);
    scene.add(distGroup);

    // =========================================================================
    // STEP 6: RETAILER POS KENDRA (X = 14)
    // =========================================================================
    const shopGroup = new THREE.Group();
    shopGroup.position.set(14, 0, -1.2);

    // Shop Building
    const sMainGeo = new THREE.BoxGeometry(2.0, 1.4, 1.6);
    const sMainMat = new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.6 }); // Green Kisan Kendra
    const sMain = new THREE.Mesh(sMainGeo, sMainMat);
    sMain.position.y = 0.7;
    shopGroup.add(sMain);

    // Striped Awning
    const awningGeo = new THREE.BoxGeometry(2.2, 0.1, 0.7);
    awningGeo.rotateX(0.25);
    const awningMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
    const awning = new THREE.Mesh(awningGeo, awningMat);
    awning.position.set(0, 1.4, 0.9);
    shopGroup.add(awning);

    // Handheld Scanner Kiosk & Touch Screen
    const posStandGeo = new THREE.BoxGeometry(0.3, 0.8, 0.3);
    const posStandMat = new THREE.MeshStandardMaterial({ color: 0x1f2937 });
    const posStand = new THREE.Mesh(posStandGeo, posStandMat);
    posStand.position.set(0.6, 0.4, 1.1);
    shopGroup.add(posStand);

    const posScreenGeo = new THREE.BoxGeometry(0.25, 0.2, 0.04);
    const posScreenMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const posScreen = new THREE.Mesh(posScreenGeo, posScreenMat);
    posScreen.position.set(0.6, 0.85, 1.1);
    shopGroup.add(posScreen);
    scene.add(shopGroup);

    // =========================================================================
    // STEP 7: FARMER FIELD & ₹1,500 DBT RELEASE (X = 21)
    // =========================================================================
    const farmerGroup = new THREE.Group();
    farmerGroup.position.set(21, 0, -1.2);

    // Green Crop Field Patch
    const fieldGeo = new THREE.BoxGeometry(3.0, 0.08, 2.2);
    const fieldMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.9 });
    const field = new THREE.Mesh(fieldGeo, fieldMat);
    field.position.y = 0.04;
    farmerGroup.add(field);

    // Red Farm Tractor
    const tractorBodyGeo = new THREE.BoxGeometry(0.9, 0.5, 0.6);
    const tractorBodyMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 }); // Red tractor
    const tractorBody = new THREE.Mesh(tractorBodyGeo, tractorBodyMat);
    tractorBody.position.set(-0.6, 0.45, 0.2);
    farmerGroup.add(tractorBody);

    // Big Rear Tractor Wheels
    [-0.35, 0.35].forEach(tz => {
      const rwGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.16, 16);
      rwGeo.rotateX(Math.PI / 2);
      const rwMat = new THREE.MeshStandardMaterial({ color: 0x111827 });
      const rw = new THREE.Mesh(rwGeo, rwMat);
      rw.position.set(-0.9, 0.3, tz);
      farmerGroup.add(rw);
    });

    // Celebratory DBT ₹1,500 Golden Particle Burst
    const coinCount = 30;
    const coinGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.03, 12);
    const coinMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.2 });
    const coins = [];
    for (let c = 0; c < coinCount; c++) {
      const coinMesh = new THREE.Mesh(coinGeo, coinMat);
      coinMesh.position.set(0.4 + (Math.random() - 0.5) * 1.4, 0.8 + Math.random() * 1.5, (Math.random() - 0.5) * 1.2);
      farmerGroup.add(coinMesh);
      coins.push({ mesh: coinMesh, baseSpeed: 0.5 + Math.random() * 1.2, offset: Math.random() * Math.PI });
    }
    scene.add(farmerGroup);

    // =========================================================================
    // STEP 8: REVERSE FLOW RETURN ARC
    // =========================================================================
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(21, 0.5, 0),
      new THREE.Vector3(0, 7.5, -2),
      new THREE.Vector3(-21, 0.5, 0)
    );
    const pts = curve.getPoints(60);
    const revGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const revMat = new THREE.LineDashedMaterial({
      color: 0xef4444,
      dashSize: 0.6,
      gapSize: 0.3,
      linewidth: 2.5
    });
    const revLine = new THREE.Line(revGeo, revMat);
    revLine.computeLineDistances();
    revLine.visible = isReverseFlow;
    scene.add(revLine);

    // Current camera interpolation vectors
    const currentCamPos = new THREE.Vector3(-21, 3.2, 6.8);
    const currentLookAt = new THREE.Vector3(-21, 0.8, 0);

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

      // Smooth camera interpolation to target active station
      currentCamPos.lerp(targetCamPosRef.current, 0.045);
      currentLookAt.lerp(targetLookAtRef.current, 0.045);
      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      // Move spotlight target to follow camera
      stageSpot.position.set(currentLookAt.x, 6, 3);
      stageSpot.target.position.copy(currentLookAt);

      // Truck follows active step X position smoothly
      const currentActiveX = stations[Math.min(activeStepRef.current, stations.length - 1)].x;
      truckGroup.position.x += (currentActiveX - truckGroup.position.x) * 0.035;

      // Beacon flashing light
      beaconMat.color.setHex(Math.sin(elapsed * 9) > 0 ? 0x10b981 : 0x111827);

      // Farmer ₹1,500 coins burst animation if activeStep is 6 (Step 7)
      if (activeStepRef.current === 6) {
        coins.forEach((c) => {
          c.mesh.position.y = 0.8 + Math.abs(Math.sin(elapsed * c.baseSpeed + c.offset)) * 1.4;
          c.mesh.rotation.y += delta * 3;
          c.mesh.rotation.x += delta * 2;
        });
      }

      // Reverse Flow Line animation
      revLine.visible = isReverseFlow;
      if (isReverseFlow) {
        revMat.dashSize = 0.5 + Math.sin(elapsed * 6) * 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isReverseFlow]);

  return (
    <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top 3D Camera Indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-mono font-semibold">
        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
        <span className="text-white">
          3D STAGE FOCUS: {stations[Math.min(activeStep, stations.length - 1)].nameHi} ({stations[Math.min(activeStep, stations.length - 1)].name})
        </span>
      </div>

      {isReverseFlow && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/20 text-red-400 px-3.5 py-1.5 rounded-full border border-red-500/40 text-xs font-mono font-bold animate-pulse">
          <span>⚠️</span>
          <span>REVERSE FLOW TRIPPED (RETURN TO FACTORY)</span>
        </div>
      )}

      {/* Bottom 7-Step Mini Navigator directly on 3D viewport */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1 overflow-x-auto p-1.5 glass-panel rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md">
        {stations.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => onStepSelect && onStepSelect(idx)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
              activeStep === idx
                ? 'bg-[#10B981] text-white shadow-glow-green scale-105'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{st.nameHi}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
