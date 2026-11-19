import React from 'react';
import { Scan, Search, Phone, CheckCircle2, ShieldCheck, ArrowDown } from 'lucide-react';
import Farmer3DBag from './3d/Farmer3DBag';
import { FARMER_TEXT } from '../data/mockBatches';

export default function Hero({ lang = 'hi', onScanClick, onEnterNumberClick, activeBatchId }) {
  const t = FARMER_TEXT[lang];

  return (
    <section className="relative pt-24 pb-12 px-4 sm:px-8 max-w-7xl mx-auto min-h-[85vh] flex items-center">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-[#10B981]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#FF6A1A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Clear, Farmer-Friendly Text & Big Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 mb-5 text-xs text-[#3DDC84]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-semibold tracking-wide">
              {lang === 'hi' ? 'प्रधानमंत्री किसान समृद्धि योजना &bull; प्रत्यक्ष लाभ अंतरण (DBT)' : 'PM Kisan Fertilizer Provenance & DBT Portal'}
            </span>
          </div>

          {/* Simple, Bold Headline */}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] text-white tracking-tight mb-4">
            {t.tagline.split('?')[0]}? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DDC84] via-[#10B981] to-[#FF6A1A]">
              {t.tagline.split('?')[1]}
            </span>
          </h1>

          {/* Easy Subtitle */}
          <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed mb-6 font-light max-w-xl">
            {t.subtagline}
          </p>

          {/* Two Big Primary Action Buttons for Farmers */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
            <button
              onClick={onScanClick}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-green flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Scan className="w-5 h-5" />
              <span>{t.scanBagBtn}</span>
            </button>

            <button
              onClick={onEnterNumberClick}
              className="px-7 py-3.5 rounded-full glass-panel border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Search className="w-4 h-4 text-[#FF6A1A]" />
              <span>{t.enterNumberBtn}</span>
            </button>
          </div>

          {/* 3 Simple Farmer Fact Cards (Price, Subsidy, Quality) */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-lg pt-4 border-t border-white/10 text-left">
            <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
              <span className="text-[11px] text-[#A1A1AA] block mb-0.5">
                {lang === 'hi' ? 'सरकारी रेट' : 'Govt MRP'}
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-white">
                ₹266.50
              </span>
              <span className="text-[10px] text-[#3DDC84] block mt-0.5">
                {lang === 'hi' ? 'प्रति 50 कि.ग्रा.' : 'per 50kg bag'}
              </span>
            </div>

            <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
              <span className="text-[11px] text-[#A1A1AA] block mb-0.5">
                {lang === 'hi' ? 'सरकारी सब्सिडी' : 'DBT Subsidy'}
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-[#3DDC84]">
                ₹1,500.00
              </span>
              <span className="text-[10px] text-[#A1A1AA] block mt-0.5">
                {lang === 'hi' ? 'सीधे बैंक में' : 'Direct to Bank'}
              </span>
            </div>

            <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
              <span className="text-[11px] text-[#A1A1AA] block mb-0.5">
                {lang === 'hi' ? 'शुद्धता गारंटी' : 'Purity Standard'}
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-[#FF6A1A]">
                46.2% N
              </span>
              <span className="text-[10px] text-[#3DDC84] block mt-0.5">
                {lang === 'hi' ? 'लैब पास ✓' : 'Lab Passed ✓'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Realistic 3D Fertilizer Sack Model */}
        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center">
          <Farmer3DBag
            lang={lang}
            activeBatchId={activeBatchId}
            onScanComplete={onEnterNumberClick}
          />
        </div>
      </div>
    </section>
  );
}
