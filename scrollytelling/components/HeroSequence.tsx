'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import CanvasPlayer from './CanvasPlayer';
import CopyOverlay from './CopyOverlay';

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollVal, setScrollVal] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollVal(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#050505]">
        <CanvasPlayer progress={scrollVal} totalFrames={120} />
        <CopyOverlay scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
