import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isSimpleHindi: boolean;
  setIsSimpleHindi: (simple: boolean) => void;
  t: (key: string, fallback?: string) => string;
  speakText: (text: string, langCode?: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('sahayak_lang');
    return (saved === 'hi' || saved === 'mr' || saved === 'en') ? saved : 'hi';
  });

  const [isSimpleHindi, setIsSimpleHindiState] = useState<boolean>(() => {
    return localStorage.getItem('sahayak_simple_hindi') === 'true';
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    localStorage.setItem('sahayak_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('sahayak_simple_hindi', String(isSimpleHindi));
  }, [isSimpleHindi]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (lang !== 'hi') {
      setIsSimpleHindiState(false);
    }
  };

  const setIsSimpleHindi = (simple: boolean) => {
    setIsSimpleHindiState(simple);
    if (simple) {
      setLanguageState('hi');
    }
  };

  const t = (key: string, fallback?: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return fallback || key;

    if (language === 'hi' && isSimpleHindi && entry.simpleHi) {
      return entry.simpleHi;
    }

    if (language === 'hi') return entry.hi || entry.en;
    if (language === 'mr') return entry.mr || entry.hi || entry.en;
    return entry.en;
  };

  const speakText = (text: string, langCode?: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser environment.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = langCode || (language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN');
    utterance.lang = targetLang;
    utterance.rate = 0.9; // Slightly slower, clear cadence for accessibility
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isSimpleHindi,
        setIsSimpleHindi,
        t,
        speakText,
        stopSpeech,
        isSpeaking,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
