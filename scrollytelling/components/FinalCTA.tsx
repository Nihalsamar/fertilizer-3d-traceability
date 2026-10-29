import React from 'react';

export default function FinalCTA() {
  return (
    <section id="buy" className="relative w-full bg-[#050505] py-32 px-6 overflow-hidden border-t border-white/5">
      {/* Subtle radial glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,_#0050FF1A_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#00D6FF] mb-3 block">
          Enterprise Deployment
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white/95 mb-6 leading-tight">
          Ready to verify your agricultural supply chain?
        </h2>
        <p className="text-base text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
          Deploy the KisanTrace physical-digital diorama twin, edge computer vision grading, and zero-knowledge ledger in less than 48 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:deploy@kisantrace.org"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,214,255,0.45)] hover:scale-[1.02]"
          >
            Deploy KisanTrace Enterprise Platform
          </a>
          <a
            href="tel:+918005472687"
            className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 font-medium text-sm border border-white/10 transition-colors"
          >
            📞 +91 800-KISAN-TR
          </a>
        </div>
      </div>
    </section>
  );
}
