/**
 * KisanTrace Farmer-Friendly Dataset
 * Bilingual (Hindi & English) for Indian Farmers & Rural Logistics
 */

export const BATCHES_DATA = [
  {
    batchId: "BATCH-UREA-2026-9041",
    shortId: "9041",
    productName: "नीम लेपित यूरिया (Neem Coated Urea)",
    productNameEn: "Neem Coated Urea (46.2% N)",
    manufacturer: "National Fertilizers Limited (NFL), Vijaipur Unit",
    manufacturerHi: "नेशनल फर्टिलाइजर्स लिमिटेड (एनएफएल)",
    mfgDate: "15-10-2026",
    expiryDate: "14-10-2029",
    bagWeight: "50 kg (50 कि.ग्रा.)",
    mrp: "₹266.50",
    dbtSubsidy: "₹1,500.00",
    farmerName: "राम चरण (Ram Charan)",
    village: "बदलापुर, जौनपुर (Badlapur, UP)",
    isGenuine: true,
    nitrogen: "46.28% (मानक अनुसार उत्तम)",
    labStatus: "CFQCTI सरकारी लैब: 100% पास ✓",
    statusBadgeHi: "असली खाद &bull; 100% प्रमाणित ✓",
    statusBadgeEn: "100% Genuine & Govt Certified ✓",
    alertMessageHi: "यह खाद पूरी तरह असली है और सरकारी मानक पर खरी उतरी है। आपके बैंक खाते में ₹1,500 की सब्सिडी स्वीकृत है।",
    alertMessageEn: "This fertilizer bag is 100% genuine and lab-tested. ₹1,500 DBT subsidy is approved for your bank account.",
    journey: [
      { step: 1, titleHi: "कारखाना (Factory)", titleEn: "Factory Packaging", descHi: "एनएफएल फैक्ट्री में बोरी भरी गई और क्यूआर कोड लगा।", descEn: "Bag filled and serialized QR tagged at NFL plant.", date: "15 Oct" },
      { step: 2, titleHi: "सरकारी लैब (Lab Test)", titleEn: "Govt Lab Testing", descHi: "नाइट्रोजन 46.28% पास, कोई मिलावट नहीं।", descEn: "Nitrogen 46.28% confirmed, zero adulteration.", date: "16 Oct" },
      { step: 3, titleHi: "केंद्रीय गोदाम (Warehouse)", titleEn: "Central Warehouse", descHi: "गोदाम में सुरक्षित तापमान पर रखी गई।", descEn: "Stored at safe temperature in central depot.", date: "18 Oct" },
      { step: 4, titleHi: "परिवहन ट्रक (Truck Transit)", titleEn: "Corridor Transport", descHi: "जीपीएस ट्रक द्वारा जिले में लाई गई।", descEn: "GPS-tracked vehicle transit via NH-19.", date: "21 Oct" },
      { step: 5, titleHi: "खाद दुकान (Village Kendra)", titleEn: "Village Retailer POS", descHi: "पीएम किसान सेवा केंद्र बदलापुर में पहुंची।", descEn: "Stocked at Badlapur PM Kisan Seva Kendra.", date: "27 Oct" },
      { step: 6, titleHi: "किसान को डिलीवरी (Farmer Receipt)", titleEn: "Farmer Delivered", descHi: "किसान राम चरण ने खरीदी, ₹1,500 सब्सिडी बैंक में गई।", descEn: "Purchased by Ram Charan, ₹1,500 DBT credited.", date: "29 Oct" }
    ]
  },
  {
    batchId: "BATCH-DAP-2026-8812",
    shortId: "8812",
    productName: "डीएपी खाद (DAP 18-46-0)",
    productNameEn: "Diammonium Phosphate (DAP 18-46-0)",
    manufacturer: "Coromandel International Ltd",
    manufacturerHi: "कोरोमंडल इंटरनेशनल लिमिटेड",
    mfgDate: "18-10-2026",
    expiryDate: "17-10-2029",
    bagWeight: "50 kg (50 कि.ग्रा.)",
    mrp: "₹1,350.00",
    dbtSubsidy: "₹2,500.00",
    farmerName: "राजेश वर्मा (Rajesh Verma)",
    village: "अमरावती (Amravati, MH)",
    isGenuine: true,
    nitrogen: "18.15% N & 46.10% P",
    labStatus: "सरकारी लैब: ए-ग्रेड पास ✓",
    statusBadgeHi: "असली डीएपी खाद &bull; प्रमाणित ✓",
    statusBadgeEn: "100% Genuine DAP &bull; Certified ✓",
    alertMessageHi: "यह डीएपी खाद पूरी तरह शुद्ध है। फॉस्फोरस और नाइट्रोजन की मात्रा सही है।",
    alertMessageEn: "This DAP fertilizer is 100% genuine with verified phosphorus and nitrogen content.",
    journey: [
      { step: 1, titleHi: "कारखाना (Factory)", titleEn: "Factory Packaging", descHi: "कोरोमंडल प्लांट में बोरी पर क्यूआर कोड मुहर लगी।", descEn: "Packaged at Coromandel plant.", date: "18 Oct" },
      { step: 2, titleHi: "सरकारी लैब (Lab Test)", titleEn: "Govt Lab Testing", descHi: "18% नाइट्रोजन और 46% फॉस्फोरस पास।", descEn: "18% N & 46% P lab certified.", date: "19 Oct" },
      { step: 3, titleHi: "खाद दुकान (Kisan Kendra)", titleEn: "Village Kendra", descHi: "अमरावती किसान सेवा केंद्र में उपलब्ध।", descEn: "Available at Amravati Kisan Kendra.", date: "26 Oct" }
    ]
  },
  {
    batchId: "BATCH-NPK-2026-RECALL-773",
    shortId: "773",
    productName: "एनपीके खाद (चेतावनी: नकली / खराब खाद)",
    productNameEn: "NPK Complex (WARNING: RECALLED FAKE)",
    manufacturer: "अज्ञात / संदिग्ध सप्लायर (Suspicious Vendor)",
    manufacturerHi: "अज्ञात / मिलावटी बैच",
    mfgDate: "10-10-2026",
    expiryDate: "रद्द (CANCELLED)",
    bagWeight: "50 kg (अमान्य)",
    mrp: "अमान्य (खरीद पर रोक)",
    dbtSubsidy: "₹0.00 (सब्सिडी रोकी गई)",
    farmerName: "कोई नहीं (सप्लाई रद्द)",
    village: "अलर्ट जारी (Alert Issued)",
    isGenuine: false,
    nitrogen: "11.10% (फेल: नाइट्रोजन बहुत कम)",
    labStatus: "❌ टेस्ट फेल: नकली खाद की आशंका",
    statusBadgeHi: "⚠️ सावधान: नकली खाद! न खरीदें ❌",
    statusBadgeEn: "⚠️ WARNING: RECALLED / COUNTERFEIT ❌",
    alertMessageHi: "सावधान! इस बोरी में नाइट्रोजन की भारी कमी पाई गई है और तापमान ज्यादा होने से यह खाद खराब हो चुकी है। इसे तुरंत वापस करें और 1800-180-1551 पर शिकायत करें।",
    alertMessageEn: "Warning! This batch failed quality control due to heat degradation and low nitrogen. Do not purchase!",
    journey: [
      { step: 1, titleHi: "संदिग्ध प्लांट (Suspicious Plant)", titleEn: "Factory", descHi: "बैच तैयार किया गया।", descEn: "Batch initially generated.", date: "10 Oct" },
      { step: 2, titleHi: "रास्ते में खराब (Sensor Failed)", titleEn: "Transport Violation", descHi: "ट्रक में 44.5°C तापमान से खाद जल गई।", descEn: "Temperature exceeded 44.5°C, ruining stock.", date: "13 Oct" },
      { step: 3, titleHi: "सरकारी रोक (Recalled by Govt)", titleEn: "Govt Blocked", descHi: "स्मार्ट कॉन्ट्रैक्ट ने सब्सिडी रोक दी और केस दर्ज किया।", descEn: "Subsidy revoked and recall issued back to source.", date: "13 Oct" }
    ]
  }
];

export const FARMER_TEXT = {
  hi: {
    brandName: "किसानट्रेस",
    tagline: "खाद असली है या नकली? 1 सेकंड में पता लगाएं",
    subtagline: "अपनी 50 किलो की बोरी का क्यूआर कोड स्कैन करें और ₹1,500 की सरकारी सब्सिडी सीधे अपने बैंक खाते में पाएं।",
    scanBagBtn: "📷 बोरी का QR कोड स्कैन करें",
    enterNumberBtn: "🔍 बोरी नंबर डालें",
    helplineText: "📞 किसान कॉल सेंटर (टोल-फ्री): 1800-180-1551",
    samplePillsTitle: "नमूना बोरी चुनकर देखें:",
    ureaPill: "9041 (यूरिया - असली)",
    dapPill: "8812 (डीएपी - असली)",
    fakePill: "773 (नकली खाद - चेतावनी)",
    stepsTitle: "किसान भाइयों के लिए 3 आसान कदम",
    step1Title: "1. बोरी पर QR कोड देखें",
    step1Desc: "हर 50 किलो की बोरी के सामने सरकारी मुहर और एक चौकोर QR कोड छपा होता है।",
    step2Title: "2. अपने फोन से जांचें",
    step2Desc: "कैमरा खोलकर स्कैन करें या बोरी का नंबर यहां डालें। तुरंत हरा सही का निशान दिखेगा।",
    step3Title: "3. ₹1,500 सब्सिडी पाएं",
    step3Desc: "दुकानदार से पक्की रसीद लें। सरकार की ₹1,500 सब्सिडी सीधे आपके बैंक खाते में पहुंचेगी।",
    channelsTitle: "जांचने के 3 आसान तरीके (बिना इंटरनेट भी चलेगा)",
    channel1Title: "स्मार्टफोन (कैमरा स्कैन)",
    channel1Desc: "किसी भी एंड्रॉइड फोन के कैमरे से कोड स्कैन करें।",
    channel2Title: "सादा कीपैड फोन (USSD *99#)",
    channel2Desc: "बिना इंटरनेट वाले फोन से *99# डायल करें और बोरी नंबर एसएमएस करें।",
    channel3Title: "खाद दुकान पर अंगूठा (POS मशीन)",
    channel3Desc: "दुकानदार की मशीन पर आधार से अंगूठा लगाएं और सब्सिडी की रसीद पाएं।",
    journeyTitle: "फैक्ट्री से खेत तक: आपकी बोरी का सफर",
    journeySub: "देखें आपकी खाद की बोरी कहाँ-कहाँ से होकर आप तक पहुंची है:",
    reportFakeTitle: "नकली खाद की शिकायत कहाँ करें?",
    reportFakeDesc: "अगर खाद में रेत, नमक या कम वजन मिले, या दुकानदार ₹266.50 से ज्यादा पैसे मांगे, तो तुरंत शिकायत करें:",
    callNowBtn: "📞 तुरंत कॉल करें: 1800-180-1551",
    dataHubBtn: "📊 कृषि अधिकारी व एक्सपर्ट डेटा हब (Turso DB & Excel)",
    footerCopyright: "© 2026 भारत सरकार डिजिटल कृषि मिशन &bull; राष्ट्रीय खाद वितरण प्रणाली"
  },
  en: {
    brandName: "KisanTrace",
    tagline: "Is Your Fertilizer 100% Genuine? Verify in 1 Second",
    subtagline: "Scan your 50kg bag QR code and confirm your ₹1,500 government DBT subsidy directly in your bank account.",
    scanBagBtn: "📷 Scan Bag QR Code",
    enterNumberBtn: "🔍 Enter Bag Number",
    helplineText: "📞 Kisan Call Centre (Toll Free): 1800-180-1551",
    samplePillsTitle: "Select Sample Bag to Test:",
    ureaPill: "9041 (Urea - Genuine)",
    dapPill: "8812 (DAP - Genuine)",
    fakePill: "773 (Counterfeit Alert)",
    stepsTitle: "3 Simple Steps for Every Farmer",
    step1Title: "1. Check the Bag QR Code",
    step1Desc: "Every authentic 50kg bag carries a unique serialized QR code and govt emblem.",
    step2Title: "2. Scan with Your Phone",
    step2Desc: "Point your phone camera or enter the bag number to see instant verification.",
    step3Title: "3. Receive ₹1,500 DBT Subsidy",
    step3Desc: "Get a computerized receipt. Govt subsidy of ₹1,500 is directly credited to your bank.",
    channelsTitle: "3 Easy Ways to Verify (Works Even Without Internet)",
    channel1Title: "Smartphone Camera",
    channel1Desc: "Instant scan with any mobile browser or camera.",
    channel2Title: "Feature Keypad Phone (*99#)",
    channel2Desc: "Dial *99# or send SMS with bag number in low network areas.",
    channel3Title: "Village Shop POS Machine",
    channel3Desc: "Aadhaar biometric fingerprint authentication at the PM Kisan Seva Kendra.",
    journeyTitle: "Factory to Farm: The Journey of Your Fertilizer",
    journeySub: "Track the exact path of your fertilizer bag from synthesis to your soil:",
    reportFakeTitle: "Report Fake Fertilizer or Overcharging",
    reportFakeDesc: "If fertilizer contains sand/moisture or if retailer charges more than ₹266.50/bag, report immediately:",
    callNowBtn: "📞 Call Toll-Free: 1800-180-1551",
    dataHubBtn: "📊 Agronomist & Official Data Hub (Turso DB & Excel)",
    footerCopyright: "© 2026 National Fertilizer Digital Provenance Mission"
  }
};


export const CORE_DETERMINANTS = [
  {
    part: "Part 1",
    title: "Product Authenticity & Composition Data",
    icon: "🧪",
    layer: "Chemical Integrity Layer",
    points: [
      "Upstream Raw Material Provenance: Upstream origin hashing for Nitrogen (Haber-Bosch natural gas), Phosphorus (Jordan rock phosphate), and Potash.",
      "Chemical Stoichiometry: Guaranteed N-P-K ratios (Urea 46.2% N, DAP 18-46-0). Maximum tolerances: Biuret <= 1.5%, moisture <= 0.5%.",
      "HPLC Quality Certification: Pre-dispatch chromatography logs cryptographically signed with accredited lab Ed25519 private keys."
    ]
  },
  {
    part: "Part 2",
    title: "Unique Identification & Data Capture",
    icon: "🏷️",
    layer: "Hardware & Serialization Layer",
    points: [
      "Hierarchical 3-Level Identifiers: 1 Bag (50 kg) -> Bag QR (SHA-256); 50 Bags -> Pallet QR (Merkle Root); 20 Pallets (50 MT) -> Master RFID.",
      "IoT Edge Sensor Telemetry: Continuous monitoring of temperature, relative humidity, multi-axis shock, and cellular GPS coordinates.",
      "Active Threshold Tripwires: Critical guardrail at T > 40.0°C or H > 85.0%. Over-limit triggers instant quarantine and reverse-flow recall."
    ]
  },
  {
    part: "Part 3",
    title: "Supply Chain Stage Mapping & Custody",
    icon: "🚚",
    layer: "Lifecycle & Custody Layer",
    points: [
      "Manufacturing & Packaging: Automated batch minting, bag filling timestamps, factory GPS stamping.",
      "Warehouse Inward & Outward: RFID portal logging with dual custody transfer verification.",
      "Offline-Resilient POS: Village SQLite local transaction signing with timestamp + nonce, local OTP, atomic sync on reconnect.",
      "Farmer Direct Benefit Transfer: 3 Citizen channels release ₹1,500 DBT subsidy straight to farmer bank accounts."
    ]
  },
  {
    part: "Part 4",
    title: "Blockchain Architecture & Consensus",
    icon: "⛓️",
    layer: "Consortium & Smart Contract Layer",
    points: [
      "Consortium Topology: Permissioned Hyperledger Fabric / Enterprise EVM network connecting fertilizer plants, regulators, and banks.",
      "High Efficiency Consensus: Raft / PBFT consensus with sub-second finality, 2,500+ TPS, and zero energy-waste mining.",
      "Single-Use Token Burn: Prevents recycled bag packaging fraud by burning the unit bag token upon farmer receipt."
    ]
  },
  {
    part: "Part 5",
    title: "Regulatory & Environmental Governance",
    icon: "🏛️",
    layer: "Governance & ESG Layer",
    points: [
      "iFMS & DBT Integration: Direct API hooks into India's national fertilizer subsidy framework.",
      "Anti-Hoarding Acreage Limits: Land record (Bhulekh) coupling prevents illegal industrial diversion.",
      "Nutrient Runoff Mitigation: Soil Health Card recommendation checks ensure optimal nitrogen application."
    ]
  }
];
