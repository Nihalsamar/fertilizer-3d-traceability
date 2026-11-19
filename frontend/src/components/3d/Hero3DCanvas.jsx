import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Group for interactive rotation & parallax
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Lighting: Studio Key + Orange-Amber Rim + Emerald Accent
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    // Warm Orange-Amber Rim Light (#FF6A1A)
    const rimLightOrange = new THREE.DirectionalLight(0xff6a1a, 4.5);
    rimLightOrange.position.set(-5, 3, -3);
    scene.add(rimLightOrange);

    // Secondary Green Rim Light (#3DDC84)
    const rimLightGreen = new THREE.PointLight(0x3ddc84, 2.2, 12);
    rimLightGreen.position.set(3, -2, 2);
    scene.add(rimLightGreen);

    // Materials
    // Glossy Fertilizer Bag Material
    const bagMat = new THREE.MeshPhysicalMaterial({
      color: 0x18181b,
      metalness: 0.15,
      roughness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    const bagAccentMat = new THREE.MeshStandardMaterial({
      color: 0xff6a1a,
      metalness: 0.3,
      roughness: 0.35,
      emissive: 0xff6a1a,
      emissiveIntensity: 0.15,
    });

    const greenAccentMat = new THREE.MeshStandardMaterial({
      color: 0x3ddc84,
      metalness: 0.2,
      roughness: 0.4,
      emissive: 0x3ddc84,
      emissiveIntensity: 0.1,
    });

    // Soil Stratification Layers
    const soilLoamMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.85,
      metalness: 0.05
    });

    const nutrientStrataMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.7,
      metalness: 0.15
    });

    const mineralBedMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.9,
      metalness: 0.1
    });

    // Holographic Glass for Floating Supply Chain Nodes
    const holoMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.6,
      attenuationColor: new THREE.Color(0xff6a1a),
      attenuationDistance: 1.0,
    });

    // Helper: Rounded Box / Pill Bag
    const createBag = (w, h, d, y, rotY = 0) => {
      const bagGroup = new THREE.Group();
      
      // Main Body
      const bodyGeo = new THREE.BoxGeometry(w, h, d, 4, 4, 4);
      // Soften corners by scaling vertices slightly
      const body = new THREE.Mesh(bodyGeo, bagMat);
      bagGroup.add(body);

      // Printed High-Tech Band across bag
      const bandGeo = new THREE.BoxGeometry(w * 0.35, h * 1.01, d * 1.02);
      const band = new THREE.Mesh(bandGeo, bagAccentMat);
      band.position.x = -w * 0.25;
      bagGroup.add(band);

      // Green Quality Seal
      const sealGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.02, 16);
      sealGeo.rotateX(Math.PI / 2);
      const seal = new THREE.Mesh(sealGeo, greenAccentMat);
      seal.position.set(w * 0.28, 0, d * 0.51);
      bagGroup.add(seal);

      bagGroup.position.y = y;
      bagGroup.rotation.y = rotY;
      return bagGroup;
    };

    // Build the Stack
    const stackGroup = new THREE.Group();

    // 3 Layered Soil / Substrate Slabs at Bottom
    const slabGeo1 = new THREE.CylinderGeometry(1.6, 1.7, 0.18, 32);
    const slab1 = new THREE.Mesh(slabGeo1, mineralBedMat);
    slab1.position.y = -1.1;
    stackGroup.add(slab1);

    const slabGeo2 = new THREE.CylinderGeometry(1.45, 1.55, 0.16, 32);
    const slab2 = new THREE.Mesh(slabGeo2, nutrientStrataMat);
    slab2.position.y = -0.92;
    stackGroup.add(slab2);

    const slabGeo3 = new THREE.CylinderGeometry(1.3, 1.4, 0.14, 32);
    const slab3 = new THREE.Mesh(slabGeo3, soilLoamMat);
    slab3.position.y = -0.76;
    stackGroup.add(slab3);

    // Stack of 3 Glossy Fertilizer Bags
    const bag1 = createBag(1.5, 0.34, 1.0, -0.48, 0.12);
    const bag2 = createBag(1.48, 0.34, 0.98, -0.15, -0.22);
    const bag3 = createBag(1.44, 0.34, 0.95, 0.18, 0.08);

    stackGroup.add(bag1);
    stackGroup.add(bag2);
    stackGroup.add(bag3);

    // Floating Holographic Provenance Block on top
    const cubeGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
    const holoCube = new THREE.Mesh(cubeGeo, holoMat);
    holoCube.position.set(0, 0.72, 0);
    holoCube.rotation.set(0.3, 0.4, 0.2);
    stackGroup.add(holoCube);

    // Core Glowing Energy Bead inside cube
    const beadGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const beadMat = new THREE.MeshBasicMaterial({ color: 0xff6a1a });
    const bead = new THREE.Mesh(beadGeo, beadMat);
    bead.position.set(0, 0.72, 0);
    stackGroup.add(bead);

    // Orbiting mini-nodes
    const orbitNodes = [];
    for (let i = 0; i < 4; i++) {
      const nodeGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
      const nodeMesh = new THREE.Mesh(nodeGeo, i % 2 === 0 ? bagAccentMat : greenAccentMat);
      stackGroup.add(nodeMesh);
      orbitNodes.push({ mesh: nodeMesh, speed: 0.8 + i * 0.3, radius: 1.4 + i * 0.2, phase: i * (Math.PI / 2), yOffset: -0.2 + i * 0.25 });
    }

    rootGroup.add(stackGroup);

    // Sparkle Particle Field
    const particleCount = isMobile ? 40 : 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 6;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 5 + 0.5;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      particleScales[i] = Math.random() * 0.8 + 0.2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffa366,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Parallax mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Base Floating & Rotation
      if (!prefersReducedMotion) {
        stackGroup.position.y = Math.sin(elapsed * 0.8) * 0.1;
        stackGroup.rotation.y = elapsed * 0.25 + mouseX;
        stackGroup.rotation.x = mouseY * 0.4;

        // Cube internal spin
        holoCube.rotation.x += delta * 0.6;
        holoCube.rotation.y += delta * 0.9;

        // Orbit nodes
        orbitNodes.forEach((node) => {
          const angle = elapsed * node.speed + node.phase;
          node.mesh.position.x = Math.cos(angle) * node.radius;
          node.mesh.position.z = Math.sin(angle) * node.radius;
          node.mesh.position.y = node.yOffset + Math.sin(elapsed * 1.5 + node.phase) * 0.15;
          node.mesh.rotation.x += delta * 1.2;
          node.mesh.rotation.y += delta * 1.5;
        });

        // Slow particle drift
        particles.rotation.y = elapsed * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[540px] lg:h-[620px] flex items-center justify-center">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-radial from-[#FF6A1A]/10 via-[#3DDC84]/5 to-transparent blur-3xl pointer-events-none" />
      
      {/* WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Spatial Micro-Badges */}
      <div className="absolute top-8 right-6 glass-panel px-3.5 py-2 rounded-full flex items-center gap-2 border border-white/10 pointer-events-none animate-float-slow">
        <span className="w-2 h-2 rounded-full bg-[#3DDC84] animate-ping" />
        <span className="text-[11px] font-mono tracking-wider text-white/90">Ed25519 VERIFIED</span>
      </div>

      <div className="absolute bottom-12 left-6 glass-panel px-3.5 py-2 rounded-full flex items-center gap-2 border border-white/10 pointer-events-none">
        <span className="text-sm">⚡</span>
        <span className="text-[11px] font-mono tracking-wider text-[#FF6A1A]">SHA-256 HIERARCHY</span>
      </div>
    </div>
  );
}
