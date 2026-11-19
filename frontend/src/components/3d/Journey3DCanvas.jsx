import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Journey3DCanvas({ activeStep = 0, isReverseFlow = false }) {
  const mountRef = useRef(null);
  const targetCamPosRef = useRef(new THREE.Vector3(0, 4, 12));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const activeStepRef = useRef(activeStep);
  activeStepRef.current = activeStep;

  // Station Coordinates in 3D Space (X axis layout)
  const stationCoords = [
    { x: -16, z: 0, title: 'Manufacturer' },
    { x: -11, z: -1, title: 'Lab' },
    { x: -5, z: 0, title: 'Warehouse' },
    { x: 0, z: 1, title: 'Transport Corridor' },
    { x: 6, z: 0, title: 'Distributor' },
    { x: 11, z: -1, title: 'Retailer POS' },
    { x: 16, z: 0, title: 'Farmer' }
  ];

  useEffect(() => {
    const idx = Math.min(Math.max(activeStep, 0), stationCoords.length - 1);
    const station = stationCoords[idx];
    targetCamPosRef.current.set(station.x, 3.2, 7.5);
    targetLookAtRef.current.set(station.x, 0.6, 0);
  }, [activeStep]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(-16, 4, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const amb = new THREE.AmbientLight(0x18181b, 1.4);
    scene.add(amb);

    const sun = new THREE.DirectionalLight(0xfffaed, 2.0);
    sun.position.set(10, 20, 15);
    scene.add(sun);

    const orangeRim = new THREE.PointLight(0xff6a1a, 3.5, 30);
    orangeRim.position.set(-5, 6, 2);
    scene.add(orangeRim);

    const greenAccent = new THREE.PointLight(0x3ddc84, 2.8, 30);
    greenAccent.position.set(15, 4, 2);
    scene.add(greenAccent);

    // Ground Platform
    const groundGeo = new THREE.BoxGeometry(44, 0.4, 8);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x111113, roughness: 0.9, metalness: 0.1 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.set(0, -0.2, 0);
    scene.add(ground);

    // Highway / Transit Line
    const roadGeo = new THREE.BoxGeometry(40, 0.05, 1.6);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1f1f23, roughness: 0.7 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set(0, 0.03, 0.5);
    scene.add(road);

    // Highway yellow dash stripes
    for (let rx = -19; rx <= 19; rx += 2.4) {
      const stripeGeo = new THREE.BoxGeometry(1.0, 0.06, 0.08);
      const stripeMat = new THREE.MeshBasicMaterial({ color: 0xff6a1a });
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      stripe.position.set(rx, 0.04, 0.5);
      scene.add(stripe);
    }

    // Station Nodes
    const createStation = (x, color, name, isLast = false) => {
      const g = new THREE.Group();
      g.position.set(x, 0, 0);

      // Base Pedestal
      const baseGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.2, 24);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.3, roughness: 0.4 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 0.1;
      g.add(base);

      // Station Marker Pillar
      const pillarGeo = new THREE.BoxGeometry(0.8, 1.4, 0.8);
      const pillarMat = new THREE.MeshPhysicalMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 0.6,
        transparent: true,
        opacity: 0.9
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.y = 0.9;
      g.add(pillar);

      // Holographic Ring on Top
      const ringGeo = new THREE.TorusGeometry(0.55, 0.04, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: color });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.7;
      g.add(ring);

      scene.add(g);
      return { group: g, ring };
    };

    const stations = [
      createStation(-16, 0xff6a1a, 'Manufacturer'),
      createStation(-11, 0x3ddc84, 'Lab'),
      createStation(-5, 0x38bdf8, 'Warehouse'),
      createStation(0, 0xf59e0b, 'Corridor'),
      createStation(6, 0xa855f7, 'Distributor'),
      createStation(11, 0xec4899, 'Retailer'),
      createStation(16, 0x10b981, 'Farmer', true),
    ];

    // Reefer Transport Truck traveling on road
    const truckGroup = new THREE.Group();
    const truckCabinGeo = new THREE.BoxGeometry(0.7, 0.6, 0.6);
    const truckCabinMat = new THREE.MeshStandardMaterial({ color: 0xff6a1a });
    const truckCabin = new THREE.Mesh(truckCabinGeo, truckCabinMat);
    truckCabin.position.set(0.6, 0.45, 0);
    truckGroup.add(truckCabin);

    const truckTrailerGeo = new THREE.BoxGeometry(1.6, 0.8, 0.65);
    const truckTrailerMat = new THREE.MeshStandardMaterial({ color: 0xf4f4f5, roughness: 0.3 });
    const truckTrailer = new THREE.Mesh(truckTrailerGeo, truckTrailerMat);
    truckTrailer.position.set(-0.5, 0.55, 0);
    truckGroup.add(truckTrailer);

    // Blinking IoT Cellular Antenna Beacon
    const beaconGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x3ddc84 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0.6, 0.82, 0);
    truckGroup.add(beacon);

    truckGroup.position.set(0, 0.05, 0.5);
    scene.add(truckGroup);

    // Reverse Flow Arc (High arching quadratic curve)
    const curvePoints = [];
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(16, 0.5, 0),
      new THREE.Vector3(0, 6.5, -2),
      new THREE.Vector3(-16, 0.5, 0)
    );
    const pts = curve.getPoints(50);
    const revGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const revMat = new THREE.LineDashedMaterial({
      color: 0xef4444,
      dashSize: 0.6,
      gapSize: 0.3,
      linewidth: 2,
    });
    const revLine = new THREE.Line(revGeo, revMat);
    revLine.computeLineDistances();
    revLine.visible = isReverseFlow;
    scene.add(revLine);

    // Current Camera Position & LookAt tracker
    const currentCamPos = new THREE.Vector3(-16, 4, 10);
    const currentLookAt = new THREE.Vector3(-16, 0.6, 0);

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
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Camera Smooth Interpolation
      currentCamPos.lerp(targetCamPosRef.current, 0.045);
      currentLookAt.lerp(targetLookAtRef.current, 0.045);
      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      // Rings Rotation
      stations.forEach((st, i) => {
        st.ring.rotation.z = elapsed * 1.5 + i;
        if (i === activeStepRef.current) {
          st.ring.scale.setScalar(1 + Math.sin(elapsed * 4) * 0.15);
        } else {
          st.ring.scale.setScalar(1);
        }
      });

      // Truck Movement
      const truckTargetX = stationCoords[Math.min(activeStepRef.current, stationCoords.length - 1)].x;
      truckGroup.position.x += (truckTargetX - truckGroup.position.x) * 0.035;

      // Beacon Flash
      beaconMat.color.setHex(Math.sin(elapsed * 8) > 0 ? 0x3ddc84 : 0x111113);

      // Reverse Flow Line Toggle
      revLine.visible = isReverseFlow;
      if (isReverseFlow) {
        revMat.dashSize = 0.4 + Math.sin(elapsed * 6) * 0.2;
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
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden glass-panel border border-white/10">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* 3D Mode Label */}
      <div className="absolute top-4 left-4 flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-[#FF6A1A] animate-pulse" />
        <span className="text-white/80">3D SPATIAL TRANSIT CORRIDOR</span>
      </div>

      {isReverseFlow && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/20 text-red-400 px-3.5 py-1.5 rounded-full border border-red-500/40 text-xs font-mono font-semibold animate-pulse">
          <span>⚠️</span>
          <span>REVERSE FLOW TRIPPED: QUARANTINE RETRIEVAL</span>
        </div>
      )}
    </div>
  );
}
