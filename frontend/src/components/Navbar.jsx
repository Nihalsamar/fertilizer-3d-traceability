import React from 'react';
import { Phone, Globe, Scan, Database } from 'lucide-react';
import { FARMER_TEXT } from '../data/mockBatches';

export default function Navbar({ lang = 'hi', setLang, onOpenDataHub, onScanClick }) {
  const t = FARMER_TEXT[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-3 pb-2 bg-[#0B0B0C]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo with Green Sprout */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10B981] via-[#059669] to-[#FF6A1A] p-[2px] shadow-glow-green">
            <div className="w-full h-full bg-[#0B0B0C] rounded-[14px] flex items-center justify-center text-lg">
              🌾
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg text-white flex items-center gap-2">
              {t.brandName}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#3DDC84] border border-[#10B981]/40">
                {lang === 'hi' ? 'किसान पोर्टल' : 'Farmer Portal'}
              </span>
            </span>
            <span className="text-[10px] text-[#A1A1AA] tracking-wide">
              {lang === 'hi' ? 'राष्ट्रीय खाद सत्यापन मिशन' : 'National Fertilizer Verification'}
            </span>
          </div>
        </a>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-3">
          {/* Bilingual Language Switcher Button (Crucial for farmers) */}
          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/20 transition-all shadow-sm"
            title="भाषा बदलें / Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#3DDC84]" />
            <span>{lang === 'hi' ? 'English में देखें' : 'हिन्दी में बदलें'}</span>
          </button>

          {/* Toll-Free Kisan Helpline button */}
          <a
            href="tel:18001801551"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF6A1A]/15 text-[#FF6A1A] hover:bg-[#FF6A1A]/25 text-xs font-bold font-mono border border-[#FF6A1A]/30 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>1800-180-1551 (मुफ्त)</span>
          </a>

          {/* Official Data Hub shortcut */}
          <button
            onClick={onOpenDataHub}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-all"
          >
            <Database className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{lang === 'hi' ? 'अधिकारी डेटा' : 'Official Hub'}</span>
          </button>

          {/* Big Action Pill */}
          <button
            onClick={onScanClick}
            className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-xs font-bold hover:opacity-90 transition-all shadow-glow-green flex items-center gap-1.5"
          >
            <Scan className="w-4 h-4" />
            <span>{lang === 'hi' ? 'खाद जांचें' : 'Check Bag'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
