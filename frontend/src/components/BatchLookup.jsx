import React, { useState } from 'react';
import { BATCHES_DATA, FARMER_TEXT } from '../data/mockBatches';
import { Search, CheckCircle2, AlertTriangle, ShieldCheck, Phone, FileText, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BatchLookup({ lang = 'hi', onSelectBatch, onOpenDataHub }) {
  const [query, setQuery] = useState('9041');
  const [activeBatch, setActiveBatch] = useState(BATCHES_DATA[0]);
  const [searched, setSearched] = useState(true);
  const t = FARMER_TEXT[lang];

  const handleSearch = (e) => {
    e?.preventDefault();
    const clean = query.trim().toUpperCase();
    const found = BATCHES_DATA.find(
      b => b.shortId === clean || b.batchId.toUpperCase().includes(clean)
    );

    if (found) {
      setActiveBatch(found);
      setSearched(true);
      if (onSelectBatch) onSelectBatch(found.batchId);
      if (found.isGenuine) {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10B981', '#FF6A1A', '#ffffff']
        });
      }
    } else {
      setActiveBatch(null);
      setSearched(true);
    }
  };

  const handleSelectSample = (id) => {
    setQuery(id);
    const found = BATCHES_DATA.find(b => b.shortId === id || b.batchId === id);
    if (found) {
      setActiveBatch(found);
      setSearched(true);
      if (onSelectBatch) onSelectBatch(found.batchId);
      if (found.isGenuine) {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.75 },
          colors: ['#10B981', '#3DDC84']
        });
      }
    }
  };

  return (
    <section id="lookup-section" className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-2 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 mb-3 text-xs text-[#3DDC84] font-semibold">
          <span>⚡</span>
          <span>{lang === 'hi' ? 'तुरंत जांचें: असली या नकली' : 'Instant Verification Terminal'}</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2">
          {lang === 'hi' ? 'अपनी बोरी का नंबर यहां डालें' : 'Enter Your Fertilizer Bag Number'}
        </h2>
        <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-lg">
          {lang === 'hi'
            ? 'बोरी पर छपे क्यूआर कोड के नीचे दिया गया 4 अंकों का नंबर डालें और 1 सेकंड में जांचें:'
            : 'Enter the 4-digit number printed below the QR code to check authenticity:'}
        </p>
      </div>

      {/* Big Farmer Search Box */}
      <div className="max-w-2xl mx-auto mb-6">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'उदा. 9041 या 8812 या 773' : 'e.g. 9041 or 8812 or 773'}
            className="w-full bg-[#18181B] border-2 border-white/20 focus:border-[#10B981] rounded-2xl sm:rounded-full py-4 pl-5 pr-32 text-base text-white placeholder-white/40 font-mono focus:outline-none shadow-xl transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 px-6 py-2.5 rounded-xl sm:rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs sm:text-sm hover:opacity-90 transition-all shadow-glow-green flex items-center gap-1.5"
          >
            <span>{lang === 'hi' ? 'जांचें' : 'Check'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Sample Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mt-4 text-xs">
          <span className="text-[#A1A1AA]">{t.samplePillsTitle}</span>
          <button
            type="button"
            onClick={() => handleSelectSample('9041')}
            className={`px-3 py-1.5 rounded-full font-medium transition-all border ${
              activeBatch?.shortId === '9041'
                ? 'bg-[#10B981] text-white border-[#10B981]'
                : 'bg-white/5 text-white/70 border-white/10 hover:text-white'
            }`}
          >
            {t.ureaPill}
          </button>
          <button
            type="button"
            onClick={() => handleSelectSample('8812')}
            className={`px-3 py-1.5 rounded-full font-medium transition-all border ${
              activeBatch?.shortId === '8812'
                ? 'bg-[#10B981] text-white border-[#10B981]'
                : 'bg-white/5 text-white/70 border-white/10 hover:text-white'
            }`}
          >
            {t.dapPill}
          </button>
          <button
            type="button"
            onClick={() => handleSelectSample('773')}
            className={`px-3 py-1.5 rounded-full font-medium transition-all border ${
              activeBatch?.shortId === '773'
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
            }`}
          >
            {t.fakePill}
          </button>
        </div>
      </div>

      {/* Result Card: Very Clear and High Contrast for Farmers */}
      {searched && activeBatch && (
        <div className={`glass-panel p-6 sm:p-8 rounded-3xl border ${
          activeBatch.isGenuine ? 'border-[#10B981]/40 bg-[#0B0B0C]/90' : 'border-red-500/50 bg-red-950/20'
        } shadow-2xl relative overflow-hidden transition-all duration-300`}>
          
          {/* Top Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                  activeBatch.isGenuine
                    ? 'bg-[#10B981]/20 text-[#3DDC84] border border-[#10B981]/40'
                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}>
                  {activeBatch.batchId}
                </span>
                <span className="text-xs text-[#A1A1AA]">
                  {lang === 'hi' ? `बोरी वजन: ${activeBatch.bagWeight}` : `Net: ${activeBatch.bagWeight}`}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {lang === 'hi' ? activeBatch.productName : activeBatch.productNameEn}
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-1">
                {lang === 'hi' ? `कंपनी: ${activeBatch.manufacturerHi}` : `Manufacturer: ${activeBatch.manufacturer}`}
              </p>
            </div>

            {/* Big Green or Red Authenticity Badge */}
            <div className={`px-5 py-3 rounded-2xl flex items-center gap-3 border ${
              activeBatch.isGenuine
                ? 'bg-[#10B981]/20 border-[#10B981]/50 text-[#3DDC84]'
                : 'bg-red-500/25 border-red-500/60 text-red-300'
            }`}>
              {activeBatch.isGenuine ? (
                <CheckCircle2 className="w-8 h-8 text-[#10B981] shrink-0" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-red-400 shrink-0" />
              )}
              <div>
                <div className="font-bold text-base sm:text-lg">
                  {lang === 'hi' ? activeBatch.statusBadgeHi : activeBatch.statusBadgeEn}
                </div>
                <div className="text-xs opacity-90">
                  {activeBatch.isGenuine
                    ? (lang === 'hi' ? 'सब्सिडी ₹1,500 सुरक्षित' : '₹1,500 Subsidy Approved')
                    : (lang === 'hi' ? 'यह खाद न खरीदें' : 'Do Not Buy This Bag')}
                </div>
              </div>
            </div>
          </div>

          {/* Key Farmer Details Grid (Price, Subsidy, Nitrogen, Lab) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">
                {lang === 'hi' ? 'सरकारी रेट (MRP)' : 'Official MRP'}
              </span>
              <span className="text-lg font-bold font-mono text-white">
                {activeBatch.mrp}
              </span>
              <span className="text-[10px] text-[#3DDC84] block mt-0.5">
                {lang === 'hi' ? 'अधिकतम मूल्य' : 'Max Retail Price'}
              </span>
            </div>

            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">
                {lang === 'hi' ? 'सरकारी सब्सिडी' : 'Govt Subsidy'}
              </span>
              <span className={`text-lg font-bold font-mono ${activeBatch.isGenuine ? 'text-[#3DDC84]' : 'text-red-400'}`}>
                {activeBatch.dbtSubsidy}
              </span>
              <span className="text-[10px] text-[#A1A1AA] block mt-0.5">
                {activeBatch.isGenuine
                  ? (lang === 'hi' ? 'सीधे बैंक खाते में ✓' : 'Direct to Bank ✓')
                  : (lang === 'hi' ? 'सब्सिडी रोकी गई' : 'Subsidy Revoked')}
              </span>
            </div>

            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">
                {lang === 'hi' ? 'नाइट्रोजन शुद्धता' : 'Nitrogen Grade'}
              </span>
              <span className="text-lg font-bold font-mono text-white">
                {activeBatch.nitrogen.split(' ')[0]}
              </span>
              <span className="text-[10px] text-[#3DDC84] block mt-0.5">
                {activeBatch.isGenuine ? '46% मानक पास' : 'अमान्य मात्रा'}
              </span>
            </div>

            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">
                {lang === 'hi' ? 'किसान / लाभार्थी' : 'Farmer / Beneficiary'}
              </span>
              <span className="text-sm font-bold text-white truncate block">
                {activeBatch.farmerName.split(' ')[0]}
              </span>
              <span className="text-[10px] text-[#38BDF8] block mt-0.5">
                {lang === 'hi' ? 'आधार लिंक्ड' : 'Aadhaar Verified'}
              </span>
            </div>
          </div>

          {/* Alert Explanation Box */}
          <div className={`p-4 rounded-2xl border mb-6 text-xs sm:text-sm leading-relaxed ${
            activeBatch.isGenuine
              ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#D1FAE5]'
              : 'bg-red-500/15 border-red-500/40 text-red-200'
          }`}>
            <p className="font-medium">
              {lang === 'hi' ? activeBatch.alertMessageHi : activeBatch.alertMessageEn}
            </p>
          </div>

          {/* Simple Bag Journey for the Farmer */}
          <div className="pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-3">
              {lang === 'hi' ? 'आपकी बोरी का सफर (कहाँ से आई):' : 'Journey of this Fertilizer Bag:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeBatch.journey.map((step, idx) => (
                <div key={idx} className="bg-black/30 p-3 rounded-xl border border-white/5 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">
                      {lang === 'hi' ? step.titleHi : step.titleEn}
                    </span>
                    <span className="text-[10px] font-mono text-[#3DDC84]">{step.date}</span>
                  </div>
                  <p className="text-[11.5px] text-[#A1A1AA] font-light">
                    {lang === 'hi' ? step.descHi : step.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fake Bag Complaint Action Button */}
          {!activeBatch.isGenuine && (
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-red-300 font-semibold">
                {lang === 'hi' ? 'नकली खाद बेचने वाले दुकानदार की शिकायत करें:' : 'Report this seller to the Kisan Call Centre:'}
              </span>
              <a
                href="tel:18001801551"
                className="px-5 py-2.5 rounded-full bg-red-600 text-white font-bold text-xs hover:bg-red-500 transition-all flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? '📞 1800-180-1551 पर शिकायत करें' : '📞 Call 1800-180-1551'}</span>
              </a>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
