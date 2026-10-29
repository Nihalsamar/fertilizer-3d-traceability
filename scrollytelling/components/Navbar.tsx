'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 60],
    ['rgba(5, 5, 5, 0)', 'rgba(5, 5, 5, 0.85)']
  );

  const borderBottomColor = useTransform(
    scrollY,
    [0, 60],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.08)']
  );

  return (
    <motion.header
      style={{
        backgroundColor,
        borderBottom: '1px solid',
        borderBottomColor,
      }}
      className="fixed top-0 left-0 w-full h-[44px] z-50 backdrop-blur-md transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Left: Product Wordmark */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm tracking-tight text-white/90">
            KisanTrace Diorama 3.0
          </span>
          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white/60">
            Digital Twin
          </span>
        </div>

        {/* Center: Minimal Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-normal text-white/60">
          <a
            href="#overview"
            className="hover:text-white transition-opacity duration-200 hover:underline hover:decoration-[#00D6FF] hover:underline-offset-4"
          >
            Overview
          </a>
          <a
            href="#technology"
            className="hover:text-white transition-opacity duration-200 hover:underline hover:decoration-[#00D6FF] hover:underline-offset-4"
          >
            Technology
          </a>
          <a
            href="#inspection"
            className="hover:text-white transition-opacity duration-200 hover:underline hover:decoration-[#00D6FF] hover:underline-offset-4"
          >
            AI Inspection
          </a>
          <a
            href="#specs"
            className="hover:text-white transition-opacity duration-200 hover:underline hover:decoration-[#00D6FF] hover:underline-offset-4"
          >
            Specs
          </a>
          <a
            href="#buy"
            className="hover:text-white transition-opacity duration-200 hover:underline hover:decoration-[#00D6FF] hover:underline-offset-4"
          >
            Deploy
          </a>
        </nav>

        {/* Right: CTA Button with Gradient Border */}
        <div className="flex items-center">
          <a
            href="#buy"
            className="relative group p-[1px] rounded-full overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#0050FF] to-[#00D6FF] opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="relative px-3.5 py-1 rounded-full bg-[#050505] text-white/90 text-xs font-medium block transition-colors group-hover:bg-[#050505]/80">
              Experience KisanTrace
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
