import React, { useState } from 'react';
import { 
  UserCheck, 
  SlidersHorizontal, 
  ShieldCheck, 
  Banknote, 
  FilePlus2, 
  Users, 
  QrCode, 
  BadgeCheck, 
  ArrowRight,
  HardHat,
  Building
} from 'lucide-react';
import { WORKER_STEPS, EMPLOYER_STEPS } from '../../data/features';
import { SectionHeading } from '../common/SectionHeading';
import { useLanguage } from '../../context/LanguageContext';
import type { PageView } from '../../types';

interface HowItWorksProps {
  onNavigate: (page: PageView) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'worker' | 'employer'>('worker');

  const getStepIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-primary-teal";
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className={iconClass} />;
      case 'SlidersHorizontal':
        return <SlidersHorizontal className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'Banknote':
        return <Banknote className={iconClass} />;
      case 'FilePlus2':
        return <FilePlus2 className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'QrCode':
        return <QrCode className={iconClass} />;
      case 'BadgeCheck':
        return <BadgeCheck className={iconClass} />;
      default:
        return <UserCheck className={iconClass} />;
    }
  };

  const currentSteps = activeTab === 'worker' ? WORKER_STEPS : EMPLOYER_STEPS;

  return (
    <section id="how-it-works-section" className="py-20 md:py-28 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Seamless Process"
          title={t('how.title')}
          subtitle={t('how.subtitle')}
        />

        {/* Audience Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/60 shadow-inner">
            <button
              type="button"
              id="tab-worker"
              onClick={() => setActiveTab('worker')}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'worker'
                  ? 'bg-midnight text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HardHat className="w-4 h-4 text-bright-teal" />
              <span>For Skilled Workers (कारीगर)</span>
            </button>

            <button
              type="button"
              id="tab-employer"
              onClick={() => setActiveTab('employer')}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'employer'
                  ? 'bg-midnight text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-4 h-4 text-soft-cyan" />
              <span>For Employers & Contractors (ठेकेदार)</span>
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {currentSteps.map((step, index) => (
            <div
              key={step.step}
              className="group relative bg-white rounded-2xl p-7 border border-app-border transition-all duration-300 hover:shadow-card-hover hover:border-bright-teal/40 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-3xl font-extrabold text-slate-200 group-hover:text-primary-teal/20 transition-colors">
                  {step.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-mist-blue/70 flex items-center justify-center group-hover:bg-primary-teal/10 transition-colors">
                  {getStepIcon(step.icon)}
                </div>
              </div>

              <div>
                <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-primary-teal bg-primary-teal/5 px-2.5 py-0.5 rounded-md mb-2">
                  {step.badge}
                </span>
                <h3 className="text-lg font-bold text-deep-ink group-hover:text-primary-teal transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress arrow indicator for desktop except last step */}
              {index < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-400 items-center justify-center shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5 mx-auto mt-1" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Context Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-app-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-deep-ink">100% Aadhaar & Direct Bank UPI Integration</h4>
              <p className="text-xs text-slate-500">Every wage payment and work contract is secured by RBI-approved digital escrow safeguards.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate(activeTab === 'worker' ? 'find-jobs' : 'hire-workers')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-midnight text-white text-xs font-bold hover:bg-primary-teal transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>{activeTab === 'worker' ? 'Explore Work Opportunities' : 'Start Hiring Today'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
