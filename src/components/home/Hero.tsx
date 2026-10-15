import React, { useState } from 'react';
import { 
  ArrowRight, 
  Briefcase, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Award,
  Sparkles,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { VaporType } from '../animations/VaporType';
import { PassageGallery } from '../animations/PassageGallery';
import { PASSAGE_ITEMS } from '../../data/passageItems';
import { useLanguage } from '../../context/LanguageContext';
import type { PageView } from '../../types';

interface HeroProps {
  onNavigate: (page: PageView) => void;
  onSearch?: (trade: string, city: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onSearch }) => {
  const { t } = useLanguage();
  const [selectedTrade, setSelectedTrade] = useState('All Trades');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(selectedTrade, selectedCity);
    }
    onNavigate('find-jobs');
  };

  return (
    <section className="relative overflow-hidden bg-midnight text-white min-h-[92vh] flex items-center justify-center">
      
      {/* LAYER 1: Full-screen moving photographic tunnel (Passage Gallery) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <PassageGallery 
          items={PASSAGE_ITEMS} 
          isHeroBackground={true}
          cruisingSpeed={0.7}
          interactive={false}
        />
      </div>

      {/* LAYER 2: Dark Readability Overlay with atmospheric ambient gradient */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-midnight/85 via-midnight/75 to-midnight/95" />
      <div className="absolute inset-0 z-10 pointer-events-none radial-gradient-center opacity-60" 
           style={{ background: 'radial-gradient(circle at 50% 45%, rgba(15, 118, 110, 0.3) 0%, rgba(7, 19, 28, 0.85) 65%, #07131C 100%)' }} 
      />

      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary-teal/25 blur-[140px] rounded-full pointer-events-none z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-soft-cyan/15 blur-[120px] rounded-full pointer-events-none z-10" />

      {/* FOREGROUND: Centered Content Hierarchy */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold text-soft-cyan tracking-wide border border-bright-teal/30 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-bright-teal animate-ping" />
          <span className="font-bold text-white uppercase text-[10px] tracking-widest">
            National Direct Engine
          </span>
          <span className="text-slate-400">|</span>
          <span className="truncate max-w-[280px] sm:max-w-none">
            {t('hero.announcement')}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-soft-cyan shrink-0" />
        </div>

        {/* LAYER 3: Centered Vapor Type Title (SAHAYAK सहायक) */}
        <div className="w-full flex justify-center py-2">
          <VaporType 
            text="SAHAYAK"
            hindiSubtitle="(सहायक)"
            tagline={t('hero.tagline')}
            className="w-full max-w-4xl mx-auto text-center items-center justify-center"
            glowColor="#14B8A6"
          />
        </div>

        {/* LAYER 4: Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed -mt-2">
          {t('hero.description')}
        </p>

        {/* LAYER 5: Primary & Secondary Calls to Action + Voice/Keypad Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2">
          <button
            type="button"
            id="hero-find-work-btn"
            onClick={() => onNavigate('find-jobs')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-teal to-bright-teal text-white font-bold text-base shadow-glow-teal hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all focus:ring-2 focus:ring-soft-cyan focus:outline-none cursor-pointer"
          >
            <span>{t('hero.findWorkBtn')}</span>
            <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            id="hero-hire-worker-btn"
            onClick={() => onNavigate('hire-workers')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm active:scale-[0.98] focus:ring-2 focus:ring-soft-cyan focus:outline-none cursor-pointer"
          >
            <Briefcase className="w-5 h-5 text-soft-cyan" />
            <span>{t('hero.hireWorkerBtn')}</span>
          </button>

          <button
            type="button"
            id="hero-sahayak-help-btn"
            onClick={() => onNavigate('sahayak')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-midnight/90 hover:bg-midnight text-soft-cyan font-bold text-sm border border-bright-teal/40 hover:border-bright-teal shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-bright-teal animate-pulse" />
            <span>{t('hero.dialHelpBtn')}</span>
          </button>
        </div>

        {/* LAYER 6: Centered Search Control Widget */}
        <form 
          onSubmit={handleSearchSubmit}
          className="w-full max-w-3xl mt-4 p-2 rounded-2xl glass-dark border border-white/15 shadow-2xl flex flex-col md:flex-row items-center gap-2"
        >
          <div className="w-full md:w-1/2 flex items-center gap-2.5 px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-xs focus-within:border-bright-teal transition-colors">
            <Search className="w-4 h-4 text-bright-teal shrink-0" />
            <select
              aria-label="Select Trade"
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="All Trades" className="bg-midnight text-white">{t('hero.searchTradePlaceholder')}</option>
              <option value="Electrician" className="bg-midnight text-white">Electrician & Wireman (बिजली कारीगर)</option>
              <option value="Plumber" className="bg-midnight text-white">Plumber & Pipefitter (प्लंबर)</option>
              <option value="Carpenter" className="bg-midnight text-white">Carpenter & Joiner (बढ़ई)</option>
              <option value="Welder" className="bg-midnight text-white">Welder & Fabricator (वेल्डर)</option>
              <option value="Mason" className="bg-midnight text-white">Mason & Tile Layer (राजमिस्त्री)</option>
              <option value="Painter" className="bg-midnight text-white">Painter & Finisher (पेंटर)</option>
              <option value="Solar" className="bg-midnight text-white">Solar Panel Technician (सोलर टेक्नीशियन)</option>
              <option value="HVAC" className="bg-midnight text-white">HVAC & AC Specialist (एसी तकनीशियन)</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 flex items-center gap-2.5 px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-xs focus-within:border-bright-teal transition-colors">
            <MapPin className="w-4 h-4 text-soft-cyan shrink-0" />
            <select
              aria-label="Select Location"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="All Cities" className="bg-midnight text-white">{t('hero.searchCityPlaceholder')}</option>
              <option value="Bengaluru" className="bg-midnight text-white">Bengaluru, Karnataka</option>
              <option value="Pune" className="bg-midnight text-white">Pune, Maharashtra</option>
              <option value="Ahmedabad" className="bg-midnight text-white">Ahmedabad, Gujarat</option>
              <option value="Delhi NCR" className="bg-midnight text-white">Delhi NCR & Gurugram</option>
              <option value="Mumbai" className="bg-midnight text-white">Mumbai & MMR</option>
              <option value="Hyderabad" className="bg-midnight text-white">Hyderabad, Telangana</option>
              <option value="Jaipur" className="bg-midnight text-white">Jaipur, Rajasthan</option>
            </select>
          </div>

          <button
            type="submit"
            id="hero-search-submit-btn"
            className="w-full md:w-auto px-7 py-3 rounded-xl bg-bright-teal text-midnight font-bold text-xs uppercase tracking-wider hover:bg-soft-cyan transition-colors shrink-0 flex items-center justify-center gap-2 active:scale-95 shadow-md cursor-pointer"
          >
            <span>{t('hero.searchBtn')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Proof Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bright-teal" />
            <span>{t('hero.proof1')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-soft-cyan" />
            <span>{t('hero.proof2')}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t('hero.proof3')}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
