'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface CanvasPlayerProps {
  progress: number; // 0.0 to 1.0 from scroll
  totalFrames?: number;
  imageSequenceFolder?: string;
}

export default function CanvasPlayer({
  progress,
  totalFrames = 120,
  imageSequenceFolder = '/images/sequence',
}: CanvasPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [hasExternalFrames, setHasExternalFrames] = useState<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  // 1. Preload image sequence frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let successes = 0;

    const loadPromises = Array.from({ length: totalFrames }).map((_, i) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        const frameIndex = String(i + 1).padStart(4, '0');
        img.src = `${imageSequenceFolder}/frame_${frameIndex}.webp`;

        img.onload = async () => {
          try {
            if ('decode' in img) await img.decode();
          } catch (_) {}
          if (isMounted) {
            successes++;
            setLoadedCount(successes);
          }
          resolve();
        };

        img.onerror = () => {
          // If external assets are not present, procedural fallback activates
          resolve();
        };

        loadedImages[i] = img;
      });
    });

    Promise.all(loadPromises).then(() => {
      if (isMounted) {
        imagesRef.current = loadedImages;
        if (successes >= 30) {
          setHasExternalFrames(true);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [totalFrames, imageSequenceFolder]);

  // 2. Procedural Isometric Diorama Renderer (Pixel-accurate to uploaded reference image)
  const drawProceduralDiorama = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, p: number) => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric radial glow
      const cx = width / 2;
      const cy = height / 2;
      const glow = ctx.createRadialGradient(cx, cy, 50, cx, cy, width * 0.45);
      glow.addColorStop(0, 'rgba(0, 80, 255, 0.08)');
      glow.addColorStop(0.5, 'rgba(0, 214, 255, 0.03)');
      glow.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Animation curve: Disassembly (0 -> 0.5 peak exploded at p=0.5 -> reassembled at p=1.0)
      let explosionFactor = 0;
      if (p <= 0.15) {
        explosionFactor = 0;
      } else if (p <= 0.5) {
        explosionFactor = (p - 0.15) / 0.35; // 0 to 1
      } else if (p <= 0.85) {
        explosionFactor = 1 - (p - 0.5) / 0.35; // 1 to 0
      } else {
        explosionFactor = 0;
      }

      // Ease explosion
      const easedExplosion =
        explosionFactor < 0.5
          ? 2 * explosionFactor * explosionFactor
          : -1 + (4 - 2 * explosionFactor) * explosionFactor;

      const scale = Math.min(width / 1100, height / 850) * 1.15;
      ctx.save();
      ctx.translate(cx, cy + 30);
      ctx.scale(scale, scale);

      // -------------------------------------------------------------
      // LAYER 8: Terracotta Foundation Plinth (Base Layer)
      // -------------------------------------------------------------
      const l8Offset = easedExplosion * 70;
      ctx.save();
      ctx.translate(0, l8Offset);
      ctx.fillStyle = '#C87D55'; // Terracotta
      ctx.beginPath();
      ctx.ellipse(0, 110, 360, 140, -0.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#A85D38';
      ctx.beginPath();
      ctx.ellipse(0, 128, 360, 130, -0.05, 0, Math.PI);
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // LAYER 7: Cream Stone Middle Deck
      // -------------------------------------------------------------
      const l7Offset = easedExplosion * 35;
      ctx.save();
      ctx.translate(0, l7Offset);
      ctx.fillStyle = '#F5EBE1'; // Cream
      ctx.beginPath();
      ctx.ellipse(-10, 65, 345, 130, -0.06, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#E5D6C5';
      ctx.beginPath();
      ctx.ellipse(-10, 80, 345, 125, -0.06, 0, Math.PI);
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // LAYER 6: Sage Green Biome Deck & Crop Field
      // -------------------------------------------------------------
      const l6Offset = -easedExplosion * 10;
      ctx.save();
      ctx.translate(0, l6Offset);
      ctx.fillStyle = '#8FA98F'; // Sage Green
      ctx.beginPath();
      ctx.ellipse(-15, 20, 330, 120, -0.06, 0, Math.PI * 2);
      ctx.fill();

      // Farm Soil Plot (Dark Brown furrows on left)
      ctx.fillStyle = '#734A30';
      ctx.beginPath();
      ctx.ellipse(-170, 0, 100, 55, 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Crop Sprouts
      ctx.fillStyle = '#3E6B48';
      for (let rx = -230; rx <= -110; rx += 28) {
        for (let ry = -25; ry <= 25; ry += 16) {
          ctx.beginPath();
          ctx.ellipse(rx, ry + (rx + 170) * 0.15, 7, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // -------------------------------------------------------------
      // LAYER 5: Provenance S-Curve Rail & Neon Nodes
      // -------------------------------------------------------------
      const l5Offset = -easedExplosion * 45;
      ctx.save();
      ctx.translate(0, l5Offset);
      // S-Curve Pathway
      ctx.strokeStyle = '#5E8B70';
      ctx.lineWidth = 32;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-150, 45);
      ctx.bezierCurveTo(-50, 100, 20, -10, 140, 25);
      ctx.stroke();

      // Inner glowing track
      ctx.strokeStyle = '#85E3B3';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-150, 45);
      ctx.bezierCurveTo(-50, 100, 20, -10, 140, 25);
      ctx.stroke();

      // Glowing Verification Nodes (Neon emerald)
      const nodes = [
        { x: -145, y: 45 },
        { x: -95, y: 65 },
        { x: -40, y: 45 },
        { x: 30, y: 15 },
        { x: 85, y: 18 },
        { x: 135, y: 25 },
      ];
      nodes.forEach((nd) => {
        ctx.fillStyle = '#00FF9D';
        ctx.shadowColor = '#00FF9D';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Floating Glass Cryptocubes along path
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.5;
      [-70, 55].forEach((bx) => {
        ctx.strokeRect(bx, 15, 18, 18);
        ctx.fillRect(bx, 15, 18, 18);
      });
      ctx.restore();

      // -------------------------------------------------------------
      // LAYER 4: Foreground Interactive Smartphone Verification Unit
      // -------------------------------------------------------------
      const l4Offset = -easedExplosion * 80;
      ctx.save();
      ctx.translate(90, 80 + l4Offset);
      ctx.rotate(-0.35);

      // Phone Body (Sage Green)
      ctx.fillStyle = '#4D6B57';
      ctx.beginPath();
      ctx.roundRect(-45, -85, 90, 170, 14);
      ctx.fill();

      // Phone Screen (White OLED with verification checklist)
      ctx.fillStyle = '#FAF7F2';
      ctx.beginPath();
      ctx.roundRect(-40, -80, 80, 160, 10);
      ctx.fill();

      // Phone UI elements (Produce icon + verification checks)
      ctx.fillStyle = '#E5533D'; // Tomato icon
      ctx.beginPath();
      ctx.arc(-10, -50, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#5A9E6E'; // Green checks
      [-20, 0, 20, 40].forEach((cy, idx) => {
        ctx.beginPath();
        ctx.arc(-20, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#D4DDD6';
        ctx.fillRect(-8, cy - 3, 38, 6);
        ctx.fillStyle = '#5A9E6E';
      });

      // Verification Shield Badge on Phone
      ctx.fillStyle = '#85E3B3';
      ctx.shadowColor = 'rgba(0, 255, 157, 0.4)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(26, 42, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // -------------------------------------------------------------
      // LAYER 3: Produce Crates & QR Serialization
      // -------------------------------------------------------------
      const l3Offset = -easedExplosion * 115;
      ctx.save();
      ctx.translate(0, l3Offset);

      // Central Wooden Crate (Foreground)
      ctx.save();
      ctx.translate(10, 85);
      ctx.fillStyle = '#D9A566'; // Wood
      ctx.fillRect(-45, -25, 90, 46);
      ctx.fillStyle = '#B88246';
      ctx.fillRect(-45, -25, 90, 6);
      ctx.fillRect(-45, -3, 90, 5);

      // Carrots & Tomatoes inside crate
      ctx.fillStyle = '#E5533D';
      [-25, -5, 15].forEach((tx) => {
        ctx.beginPath();
        ctx.arc(tx, -24, 9, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = '#E87A30'; // Carrots
      [5, 25].forEach((cx) => {
        ctx.beginPath();
        ctx.ellipse(cx, -28, 5, 14, 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // QR Code Label on crate
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(32, -18, 22, 22);
      ctx.fillStyle = '#111111';
      ctx.fillRect(35, -15, 6, 6);
      ctx.fillRect(45, -15, 6, 6);
      ctx.fillRect(35, -5, 6, 6);
      ctx.fillRect(44, -6, 4, 4);
      ctx.restore();
      ctx.restore();

      // -------------------------------------------------------------
      // LAYER 2: Transport & Retail Infrastructure
      // -------------------------------------------------------------
      const l2Offset = -easedExplosion * 155;
      ctx.save();
      ctx.translate(0, l2Offset);

      // Reefer Delivery Truck (Middle top)
      ctx.save();
      ctx.translate(45, -55);
      ctx.fillStyle = '#FFFFFF'; // Reefer Box
      ctx.fillRect(-35, -35, 60, 36);
      ctx.fillStyle = '#A3BFAB'; // Truck Cab
      ctx.fillRect(25, -22, 24, 23);
      ctx.fillStyle = '#3B82F6'; // Windshield
      ctx.fillRect(36, -18, 11, 10);
      ctx.fillStyle = '#333333'; // Wheels
      [-15, 15, 38].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 5, 7, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // Grocery Retail Market Stall (Right top)
      ctx.save();
      ctx.translate(155, -45);
      // Stall Timber frame
      ctx.fillStyle = '#8B5A2B';
      ctx.fillRect(-35, -10, 70, 35);
      // Awning (Green-white striped)
      ctx.fillStyle = '#4D7C5E';
      ctx.beginPath();
      ctx.moveTo(-42, -35);
      ctx.lineTo(42, -35);
      ctx.lineTo(38, -18);
      ctx.lineTo(-38, -18);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 8px Inter, sans-serif';
      ctx.fillText('GROCERY', -18, -24);
      ctx.restore();

      // Farmer Figure (Left field)
      ctx.save();
      ctx.translate(-160, -45);
      ctx.fillStyle = '#D9A566'; // Straw hat
      ctx.beginPath();
      ctx.ellipse(0, -22, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#3E6B48'; // Dungarees
      ctx.fillRect(-5, -16, 10, 18);
      ctx.restore();

      ctx.restore();

      // -------------------------------------------------------------
      // LAYER 1: Top Inspection Camera & Floating Consensus Shield Badges
      // -------------------------------------------------------------
      const l1Offset = -easedExplosion * 200;
      ctx.save();
      ctx.translate(0, l1Offset);

      // Inspection Camera Arch Stanchion
      ctx.save();
      ctx.translate(-25, -35);
      ctx.strokeStyle = '#6E9882';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-15, 20);
      ctx.lineTo(-15, -45);
      ctx.lineTo(15, -45);
      ctx.stroke();

      // Camera Head
      ctx.fillStyle = '#446655';
      ctx.beginPath();
      ctx.arc(15, -45, 9, 0, Math.PI * 2);
      ctx.fill();

      // Optical Inspection Cone
      const coneGrad = ctx.createLinearGradient(15, -36, 15, 25);
      coneGrad.addColorStop(0, 'rgba(0, 214, 255, 0.45)');
      coneGrad.addColorStop(1, 'rgba(0, 214, 255, 0.0)');
      ctx.fillStyle = coneGrad;
      ctx.beginPath();
      ctx.moveTo(15, -36);
      ctx.lineTo(-15, 20);
      ctx.lineTo(45, 20);
      ctx.closePath();
      ctx.fill();

      // "inspection camera" label (Minimal Apple-style)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('inspection', 15, -64);
      ctx.fillText('camera', 15, -52);
      ctx.restore();

      // Floating Shield Badges (Cryptographic Consensus Verification)
      [-100, 60].forEach((sx, idx) => {
        ctx.fillStyle = 'rgba(133, 227, 179, 0.75)';
        ctx.beginPath();
        ctx.arc(sx, -70 + idx * 30, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#050505';
        ctx.font = 'bold 8px Inter, sans-serif';
        ctx.fillText('✓', sx, -67 + idx * 30);
      });

      ctx.restore();

      ctx.restore();
    },
    []
  );

  // 3. Render Canvas Tick
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const frameIdx = Math.min(
      totalFrames - 1,
      Math.max(0, Math.round(progress * (totalFrames - 1)))
    );

    if (hasExternalFrames && imagesRef.current[frameIdx]?.complete) {
      // Draw Pre-rendered Photorealistic Frame
      const img = imagesRef.current[frameIdx];
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // object-fit: contain logic
      const hRatio = width / img.width;
      const vRatio = height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerShiftX = (width - img.width * ratio) / 2;
      const centerShiftY = (height - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    } else {
      // Draw Real-Time High-Fidelity Procedural Isometric Diorama
      drawProceduralDiorama(ctx, width, height, progress);
    }
  }, [progress, totalFrames, hasExternalFrames, drawProceduralDiorama]);

  // RequestAnimationFrame scheduling
  useEffect(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderFrame]);

  // Set explicit dimensions on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  return (
    <div className="relative w-full h-full bg-[#050505]">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#050505',
        }}
      />

      {/* Minimal preloading indicator when assets are loading */}
      {!hasExternalFrames && loadedCount > 0 && loadedCount < totalFrames && (
        <div className="absolute bottom-6 right-6 text-[11px] font-mono text-white/40 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 pointer-events-none">
          Preloading Frames: {Math.round((loadedCount / totalFrames) * 100)}%
        </div>
      )}
    </div>
  );
}
