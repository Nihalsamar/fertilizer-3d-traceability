import React, { useState } from 'react';
import { QrCode, Radio, FileCheck, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';

const FEATURE_CARDS = [
  {
    icon: QrCode,
    tag: 'Hardware & Serialization',
    title: '3-Level Hierarchical QR',
    color: '#FF6A1A',
    description:
      'From 1 unit bag (50kg) with unique SHA-256 token, rolled up into a 50-bag Pallet Merkle root, up to a 20-pallet Master RFID tag. Complete packaging integrity at every transfer point.',
    metric: '100% Bag Serialization'
  },
  {
    icon: Radio,
    tag: 'Cold Chain Telemetry',
    title: 'Real-Time IoT & GPS Corridor',
    color: '#38BDF8',
    description:
      'Continuous cellular 4G/NB-IoT telemetry logging transit speed, GPS corridor adherence, temperature, and relative humidity. Automated smart contract tripwires stop spoiled fertilizer.',
    metric: '40°C / 85% RH Guardrail'
  },
  {
    icon: FileCheck,
    tag: 'Chemical Integrity',
    title: 'Decentralized QC Certificates',
    color: '#3DDC84',
    description:
      'Accredited lab HPLC & spectroscopy logs digitally signed using Ed25519 asymmetric cryptography. Guaranteed Nitrogen stoichiometry (46.2% N) and zero unauthorized adulterants.',
    metric: 'Ed25519 Signed Cryptography'
  },
  {
    icon: ShieldAlert,
    tag: 'Regulatory & Governance',
    title: 'DBT Subsidy & Fraud Prevention',
    color: '#A855F7',
    description:
      'Direct API handshake with national iFMS and Aadhaar DBT portals. Single-use token burn prevents recycled bag counterfeiting, diversion to chemical factories, and subsidy fraud.',
    metric: '₹1,500 DBT Released / Bag'
  }
];

export default function Features({ onLearnMoreClick }) {
  const [tilt, setTilt] = useState({});

  const handleMouseMove = (index, e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTilt(prev => ({
      ...prev,
      [index]: { rotateX, rotateY }
    }));
  };

  const handleMouseLeave = (index) => {
    setTilt(prev => ({
      ...prev,
      [index]: { rotateX: 0, rotateY: 0 }
    }));
  };

  return (
    <section id="features" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 mb-4 text-xs font-mono text-[#FF6A1A]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ENTERPRISE ARCHITECTURE</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4">
          Architected for Sovereign Trust
        </h2>
        <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl leading-relaxed">
          Four foundational pillars defending agricultural supply chains against counterfeiting, 
          nutrient adulteration, diversion, and subsidy leakages.
        </p>
      </div>

      {/* 4 Glassmorphism Cards with 3D Tilt on Hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURE_CARDS.map((card, idx) => {
          const Icon = card.icon;
          const currentTilt = tilt[idx] || { rotateX: 0, rotateY: 0 };

          return (
            <div
              key={card.title}
              onMouseMove={(e) => handleMouseMove(idx, e)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{
                transform: `perspective(1000px) rotateX(${currentTilt.rotateX}deg) rotateY(${currentTilt.rotateY}deg)`,
                transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              className="group glass-panel p-7 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden glass-card-hover"
            >
              {/* Soft colored glow aura inside card */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: card.color }}
              />

              <div>
                {/* Icon Container */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${card.color}15`,
                    border: `1px solid ${card.color}40`,
                    color: card.color
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA] mb-2">
                  {card.tag}
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-[#F5F5F5]">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6 font-light">
                  {card.description}
                </p>
              </div>

              {/* Bottom Badge Metric */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono font-semibold" style={{ color: card.color }}>
                  {card.metric}
                </span>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
