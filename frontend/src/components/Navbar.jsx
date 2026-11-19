import React, { useState } from 'react';
import { Menu, X, Database, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenDataHub, onTrackBatchClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Journey', href: '#journey' },
    { label: 'Features', href: '#features' },
    { label: 'Batch Lookup', href: '#lookup' },
    { label: 'Metrics', href: '#stats' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 pb-2 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6A1A] via-[#F59E0B] to-[#3DDC84] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow-orange">
            <div className="w-full h-full bg-[#0B0B0C] rounded-[14px] flex items-center justify-center">
              <span className="text-lg">⚡</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              KisanTrace
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-white/10 text-[#FF6A1A] border border-[#FF6A1A]/30">
                Model 3
              </span>
            </span>
            <span className="text-[10.5px] text-[#A1A1AA] tracking-wider uppercase">
              Fertilizer Provenance
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10 shadow-glass">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-white/70 hover:text-white px-3.5 py-1.5 rounded-full transition-colors hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenDataHub}
            className="flex items-center gap-1.5 text-xs font-medium text-[#3DDC84] hover:text-white px-3.5 py-1.5 rounded-full transition-colors hover:bg-[#3DDC84]/15"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Turso & Excel Hub</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenDataHub}
            className="px-4 py-2 rounded-full border border-white/15 text-xs font-medium text-white/90 hover:border-white/40 hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#3DDC84]" />
            <span>DBT Simulator</span>
          </button>

          <button
            onClick={onTrackBatchClick}
            className="px-5 py-2 rounded-full bg-white text-[#0B0B0C] text-xs font-semibold hover:bg-[#FF6A1A] hover:text-white transition-all shadow-glow-orange flex items-center gap-1.5 group"
          >
            <span>Track a Batch</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/80 border border-white/10"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto glass-panel p-5 rounded-3xl border border-white/10 space-y-3 pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-white/80 hover:text-white py-2 px-3 rounded-xl hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDataHub();
            }}
            className="w-full flex items-center gap-2 text-sm font-medium text-[#3DDC84] py-2 px-3 rounded-xl hover:bg-white/5 text-left"
          >
            <Database className="w-4 h-4" />
            <span>Turso Cloud & Excel Hub</span>
          </button>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTrackBatchClick();
              }}
              className="w-full py-2.5 rounded-full bg-[#FF6A1A] text-white text-xs font-semibold text-center shadow-glow-orange"
            >
              Track a Batch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
