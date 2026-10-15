import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight, UserCheck } from 'lucide-react';
import { FrameBorder } from '../animations/FrameBorder';
import { useLanguage } from '../../context/LanguageContext';
import type { PageView } from '../../types';

interface HandshakeStoryProps {
  onNavigate: (page: PageView) => void;
}

export const HandshakeStory: React.FC<HandshakeStoryProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-20 bg-midnight text-white overflow-hidden border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: The Connecting Hands Visual inside Frame Border */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              <FrameBorder
                radius={28}
                lineWidth={2}
                glow={1}
                glowWidth={26}
                flowSpeed={1.1}
                borderColor="#14B8A6"
                glowColor="rgba(20, 184, 166, 0.55)"
                className="shadow-2xl"
              >
                <div 
                  id="connecting-hands-container"
                  className="relative rounded-[26px] bg-midnight overflow-hidden min-h-[420px] sm:min-h-[460px] flex flex-col justify-between"
                >
                  {/* Real Cinematic Connecting-Hands Visual */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/assets/connecting-hands.jpg"
                      alt="Two hands reaching to connect: Indian skilled worker and contractor partnership"
                      className="w-full h-full object-cover filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/25 to-midnight/40" />
                  </div>

                  {/* Top Bar badge */}
                  <div className="relative z-10 p-6 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight/80 backdrop-blur-md border border-bright-teal/40 text-xs font-bold text-soft-cyan">
                      <Sparkles className="w-3.5 h-3.5 text-bright-teal animate-pulse" />
                      <span>{t('story.badge')}</span>
                    </div>

                    <span className="text-[11px] font-mono text-emerald-400 font-bold px-2.5 py-1 rounded bg-midnight/85 backdrop-blur-md border border-emerald-500/30">
                      Escrow Verified
                    </span>
                  </div>

                  {/* Bottom platform guarantees overlay */}
                  <div className="relative z-10 p-6 pt-0 space-y-3">
                    <div className="p-4 sm:p-5 rounded-2xl bg-midnight/90 backdrop-blur-md border border-white/15 space-y-2.5 shadow-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm sm:text-base">
                          Direct Employment Partnership
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">
                          0% Middlemen Cut
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Symbolizing the direct connection between Bharat's craftsmen and ethical contractors with zero commission exploitation.
                      </p>

                      <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                        <span className="flex items-center gap-1.5 text-soft-cyan">
                          <CheckCircle2 className="w-3.5 h-3.5 text-bright-teal" />
                          <span>Same-Day UPI Payout</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-soft-cyan">
                          <ShieldCheck className="w-3.5 h-3.5 text-bright-teal" />
                          <span>Aadhaar Biometric Check</span>
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </FrameBorder>

            </div>
          </div>

          {/* Right: Story Copy & Impact Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-bright-teal">
                <UserCheck className="w-4 h-4" />
                <span>Fair Work Revolution in India</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t('story.title')}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {t('story.desc')}
              </p>
            </div>

            {/* Value checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-bright-teal shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Full Wage Escrow Security</h4>
                  <p className="text-xs text-slate-400">Employers deposit funds before you deploy to the site. No delayed wages or denied payments.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-soft-cyan shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Portable Digital Skill Pass</h4>
                  <p className="text-xs text-slate-400">Your ratings, trade certificates, and verified work hours travel with you to every contractor in India.</p>
                </div>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('find-jobs')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-teal to-bright-teal text-white font-bold text-sm shadow-glow-teal hover:opacity-95 transition-all"
              >
                <span>Browse Verified Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('profile')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all"
              >
                <span>View Digital Skill Pass</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
