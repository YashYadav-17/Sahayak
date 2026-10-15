import React from 'react';
import { HardHat, Briefcase, ArrowRight, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { PageView } from '../../types';

interface CTASectionProps {
  onNavigate: (page: PageView) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Container: Distinct Teal-to-Midnight Field */}
        <div className="relative rounded-3xl bg-gradient-to-br from-primary-teal via-[#0B544E] to-midnight text-white overflow-hidden p-8 sm:p-14 lg:p-16 border border-bright-teal/30 shadow-2xl">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-soft-cyan/15 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-violet-accent/20 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 grid-pattern-overlay pointer-events-none opacity-20" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-soft-cyan shadow-sm">
              <ShieldCheck className="w-4 h-4 text-bright-teal" />
              <span>National Blue-Collar Employment Network</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {t('cta.title')}
            </h2>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
              {t('cta.subtitle')}
            </p>

            {/* Dual Action Split Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left">
              
              {/* Worker Card */}
              <div className="p-7 rounded-2xl bg-midnight/70 backdrop-blur-md border border-white/20 hover:border-bright-teal/60 transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-lg">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-bright-teal/20 text-soft-cyan flex items-center justify-center mb-3 border border-bright-teal/30">
                    <HardHat className="w-6 h-6 text-bright-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-white">For Skilled Workers & Artisans</h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    100% Free registration. Zero commissions taken from your daily rate. Direct bank or UPI transfer upon verified milestone completion.
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-xs text-soft-cyan font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-bright-teal" />
                    <span>Instant Skill Verification & Portable Pass</span>
                  </div>
                </div>

                <button
                  type="button"
                  id="cta-find-jobs-btn"
                  onClick={() => onNavigate('find-jobs')}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-primary-teal to-bright-teal text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-glow-teal flex items-center justify-center gap-2 transition-all active:scale-95 mt-2 cursor-pointer"
                >
                  <span>{t('cta.workerBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Employer Card */}
              <div className="p-7 rounded-2xl bg-midnight/70 backdrop-blur-md border border-white/20 hover:border-violet-accent/60 transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-lg">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-violet-accent/20 text-violet-300 flex items-center justify-center mb-3 border border-violet-accent/30">
                    <Briefcase className="w-6 h-6 text-violet-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">For Contractors & Builders</h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Post requirements in under 2 minutes. Deploy pre-screened, insured craftsmen with QR-based attendance tracking and escrow invoices.
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-xs text-violet-200 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                    <span>Escrow Protected & GST Compliant</span>
                  </div>
                </div>

                <button
                  type="button"
                  id="cta-hire-workers-btn"
                  onClick={() => onNavigate('hire-workers')}
                  className="w-full py-3.5 px-5 rounded-xl bg-white hover:bg-slate-100 text-midnight font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 mt-2 cursor-pointer"
                >
                  <span>{t('cta.hireBtn')}</span>
                  <ArrowRight className="w-4 h-4 text-midnight" />
                </button>
              </div>

            </div>

            {/* Helpline / WhatsApp Support */}
            <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-bright-teal" />
                <span>Worker Toll-Free Helpline: <strong>1800-200-SAHAYAK</strong></span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Available 7 Days a week across 8 regional languages</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTASection;
