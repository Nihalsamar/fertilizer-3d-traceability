import React from 'react';
import { Phone, Database, FileSpreadsheet, ShieldAlert } from 'lucide-react';
import { FARMER_TEXT } from '../data/mockBatches';

export default function Footer({ lang = 'hi', onOpenDataHub }) {
  const t = FARMER_TEXT[lang];

  return (
    <footer className="bg-[#0B0B0C] border-t border-white/10 pt-12 pb-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Fake Fertilizer Alert & Helpline Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#FF6A1A]/30 bg-gradient-to-r from-black/80 via-[#FF6A1A]/10 to-black/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-display font-bold text-lg sm:text-xl text-white flex items-center justify-center md:justify-start gap-2">
              <ShieldAlert className="w-5 h-5 text-[#FF6A1A]" />
              <span>{t.reportFakeTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-lg font-light leading-relaxed">
              {t.reportFakeDesc}
            </p>
          </div>

          <a
            href="tel:18001801551"
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF6A1A] to-[#DC2626] text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-orange flex items-center gap-2 shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>{t.callNowBtn}</span>
          </a>
        </div>

        {/* Secondary Official Data Hub Link */}
        <div className="text-center pt-2">
          <button
            onClick={onOpenDataHub}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 text-xs text-[#A1A1AA] hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
          >
            <Database className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{t.dataHubBtn}</span>
          </button>
        </div>

        {/* Copyright & Badges */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A1A1AA]">
          <div>{t.footerCopyright}</div>
          <div className="flex items-center gap-4">
            <span className="text-white/60">₹266.50 MRP</span>
            <span>&bull;</span>
            <span className="text-white/60">₹1,500 DBT Subsidy</span>
            <span>&bull;</span>
            <span className="text-[#10B981]">100% Genuine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
