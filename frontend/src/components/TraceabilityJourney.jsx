import React, { useState } from 'react';
import Journey3DCanvas from './3d/Journey3DCanvas';
import { Thermometer, Droplets, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { FARMER_TEXT } from '../data/mockBatches';

export default function TraceabilityJourney({ lang = 'hi', onOpenDataHub }) {
  const [activeStep, setActiveStep] = useState(0);
  const [temp, setTemp] = useState(28.0);
  const [humidity, setHumidity] = useState(55);
  const [isAutoTour, setIsAutoTour] = useState(false);
  const isOverLimit = temp > 40.0 || humidity > 85;
  const t = FARMER_TEXT[lang];

  // Complete 7-Stage Detailed Supply Chain Records
  const steps = [
    {
      id: 1,
      titleHi: '1. खाद कारखाना (Manufacturer & 3-Level QR)',
      titleEn: '1. Manufacturer & 3-Level Serialization',
      subHi: 'बोरी, पट्टा व कंटेनर पर 3-स्तरीय क्यूआर कोड',
      subEn: 'Bag QR, Pallet QR & Master RFID serialization',
      descHi: 'फैक्ट्री में शुद्ध नीम कोटेड यूरिया पैक होता है। 1 बोरी (50kg) पर अद्वितीय SHA-256 बैग क्यूआर कोड, 50 बोरियों के पट्टे पर पैलेट क्यूआर, और 20 पैलेट (50 मीट्रिक टन) पर मास्टर आरएफआईडी टैग लगता है।',
      descEn: 'Factory packages pure Neem Coated Urea. Every 50kg bag gets a unique SHA-256 QR, 50 bags form a Pallet QR, and 20 pallets are linked to a Master Container RFID tag.',
      badgeHi: 'फैक्ट्री मुहर ✓',
      badgeEn: 'Genesis Minted ✓',
      storedData: ['1 Bag = Bag QR (50kg SHA-256)', '50 Bags = Pallet Merkle Root', '20 Pallets = Master RFID', 'Factory GPS & Lot Timestamp'],
      smartAction: ['Mint Genesis Batch on Ledger', 'Anchor 3-Level Hierarchical Merkle Tree', 'Emit GenesisBatchCreated event']
    },
    {
      id: 2,
      titleHi: '2. गुणवत्ता लैब (Quality Testing Lab & HPLC)',
      titleEn: '2. Quality Lab & Chemical Certification',
      subHi: 'सरकारी लैब जांच: 46.2% नाइट्रोजन पास व डिजिटल मुहर',
      subEn: 'HPLC spectroscopy test: 46.2% N verified',
      descHi: 'सरकारी मान्यता प्राप्त लैब (CFQCTI) में स्पेक्ट्रोस्कोपी और HPLC जांच से 46.2% नाइट्रोजन शुद्धता, बायोरेट < 1.5% और नमी < 0.5% की पुष्टि होती है। परिणाम पर रसायनज्ञ की Ed25519 डिजिटल मुहर लगती है।',
      descEn: 'Accredited CFQCTI testing confirms 46.2% Nitrogen stoichiometry, biuret < 1.5%, and moisture < 0.5%. Results are digitally signed with certified Ed25519 lab keys.',
      badgeHi: 'लैब पास (46.2% N)',
      badgeEn: 'HPLC Grade A Pass',
      storedData: ['Sample Nitrogen: 46.28% (Standard: >= 46%)', 'Biuret: 0.82% &bull; Moisture: 0.31%', 'CFQCTI Digital Cert Hash'],
      smartAction: ['Cryptographically anchor lab certificate', 'Validate chemical stoichiometry standard', 'Block release if tolerances fail']
    },
    {
      id: 3,
      titleHi: '3. केंद्रीय गोदाम (Central Warehouse & Decision Point)',
      titleEn: '3. Central Warehouse & RFID Intake',
      subHi: 'स्वचालित आरएफआईडी गेट और स्टॉक छंटाई',
      subEn: 'Automated RFID portal gate & routing decision',
      descHi: 'रेल और ट्रक से माल केंद्रीय गोदाम पहुंचता है। आरएफआईडी गेट एक साथ 20 पैलेट स्कैन करके इनवर्ड स्टॉक दर्ज करता है। पीला निर्णय बिंदु: सही माल आगे भेजा जाता है, क्षतिग्रस्त माल तुरंत वापस कर दिया जाता है।',
      descEn: 'Logistics hub unloads container. RFID gate reads 20 pallets simultaneously. Decision point routes compliant stock forward to district transport, or flags damaged stock for return.',
      badgeHi: 'आरएफआईडी इनवर्ड',
      badgeEn: 'RFID Logged',
      storedData: ['Inward Custody Scan Timestamps', 'EPC Gen2 RFID Portal Inventory Match', 'Warehouse Bay Coordinates'],
      smartAction: ['Execute multi-signature custody transfer', 'Verify physical-to-digital inventory match', 'Route to domestic transit corridor']
    },
    {
      id: 4,
      titleHi: '4. परिवहन ट्रक व रास्ता (IoT Transit Corridor)',
      titleEn: '4. IoT Transit Corridor (NH-19 Highway)',
      subHi: 'जीपीएस ट्रक और धूप-तापमान की 24 घंटे लाइव जांच',
      subEn: 'Live cellular 4G/GPS truck telemetry',
      descHi: 'ट्रक (UP-32-BT-9014) एनएच-19 हाईवे से गुजरते हुए लगातार 4G/GPS से लोकेशन और तापमान भेजता है। यदि धूप या गर्मी 40°C से ज्यादा हो, तो स्मार्ट कॉन्ट्रैक्ट तुरंत अलार्म बजाकर खाद को रोक देता है।',
      descEn: 'GPS-enabled refrigerated truck continuously transmits corridor position, ambient temperature, and humidity. Tripwire triggers instant recall if temperature exceeds 40°C or humidity > 85%.',
      badgeHi: 'जीपीएस लाइव (48 km/h)',
      badgeEn: 'IoT Active',
      storedData: ['Vehicle ID: UP-32-BT-9014', 'Continuous GPS Corridor (NH-19)', 'Live Sensor Telemetry: 28.0°C / 55% RH'],
      smartAction: ['Stream real-time location to ledger', 'Active tripwire guardrail evaluation', 'Trigger quarantine if temperature exceeds 40°C']
    },
    {
      id: 5,
      titleHi: '5. जिला वितरक डिपो (District Distributor Depot)',
      titleEn: '5. District Distributor Depot & Allocation',
      subHi: 'थोक पैलेट स्कैन और उप-बैच वितरण',
      subEn: 'Pallet QR scan & sub-lot division',
      descHi: 'जिला डिपो पर थोक पैलेट स्कैन होता है। बहीखाते (Ledger) से कोड मिलान होने पर कस्टडी ट्रांसफर होती है और 1,000-1,000 बोरियों के उप-बैच बनाकर गांव के खाद बिक्री केंद्रों में भेजे जाते हैं।',
      descEn: 'District distribution hub scans pallet QR. System validates Merkle tree leaf hashes, updates custody, and splits bulk consignments into village retail allocations.',
      badgeHi: 'जिला डिपो हैंडशेक',
      badgeEn: 'Custody Transferred',
      storedData: ['Received Pallet QR Token Identifiers', 'Sub-lot Split Logs (1,000 Bags Allocated)', 'Depot Handoff Timestamp'],
      smartAction: ['Transfer consignment ownership to distributor', 'Authorize sub-lot division tokens', 'Update national fertilizer portal (iFMS)']
    },
    {
      id: 6,
      titleHi: '6. खुदरा केंद्र (Retailer POS — Works Offline)',
      titleEn: '6. Retailer POS (Offline-First Kendra)',
      subHi: 'बिना इंटरनेट वाले गांव में भी पीओएस से पक्की रसीद',
      subEn: 'Offline-resilient SQLite local store & nonce signing',
      descHi: 'गांव के पीएम किसान सेवा केंद्र पर इंटरनेट न होने पर भी पीओएस मशीन काम करती है। यह ऑफलाइन स्टोर में क्रिप्टोग्राफिक नॉन (Nonce) के साथ बिक्री दर्ज करती है और किसान को रसीद देती है। इंटरनेट आते ही डेटा सिंक हो जाता है।',
      descEn: 'Village PM Kisan Seva Kendra POS operates without connectivity. Transactions are signed with hardware nonces in local encrypted SQLite. Atomic sync executes automatically upon reconnection.',
      badgeHi: 'ऑफलाइन पीओएस सक्रिय',
      badgeEn: 'Offline-Signed ✓',
      storedData: ['Device Nonce & Local SQLite Hash', 'Subsidized Selling Price (MRP: ₹266.50)', 'Farmer Local OTP Receipt'],
      smartAction: ['Store cryptographically signed receipt', 'Atomic batch-sync to main chain when 4G connects', 'Prevent duplicate redemption via nonce verification']
    },
    {
      id: 7,
      titleHi: '7. किसान खेत व ₹1,500 सब्सिडी (Farmer Verification & DBT)',
      titleEn: '7. Farmer Verification & Direct Benefit Transfer',
      subHi: '3 नागरिक माध्यमों से जांच व सीधे बैंक में ₹1,500',
      subEn: 'Aadhaar / QR / USSD verification releases ₹1,500 DBT',
      descHi: 'किसान भाई 3 तरीकों से खाद जांचते हैं: ① स्मार्टफोन कैमरा, ② सादा फोन USSD (*99#), या ③ दुकान पर आधार बायोमेट्रिक्स। खाद असली साबित होते ही बोरी का टोकन जल (Burn) जाता है (ताकि कोई खाली बोरी दोबारा न भर सके) और ₹1,500 सब्सिडी सीधे बैंक में जमा होती है!',
      descEn: 'Farmer verifies fertilizer authenticity via 3 citizen channels: ① Smartphone QR, ② Feature Phone USSD *99#, or ③ POS Aadhaar Biometrics. Unit token is burned to prevent reuse, and ₹1,500 DBT subsidy is credited directly to the bank account!',
      badgeHi: '₹1,500 बैंक में जमा ✓',
      badgeEn: '₹1,500 DBT Credited ✓',
      storedData: ['Purchase Quantity: 1 Bag (50kg Neem Urea)', 'Farmer Aadhaar Masked: XXXX-XXXX-4819', 'Acreage Cap Verification (Bhulekh Records)', 'DBT Bank Reference ID'],
      smartAction: ['Burn unit bag single-use token (prevents bag refill fraud)', 'Trigger smart contract release of ₹1,500 DBT to farmer bank', 'Deliver green authenticity tick to farmer screen']
    }
  ];

  // Auto Tour Timer
  React.useEffect(() => {
    let timer;
    if (isAutoTour) {
      timer = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isAutoTour]);

  const current = steps[activeStep];

  return (
    <section id="journey-section" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-2 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 mb-3 text-xs text-[#3DDC84] font-semibold">
          <span>🌾</span>
          <span>{lang === 'hi' ? '3D सप्लाई चेन: पूरे 7 कदम' : '3D Spatial Supply Chain: All 7 Stages'}</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2">
          {lang === 'hi' ? 'कारखाने से खेत तक: 7 चरणों का 3D प्रदर्शन' : 'Factory to Farm: 7-Stage 3D Demonstration'}
        </h2>
        <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-2xl">
          {lang === 'hi'
            ? 'नीचे दिए गए 7 चरणों में से किसी पर भी क्लिक करें। 3D कैमरा उस चरण के मॉडल पर उड़कर जाएगा और विस्तृत जानकारी दिखाएगा:'
            : 'Click on any of the 7 stages below. The 3D camera will fly to that stage and showcase the animated model up-close:'}
        </p>
      </div>

      {/* 3D Viewport with 7 Detailed Models */}
      <div className="mb-6">
        <Journey3DCanvas
          activeStep={activeStep}
          isReverseFlow={isOverLimit}
          onStepSelect={(idx) => setActiveStep(idx)}
        />
      </div>

      {/* 7-Stage Horizontal Stepper with Hindi & English */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
        {steps.map((st, i) => (
          <button
            key={st.id}
            onClick={() => {
              setActiveStep(i);
              setIsAutoTour(false);
            }}
            className={`p-3 rounded-2xl text-left border transition-all ${
              activeStep === i
                ? 'bg-[#10B981] border-[#10B981] text-white shadow-glow-green scale-105'
                : 'glass-panel border-white/10 text-white/70 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-[10px] font-mono font-bold">
                {st.id}
              </span>
              {activeStep === i && <span className="text-[10px]">📍</span>}
            </div>
            <div className="text-xs font-bold text-white mt-1.5 truncate">
              {lang === 'hi' ? st.titleHi.split('(')[0] : st.titleEn.split('(')[0]}
            </div>
            <div className="text-[10px] text-white/70 truncate mt-0.5">
              {lang === 'hi' ? st.badgeHi : st.badgeEn}
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Detail Card & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Stage Detail, Data Stored & Smart Contract Action */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-[#3DDC84] border border-[#3DDC84]/30">
              {lang === 'hi' ? `चरण ${current.id} / 7: ${current.badgeHi}` : `Stage ${current.id} of 7: ${current.badgeEn}`}
            </span>

            {/* Auto Tour Toggle */}
            <button
              onClick={() => setIsAutoTour(!isAutoTour)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isAutoTour
                  ? 'bg-[#FF6A1A] text-white border-[#FF6A1A] shadow-glow-orange animate-pulse'
                  : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
              }`}
            >
              {isAutoTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoTour ? (lang === 'hi' ? 'रोकें (Pause Tour)' : 'Pause Auto Tour') : (lang === 'hi' ? '▶ स्वचालित 7-कदम टूर चलाएं' : '▶ Play 7-Stage Tour')}</span>
            </button>
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

          {/* Two-Column Technical Records (Stored Data vs Smart Contract Action) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
              <h4 className="text-xs font-bold text-[#FF6A1A] mb-2 flex items-center gap-1.5">
                <span>📦</span>
                <span>{lang === 'hi' ? 'इस चरण पर दर्ज डेटा' : 'Data Stored on Node'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-white/80 font-light">
                {current.storedData.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#3DDC84] mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
              <h4 className="text-xs font-bold text-[#3DDC84] mb-2 flex items-center gap-1.5">
                <span>⛓️</span>
                <span>{lang === 'hi' ? 'ब्लॉकचेन स्मार्ट कॉन्ट्रैक्ट एक्शन' : 'Blockchain Smart Contract'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-white/80 font-light">
                {current.smartAction.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#FF6A1A] mt-0.5">&gt;</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setActiveStep(prev => Math.max(0, prev - 1));
                setIsAutoTour(false);
              }}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-full border border-white/10 text-xs font-semibold text-white/80 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === 'hi' ? 'पिछला चरण' : 'Previous Stage'}</span>
            </button>

            <button
              onClick={() => {
                setActiveStep(prev => Math.min(steps.length - 1, prev + 1));
                setIsAutoTour(false);
              }}
              disabled={activeStep === steps.length - 1}
              className="px-5 py-2 rounded-full bg-[#10B981] text-white text-xs font-bold hover:bg-[#059669] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-glow-green"
            >
              <span>{lang === 'hi' ? 'अगला चरण' : 'Next Stage'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Environmental Guardrail Controls & Reverse Flow Alert */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-[#FF6A1A]" />
              <span>{lang === 'hi' ? 'तापमान जांच (सीमा: 40°C)' : 'Ambient Temp (Limit: 40°C)'}</span>
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
            className="w-full accent-[#FF6A1A] h-2 bg-white/10 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between pt-1">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#38BDF8]" />
              <span>{lang === 'hi' ? 'नमी जांच (सीमा: 85%)' : 'Humidity (Limit: 85%)'}</span>
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
            className="w-full accent-[#38BDF8] h-2 bg-white/10 rounded-lg cursor-pointer"
          />

          {/* Smart Contract Tripwire Status */}
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            isOverLimit
              ? 'bg-red-500/15 border-red-500/40 text-red-200'
              : 'bg-[#10B981]/15 border-[#10B981]/30 text-[#D1FAE5]'
          }`}>
            <div className="font-bold flex items-center gap-1.5 mb-1">
              {isOverLimit ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>{lang === 'hi' ? 'सीमा उल्लंघन! वापसी प्रवाह (Reverse Flow) सक्रिय' : 'Tripwire Alert! Reverse Flow Triggered'}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>{lang === 'hi' ? 'बैच मानक अनुसार पूर्णतः सुरक्षित ✓' : 'Batch 100% Compliant ✓'}</span>
                </>
              )}
            </div>
            <p className="text-[11px] opacity-90 font-light">
              {isOverLimit
                ? (lang === 'hi' ? '40°C तापमान या 85% नमी से ऊपर जाने पर स्मार्ट कॉन्ट्रैक्ट तुरंत लाल वापसी लाइन बनाकर बैच को वापस फैक्ट्री भेज देता है।' : 'Exceeding 40°C or 85% RH triggers automatic smart contract recall and activates the red reverse-flow trajectory back to plant.')
                : (lang === 'hi' ? 'सभी भौतिक और पर्यावरणीय मानक सुरक्षित सीमा में हैं। किसान को ₹1,500 सब्सिडी रिलीज के लिए तैयार।' : 'All sensor thresholds normal. Direct Benefit Transfer subsidy cleared for execution.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
