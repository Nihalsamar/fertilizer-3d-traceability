import React, { useState } from 'react';
import { SUPPLY_CHAIN_STAGES } from '../data/mockBatches';
import Journey3DCanvas from './3d/Journey3DCanvas';
import { ChevronLeft, ChevronRight, RotateCcw, AlertTriangle, ShieldCheck, Thermometer, Droplets, CheckCircle2 } from 'lucide-react';

export default function TraceabilityJourney({ onOpenDataHub }) {
  const [activeStep, setActiveStep] = useState(0);
  const [temp, setTemp] = useState(28.0);
  const [humidity, setHumidity] = useState(55);
  const [packetType, setPacketType] = useState('pallet');
  const [isReverseFlow, setIsReverseFlow] = useState(false);

  // Smart Contract Tripwire Guardrail
  const isOverLimit = temp > 40.0 || humidity > 85;

  const handleNext = () => {
    if (activeStep < SUPPLY_CHAIN_STAGES.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const currentStage = SUPPLY_CHAIN_STAGES[activeStep];

  return (
    <section id="journey" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 mb-4 text-xs font-mono text-[#3DDC84]">
          <span>⛓️ IMMUTABLE 7-STAGE PIPELINE</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4">
          The Living Provenance Corridor
        </h2>
        <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl leading-relaxed">
          Journey from the Haber-Bosch synthesis reactor to the farmer’s soil. Watch the 3D diorama camera 
          fly along each custody transfer in real time.
        </p>
      </div>

      {/* 3D Journey Canvas Viewport */}
      <div className="mb-8">
        <Journey3DCanvas activeStep={activeStep} isReverseFlow={isReverseFlow || isOverLimit} />
      </div>

      {/* Step Navigator Bar */}
      <div className="glass-panel p-3 rounded-2xl border border-white/10 mb-8 flex items-center justify-between overflow-x-auto gap-2">
        {SUPPLY_CHAIN_STAGES.map((st, i) => (
          <button
            key={st.key}
            onClick={() => {
              setActiveStep(i);
              if (isReverseFlow) setIsReverseFlow(false);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300 ${
              activeStep === i
                ? 'bg-[#FF6A1A] text-white shadow-glow-orange font-semibold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="w-4 h-4 rounded-full flex items-center justify-center bg-black/20 text-[10px] font-mono">
              {st.step}
            </span>
            <span>{st.name.split('&')[0]}</span>
          </button>
        ))}
      </div>

      {/* Interactive Command & Narrative Dock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stage Detail & Cryptographic Record Card */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF6A1A]/20 text-[#FF6A1A] border border-[#FF6A1A]/30">
                Stage {currentStage.step} of 7
              </span>
              <span className="text-xs text-[#A1A1AA] font-mono">{currentStage.gps}</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#3DDC84]/15 text-[#3DDC84] font-medium border border-[#3DDC84]/20">
              {currentStage.badge}
            </span>
          </div>

          <h3 className="font-display font-bold text-2xl text-white mb-1">
            {currentStage.name}
          </h3>
          <p className="text-xs font-serif italic text-white/50 mb-4">
            {currentStage.hindi}
          </p>

          <p className="text-sm text-[#D4D4D8] leading-relaxed mb-6 font-light">
            {currentStage.description}
          </p>

          {/* Two-Column Telemetry & Smart Contract Records */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A1A] mb-2.5 flex items-center gap-1.5">
                <span>📦</span> Data Stored on Node
              </h4>
              <ul className="space-y-1.5">
                {currentStage.dataStored.map((item, idx) => (
                  <li key={idx} className="text-xs text-white/80 flex items-start gap-1.5">
                    <span className="text-[#3DDC84] text-[10px] mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#3DDC84] mb-2.5 flex items-center gap-1.5">
                <span>⛓️</span> Smart Contract Action
              </h4>
              <ul className="space-y-1.5">
                {currentStage.blockchainAction.map((action, idx) => (
                  <li key={idx} className="text-xs text-white/80 flex items-start gap-1.5">
                    <span className="text-[#FF6A1A] text-[10px] mt-0.5">&gt;</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={activeStep === 0}
                className="px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-white/80 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <button
                onClick={handleNext}
                disabled={activeStep === SUPPLY_CHAIN_STAGES.length - 1}
                className="px-5 py-2 rounded-full bg-white text-[#0B0B0C] text-xs font-semibold hover:bg-[#FF6A1A] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                setActiveStep(0);
                setIsReverseFlow(false);
                setTemp(28.0);
                setHumidity(55);
              }}
              className="text-xs text-[#A1A1AA] hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tour</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live IoT Environment & Guardrails Simulation */}
        <div className="lg:col-span-5 space-y-6">
          {/* Packet Level Selector */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-3">
              Packaging Hierarchy (Point 1 of Spec)
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPacketType('bag')}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                  packetType === 'bag'
                    ? 'border-[#FF6A1A] bg-[#FF6A1A]/15 text-white'
                    : 'border-white/10 text-white/70 hover:bg-white/5'
                }`}
              >
                📦 1 Bag (50kg)
              </button>
              <button
                onClick={() => setPacketType('pallet')}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                  packetType === 'pallet'
                    ? 'border-[#3DDC84] bg-[#3DDC84]/15 text-white'
                    : 'border-white/10 text-white/70 hover:bg-white/5'
                }`}
              >
                📦📦 Pallet (50)
              </button>
              <button
                onClick={() => setPacketType('master')}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                  packetType === 'master'
                    ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-white'
                    : 'border-white/10 text-white/70 hover:bg-white/5'
                }`}
              >
                🏭 Master RFID
              </button>
            </div>
          </div>

          {/* Environmental Telemetry Sliders */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-[#FF6A1A]" />
                <span>Ambient Temperature (Limit: 40°C)</span>
              </h4>
              <span className={`text-xs font-mono font-bold ${temp > 40 ? 'text-red-400' : 'text-white'}`}>
                {temp.toFixed(1)} °C
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="55"
              step="0.5"
              value={temp}
              onChange={(e) => setTemp(parseFloat(e.target.value))}
              className="w-full accent-[#FF6A1A] h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-[#38BDF8]" />
                <span>Relative Humidity (Limit: 85%)</span>
              </h4>
              <span className={`text-xs font-mono font-bold ${humidity > 85 ? 'text-red-400' : 'text-white'}`}>
                {humidity} %
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="1"
              value={humidity}
              onChange={(e) => setHumidity(parseInt(e.target.value))}
              className="w-full accent-[#38BDF8] h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />

            {/* Smart Contract Tripwire Status Box */}
            <div
              className={`p-4 rounded-2xl border transition-all text-xs ${
                isOverLimit || isReverseFlow
                  ? 'bg-red-500/10 border-red-500/40 text-red-300'
                  : 'bg-[#3DDC84]/10 border-[#3DDC84]/30 text-[#A7F3D0]'
              }`}
            >
              <div className="font-semibold flex items-center gap-2 mb-1">
                {isOverLimit || isReverseFlow ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>TRIPWIRE VIOLATION: REVERSE FLOW TRIGGERED</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#3DDC84]" />
                    <span>STATUS: BATCH COMPLIANT ✓</span>
                  </>
                )}
              </div>
              <p className="text-[11.5px] opacity-90 leading-relaxed font-light">
                {isOverLimit || isReverseFlow
                  ? 'Critical threshold breach! Smart contract automatically flags batch for quarantine and routes it back to the manufacturing plant via reverse flow.'
                  : 'All physical sensor parameters within compliant range. Direct benefit transfer subsidy cleared for execution upon farmer receipt.'}
              </p>
            </div>

            {/* Reverse Flow Trigger Button */}
            <button
              onClick={() => setIsReverseFlow(!isReverseFlow)}
              className={`w-full py-2.5 rounded-full text-xs font-semibold transition-all border ${
                isReverseFlow
                  ? 'bg-red-500 text-white border-red-600 shadow-lg shadow-red-500/30'
                  : 'border-red-500/40 text-red-400 hover:bg-red-500/10'
              }`}
            >
              {isReverseFlow ? '✓ Reverse Flow Active (Click to Clear)' : '↩ Simulate Emergency Reverse Flow Recall'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
