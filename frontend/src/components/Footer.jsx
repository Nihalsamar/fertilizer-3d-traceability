import React, { useState } from 'react';
import { ArrowRight, Check, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer({ onOpenDataHub }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0B0B0C] border-t border-white/10 pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
        {/* Brand & Mission Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6A1A] to-[#3DDC84] flex items-center justify-center text-sm">
              ⚡
            </div>
            <span className="font-display font-bold text-xl text-white">
              KisanTrace 3D
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-sm leading-relaxed font-light">
            India's decentralized fertilizer supply-chain digital twin. Combining 3-level serialization, 
            IoT cold chain guardrails, and automated Aadhaar DBT subsidy releases.
          </p>

          <div className="flex flex-col gap-1 text-xs text-[#A1A1AA] font-mono pt-2">
            <a href="tel:+918005472687" className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#FF6A1A]" />
              <span>+91 800-KISAN-TR (Toll Free)</span>
            </a>
            <a href="mailto:contact@kisantrace.org" className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#3DDC84]" />
              <span>contact@kisantrace.org</span>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            System Modules
          </h4>
          <ul className="space-y-2 text-xs text-[#A1A1AA]">
            <li>
              <a href="#journey" className="hover:text-white transition-colors">
                7-Stage Living Provenance
              </a>
            </li>
            <li>
              <a href="#lookup" className="hover:text-white transition-colors">
                Instant QR Batch Lookup
              </a>
            </li>
            <li>
              <button onClick={onOpenDataHub} className="hover:text-[#3DDC84] transition-colors text-left">
                Turso Cloud Database Hub
              </button>
            </li>
            <li>
              <button onClick={onOpenDataHub} className="hover:text-[#38BDF8] transition-colors text-left">
                1-Click Excel Workbook (.xlsx)
              </button>
            </li>
            <li>
              <a href="/sentry" className="hover:text-[#FF6A1A] transition-colors flex items-center gap-1">
                <span>SENTRY Fraud Engine</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription Column */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Stay Updated
          </h4>
          <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
            Receive monthly agricultural blockchain audit bulletins and regulatory compliance reports.
          </p>

          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="w-full bg-white/5 border border-white/15 rounded-full py-2.5 pl-4 pr-28 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF6A1A]"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-1.5 rounded-full bg-white text-[#0B0B0C] text-xs font-semibold hover:bg-[#FF6A1A] hover:text-white transition-all flex items-center gap-1"
            >
              {subscribed ? (
                <>
                  <Check className="w-3 h-3 text-[#3DDC84]" />
                  <span>Joined</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <div>
          &copy; 2026 KisanTrace Spatial Architecture &bull; Built for National Fertilizer Logistics
        </div>
        <div className="flex items-center gap-6">
          <span className="text-white/60">WCAG AAA Accessible</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-white/60">Hyperledger Fabric v2.5</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-white/60">libSQL / Turso Cloud</span>
        </div>
      </div>
    </footer>
  );
}
