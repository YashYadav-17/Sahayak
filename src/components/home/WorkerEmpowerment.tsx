import React from 'react';
import { 
  BadgeCheck, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  Languages
} from 'lucide-react';
import { EMPOWERMENT_POINTS } from '../../data/features';
import { SectionHeading } from '../common/SectionHeading';
import { FrameBorder } from '../animations/FrameBorder';
import type { PageView } from '../../types';

interface WorkerEmpowermentProps {
  onNavigate: (page: PageView) => void;
}

export const WorkerEmpowerment: React.FC<WorkerEmpowermentProps> = ({ onNavigate }) => {
  return (
    <section id="worker-empowerment-section" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Dignity & Financial Inclusion"
          title="Empowering the Hands that"
          highlightedText="Build Our Nation"
          subtitle="Transforming informal daily labor into respected, certified careers with verified digital credentials and financial inclusion."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 4 Empowerment Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {EMPOWERMENT_POINTS.map((point, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-card-hover hover:border-bright-teal/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display text-2xl font-black text-primary-teal">
                        {point.stat}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {point.statLabel}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-deep-ink mb-1.5">
                      {point.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Language readiness bar */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-accent/10 text-violet-700 flex items-center justify-center shrink-0">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-deep-ink">Built for Every State & Regional Dialect</h4>
                  <p className="text-xs text-slate-500">Available in हिंदी, தமிழ், বাংলা, తెలుగు, मराठी, ગુજરાती and English.</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold text-primary-teal bg-primary-teal/10 px-3 py-1 rounded-full border border-primary-teal/20">
                  Voice Search Ready
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Controlled Dark Feature Panel with Frame Border for Digital Skill Pass */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              
              <FrameBorder
                radius={24}
                lineWidth={1.5}
                glow={1}
                glowWidth={22}
                borderColor="#14B8A6"
                glowColor="rgba(20, 184, 166, 0.5)"
                className="shadow-2xl"
              >
                {/* Digital Skill Card Container */}
                <div className="relative bg-[#071520] text-white rounded-3xl p-6 sm:p-7 space-y-5">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-bright-teal to-primary-teal flex items-center justify-center font-display font-black text-midnight text-sm">
                        S
                      </div>
                      <div>
                        <span className="text-xs font-black tracking-wider uppercase text-white block">
                          DIGITAL SKILL PASS
                        </span>
                        <span className="text-[10px] text-soft-cyan font-mono">
                          UID: SHK-IND-88429
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Verified Master
                    </span>
                  </div>

                  {/* Worker Profile Avatar & Summary */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-teal to-violet-accent p-0.5 shrink-0">
                      <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-xl font-black text-white">
                        RK
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                        <span>Ramesh Kumar</span>
                        <BadgeCheck className="w-4 h-4 text-bright-teal" />
                      </h4>
                      <p className="text-xs text-soft-cyan font-medium">
                        Senior Industrial Electrician & Wireman
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-1">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <strong>4.92</strong> (142 reviews)
                        </span>
                        <span>•</span>
                        <span>Bengaluru, KA</span>
                      </div>
                    </div>
                  </div>

                  {/* Credentials / Badges */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                        Govt Certification
                      </span>
                      <span className="font-bold text-white text-xs mt-0.5 block truncate">
                        NSDC Level 4 (ITI Wireman)
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                        Standard Daily Rate
                      </span>
                      <span className="font-bold text-bright-teal text-xs mt-0.5 block">
                        ₹1,100 / Day (Escrow)
                      </span>
                    </div>
                  </div>

                  {/* Performance stats mini bar */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Jobs Done</span>
                      <span className="font-bold text-white">218 Verified</span>
                    </div>
                    <div className="h-6 w-[1px] bg-white/10" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">On-Time Score</span>
                      <span className="font-bold text-emerald-400">99.2%</span>
                    </div>
                    <div className="h-6 w-[1px] bg-white/10" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Safety Protocol</span>
                      <span className="font-bold text-soft-cyan">100% Pass</span>
                    </div>
                  </div>

                  {/* Action button inside card */}
                  <button
                    type="button"
                    onClick={() => onNavigate('profile')}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-teal to-bright-teal text-white text-xs font-bold transition-all shadow-glow-teal hover:opacity-95 flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>Preview Worker Profile & Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>
              </FrameBorder>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WorkerEmpowerment;
