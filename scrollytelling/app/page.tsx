import React from 'react';
import Navbar from '../components/Navbar';
import HeroSequence from '../components/HeroSequence';
import FeatureGrid from '../components/FeatureGrid';
import SpecsTable from '../components/SpecsTable';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <HeroSequence />
      <FeatureGrid />
      <SpecsTable />
      <FinalCTA />
      <Footer />
    </main>
  );
}
