import React from 'react';
import { 
  Scale, 
  ShieldCheck, 
  Lock, 
  HardHat, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { TRUST_PILLARS } from '../../data/features';
import { SectionHeading } from '../common/SectionHeading';
import { FrameBorder } from '../animations/FrameBorder';
import type { PageView } from '../../types';

interface TrustSafetyProps {
  onNavigate?: (page: PageView) => void;
}

export const TrustSafety: React.FC<TrustSafetyProps> = () => {
  const getPillarIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-primary-teal";
    switch (iconName) {
      case 'Scale':
        return <Scale className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'Lock':
        return <Lock className={iconClass} />;
      case 'HardHat':
        return <HardHat className={iconClass} />;
      default:
        return <ShieldCheck className={iconClass} />;
    }
  };

  return (
    <section id="trust-safety-section" className="py-20 md:py-32 bg-gradient-to-b from-white via-mist-blue/20 to-white text-deep-ink relative overflow-hidden border-t border-slate-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Clean, Light, Trustworthy */}
        <SectionHeading
          badge="Fair Work Standard"
          title="Trust, Safety & Fair Pay by Design,"
          highlightedText="Not an Afterthought"
          subtitle="Dismantling informal labor exploitation. Every job on SAHAYAK enforces standard minimum wage floors, pre-funded escrow safety, and verified worker dignity."
        />

        {/* 4 Pillars Grid: Light, elevated cards with subtle borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-card-hover hover:border-bright-teal/60 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-mist-blue/70 border border-blue-200/60 flex items-center justify-center group-hover:bg-primary-teal/10 transition-colors">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <span className="text-[11px] font-bold text-primary-teal bg-primary-teal/10 px-2.5 py-0.5 rounded-full border border-primary-teal/20">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-deep-ink group-hover:text-primary-teal transition-colors mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Callout: Informal Naka vs SAHAYAK Platform with Frame Border */}
        <div className="mt-16 rounded-3xl bg-slate-50 border border-slate-200 p-6 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-bold text-primary-teal uppercase tracking-wider block">
                The Fair Work Standard
              </span>
              <h3 className="text-2xl font-black text-deep-ink leading-tight">
                Why Bharat's Craftsmen Deserve Better Than the Informal Stand (चौक/नाका)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Traditional informal hiring leaves workers waiting at morning road crossings with zero wage protection, frequent payment defaults, and dangerous unmonitored sites.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Old Traditional Naka */}
              <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Informal Labor Stand (Traditional)</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Uncertain morning wait with 40% zero-work days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Middleman cuts 15% to 30% of daily hard-earned wage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>No medical cover or compensation for job site injuries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Frequent payment delays and non-payment disputes</span>
                  </li>
                </ul>
              </div>

              {/* SAHAYAK Fair Work Highlight wrapped in FrameBorder */}
              <FrameBorder
                radius={16}
                lineWidth={1.5}
                glow={1}
                glowWidth={20}
                borderColor="#0F766E"
                glowColor="rgba(15, 118, 110, 0.35)"
                className="shadow-md"
              >
                <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3 h-full">
                  <div className="flex items-center gap-2 text-primary-teal font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-bright-teal shrink-0" />
                    <span>SAHAYAK Platform Guarantee</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Jobs confirmed the night before with direct site navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>0% Commission</strong> deducted from the worker's earnings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Mandatory PPE checklist & group insurance policy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Escrow locked funds with automated UPI daily transfer</span>
                    </li>
                  </ul>
                </div>
              </FrameBorder>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustSafety;
