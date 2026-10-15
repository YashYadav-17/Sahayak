import React, { useState } from 'react';
import { ArrowRight, Flame, LayoutGrid, Disc } from 'lucide-react';
import { FEATURED_JOBS } from '../../data/jobs';
import { JobCard } from '../cards/JobCard';
import { SectionHeading } from '../common/SectionHeading';
import { PrismCarousel } from '../animations/PrismCarousel';
import { useLanguage } from '../../context/LanguageContext';
import type { Job, PageView } from '../../types';

interface FeaturedJobsProps {
  onApplyJob: (job: Job) => void;
  onNavigate: (page: PageView) => void;
}

export const FeaturedJobs: React.FC<FeaturedJobsProps> = ({ onApplyJob, onNavigate }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'urgent' | 'monthly' | 'daily'>('all');
  const [viewMode, setViewMode] = useState<'prism' | 'grid'>('prism');

  const filteredJobs = FEATURED_JOBS.filter((job) => {
    if (activeTab === 'urgent') return job.urgent;
    if (activeTab === 'monthly') return job.wageType === 'Per Month';
    if (activeTab === 'daily') return job.wageType === 'Per Day';
    return true;
  });

  return (
    <section id="featured-jobs-section" className="py-20 md:py-32 bg-[#081724] text-white relative overflow-hidden">
      {/* Layered Lighting */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[400px] bg-primary-teal/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[350px] bg-violet-accent/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 grid-pattern-overlay pointer-events-none opacity-25" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          dark
          badge="Interactive Job Discovery"
          title={t('jobs.title')}
          subtitle={t('jobs.subtitle')}
        />

        {/* Filter Tabs & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-bright-teal text-midnight shadow-glow-teal'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10'
              }`}
            >
              {t('jobs.tabAll')} ({FEATURED_JOBS.length})
            </button>
            <button
              onClick={() => setActiveTab('urgent')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'urgent'
                  ? 'bg-amber-500 text-midnight shadow-md'
                  : 'bg-white/10 text-amber-300 hover:bg-white/15 border border-amber-500/30'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('jobs.tabUrgent')}</span>
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'daily'
                  ? 'bg-bright-teal text-midnight shadow-glow-teal'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10'
              }`}
            >
              {t('jobs.tabDaily')}
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'monthly'
                  ? 'bg-bright-teal text-midnight shadow-glow-teal'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10'
              }`}
            >
              {t('jobs.tabMonthly')}
            </button>
          </div>

          {/* View Mode Toggle: Prism Coverflow vs Grid */}
          <div className="inline-flex p-1 rounded-xl bg-white/10 border border-white/15 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('prism')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'prism'
                  ? 'bg-bright-teal text-midnight shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="3D Coverflow Mode (Prism Carousel)"
            >
              <Disc className="w-3.5 h-3.5" />
              <span>3D Coverflow</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-bright-teal text-midnight shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Standard Grid Mode"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>

        </div>

        {/* Dynamic Presentation: Prism Coverflow OR Grid */}
        {viewMode === 'prism' ? (
          <div className="rounded-3xl bg-midnight/80 border border-white/15 shadow-2xl p-4 sm:p-6 backdrop-blur-sm">
            <PrismCarousel
              jobs={filteredJobs}
              onApplyJob={onApplyJob}
              sweepDuration={1.1}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={onApplyJob}
                onViewDetails={onApplyJob}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA to view all jobs */}
        <div className="mt-14 text-center">
          <button
            type="button"
            id="view-all-jobs-btn"
            onClick={() => onNavigate('find-jobs')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-teal to-bright-teal text-white font-bold text-sm hover:opacity-95 shadow-glow-teal transition-all group"
          >
            <span>Explore All 5,420+ Verified Jobs Across India</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedJobs;
