import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TraceabilityJourney from './components/TraceabilityJourney';
import Features from './components/Features';
import BatchLookup from './components/BatchLookup';
import Stats from './components/Stats';
import Footer from './components/Footer';
import DataHubModal from './components/DataHubModal';

export default function App() {
  const [dataHubOpen, setDataHubOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0B0C] text-[#F5F5F5] overflow-x-hidden selection:bg-[#FF6A1A]/30 selection:text-white">
      {/* Authentic Subtle Film Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Top Floating Navbar */}
      <Navbar
        onOpenDataHub={() => setDataHubOpen(true)}
        onTrackBatchClick={() => scrollToSection('lookup')}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 1: Hero with 3D floating fertilizer bag stack */}
        <Hero
          onTrackBatchClick={() => scrollToSection('lookup')}
          onLearnMoreClick={() => scrollToSection('journey')}
        />

        {/* Section 2: Traceability Journey with 3D camera navigation & environmental controls */}
        <TraceabilityJourney onOpenDataHub={() => setDataHubOpen(true)} />

        {/* Section 3: Features with 4 glass cards and 3D hover tilt */}
        <Features onLearnMoreClick={() => scrollToSection('journey')} />

        {/* Section 4: Batch Lookup with glowing search & 3D result card */}
        <BatchLookup onOpenDataHub={() => setDataHubOpen(true)} />

        {/* Section 5: Real-time animated stats counters */}
        <Stats />
      </main>

      {/* Section 6: Dark Minimal Footer with newsletter subscription */}
      <Footer onOpenDataHub={() => setDataHubOpen(true)} />

      {/* Modal: Full Provenance Architecture & Data Hub */}
      <DataHubModal
        isOpen={dataHubOpen}
        onClose={() => setDataHubOpen(false)}
      />
    </div>
  );
}
