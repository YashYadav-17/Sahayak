export interface TranslationDictionary {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
    simpleHi?: string; // सरल हिंदी: simplified wording for blue collar workers
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Navigation
  'nav.brand': {
    en: 'SAHAYAK',
    hi: 'सहायक',
    mr: 'सहायक',
  },
  'nav.tagline': {
    en: 'Where Skills Meet Opportunity',
    hi: 'हुनर को मिले सही काम',
    mr: 'कौशल्याला योग्य संधी',
    simpleHi: 'हुनर का सही दाम और काम',
  },
  'nav.home': {
    en: 'Home',
    hi: 'मुख्य पृष्ठ',
    mr: 'मुख्य पान',
    simpleHi: 'घर / मुख्य',
  },
  'nav.findJobs': {
    en: 'Find Jobs',
    hi: 'काम ढूंढें',
    mr: 'काम शोधा',
    simpleHi: 'काम ढूँढें (नौकरी)',
  },
  'nav.hireWorkers': {
    en: 'Hire Workers',
    hi: 'कारीगर hire करें',
    mr: 'कारागीर शोधा',
    simpleHi: 'कारीगर बुलाएँ',
  },
  'nav.profile': {
    en: 'Digital Skill Pass',
    hi: 'डिजिटल स्किल पास',
    mr: 'डिजिटल कौशल पास',
    simpleHi: 'मेरा पहचान पत्र (पास)',
  },
  'nav.sahayakHelp': {
    en: 'Sahayak Help & Voice',
    hi: 'सहायता / बोलकर खोजें',
    mr: 'मदत / बोलून शोधा',
    simpleHi: 'मदद केंद्र (बोलें या दबाएँ)',
  },

  // Hero Section
  'hero.announcement': {
    en: 'National Direct Employment Engine for Bharat • Zero Middlemen Commission',
    hi: 'भारत का पहला सीधा रोजगार मंच • 0% कमीशन, पूरी मजदूरी',
    mr: 'भारताचे थेट रोजगार व्यासपीठ • ०% कमिशन, पूर्ण मजुरी',
    simpleHi: 'सीधी नौकरी, कोई दलाल नहीं • 100% आपकी कमाई',
  },
  'hero.title': {
    en: 'SAHAYAK',
    hi: 'सहायक',
    mr: 'सहायक',
  },
  'hero.hindiSubtitle': {
    en: 'Empowering India’s Skilled Workforce',
    hi: 'हुनरमंद कारीगरों का अपना मंच',
    mr: 'कुशल कामगारांचे स्वतःचे व्यासपीठ',
    simpleHi: 'कामगारों और कारीगरों की सच्ची मदद',
  },
  'hero.tagline': {
    en: 'Where Skills Meet Opportunity.',
    hi: 'हुनर को मिले सही काम और सम्मान।',
    mr: 'कौशल्याला योग्य काम आणि सन्मान.',
    simpleHi: 'हुनरमंद हाथों को मिले पक्का काम।',
  },
  'hero.description': {
    en: 'Connecting skilled workers with meaningful work, one opportunity at a time. Verified credentials, fair wage guarantee, and instant direct bank payments.',
    hi: 'कारीगरों को सीधे काम और उचित मजदूरी से जोड़ना। सत्यापित पहचान, निष्पक्ष वेतन गारंटी और सीधे बैंक खाते में भुगतान।',
    mr: 'कुशल कारागिरांना थेट काम आणि योग्य मोबदला मिळवून देणे. पडताळणी केलेली ओळख आणि थेट बँक खात्यात पैसे.',
    simpleHi: 'इलेक्ट्रीशियन, प्लंबर, कारपेंटर और वेल्डर के लिए पक्का काम। सीधे बैंक में पैसे, कोई कमीशन नहीं।',
  },
  'hero.findWorkBtn': {
    en: 'Find Work',
    hi: 'काम ढूंढें',
    mr: 'काम शोधा',
    simpleHi: 'काम ढूँढें (नौकरी देखें)',
  },
  'hero.hireWorkerBtn': {
    en: 'Hire a Worker',
    hi: 'कारीगर hire करें',
    mr: 'कारागीर शोधा',
    simpleHi: 'कारीगर चाहिए',
  },
  'hero.dialHelpBtn': {
    en: 'Voice / Keypad Assistant',
    hi: 'बोलकर या 1-9 दबाकर खोजें',
    mr: 'बोलून किंवा बटण दाबून शोधा',
    simpleHi: 'फोन सहायता (1 से 9 दबाएँ)',
  },
  'hero.searchTradePlaceholder': {
    en: 'All Trades (सभी हुनर)',
    hi: 'सभी हुनर (ट्रेड चुनें)',
    mr: 'सर्व व्यवसाय निवडा',
    simpleHi: 'अपना काम चुनें',
  },
  'hero.searchCityPlaceholder': {
    en: 'All Across India (पूरे भारत में)',
    hi: 'पूरे भारत में (शहर चुनें)',
    mr: 'संपूर्ण भारतात',
    simpleHi: 'अपना शहर चुनें',
  },
  'hero.searchBtn': {
    en: 'Search Jobs',
    hi: 'काम खोजें',
    mr: 'काम शोधा',
    simpleHi: 'खोजें',
  },
  'hero.proof1': {
    en: 'Aadhaar Verified ID (Demo)',
    hi: 'आधार सत्यापित पहचान',
    mr: 'आधार पडताळणी ओळख',
    simpleHi: 'सत्यापित पहचान',
  },
  'hero.proof2': {
    en: 'Fair Wage Guarantee',
    hi: 'उचित मजदूरी गारंटी',
    mr: 'योग्य मजुरीची हमी',
    simpleHi: 'पूरी पक्की मजदूरी',
  },
  'hero.proof3': {
    en: 'Direct UPI Bank Payout',
    hi: 'सीधे बैंक/UPI भुगतान',
    mr: 'थेट बँक/UPI पेमेंट',
    simpleHi: 'सीधे खाते में रुपये',
  },

  // Handshake of Dignity section
  'story.badge': {
    en: 'The Handshake of Dignity',
    hi: 'सम्मान और विश्वास का बंधन',
    mr: 'सन्मान आणि विश्वासाचे नाते',
    simpleHi: 'कारीगर और मालिक का सीधा साथ',
  },
  'story.title': {
    en: 'Direct Connection. Zero Middlemen Exploitation.',
    hi: 'सीधा संपर्क। बिचौलियों का कोई कमीशन नहीं।',
    mr: 'थेट संपर्क. दलालांचे कोणतेही कमिशन नाही.',
    simpleHi: 'मालिक से सीधा काम। कोई दलाली नहीं।',
  },
  'story.desc': {
    en: 'SAHAYAK bridges skilled artisans with certified infrastructure contractors and homeowners. 100% of agreed wages are deposited in escrow and disbursed directly to worker bank accounts upon milestone completion.',
    hi: 'सहायक देश के कुशल शिल्पकारों को सीधे प्रमाणित ठेकेदारों से जोड़ता है। पूरी मजदूरी सुरक्षित खाते में जमा होती है और काम पूरा होते ही सीधे कारीगर के खाते में पहुँचती है।',
    mr: 'सहायक कुशल कारागिरांना थेट प्रमाणित कंत्राटदारांशी जोडते. काम पूर्ण झाल्यावर पूर्ण रक्कम थेट कारागिराच्या खात्यात जमा होते.',
    simpleHi: 'ठेकेदार से सीधा काम लें। पैसा पहले सुरक्षित जमा होता है और काम खत्म होने पर सीधे आपको मिलता है।',
  },

  // How It Works
  'how.title': {
    en: 'How SAHAYAK Works',
    hi: 'सहायक कैसे काम करता है',
    mr: 'सहायक कसे कार्य करते',
    simpleHi: 'काम पाने का आसान तरीका',
  },
  'how.subtitle': {
    en: 'A transparent, transparent 3-step pathway from skill profile to guaranteed bank payout.',
    hi: 'हुनर की पहचान से लेकर बैंक में भुगतान तक का आसान और पारदर्शी 3-चरणीय रास्ता।',
    mr: 'कौशल्य नोंदणीपासून ते थेट बँक पेमेंटपर्यंत सोपे ३ टप्पे.',
    simpleHi: 'बस 3 आसान कदम: प्रोफाइल बनाएँ, काम चुनें और पैसे पाएँ।',
  },

  // Popular Trades
  'trades.title': {
    en: 'Popular Trades & Skills',
    hi: 'लोकप्रिय हुनर और कार्य श्रेणियां',
    mr: 'लोकप्रिय व्यवसाय आणि कौशल्ये',
    simpleHi: 'काम की श्रेणियां (ट्रेड)',
  },
  'trades.subtitle': {
    en: 'Explore high-demand skilled blue-collar professions across India with benchmark wages.',
    hi: 'भारत भर में मांग में रहने वाले कुशल हुनर और उनकी तयशुदा दैनिक व मासिक मजदूरी देखें।',
    mr: 'भारतातील मागणीतील कुशल कामे आणि त्यांचे दैनिक व मासिक दर तपासा.',
    simpleHi: 'अपने काम के अनुसार सही मजदूरी और नौकरियां देखें।',
  },

  // Featured Jobs
  'jobs.title': {
    en: 'Featured Job Opportunities',
    hi: 'प्रमुख उपलब्ध नौकरियां व काम',
    mr: 'प्रमुख नोकरीच्या संधी',
    simpleHi: 'ताज़ा काम और नौकरियां',
  },
  'jobs.subtitle': {
    en: 'Verified contracts with guaranteed escrow payments and zero recruitment fees.',
    hi: 'सत्यापित ठेके, बैंक में सुरक्षित अग्रिम भुगतान और शून्य भर्ती शुल्क।',
    mr: 'पडताळणी केलेली कामे आणि हमी दिलेले बँक पेमेंट.',
    simpleHi: 'पक्की कंपनियाँ, सही समय पर भुगतान। तुरंत आवेदन करें।',
  },
  'jobs.tabAll': {
    en: 'All Opportunities',
    hi: 'सभी काम',
    mr: 'सर्व कामे',
    simpleHi: 'सभी',
  },
  'jobs.tabUrgent': {
    en: 'Urgent Hiring',
    hi: 'तुरंत आवश्यकता (तत्काल)',
    mr: 'तातडीने गरज',
    simpleHi: 'तुरंत भर्ती',
  },
  'jobs.tabMonthly': {
    en: 'Monthly Salary',
    hi: 'मासिक वेतन',
    mr: 'मासिक पगार',
    simpleHi: 'महीने का वेतन',
  },
  'jobs.tabDaily': {
    en: 'Daily Wage',
    hi: 'दैनिक दिहाड़ी',
    mr: 'दैनिक मजुरी',
    simpleHi: 'रोज की दिहाड़ी',
  },
  'jobs.applyBtn': {
    en: 'Apply Now (1-Click)',
    hi: 'तुरंत आवेदन करें',
    mr: 'आत्ताच अर्ज करा',
    simpleHi: 'काम के लिए हाँ कहें',
  },

  // Trust & Safety
  'trust.title': {
    en: 'Fair Work Check & Trust Standards',
    hi: 'निष्पक्ष कार्य जांच और सुरक्षा मानक',
    mr: 'सुरक्षित काम आणि पारदर्शकता',
    simpleHi: 'सुरक्षित काम, पूरा भरोसा',
  },
  'trust.subtitle': {
    en: 'Protecting both craftsmen and contractors with transparent, verified standards.',
    hi: 'सत्यापित मानकों के साथ कारीगरों और नियोक्ताओं दोनों की सुरक्षा।',
    mr: 'कारागीर आणि मालक दोघांसाठी सुरक्षित नियम.',
    simpleHi: 'हर कारीगर का बीमा, समय पर वेतन और सम्मान।',
  },

  // Worker Empowerment / Digital Skill Pass
  'empowerment.title': {
    en: 'Worker Empowerment: Digital Skill Pass',
    hi: 'कारीगर सशक्तिकरण: डिजिटल स्किल पास',
    mr: 'कामगार सक्षमीकरण: डिजिटल कौशल पास',
    simpleHi: 'आपका डिजिटल पहचान पत्र (स्किल पास)',
  },
  'empowerment.subtitle': {
    en: 'A portable, verifiable digital identity recognized by contractors across India.',
    hi: 'पूरे भारत में ठेकेदारों द्वारा मान्य आपका डिजिटल कौशल पहचान पत्र।',
    mr: 'संपूर्ण भारतात मान्य असलेले तुमचे डिजिटल ओळखपत्र.',
    simpleHi: 'यह पास दिखाएँ और किसी भी शहर में बिना परेशानी काम पाएँ।',
  },

  // CTA Section
  'cta.title': {
    en: 'Ready to Transform Your Livelihood?',
    hi: 'क्या आप अपने हुनर को सही मुकाम देने के लिए तैयार हैं?',
    mr: 'तुमच्या कौशल्याला नवी दिशा देण्यासाठी तयार आहात का?',
    simpleHi: 'आज ही काम पाएँ या कारीगर बुलाएँ',
  },
  'cta.subtitle': {
    en: 'Join over 45,000 skilled Indian artisans and verified contractors using SAHAYAK today.',
    hi: 'आज ही 45,000+ कुशल कारीगरों और सत्यापित नियोक्ताओं के परिवार से जुड़ें।',
    mr: 'आजच ४५,०००+ कारागीर आणि कंत्राटदारांसोबत सहभागी व्हा.',
    simpleHi: 'हजारों कारीगर सहायक से जुड़कर रोजाना काम पा रहे हैं।',
  },
  'cta.workerBtn': {
    en: 'Register as Skilled Artisan',
    hi: 'कारीगर के रूप में जुड़ें',
    mr: 'कारागीर म्हणून नोंदणी करा',
    simpleHi: 'कारीगर बनें (काम लें)',
  },
  'cta.hireBtn': {
    en: 'Post a Job Requirement',
    hi: 'काम की आवश्यकता पोस्ट करें',
    mr: 'कामाची नोंद करा',
    simpleHi: 'काम दें (कारीगर खोजें)',
  },

  // Sahayak Voice & Keypad Assistant
  'sahayak.welcome': {
    en: 'Namaste! I am Sahayak. How can I assist you with finding skilled work or guidance today?',
    hi: 'नमस्ते! मैं सहायक हूँ। मैं आपको काम ढूँढने और आपकी समस्याओं का समाधान पाने में मदद करूँगा।',
    mr: 'नमस्ते! मी सहायक आहे. मी तुम्हाला काम शोधण्यात आणि मदत मिळवण्यात साहाय्य करेन.',
    simpleHi: 'नमस्ते! मैं सहायक हूँ। आपको कौन सा काम चाहिए? 1 से 9 दबाएँ या बोलें।',
  },
  'sahayak.voicePrompt': {
    en: 'Press the microphone and speak in Hindi or English (e.g., "Mujhe electrician ka kaam chahiye")',
    hi: 'माइक दबाकर बोलें (जैसे: "मुझे इलेक्ट्रीशियन का काम चाहिए")',
    mr: 'माईक दाबा आणि बोला (उदा. "मला इलेक्ट्रिशियनचे काम हवे आहे")',
    simpleHi: 'माइक दबाकर बोलें — हम आपकी बात सुनेंगे',
  },
  'sahayak.keypadPrompt': {
    en: 'Or use the IVR keypad below (Press 1 for Electrician, 2 for Carpenter, etc.)',
    hi: 'या नीचे दिए गए कीपैड पर 1 से 9 नंबर दबाकर विकल्प चुनें',
    mr: 'किंवा खालील कीपॅडवर १ ते ९ क्रमांक दाबून पर्याय निवडा',
    simpleHi: 'नीचे 1 से 9 बटन दबाकर अपना काम चुनें',
  },
  'sahayak.simpleHindiNotice': {
    en: 'Simple Hindi Mode is active: Short sentences, large readable text, and audio playback enabled.',
    hi: 'सरल हिंदी मोड सक्रिय है: आसान शब्द, बड़े अक्षर और आवाज़ में सुनने की सुविधा उपलब्ध है।',
    mr: 'सोपी भाषा मोड सुरू आहे.',
    simpleHi: 'सरल हिंदी चालू है: यहाँ सब कुछ आसान शब्दों में लिखा है और आवाज़ में सुना जा सकता है।',
  },
};

export const TRADE_INFO_MAP: Record<string, {
  name: string;
  hindiName: string;
  marathiName: string;
  category: string;
  wage: string;
  skills: string[];
  education: string;
  openings: number;
}> = {
  '1': {
    name: 'Electrician & Wireman',
    hindiName: 'इलेक्ट्रीशियन और वायरमैन',
    marathiName: 'इलेक्ट्रिशियन व वायरमन',
    category: 'Electrician',
    wage: '₹950 – ₹1,200 / Day (₹28,000/Month)',
    skills: ['Conduit piping', 'Distribution board wiring', 'Earth resistance test', 'MCB installation'],
    education: 'ITI Electrician / Wireman Certificate or 2+ Years Site Apprenticeship',
    openings: 14,
  },
  '2': {
    name: 'Carpenter & Joiner',
    hindiName: 'बढ़ई और फर्नीचर कारीगर',
    marathiName: 'सुतार व फर्निचर कारागीर',
    category: 'Carpenter',
    wage: '₹900 – ₹1,150 / Day (₹26,000/Month)',
    skills: ['Teak wood cutting', 'Cabinet modular joinery', 'Hinge fixing', 'Laminate pasting'],
    education: 'Practical woodworking apprenticeship or ITI Carpentry Trade certificate',
    openings: 9,
  },
  '3': {
    name: 'Plumber & Pipefitter',
    hindiName: 'प्लंबर और पाइप फिटर',
    marathiName: 'प्लंबर आणि पाईप फिटर',
    category: 'Plumber',
    wage: '₹850 – ₹1,100 / Day (₹25,000/Month)',
    skills: ['CPVC / UPVC pipe jointing', 'Pressure testing', 'Sanitary fixtures', 'Drainage slopes'],
    education: 'ITI Plumbing trade certificate or 3+ years experience with sanitary contractors',
    openings: 11,
  },
  '4': {
    name: 'Welder & Fabricator',
    hindiName: 'वेल्डर और फैब्रिकेटर',
    marathiName: 'वेल्डर आणि फॅब्रिकेटर',
    category: 'Welder',
    wage: '₹1,000 – ₹1,300 / Day (₹30,000/Month)',
    skills: ['TIG / MIG welding', 'Structural steel alignment', 'Arc bead penetration', 'Grinding'],
    education: 'ITI Welder certification / NSQF Level 4 clearance with safety gear training',
    openings: 8,
  },
  '5': {
    name: 'Mason & Tile Layer',
    hindiName: 'राजमिस्त्री और टाइल कारीगर',
    marathiName: 'गवंडी व टाइल्स कारागीर',
    category: 'Mason',
    wage: '₹950 – ₹1,250 / Day (₹27,000/Month)',
    skills: ['Laser level alignment', 'Vitrified tile spacing', 'Plaster finish', 'Column shuttering'],
    education: 'Hands-on construction experience under master mistri (3+ years)',
    openings: 12,
  },
  '6': {
    name: 'Painter & Finisher',
    hindiName: 'पेंटर और पुट्टी कारीगर',
    marathiName: 'रंगारी व फिनिशर',
    category: 'Painter',
    wage: '₹800 – ₹1,000 / Day (₹24,000/Month)',
    skills: ['Putty sanding & leveling', 'Roller emulsion application', 'Waterproofing primer'],
    education: 'Practical site painting experience with knowledge of primer/enamel ratios',
    openings: 7,
  },
  '7': {
    name: 'Solar Panel Technician',
    hindiName: 'सोलर पैनल टेक्नीशियन',
    marathiName: 'सौर ऊर्जा तंत्रज्ञ',
    category: 'Solar',
    wage: '₹1,100 – ₹1,400 / Day (₹32,000/Month)',
    skills: ['Rooftop solar module mounting', 'Inverter cabling', 'DC junction box', 'Earthing pit'],
    education: 'Suryamitra Solar Technician training or ITI Electrical with solar certification',
    openings: 16,
  },
  '8': {
    name: 'AC & HVAC Specialist',
    hindiName: 'एसी और एचवीएसी तकनीशियन',
    marathiName: 'एसी तंत्रज्ञ',
    category: 'HVAC',
    wage: '₹1,000 – ₹1,350 / Day (₹31,000/Month)',
    skills: ['Refrigerant gas vacuuming & charging', 'Copper brazing', 'Compressor diagnosis'],
    education: 'ITI Refrigeration & Air Conditioning (RAC) certificate',
    openings: 6,
  },
};
