import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Briefcase, 
  ArrowRight, 
  HelpCircle, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MAIN_IVR_MENU, playKeypadTone } from '../../services/telephonyService';
import { TRADE_INFO_MAP } from '../../data/translations';
import type { PageView } from '../../types';

interface SahayakAssistantProps {
  onNavigate: (page: PageView) => void;
  onSelectTradeFilter?: (trade: string) => void;
  isEmbedded?: boolean;
}

type AssistantMode = 'keypad' | 'voice' | 'faq';

// Define SpeechRecognition interface for TypeScript
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export const SahayakAssistant: React.FC<SahayakAssistantProps> = ({
  onNavigate,
  onSelectTradeFilter,
  isEmbedded = false,
}) => {
  const { language, isSimpleHindi, t, speakText, stopSpeech, isSpeaking } = useLanguage();
  const [activeMode, setActiveMode] = useState<AssistantMode>('keypad');

  // Keypad IVR State
  const [currentMenuLevel, setCurrentMenuLevel] = useState<'main' | 'trade_sub' | 'faq_sub'>('main');
  const [selectedTradeKey, setSelectedTradeKey] = useState<string>('1');
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [recognizedTranscript, setRecognizedTranscript] = useState<string>('');
  const [voiceAnswer, setVoiceAnswer] = useState<string | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const win = window as unknown as IWindow;
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRec) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setRecognizedTranscript(text);
        handleVoiceQuery(text);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition event:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setVoiceError('Microphone permission denied. Please allow microphone access or use the Keypad mode.');
        } else {
          setVoiceError('Voice recognition timed out or could not capture audio. Please try again or use the Keypad.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech recognition setup error:', err);
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language]);

  // Handle Physical Keyboard Numbers (1-9, 0, #)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only capture if user is not in an input field
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '#'].includes(e.key)) {
        handleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMenuLevel, selectedTradeKey]);

  // Handle Dial Key Press
  const handleKeyPress = (key: string) => {
    playKeypadTone(key);
    setLastKeyPressed(key);
    setTimeout(() => setLastKeyPressed(null), 300);

    if (currentMenuLevel === 'main') {
      if (key >= '1' && key <= '8') {
        setSelectedTradeKey(key);
        setCurrentMenuLevel('trade_sub');
        const trade = TRADE_INFO_MAP[key];
        const spoken = language === 'hi' 
          ? `आपने ${trade.hindiName} चुना है। नौकरियां देखने के लिए 1 दबाएँ, आवश्यक योग्यता के लिए 2, वेतन के लिए 3 दबाएँ, या वापस जाने के लिए 0 दबाएँ।`
          : `You selected ${trade.name}. Press 1 for jobs, 2 for skills, 3 for wages, or 0 to return.`;
        speakText(spoken);
      } else if (key === '9') {
        onNavigate('find-jobs');
      } else if (key === '0') {
        setCurrentMenuLevel('faq_sub');
        const spoken = language === 'hi'
          ? 'सहायता मेनू। आवेदन के लिए 1 दबाएँ, भुगतान सुरक्षा के लिए 2, स्किल पास के लिए 3 दबाएँ।'
          : 'Help Menu. Press 1 for application guide, 2 for payment escrow, 3 for digital skill pass.';
        speakText(spoken);
      }
    } else if (currentMenuLevel === 'trade_sub') {
      const trade = TRADE_INFO_MAP[selectedTradeKey];
      if (key === '1') {
        // Open Jobs
        if (onSelectTradeFilter) onSelectTradeFilter(trade.category);
        onNavigate('find-jobs');
      } else if (key === '2') {
        // Speak skills
        const spoken = language === 'hi'
          ? `${trade.hindiName} के लिए आवश्यक कौशल: ${trade.skills.join(', ')}। आवश्यक अनुभव: ${trade.education}`
          : `Required skills for ${trade.name}: ${trade.skills.join(', ')}. Experience: ${trade.education}`;
        speakText(spoken);
      } else if (key === '3') {
        // Speak wages
        const spoken = language === 'hi'
          ? `${trade.hindiName} की औसत मजदूरी: ${trade.wage}। इसमें 0% कमीशन कटता है।`
          : `Average wage for ${trade.name} is ${trade.wage} with zero commission deducted.`;
        speakText(spoken);
      } else if (key === '4') {
        // Open profile
        onNavigate('profile');
      } else if (key === '0' || key === '#') {
        // Return to main menu
        setCurrentMenuLevel('main');
        const spoken = language === 'hi' ? 'मुख्य मेनू पर वापस आ गए हैं।' : 'Returned to main menu.';
        speakText(spoken);
      }
    } else if (currentMenuLevel === 'faq_sub') {
      if (key === '1') {
        const spoken = language === 'hi'
          ? 'आवेदन करने के लिए किसी भी नौकरी कार्ड पर "तुरंत आवेदन करें" दबाएँ। आपका नाम और फोन नंबर मालिक को सुरक्षित भेजा जाएगा।'
          : 'To apply, click Apply Now on any job card. Your name and phone number will be shared securely with the contractor.';
        speakText(spoken);
      } else if (key === '2') {
        const spoken = language === 'hi'
          ? 'सहायक फेयर वर्क एस्क्रो: ठेकेदार काम शुरू होने से पहले पैसा सुरक्षित बैंक में जमा करता है। काम पूरा होने पर सीधे आपके UPI खाते में भेजा जाता है।'
          : 'SAHAYAK Fair Work Escrow: Employers deposit wages into escrow before work begins. Upon completion, funds are disbursed directly to your UPI.';
        speakText(spoken);
      } else if (key === '3') {
        onNavigate('profile');
      } else if (key === '0' || key === '#') {
        setCurrentMenuLevel('main');
        speakText(language === 'hi' ? 'मुख्य मेनू पर वापस आ गए हैं।' : 'Returned to main menu.');
      }
    }
  };

  // Voice Intent Matcher
  const handleVoiceQuery = (query: string) => {
    const q = query.toLowerCase();

    if (q.includes('bijli') || q.includes('electrician') || q.includes('इलेक्ट्रीशियन') || q.includes('wireman') || q.includes('लाइट')) {
      setSelectedTradeKey('1');
      setCurrentMenuLevel('trade_sub');
      const ans = language === 'hi'
        ? 'इलेक्ट्रीशियन और वायरमैन के लिए 14 नौकरियां उपलब्ध हैं। दैनिक दिहाड़ी ₹950 से ₹1,200 है। नौकरियां देखने के लिए नीचे दिए गए बटन पर क्लिक करें।'
        : 'Found 14 openings for Electricians and Wiremen. Average daily wage is ₹950 to ₹1,200. Click below to view jobs.';
      setVoiceAnswer(ans);
      speakText(ans);
    } else if (q.includes('badhai') || q.includes('carpenter') || q.includes('बढ़ई') || q.includes('wood') || q.includes('furniture')) {
      setSelectedTradeKey('2');
      setCurrentMenuLevel('trade_sub');
      const ans = language === 'hi'
        ? 'बढ़ई और फर्नीचर कारीगरों के लिए 9 नौकरियां उपलब्ध हैं। दैनिक दिहाड़ी ₹900 से ₹1,150 है।'
        : 'Found 9 openings for Carpenters and Joiners. Daily wage is ₹900 to ₹1,150.';
      setVoiceAnswer(ans);
      speakText(ans);
    } else if (q.includes('plumber') || q.includes('nal') || q.includes('प्लंबर') || q.includes('pipe') || q.includes('पानी')) {
      setSelectedTradeKey('3');
      setCurrentMenuLevel('trade_sub');
      const ans = language === 'hi'
        ? 'प्लंबर और पाइप फिटर के लिए 11 नौकरियां उपलब्ध हैं। दैनिक दिहाड़ी ₹850 से ₹1,100 है।'
        : 'Found 11 openings for Plumbers and Pipefitters. Daily wage is ₹850 to ₹1,100.';
      setVoiceAnswer(ans);
      speakText(ans);
    } else if (q.includes('welder') || q.includes('वेल्डर') || q.includes('fabrication') || q.includes('लोहा')) {
      setSelectedTradeKey('4');
      setCurrentMenuLevel('trade_sub');
      const ans = language === 'hi'
        ? 'वेल्डर और फैब्रिकेटर के लिए 8 नौकरियां उपलब्ध हैं। दैनिक दिहाड़ी ₹1,000 से ₹1,300 है।'
        : 'Found 8 openings for Welders and Fabricators. Daily wage is ₹1,000 to ₹1,300.';
      setVoiceAnswer(ans);
      speakText(ans);
    } else if (q.includes('solar') || q.includes('सोलर') || q.includes('panel')) {
      setSelectedTradeKey('7');
      setCurrentMenuLevel('trade_sub');
      const ans = language === 'hi'
        ? 'सोलर पैनल टेक्नीशियन के लिए 16 नौकरियां उपलब्ध हैं। दैनिक दिहाड़ी ₹1,100 से ₹1,400 है।'
        : 'Found 16 openings for Solar Panel Technicians. Daily wage is ₹1,100 to ₹1,400.';
      setVoiceAnswer(ans);
      speakText(ans);
    } else if (q.includes('apply') || q.includes('aavedan') || q.includes('आवेदन') || q.includes('kaam kaise') || q.includes('form')) {
      const ans = language === 'hi'
        ? 'नौकरी के लिए आवेदन करना बहुत आसान है: किसी भी जॉब कार्ड पर "तुरंत आवेदन करें" दबाएँ। आपका नाम और फोन नंबर सीधे मालिक को भेजा जाएगा।'
        : 'To apply: Click "Apply Now" on any job card. Your profile and mobile number will be submitted directly to the verified employer.';
      setVoiceAnswer(ans);
      speakText(ans);
    } else if (q.includes('profile') || q.includes('skill pass') || q.includes('पास') || q.includes('aadhaar') || q.includes('पहचान')) {
      const ans = language === 'hi'
        ? 'आपका डिजिटल स्किल पास आपकी सत्यापित पहचान है। इसमें आपका आधार KYC और आईटीआई प्रमाणपत्र दर्ज होता है जिसे आप कहीं भी दिखा सकते हैं।'
        : 'Your SAHAYAK Digital Skill Pass is your portable verified identity with Aadhaar KYC and trade endorsements.';
      setVoiceAnswer(ans);
      speakText(ans);
    } else if (q.includes('paisa') || q.includes('payment') || q.includes('salary') || q.includes('वेतन') || q.includes('मजदूरी') || q.includes('escrow')) {
      const ans = language === 'hi'
        ? 'सहायक पर 100% मजदूरी की गारंटी है। मालिक पहले पैसा एस्क्रो में जमा करता है। काम पूरा होने पर सीधे आपके बैंक खाते या UPI में पैसा आता है।'
        : '100% Fair Wage Guarantee. Employers deposit wages into escrow upfront, disbursed directly to your UPI with zero platform cuts.';
      setVoiceAnswer(ans);
      speakText(ans);
    } else {
      const ans = language === 'hi'
        ? `मुझे "${query}" के बारे में जानकारी मिली। आप सीधे कीपैड से 1 से 9 दबाकर अपनी ट्रेड चुन सकते हैं या काम ढूँढ सकते हैं।`
        : `Understood: "${query}". You can press numbers 1-9 on the keypad to select your trade or find work.`;
      setVoiceAnswer(ans);
      speakText(ans);
    }
  };

  const toggleMic = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. Please use the interactive telephone keypad below.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setVoiceAnswer(null);
      setRecognizedTranscript('');
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn('Speech start error:', err);
      }
    }
  };

  const currentTrade = TRADE_INFO_MAP[selectedTradeKey] || TRADE_INFO_MAP['1'];

  return (
    <div className={`w-full ${isEmbedded ? '' : 'min-h-[85vh] py-8 sm:py-12 bg-canvas'}`}>
      <div className={`max-w-5xl mx-auto px-4 sm:px-6 space-y-8`}>
        
        {/* Header Banner */}
        <div className="bg-midnight text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-teal/20 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bright-teal/20 border border-bright-teal/30 text-soft-cyan text-xs font-bold">
                <PhoneCall className="w-3.5 h-3.5 text-bright-teal animate-pulse" />
                <span>IVR Keypad & Voice Assistant • Bharat Access</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {t('nav.sahayakHelp')}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {t('sahayak.welcome')}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shrink-0">
              <button
                type="button"
                onClick={() => setActiveMode('keypad')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeMode === 'keypad'
                    ? 'bg-primary-teal text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Phone Keypad (कीपैड)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('voice')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeMode === 'voice'
                    ? 'bg-primary-teal text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-soft-cyan" />
                <span>Voice (बोलकर)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('faq')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeMode === 'faq'
                    ? 'bg-primary-teal text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FAQs (सवाल-जवाब)</span>
              </button>
            </div>
          </div>

          {/* Simple Hindi Notice if active */}
          {isSimpleHindi && (
            <div className="mt-4 p-3 rounded-xl bg-bright-teal/15 border border-bright-teal/30 text-xs text-soft-cyan flex items-center justify-between">
              <span>{t('sahayak.simpleHindiNotice')}</span>
              <button
                type="button"
                onClick={() => speakText(t('sahayak.welcome'))}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-bright-teal text-midnight font-bold hover:bg-soft-cyan transition-colors shrink-0"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>सुनें</span>
              </button>
            </div>
          )}
        </div>

        {/* MODE 1: KEYPAD / PHONE IVR SIMULATOR */}
        {activeMode === 'keypad' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: The Virtual Phone Keypad with DTMF Tone Synthesis */}
            <div className="lg:col-span-5 bg-midnight text-white p-6 sm:p-7 rounded-3xl border border-white/15 shadow-2xl space-y-6">
              
              {/* Phone Speaker & Screen */}
              <div className="p-4 rounded-2xl bg-deep-ink border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-emerald-400 font-bold">1800-SAHAYAK (Toll-Free)</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">GSM/DTMF Active</span>
                </div>

                <div className="bg-canvas/5 p-3 rounded-xl border border-white/5 min-h-[56px] flex flex-col justify-center">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                    {currentMenuLevel === 'main' ? 'Main Menu Selection' : `Trade: ${currentTrade.name}`}
                  </span>
                  <div className="text-sm font-bold text-soft-cyan flex items-center justify-between">
                    <span>
                      {currentMenuLevel === 'main'
                        ? 'Dial 1-9 to choose trade'
                        : `${currentTrade.name} (Jobs / Wages / Skills)`}
                    </span>
                    {lastKeyPressed && (
                      <span className="font-mono text-lg text-emerald-400 font-black animate-bounce">
                        {lastKeyPressed}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (isSpeaking) stopSpeech();
                      else speakText(currentMenuLevel === 'main' ? t('sahayak.welcome') : `${currentTrade.name}: Press 1 for jobs, 2 for skills, 3 for wages.`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-soft-cyan hover:text-white transition-colors"
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-bright-teal" />}
                    <span>{isSpeaking ? 'Stop Audio' : 'Hear Voice Menu (आवाज़ सुनें)'}</span>
                  </button>

                  {currentMenuLevel !== 'main' && (
                    <button
                      type="button"
                      onClick={() => handleKeyPress('0')}
                      className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Back to Menu (0)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 3x4 Realistic Telephone Keypad Grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: '1', letters: 'WIREMAN', trade: 'Electrician' },
                  { key: '2', letters: 'CARPENTER', trade: 'Carpenter' },
                  { key: '3', letters: 'PLUMBER', trade: 'Plumber' },
                  { key: '4', letters: 'WELDER', trade: 'Welder' },
                  { key: '5', letters: 'MASON', trade: 'Mason' },
                  { key: '6', letters: 'PAINTER', trade: 'Painter' },
                  { key: '7', letters: 'SOLAR PV', trade: 'Solar' },
                  { key: '8', letters: 'AC / HVAC', trade: 'HVAC' },
                  { key: '9', letters: 'ALL JOBS', trade: 'Jobs' },
                  { key: '*', letters: 'RESET', trade: 'Reset' },
                  { key: '0', letters: 'HELP / ESCROW', trade: 'Help' },
                  { key: '#', letters: 'BACK', trade: 'Return' },
                ].map((btn) => (
                  <button
                    key={btn.key}
                    type="button"
                    onClick={() => handleKeyPress(btn.key)}
                    className={`p-3.5 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      lastKeyPressed === btn.key
                        ? 'bg-bright-teal text-midnight scale-95 shadow-glow-teal'
                        : 'bg-white/10 hover:bg-white/15 text-white active:scale-95 border border-white/10'
                    }`}
                  >
                    <span className="font-mono text-xl font-black leading-none">{btn.key}</span>
                    <span className="text-[9px] font-bold text-slate-300 tracking-wider mt-1 block">
                      {btn.letters}
                    </span>
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                <span>Tip: You can also press <strong>1–9, 0, * or #</strong> on your computer keyboard.</span>
              </div>
            </div>

            {/* Right: Active IVR Menu Tree & Response Screen */}
            <div className="lg:col-span-7 space-y-6">
              
              {currentMenuLevel === 'main' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-app-border shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-deep-ink">Interactive IVR Main Menu</h3>
                      <p className="text-xs text-slate-500">Press on-screen button or dial digit to select an option</p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-bold">
                      Level: Root Menu
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MAIN_IVR_MENU.map((menu) => (
                      <button
                        key={menu.key}
                        type="button"
                        onClick={() => handleKeyPress(menu.key)}
                        className="text-left p-3.5 rounded-2xl border border-slate-200 hover:border-primary-teal bg-canvas hover:bg-teal-50/50 transition-all group flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-midnight text-white flex items-center justify-center font-mono font-bold text-sm shrink-0 group-hover:bg-primary-teal transition-colors">
                          {menu.key}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-deep-ink block group-hover:text-primary-teal transition-colors">
                            {language === 'hi' ? menu.hindiLabel : language === 'mr' ? menu.marathiLabel : menu.label}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {menu.key === '9' ? 'Open All Jobs' : menu.key === '0' ? 'Help & Escrow' : 'Details, Skills & Wage'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Future Telephony Explanation Banner */}
                  <div className="p-4 rounded-2xl bg-mist-blue/40 border border-mist-blue text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-primary-teal">
                      <PhoneCall className="w-4 h-4" />
                      <span>Feature Phone Architecture (GSM / Toll-Free Integration)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      This browser keypad simulator uses the exact same IVR menu definition configured for telephony gateways (Twilio Voice / Exotel). Blue-collar workers with basic feature phones (Nokia 105, JioPhone) dial <strong>1800-SAHAYAK</strong> to navigate this same tree via telephone voice prompts.
                    </p>
                  </div>
                </div>
              )}

              {/* Submenu for a Selected Trade */}
              {currentMenuLevel === 'trade_sub' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-app-border shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-teal text-white flex items-center justify-center font-mono font-bold text-lg">
                        {selectedTradeKey}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-deep-ink">
                          {language === 'hi' ? currentTrade.hindiName : currentTrade.name}
                        </h3>
                        <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          {currentTrade.openings} Active Openings Available
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleKeyPress('0')}
                      className="text-xs font-bold text-slate-500 hover:text-deep-ink px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      ← Back (0)
                    </button>
                  </div>

                  {/* Submenu Options */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handleKeyPress('1')}
                      className="w-full text-left p-4 rounded-2xl bg-canvas border border-slate-200 hover:border-bright-teal hover:bg-teal-50/50 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-midnight text-white flex items-center justify-center font-mono font-bold text-xs">
                          1
                        </span>
                        <div>
                          <span className="text-sm font-bold text-deep-ink block">
                            {language === 'hi' ? `देखें ${currentTrade.hindiName} की उपलब्ध नौकरियां` : `View ${currentTrade.name} Job Listings`}
                          </span>
                          <span className="text-xs text-slate-500">Directly filters available openings</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary-teal" />
                    </button>

                    <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-midnight text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                          2
                        </span>
                        <span className="text-sm font-bold text-deep-ink">
                          {language === 'hi' ? 'आवश्यक हुनर और योग्यता (Skills)' : 'Required Skills & Training'}
                        </span>
                      </div>
                      <div className="pl-11 space-y-1">
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {currentTrade.skills.map((s, i) => (
                            <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                              • {s}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 pt-1">
                          <strong>Qualification:</strong> {currentTrade.education}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-midnight text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                          3
                        </span>
                        <span className="text-sm font-bold text-deep-ink">
                          {language === 'hi' ? 'तयशुदा न्यूनतम मजदूरी (Fair Wage Benchmark)' : 'Standard Fair Wage Benchmark'}
                        </span>
                      </div>
                      <div className="pl-11">
                        <div className="text-lg font-black text-primary-teal">{currentTrade.wage}</div>
                        <span className="text-[11px] text-slate-500 block">
                          Verified against NSQF minimum daily wage with zero platform cuts.
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate('profile')}
                      className="w-full text-left p-4 rounded-2xl bg-canvas border border-slate-200 hover:border-bright-teal hover:bg-teal-50/50 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-midnight text-white flex items-center justify-center font-mono font-bold text-xs">
                          4
                        </span>
                        <div>
                          <span className="text-sm font-bold text-deep-ink block">
                            {language === 'hi' ? 'अपना डिजिटल स्किल पास बनाएँ / देखें' : 'View / Create Your Digital Skill Pass'}
                          </span>
                          <span className="text-xs text-slate-500">Portable proof of skill across India</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-primary-teal" />
                    </button>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs">
                    <button
                      type="button"
                      onClick={() => handleKeyPress('1')}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-teal to-bright-teal text-white font-bold inline-flex items-center gap-2 shadow-sm"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>{language === 'hi' ? `इस ट्रेड के काम देखें (${currentTrade.openings})` : `See Open Jobs (${currentTrade.openings})`}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleKeyPress('0')}
                      className="text-slate-600 hover:text-deep-ink font-semibold"
                    >
                      {language === 'hi' ? 'वापस मुख्य मेनू पर जाएँ (0)' : 'Return to Main Menu (0)'}
                    </button>
                  </div>
                </div>
              )}

              {/* FAQ Submenu */}
              {currentMenuLevel === 'faq_sub' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-app-border shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-bold text-deep-ink">Sahayak Help & Protection Guidance</h3>
                    <button
                      type="button"
                      onClick={() => handleKeyPress('0')}
                      className="text-xs font-bold text-slate-500 hover:text-deep-ink px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      ← Back (0)
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-1">
                      <div className="flex items-center gap-2 text-sm font-bold text-deep-ink">
                        <span className="w-6 h-6 rounded-md bg-midnight text-white text-xs flex items-center justify-center font-mono">1</span>
                        <span>How do I apply for a job? (आवेदन कैसे करें?)</span>
                      </div>
                      <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                        Click "Apply Now" on any job card. Enter your mobile number and trade experience. Your profile will be submitted to the verified employer without charging any fee.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-1">
                      <div className="flex items-center gap-2 text-sm font-bold text-deep-ink">
                        <span className="w-6 h-6 rounded-md bg-midnight text-white text-xs flex items-center justify-center font-mono">2</span>
                        <span>How does Fair Work Payment Escrow work? (पैसे की सुरक्षा)</span>
                      </div>
                      <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                        Employers deposit 100% of agreed wages into secure platform escrow before you arrive at the work site. When the job is marked complete, wages are instantly transferred to your UPI/bank.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-1">
                      <div className="flex items-center gap-2 text-sm font-bold text-deep-ink">
                        <span className="w-6 h-6 rounded-md bg-midnight text-white text-xs flex items-center justify-center font-mono">3</span>
                        <span>What is the Digital Skill Pass? (स्किल पास क्या है?)</span>
                      </div>
                      <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                        A portable QR-enabled digital identity showing your Aadhaar KYC, ITI certifications, past contractor ratings, and total disbursed wages.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* MODE 2: VOICE ASSISTANT */}
        {activeMode === 'voice' && (
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-app-border shadow-sm space-y-8 max-w-3xl mx-auto text-center">
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-deep-ink">
                {language === 'hi' ? 'बोलकर काम खोजें' : 'Voice-Powered Job Discovery'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                {t('sahayak.voicePrompt')}
              </p>
            </div>

            {/* Microphone Button with Pulse Wave */}
            <div className="py-6 flex flex-col items-center justify-center gap-4">
              <div className="relative">
                {isListening && (
                  <span className="absolute inset-0 rounded-full bg-bright-teal/30 animate-ping" />
                )}
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-white transition-all shadow-xl active:scale-95 ${
                    isListening
                      ? 'bg-rose-500 ring-8 ring-rose-100 scale-105'
                      : 'bg-gradient-to-br from-primary-teal to-bright-teal hover:scale-105 shadow-glow-teal'
                  }`}
                  aria-label="Toggle Microphone"
                >
                  {isListening ? <Mic className="w-10 h-10 animate-pulse" /> : <Mic className="w-10 h-10" />}
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider block text-slate-500">
                  {isListening ? 'Listening in Hindi / English...' : 'Tap Microphone to Speak'}
                </span>
                <span className="text-[11px] text-slate-400">
                  Browser Speech Recognition (Web Speech API)
                </span>
              </div>
            </div>

            {/* Error Message if Denied */}
            {voiceError && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 text-left flex items-start gap-3">
                <MicOff className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Microphone Notice:</strong> {voiceError}
                </div>
              </div>
            )}

            {/* Recognized Speech Bubble */}
            {recognizedTranscript && (
              <div className="p-4 rounded-2xl bg-canvas border border-slate-200 text-left space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  You Said:
                </span>
                <p className="text-sm font-bold text-deep-ink italic">
                  "{recognizedTranscript}"
                </p>
              </div>
            )}

            {/* Assistant Voice Response */}
            {voiceAnswer && (
              <div className="p-5 rounded-2xl bg-midnight text-white text-left space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-soft-cyan font-bold">
                    <MessageSquare className="w-4 h-4 text-bright-teal" />
                    <span>Sahayak Assistant Response</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakText(voiceAnswer)}
                    className="inline-flex items-center gap-1.5 text-xs text-soft-cyan hover:text-white"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Repeat Audio</span>
                  </button>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {voiceAnswer}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate('find-jobs')}
                    className="px-4 py-2 rounded-xl bg-bright-teal text-midnight text-xs font-bold hover:bg-soft-cyan transition-colors"
                  >
                    View Matching Jobs
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode('keypad')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Switch to Keypad (1–9)
                  </button>
                </div>
              </div>
            )}

            {/* Quick Voice Chips */}
            <div className="space-y-2 text-left">
              <span className="text-xs font-bold text-slate-400 block">
                Or try asking one of these:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'मुझे इलेक्ट्रीशियन का काम चाहिए',
                  'बढ़ई का काम कहाँ मिलेगा?',
                  'आवेदन कैसे करें?',
                  'पैसे की क्या गारंटी है?',
                  'स्किल पास कैसे बनेगा?',
                ].map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setRecognizedTranscript(sample);
                      handleVoiceQuery(sample);
                    }}
                    className="text-xs px-3 py-1.5 rounded-xl bg-canvas hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                  >
                    "{sample}"
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* MODE 3: FREQUENTLY ASKED QUESTIONS */}
        {activeMode === 'faq' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-app-border shadow-sm space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-deep-ink">Common Questions & Guidance</h2>
              <p className="text-xs text-slate-500">Everything you need to know about finding work, verification, and payments on SAHAYAK</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-1.5">
                <h4 className="text-sm font-bold text-deep-ink">Does SAHAYAK take any commission from worker wages?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No. 0% commission is deducted from workers. 100% of the agreed wage goes directly into your bank account or UPI ID.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-1.5">
                <h4 className="text-sm font-bold text-deep-ink">Can I find work if I don't have an ITI certificate?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes! Practical on-site apprenticeship and experience are fully recognized. You can get peer endorsements and work history validated through our escrow system.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-1.5">
                <h4 className="text-sm font-bold text-deep-ink">How do I access SAHAYAK without a smartphone?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can call our toll-free phone number <strong>1800-SAHAYAK</strong> from any basic keypad phone (Nokia 105, JioPhone) to hear jobs, register by voice, or receive SMS updates.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-1.5">
                <h4 className="text-sm font-bold text-deep-ink">How does the Fair Work Escrow protect me from non-payment?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Before you deploy to any work site, the contractor must deposit the agreed milestone funds into a certified escrow account. Once work is inspected, the funds disburse automatically.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => onNavigate('find-jobs')}
                className="px-5 py-2.5 rounded-xl bg-primary-teal text-white text-xs font-bold hover:bg-bright-teal transition-colors"
              >
                Browse All Open Jobs
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('keypad')}
                className="text-xs font-bold text-primary-teal hover:underline"
              >
                Try the Keypad Simulator →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
