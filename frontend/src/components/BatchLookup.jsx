import React, { useState } from 'react';
import { BATCHES_DATA } from '../data/mockBatches';
import { Search, ShieldCheck, AlertOctagon, CheckCircle2, QrCode, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BatchLookup({ onOpenDataHub }) {
  const [searchTerm, setSearchTerm] = useState('BATCH-UREA-2026-9041');
  const [activeBatch, setActiveBatch] = useState(BATCHES_DATA[0]);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e?.preventDefault();
    const query = searchTerm.trim().toUpperCase();
    const found = BATCHES_DATA.find(
      b => b.batchId.toUpperCase().includes(query) || b.productName.toUpperCase().includes(query)
    );

    if (found) {
      setActiveBatch(found);
      setSearched(true);
      if (found.status === 'DELIVERED') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FF6A1A', '#3DDC84', '#ffffff']
        });
      }
    } else {
      setActiveBatch(null);
      setSearched(true);
    }
  };

  const handleQuickSelect = (id) => {
    setSearchTerm(id);
    const found = BATCHES_DATA.find(b => b.batchId === id);
    if (found) {
      setActiveBatch(found);
      setSearched(true);
      if (found.status === 'DELIVERED') {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.75 },
          colors: ['#FF6A1A', '#3DDC84']
        });
      }
    }
  };

  return (
    <section id="lookup" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 mb-4 text-xs font-mono text-[#38BDF8]">
          <Search className="w-3.5 h-3.5" />
          <span>INSTANT VERIFICATION TERMINAL</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4">
          Verify Fertilizer Provenance
        </h2>
        <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl leading-relaxed">
          Input any serialized Bag QR, Pallet hash, or consignment lot number to audit its complete cryptographic journey.
        </p>
      </div>

      {/* Glowing Search Box */}
      <div className="max-w-3xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6A1A] via-[#38BDF8] to-[#3DDC84] rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500" />
          
          <div className="relative flex items-center glass-panel rounded-2xl sm:rounded-full p-2 border border-white/20 bg-[#0B0B0C]/90 shadow-2xl">
            <div className="pl-4 pr-2 text-white/50">
              <Search className="w-5 h-5 text-[#FF6A1A]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Batch ID, QR Token, or Product Name..."
              className="w-full bg-transparent text-white placeholder-white/40 text-sm sm:text-base px-2 py-2.5 focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl sm:rounded-full bg-white text-[#0B0B0C] font-semibold text-xs sm:text-sm hover:bg-[#FF6A1A] hover:text-white transition-all shadow-glow-orange flex items-center gap-2 shrink-0"
            >
              <span>Audit Batch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick Sample Batch Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mt-4 text-xs">
          <span className="text-[#A1A1AA]">Sample Batches:</span>
          {BATCHES_DATA.map((b) => (
            <button
              key={b.batchId}
              type="button"
              onClick={() => handleQuickSelect(b.batchId)}
              className={`px-3 py-1 rounded-full font-mono transition-all border ${
                activeBatch?.batchId === b.batchId
                  ? 'bg-white/15 text-white border-white/30'
                  : 'bg-white/5 text-white/60 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {b.batchId.replace('BATCH-', '')}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Result Card */}
      {searched && activeBatch && (
        <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
          {/* Status Header Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-[#FF6A1A] border border-[#FF6A1A]/30">
                  {activeBatch.batchId}
                </span>
                <span className="text-xs font-mono text-[#A1A1AA]">
                  Mfg: {activeBatch.mfgDate}
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {activeBatch.productName}
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Produced by: {activeBatch.manufacturer} ({activeBatch.factoryGps})
              </p>
            </div>

            {/* Status Pill */}
            <div>
              {activeBatch.tripwireTripped ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-300">
                  <AlertOctagon className="w-5 h-5 text-red-400" />
                  <div className="text-left">
                    <div className="text-xs font-bold font-mono">REVERSE FLOW RECALLED</div>
                    <div className="text-[10px] opacity-80">Sensor tripwire breach</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#3DDC84]/20 border border-[#3DDC84]/40 text-[#A7F3D0]">
                  <CheckCircle2 className="w-5 h-5 text-[#3DDC84]" />
                  <div className="text-left">
                    <div className="text-xs font-bold font-mono">VERIFIED GENUINE ✓</div>
                    <div className="text-[10px] opacity-80">₹1,500 DBT Subsidy Cleared</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Three Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
              <span className="text-[11px] font-mono uppercase text-[#A1A1AA] block mb-1">
                Nitrogen Content / QC
              </span>
              <span className="text-lg font-bold font-mono text-white">
                {activeBatch.labCertification.nitrogenContent.split(' ')[0]}
              </span>
              <span className="text-[11px] text-[#3DDC84] block mt-0.5">
                HPLC Grade A Pass
              </span>
            </div>

            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
              <span className="text-[11px] font-mono uppercase text-[#A1A1AA] block mb-1">
                Live Sensor Telemetry
              </span>
              <span className={`text-lg font-bold font-mono ${activeBatch.tripwireTripped ? 'text-red-400' : 'text-white'}`}>
                {activeBatch.currentTemp}°C &bull; {activeBatch.currentHumidity}% RH
              </span>
              <span className={`text-[11px] block mt-0.5 ${activeBatch.tripwireTripped ? 'text-red-400' : 'text-[#3DDC84]'}`}>
                {activeBatch.tripwireTripped ? 'Threshold Exceeded' : 'Safe Operating Window'}
              </span>
            </div>

            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
              <span className="text-[11px] font-mono uppercase text-[#A1A1AA] block mb-1">
                Consignment Size
              </span>
              <span className="text-lg font-bold font-mono text-white">
                {activeBatch.quantity}
              </span>
              <span className="text-[11px] text-[#38BDF8] block mt-0.5">
                {activeBatch.unitSize}
              </span>
            </div>
          </div>

          {/* Custody Timeline */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-4">
              Cryptographic Custody Timeline
            </h4>
            <div className="space-y-4">
              {activeBatch.stages.map((st, i) => (
                <div key={st.id} className="flex items-start gap-4 text-xs">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[10px] ${
                      st.status === 'FAILED'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-[#3DDC84]/20 text-[#3DDC84] border border-[#3DDC84]/40'
                    }`}>
                      {i + 1}
                    </div>
                    {i < activeBatch.stages.length - 1 && (
                      <div className="w-[1px] h-8 bg-white/10 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-white">{st.title}</span>
                      <span className="text-[10.5px] font-mono text-[#A1A1AA]">{st.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-white/70 mt-0.5">{st.location}</div>
                    <div className="text-[11px] text-[#A1A1AA] mt-1 font-light">{st.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Footprint Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#FF6A1A]" />
              <span className="text-[#A1A1AA]">Merkle Root:</span>
              <span className="font-mono text-white/90 truncate max-w-xs">{activeBatch.merkleRoot}</span>
            </div>

            <button
              onClick={onOpenDataHub}
              className="text-xs text-[#3DDC84] hover:underline flex items-center gap-1.5 font-medium"
            >
              <span>View Full Provenance Table &amp; Excel Export</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {searched && !activeBatch && (
        <div className="max-w-md mx-auto glass-panel p-8 rounded-3xl border border-white/10 text-center">
          <AlertOctagon className="w-10 h-10 text-[#FF6A1A] mx-auto mb-3" />
          <h3 className="font-bold text-lg text-white mb-1">Batch Record Not Found</h3>
          <p className="text-xs text-[#A1A1AA] mb-4">
            Could not find a batch matching "{searchTerm}". Please check the ID or select one of the sample batches above.
          </p>
          <button
            onClick={() => handleQuickSelect('BATCH-UREA-2026-9041')}
            className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all"
          >
            Load Sample Batch
          </button>
        </div>
      )}
    </section>
  );
}
