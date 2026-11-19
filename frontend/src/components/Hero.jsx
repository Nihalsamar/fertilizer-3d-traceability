import React from 'react';
import { ArrowRight, Sparkles, Shield, Cpu, ChevronDown } from 'lucide-react';
import Hero3DCanvas from './3d/Hero3DCanvas';

export default function Hero({ onTrackBatchClick, onLearnMoreClick }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-[#141416] via-[#0B0B0C] to-[#0B0B0C]">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6A1A]/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#3DDC84]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Tiny Sparkle Star Accents */}
      <div className="absolute top-36 left-12 text-[#FF6A1A]/40 text-xl animate-pulse pointer-events-none select-none">✦</div>
      <div className="absolute top-52 right-24 text-white/30 text-sm animate-pulse pointer-events-none select-none">✧</div>
      <div className="absolute bottom-40 left-1/3 text-[#3DDC84]/40 text-lg animate-pulse pointer-events-none select-none">✦</div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headlines & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-white/10 mb-6 text-xs text-white/80">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3DDC84] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3DDC84]"></span>
            </span>
            <span className="font-mono text-[#F5F5F5] font-medium tracking-wide">
              LIVE DIGITAL TWIN &bull; AADHAAR DBT SUBSIDY RELEASE
            </span>
          </div>

          {/* Clean, Massive Sans-Serif Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.06] tracking-tighter text-[#F5F5F5] mb-6">
            Trace Every Grain. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A1A] via-[#FFA450] to-[#3DDC84]">
              Trust Every Harvest.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-xl leading-relaxed mb-8 font-light">
            India's premier 3D spatial fertilizer traceability infrastructure. Uniting 3-level hierarchical QR codes, 
            immutable Merkle blockchain proofs, IoT cold-chain tripwires, and instant ₹1,500 Direct Benefit Transfer verification.
          </p>

          {/* Pill-Shaped Buttons: One filled white, one outline */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onTrackBatchClick}
              className="px-8 py-3.5 rounded-full bg-white text-[#0B0B0C] font-semibold text-sm hover:bg-[#FF6A1A] hover:text-white transition-all duration-300 shadow-glow-orange flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              <span>Track a Batch</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onLearnMoreClick}
              className="px-8 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm hover:border-white/50 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Explore Journey</span>
              <ChevronDown className="w-4 h-4 text-[#A1A1AA]" />
            </button>
          </div>

          {/* Trust Highlights Grid below CTAs */}
          <div className="grid grid-cols-3 gap-4 pt-10 mt-10 border-t border-white/10 w-full max-w-lg">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">3-Tier</div>
              <div className="text-xs text-[#A1A1AA]">Bag &bull; Pallet &bull; Master</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#3DDC84]">0.3s</div>
              <div className="text-xs text-[#A1A1AA]">Sub-second Finality</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#FF6A1A]">₹1,500</div>
              <div className="text-xs text-[#A1A1AA]">Direct DBT / Bag</div>
            </div>
          </div>
        </div>

        {/* Right Column: Large 3D Hero Object */}
        <div className="lg:col-span-5 w-full flex items-center justify-center relative">
          <Hero3DCanvas />
        </div>
      </div>
    </section>
  );
}
