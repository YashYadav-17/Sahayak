import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Briefcase, 
  UserCheck, 
  Globe, 
  ArrowRight,
  PhoneCall,
  Volume2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { PageView, SupportedLanguage } from '../../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenWorkerRegistration?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { language, setLanguage, isSimpleHindi, setIsSimpleHindi, t } = useLanguage();

  const navItems: { id: PageView; labelKey: string; badge?: string; isSpecial?: boolean }[] = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'find-jobs', labelKey: 'nav.findJobs', badge: '5,000+' },
    { id: 'hire-workers', labelKey: 'nav.hireWorkers' },
    { id: 'profile', labelKey: 'nav.profile' },
    { id: 'sahayak', labelKey: 'nav.sahayakHelp', isSpecial: true },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200 bg-midnight/90 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none"
            aria-label="SAHAYAK Home"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary-teal to-bright-teal p-0.5 shadow-glow-teal group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-midnight rounded-[10px] flex items-center justify-center">
                <span className="font-display font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-soft-cyan to-bright-teal">
                  S
                </span>
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-soft-cyan animate-pulse border-2 border-midnight" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-2xl tracking-wider text-white">
                  SAHAYAK
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-bright-teal/20 text-soft-cyan border border-bright-teal/30">
                  सहायक
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide block -mt-0.5">
                {t('nav.tagline')}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/10 shadow-sm border border-white/15'
                      : item.isSpecial
                      ? 'text-soft-cyan bg-bright-teal/10 hover:bg-bright-teal/20 border border-bright-teal/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.isSpecial && <PhoneCall className="w-3.5 h-3.5 text-bright-teal animate-pulse" />}
                  <span>{t(item.labelKey)}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-primary-teal text-white">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-bright-teal" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Simple Hindi Toggle Pill */}
            <button
              type="button"
              onClick={() => setIsSimpleHindi(!isSimpleHindi)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isSimpleHindi
                  ? 'bg-bright-teal text-midnight border-bright-teal shadow-glow-teal'
                  : 'bg-white/5 text-slate-300 hover:text-white border-white/10'
              }`}
              title="सरल हिंदी मोड (Simple Hindi Mode)"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>सरल हिंदी</span>
              {isSimpleHindi && <span className="text-[9px] uppercase px-1 rounded bg-midnight text-white">ON</span>}
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-soft-cyan" />
                <span className="font-bold">
                  {language === 'hi' ? 'हिन्दी' : language === 'mr' ? 'मराठी' : 'English'}
                </span>
                <span className="text-[10px] text-slate-400">▾</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 py-2 bg-midnight/98 border border-white/15 rounded-2xl shadow-2xl z-50 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => selectLanguage('hi')}
                    className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center justify-between ${
                      language === 'hi' ? 'text-bright-teal bg-white/10' : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span>हिन्दी (Hindi)</span>
                    {language === 'hi' && <span>✓</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => selectLanguage('en')}
                    className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center justify-between ${
                      language === 'en' ? 'text-bright-teal bg-white/10' : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span>✓</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => selectLanguage('mr')}
                    className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center justify-between ${
                      language === 'mr' ? 'text-bright-teal bg-white/10' : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span>मराठी (Marathi)</span>
                    {language === 'mr' && <span>✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Direct Hire Workers CTA */}
            <button
              type="button"
              onClick={() => handleNavClick('hire-workers')}
              id="nav-hire-cta"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-teal to-bright-teal text-white text-xs font-bold shadow-glow-teal hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>{t('hero.hireWorkerBtn')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSimpleHindi(!isSimpleHindi)}
              type="button"
              className={`px-2 py-1 rounded-md text-[11px] font-bold border ${
                isSimpleHindi ? 'bg-bright-teal text-midnight border-bright-teal' : 'text-slate-300 border-white/10'
              }`}
            >
              सरल
            </button>
            <button
              onClick={() => setLanguage(language === 'hi' ? 'en' : language === 'en' ? 'mr' : 'hi')}
              type="button"
              className="px-2.5 py-1 rounded-md text-xs font-bold text-soft-cyan bg-white/10 border border-white/10"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-midnight/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${
                  isActive
                    ? 'bg-primary-teal/20 text-soft-cyan border border-bright-teal/30'
                    : item.isSpecial
                    ? 'bg-bright-teal/10 text-soft-cyan border border-bright-teal/30 font-bold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.isSpecial && <PhoneCall className="w-4 h-4 text-bright-teal animate-pulse" />}
                  <span>{t(item.labelKey)}</span>
                </div>
                {item.badge && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary-teal text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => handleNavClick('find-jobs')}
              className="w-full py-3 px-4 rounded-xl bg-white/10 text-white font-bold text-sm text-center flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-bright-teal" />
              <span>{t('hero.findWorkBtn')}</span>
            </button>
            <button
              onClick={() => handleNavClick('hire-workers')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-teal to-bright-teal text-white font-bold text-sm text-center shadow-glow-teal flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>{t('hero.hireWorkerBtn')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
