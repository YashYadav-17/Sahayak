/**
 * SAHAYAK TELEPHONY & IVR ARCHITECTURE SPECIFICATION
 * 
 * Designed for future deployment with Twilio Voice, Exotel, or Indian Telecom IVR Gateways
 * providing dial-in access for feature phones (e.g. Nokia 105, JioPhone 4G) via toll-free 1800-SAHAYAK.
 */

export interface IVRMenuItem {
  key: string;
  label: string;
  hindiLabel: string;
  marathiLabel: string;
  audioPromptUrl?: string; // Pre-recorded studio voice file URL
  action: 'trade_details' | 'find_jobs' | 'faqs' | 'agent_callback';
  tradeCategory?: string;
}

export interface IVRSubMenuItem {
  key: string;
  label: string;
  hindiLabel: string;
  ttsResponseHindi: string;
  ttsResponseEnglish: string;
}

export const MAIN_IVR_MENU: IVRMenuItem[] = [
  { key: '1', label: 'Electrician & Wireman', hindiLabel: 'इलेक्ट्रीशियन और वायरमैन', marathiLabel: 'इलेक्ट्रिशियन', action: 'trade_details', tradeCategory: 'Electrician' },
  { key: '2', label: 'Carpenter & Joiner', hindiLabel: 'बढ़ई और फर्नीचर कारीगर', marathiLabel: 'सुतार काम', action: 'trade_details', tradeCategory: 'Carpenter' },
  { key: '3', label: 'Plumber & Pipefitter', hindiLabel: 'प्लंबर और पाइप फिटर', marathiLabel: 'प्लंबर काम', action: 'trade_details', tradeCategory: 'Plumber' },
  { key: '4', label: 'Welder & Fabricator', hindiLabel: 'वेल्डर और फैब्रिकेटर', marathiLabel: 'वेल्डर काम', action: 'trade_details', tradeCategory: 'Welder' },
  { key: '5', label: 'Mason & Tile Layer', hindiLabel: 'राजमिस्त्री और टाइल कारीगर', marathiLabel: 'गवंडी काम', action: 'trade_details', tradeCategory: 'Mason' },
  { key: '6', label: 'Painter & Finisher', hindiLabel: 'पेंटर और पुट्टी कारीगर', marathiLabel: 'रंगारी काम', action: 'trade_details', tradeCategory: 'Painter' },
  { key: '7', label: 'Solar Panel Technician', hindiLabel: 'सोलर पैनल टेक्नीशियन', marathiLabel: 'सौर ऊर्जा तंत्रज्ञ', action: 'trade_details', tradeCategory: 'Solar' },
  { key: '8', label: 'AC & HVAC Specialist', hindiLabel: 'एसी और कूलिंग तकनीशियन', marathiLabel: 'एसी तंत्रज्ञ', action: 'trade_details', tradeCategory: 'HVAC' },
  { key: '9', label: 'Find All Jobs', hindiLabel: 'सभी नौकरियां देखें', marathiLabel: 'सर्व कामे शोधा', action: 'find_jobs' },
  { key: '0', label: 'Help & Payment Escrow', hindiLabel: 'मदद और पेमेंट सुरक्षा', marathiLabel: 'मदत आणि पेमेंट माहिती', action: 'faqs' },
];

/**
 * Standard Dual-Tone Multi-Frequency (DTMF) Audio Frequencies
 * Used by real telecom switches to decode keypad inputs.
 */
const DTMF_FREQUENCIES: Record<string, [number, number]> = {
  '1': [697, 1209],
  '2': [697, 1336],
  '3': [697, 1477],
  '4': [770, 1209],
  '5': [770, 1336],
  '6': [770, 1477],
  '7': [852, 1209],
  '8': [852, 1336],
  '9': [852, 1477],
  '*': [941, 1209],
  '0': [941, 1336],
  '#': [941, 1477],
};

let audioCtx: AudioContext | null = null;

/**
 * Play authentic DTMF keypad tone using Web Audio API
 */
export const playKeypadTone = (key: string, durationMs = 120) => {
  if (typeof window === 'undefined') return;

  const freqs = DTMF_FREQUENCIES[key];
  if (!freqs) return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc1.frequency.value = freqs[0];
    osc2.frequency.value = freqs[1];

    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + durationMs / 1000);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start();
    osc2.start();

    osc1.stop(audioCtx.currentTime + durationMs / 1000);
    osc2.stop(audioCtx.currentTime + durationMs / 1000);
  } catch (err) {
    console.debug('Audio tone error:', err);
  }
};

/**
 * Simulates how Twilio / Exotel IVR Webhook translates incoming digits into TwiML / NCCO XML
 */
export const generateTwilioVoiceResponse = (digits: string, lang = 'hi-IN'): string => {
  const selected = MAIN_IVR_MENU.find((m) => m.key === digits);
  if (!selected) {
    return `<Response><Say language="${lang}">Aapne galat vikalp chuna hai. Kripya punah koshish karein.</Say><Redirect>/ivr/menu</Redirect></Response>`;
  }

  return `<Response><Say language="${lang}">Aapne chuna hai: ${selected.hindiLabel}. Kripya pratiksha karein, hum aapko sambandhit jankari pradan kar rahe hain.</Say></Response>`;
};
