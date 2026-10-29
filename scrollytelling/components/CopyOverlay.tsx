'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface CopyOverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function CopyOverlay({ scrollYProgress }: CopyOverlayProps) {
  // Beat 1: Hero (0% - 15%)
  const beat1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.18], [0, 1, 1, 0]);
  const beat1Y = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.18], [20, 0, 0, -20]);

  // Beat 2: Engineering Reveal (15% - 40%)
  const beat2Opacity = useTransform(scrollYProgress, [0.15, 0.22, 0.35, 0.42], [0, 1, 1, 0]);
  const beat2Y = useTransform(scrollYProgress, [0.15, 0.22, 0.35, 0.42], [20, 0, 0, -20]);

  // Beat 3: Edge AI & Cold-Chain (40% - 65%)
  const beat3Opacity = useTransform(scrollYProgress, [0.4, 0.47, 0.6, 0.67], [0, 1, 1, 0]);
  const beat3Y = useTransform(scrollYProgress, [0.4, 0.47, 0.6, 0.67], [20, 0, 0, -20]);

  // Beat 4: Consumer Trust & Payout (65% - 85%)
  const beat4Opacity = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.87], [0, 1, 1, 0]);
  const beat4Y = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.87], [20, 0, 0, -20]);

  // Beat 5: Reassembly & CTA (84% - 100%)
  const beat5Opacity = useTransform(scrollYProgress, [0.84, 0.9, 1], [0, 1, 1]);
  const beat5Y = useTransform(scrollYProgress, [0.84, 0.9, 1], [20, 0, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full px-6">
        {/* Beat 1 — Hero (Center) */}
        <motion.div
          style={{ opacity: beat1Opacity, y: beat1Y }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D6FF] mb-3 block">
            KisanTrace 3.0 Platform
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white/95 mb-4 leading-tight">
            Provenance, perfected.
          </h1>
          <p className="text-base sm:text-xl font-normal text-white/70 max-w-xl mx-auto leading-relaxed">
            Flagship farm-to-fork digital twin and cryptographic quality certification for agricultural produce.
          </p>
          <span className="text-xs text-white/40 mt-3 block">
            Scroll to explore the engineering sequence ↓
          </span>
        </motion.div>

        {/* Beat 2 — Engineering Reveal (Left-Aligned) */}
        <motion.div
          style={{ opacity: beat2Opacity, y: beat2Y }}
          className="text-left max-w-lg"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#0050FF] mb-2 block">
            01 / Farm Origin Genesis
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white/95 mb-4 leading-snug">
            Precision-engineered at the source.
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            Tiered organic strata, geo-fenced orchard furrowing, and NPOP organic stamps deliver immutable origin genesis — harvest after harvest.
          </p>
        </motion.div>

        {/* Beat 3 — Edge AI & Cold-Chain (Right-Aligned) */}
        <motion.div
          style={{ opacity: beat3Opacity, y: beat3Y }}
          className="text-left max-w-lg ml-auto"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D6FF] mb-2 block">
            02 / Autonomous AI & Cold Logistics
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white/95 mb-4 leading-snug">
            Adaptive inspection, redefined.
          </h2>
          <ul className="space-y-2.5 text-base sm:text-lg text-white/60 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#00D6FF] mt-1">·</span>
              <span>Overhead neural camera inspects caliber, brix, and surface purity.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0050FF] mt-1">·</span>
              <span>IoT reefer telemetry tracks 12.8°C thermal envelope in real time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">·</span>
              <span>Spoilage and broken paper chains fade away. Freshness stays verified.</span>
            </li>
          </ul>
        </motion.div>

        {/* Beat 4 — Consumer Trust & Fair Trade (Left-Aligned) */}
        <motion.div
          style={{ opacity: beat4Opacity, y: beat4Y }}
          className="text-left max-w-lg"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D6FF] mb-2 block">
            03 / Consumer Verification & Fair-Trade
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white/95 mb-4 leading-snug">
            Provable authenticity in every scan.
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-3">
            Interactive smartphone PWA resolves full provenance from orchard tree to supermarket shelf.
          </p>
          <p className="text-sm sm:text-base text-white/50 leading-relaxed">
            Zero-knowledge smart contracts disburse a <strong className="text-emerald-400 font-medium">+28.5% premium</strong> directly to farmer accounts — so sustainable practices thrive.
          </p>
        </motion.div>

        {/* Beat 5 — Reassembly & CTA (Center) */}
        <motion.div
          style={{ opacity: beat5Opacity, y: beat5Y }}
          className="text-center max-w-2xl mx-auto pointer-events-auto"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D6FF] mb-2 block">
            Full Reassembly
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white/95 mb-4 leading-tight">
            Trace everything. Feel confident in every harvest.
          </h2>
          <p className="text-base sm:text-lg text-white/60 mb-6 max-w-lg mx-auto">
            KisanTrace Diorama 3.0. Designed for radical transparency, crafted for farmers and conscious buyers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a
              href="#buy"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,214,255,0.4)] hover:scale-[1.02]"
            >
              Deploy KisanTrace Ecosystem
            </a>
            <a
              href="#specs"
              className="text-sm text-white/60 hover:text-white transition-colors py-2 px-4"
            >
              See full specs →
            </a>
          </div>

          <p className="text-xs text-white/40">
            Engineered for orchards, APMC mandis, reefer fleets, and global export corridors.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
