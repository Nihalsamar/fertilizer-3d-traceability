import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] py-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
        <div>
          &copy; {new Date().getFullYear()} KisanTrace Technologies Inc. All rights reserved. Interoperable with NPOP, APEDA, and GS1 Digital Link.
        </div>
        <div className="flex items-center gap-6">
          <a href="#privacy" className="hover:text-white/60 transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-white/60 transition-colors">
            Terms of Service
          </a>
          <a href="mailto:contact@kisantrace.org" className="hover:text-white/60 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
