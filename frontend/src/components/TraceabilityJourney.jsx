import React, { useState } from 'react';
import Journey3DCanvas from './3d/Journey3DCanvas';
import { Thermometer, Droplets, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { FARMER_TEXT } from '../data/mockBatches';

export default function TraceabilityJourney({ lang = 'hi', onOpenDataHub }) {
  const [activeStep, setActiveStep] = useState(0);
  const [temp, setTemp] = useState(28.0);
  const [humidity, setHumidity] = useState(55);
  const isOverLimit = temp > 40.0 || humidity > 85;
  const t = FARMER_TEXT[lang];

  const steps = [
    {
      titleHi: '1. खाद कारखाना (फैक्ट्री)',
      titleEn: '1. Fertilizer Factory',
      subHi: 'बोरी भरी गई और क्यूआर कोड लगा',
      subEn: 'Bagging & unique QR stamped',
      descHi: 'फैक्ट्री में शुद्ध नीम कोटेड यूरिया भरा जाता है। हर 50 किलो की बोरी पर एक अनोखा क्यूआर कोड छपता है जिससे कोई नकली खाद न भर सके।',
      descEn: 'Pure Neem Coated Urea is packed and serialized with a tamper-evident QR code to prevent counterfeiting.',
      badgeHi: 'फैक्ट्री से प्रमाणित',
      badgeEn: 'Factory Certified',
      color: '#FF6A1A'
    },
    {
      titleHi: '2. सुरक्षित जीपीएस ट्रक (रास्ता)',
      titleEn: '2. GPS Truck Transit',
      subHi: 'गर्मी और तापमान की 24 घंटे जांच',
      subEn: 'IoT cold-chain tracking',
      descHi: 'ट्रक में लगा सेंसर रास्ते भर धूप और नमी नापता रहता है। अगर तापमान 40°C से ज्यादा हो तो अलर्ट बजता है और खराब खाद को रोक दिया जाता है।',
      descEn: 'Sensors monitor temperature and humidity continuously. Any spike above 40°C triggers an automatic stop.',
      badgeHi: 'जीपीएस लाइव',
      badgeEn: 'GPS Monitored',
      color: '#38BDF8'
    },
    {
      titleHi: '3. गांव की खाद दुकान (केंद्र)',
      titleEn: '3. Village Retailer Kendra',
      subHi: 'पीएम किसान सेवा केंद्र पर आगमन',
      subEn: 'Stocked at Kisan Kendra',
      descHi: 'दुकानदार बोरी स्कैन करके अपने स्टॉक में दर्ज करता है। सरकारी रेट ₹266.50 प्रति बोरी से ज्यादा लेना सख्त मना है।',
      descEn: 'Retailer scans incoming bags. Selling above the official MRP of ₹266.50 is strictly prohibited.',
      badgeHi: 'दुकान पर उपलब्ध',
      badgeEn: 'In Stock',
      color: '#A855F7'
    },
    {
      titleHi: '4. आपका खेत और ₹1,500 सब्सिडी',
      titleEn: '4. Farmer Field & DBT Subsidy',
      subHi: 'असली खाद + सीधे बैंक में पैसा',
      subEn: 'Authentic Bag + Bank Transfer',
      descHi: 'जैसे ही आप बोरी खरीदते हैं, सरकारी सब्सिडी ₹1,500 सीधे आपके बैंक खाते में जमा हो जाती है और आपके फोन पर एसएमएस आता है।',
      descEn: 'Upon purchase confirmation, ₹1,500 direct subsidy is sent straight to your bank with an instant SMS confirmation.',
      badgeHi: 'सब्सिडी जमा ✓',
      badgeEn: 'DBT Credited ✓',
      color: '#10B981'
    }
  ];

  const current = steps[activeStep];

  return (
    <section id="journey-section" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-2 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 mb-3 text-xs text-[#3DDC84] font-semibold">
          <span>🌾</span>
          <span>{lang === 'hi' ? 'फैक्ट्री से खेत तक' : 'From Factory to Field'}</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2">
          {t.journeyTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-xl">
          {t.journeySub}
        </p>
      </div>

      {/* 3D Journey Diorama Canvas */}
      <div className="mb-6">
        <Journey3DCanvas activeStep={activeStep * 2} isReverseFlow={isOverLimit} />
      </div>

      {/* 4 Simple Step Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {steps.map((st, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`p-3 rounded-2xl text-left border transition-all ${
              activeStep === i
                ? 'bg-[#10B981]/20 border-[#10B981] text-white shadow-glow-green'
                : 'glass-panel border-white/10 text-white/70 hover:bg-white/5'
            }`}
          >
            <div className="text-[10px] font-mono text-[#3DDC84] font-bold">
              {lang === 'hi' ? `कदम ${i + 1}` : `STEP ${i + 1}`}
            </div>
            <div className="text-xs font-bold text-white mt-0.5 truncate">
              {lang === 'hi' ? st.titleHi : st.titleEn}
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Detail Card & Farmer Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Active Stage Explainer */}
        <div className="md:col-span-7 glass-panel p-6 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-white">
              {lang === 'hi' ? current.badgeHi : current.badgeEn}
            </span>
            <span className="text-xs text-[#3DDC84] font-semibold">
              {lang === 'hi' ? `चरण ${activeStep + 1} / 4` : `Stage ${activeStep + 1} of 4`}
            </span>
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1">
            {lang === 'hi' ? current.titleHi : current.titleEn}
          </h3>
          <p className="text-xs text-[#FF6A1A] font-semibold mb-3">
            {lang === 'hi' ? current.subHi : current.subEn}
          </p>

          <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed mb-6 font-light">
            {lang === 'hi' ? current.descHi : current.descEn}
          </p>

          {/* Previous / Next buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-full border border-white/10 text-xs font-semibold text-white/80 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === 'hi' ? 'पिछला' : 'Previous'}</span>
            </button>

            <button
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={activeStep === steps.length - 1}
              className="px-5 py-2 rounded-full bg-[#10B981] text-white text-xs font-bold hover:bg-[#059669] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-glow-green"
            >
              <span>{lang === 'hi' ? 'अगला कदम' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Simple Sensor Tripwire Explanation for Farmers */}
        <div className="md:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-[#FF6A1A]" />
              <span>{lang === 'hi' ? 'धूप व गर्मी जांच (अधिकतम 40°C)' : 'Heat Limit (Max 40°C)'}</span>
            </h4>
            <span className={`text-xs font-mono font-bold ${temp > 40 ? 'text-red-400' : 'text-white'}`}>
              {temp.toFixed(1)} °C
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="50"
            step="0.5"
            value={temp}
            onChange={(e) => setTemp(parseFloat(e.target.value))}
            className="w-full accent-[#FF6A1A] h-2 bg-white/10 rounded-lg cursor-pointer"
          />

          {/* Simple Alert Status */}
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            isOverLimit
              ? 'bg-red-500/15 border-red-500/40 text-red-200'
              : 'bg-[#10B981]/15 border-[#10B981]/30 text-[#D1FAE5]'
          }`}>
            <div className="font-bold flex items-center gap-1.5 mb-1">
              {isOverLimit ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>{lang === 'hi' ? '⚠️ बहुत तेज धूप! खाद खराब होने का खतरा' : '⚠️ Overheating Alert! Stock Quarantined'}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>{lang === 'hi' ? '✓ सुरक्षित तापमान (खाद बिल्कुल सही है)' : '✓ Normal Temp (Fertilizer Safe)'}</span>
                </>
              )}
            </div>
            <p className="text-[11px] opacity-90">
              {isOverLimit
                ? (lang === 'hi' ? 'तापमान 40°C से ऊपर जाने पर खाद जल सकती है। ऐसा होने पर सिस्टम तुरंत रोक लगा देता है।' : 'Exceeding 40°C degrades fertilizer nutrients. The smart system quarantines the batch automatically.')
                : (lang === 'hi' ? 'खाद सही तापमान में रखी गई है। पोषक तत्व 100% सुरक्षित हैं।' : 'Stored under safe conditions. Guaranteed active nutrient bioavailability.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
