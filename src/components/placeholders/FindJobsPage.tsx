import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Briefcase, 
  CheckCircle2,
  Disc,
  LayoutGrid,
  PhoneCall
} from 'lucide-react';
import { FEATURED_JOBS } from '../../data/jobs';
import { POPULAR_TRADES } from '../../data/trades';
import { JobCard } from '../cards/JobCard';
import { PrismCarousel } from '../animations/PrismCarousel';
import { useLanguage } from '../../context/LanguageContext';
import type { Job, PageView } from '../../types';

interface FindJobsPageProps {
  onNavigate: (page: PageView) => void;
  onApplyJob: (job: Job) => void;
  initialTradeFilter?: string;
}

export const FindJobsPage: React.FC<FindJobsPageProps> = ({
  onNavigate,
  onApplyJob,
  initialTradeFilter = 'all',
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrade, setSelectedTrade] = useState(initialTradeFilter);
  const [selectedWageType, setSelectedWageType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'coverflow'>('grid');

  useEffect(() => {
    if (initialTradeFilter) {
      setSelectedTrade(initialTradeFilter);
    }
  }, [initialTradeFilter]);

  const filteredJobs = FEATURED_JOBS.filter((job) => {
    const matchesQuery = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.trade.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrade = 
      selectedTrade === 'all' || 
      job.trade.toLowerCase().includes(selectedTrade.toLowerCase());

    const matchesWage = 
      selectedWageType === 'all' || 
      (selectedWageType === 'daily' && job.wageType === 'Per Day') ||
      (selectedWageType === 'monthly' && job.wageType === 'Per Month');

    return matchesQuery && matchesTrade && matchesWage;
  });

  return (
    <div className="min-h-screen bg-canvas py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary-teal transition-colors py-1.5 px-3 rounded-lg bg-white border border-slate-200 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home (मुख्य पृष्ठ)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('sahayak')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-soft-cyan bg-midnight border border-bright-teal/40 hover:border-bright-teal transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-bright-teal animate-pulse" />
              <span>Voice / Keypad Help</span>
            </button>
            <span className="text-xs font-bold text-soft-cyan bg-midnight px-3 py-1 rounded-full border border-bright-teal/30">
              Verified Jobs Directory
            </span>
          </div>
        </div>

        {/* Header Banner */}
        <div className="bg-midnight text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-white/10">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-bright-teal">
              Verified Employment Engine
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t('nav.findJobs')} — 5,400+ Openings Across India
            </h1>
            <p className="text-sm text-slate-300">
              Browse active daily and monthly requirements from pre-vetted contractors and builders. All wage payouts are 100% escrow backed.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-soft-cyan">
            <CheckCircle2 className="w-4 h-4 text-bright-teal shrink-0" />
            <span>Interactive Coverflow (Prism Carousel) & Fast Filter Enabled</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-app-border shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trade, city, or skill (e.g., Electrician, Bengaluru, Welder)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-canvas border border-slate-200 rounded-xl focus:ring-2 focus:ring-bright-teal focus:border-bright-teal outline-none"
              />
            </div>

            {/* Trade Select */}
            <div className="md:col-span-4 relative">
              <select
                aria-label="Filter by Trade"
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-canvas border border-slate-200 rounded-xl focus:ring-2 focus:ring-bright-teal focus:border-bright-teal outline-none cursor-pointer"
              >
                <option value="all">All Trade Categories</option>
                {POPULAR_TRADES.map((trade) => (
                  <option key={trade.id} value={trade.name}>
                    {trade.name} ({trade.hindiName})
                  </option>
                ))}
              </select>
            </div>

            {/* Wage Type Select */}
            <div className="md:col-span-3 relative">
              <select
                aria-label="Filter by Wage Type"
                value={selectedWageType}
                onChange={(e) => setSelectedWageType(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-canvas border border-slate-200 rounded-xl focus:ring-2 focus:ring-bright-teal focus:border-bright-teal outline-none cursor-pointer"
              >
                <option value="all">All Remuneration Types</option>
                <option value="daily">Daily Wage (दैनिक वेतन)</option>
                <option value="monthly">Monthly Salary (मासिक)</option>
              </select>
            </div>

          </div>

          {/* Quick Active Filter Chips & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-3">
            <div className="flex items-center gap-3">
              <span>Showing <strong className="text-deep-ink">{filteredJobs.length}</strong> verified job postings</span>
              <button 
                onClick={() => { setSelectedTrade('all'); setSelectedWageType('all'); setSearchQuery(''); }}
                className="text-[11px] font-semibold text-primary-teal hover:underline"
              >
                Reset All Filters
              </button>
            </div>

            {/* Toggle Coverflow / Grid */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-midnight text-white shadow-sm'
                    : 'text-slate-600 hover:text-deep-ink'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('coverflow')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'coverflow'
                    ? 'bg-midnight text-white shadow-sm'
                    : 'text-slate-600 hover:text-deep-ink'
                }`}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>3D Coverflow</span>
              </button>
            </div>
          </div>
        </div>

        {/* Job Listings: Coverflow OR Grid */}
        {viewMode === 'coverflow' ? (
          <div className="rounded-3xl bg-[#081724] border border-white/10 p-4 sm:p-6 shadow-2xl">
            <PrismCarousel
              jobs={filteredJobs}
              onApplyJob={onApplyJob}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {filteredJobs.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-app-border space-y-3">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-deep-ink">No exact jobs matching this filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try resetting your filters or selecting "All Trade Categories" to explore available opportunities.
            </p>
            <button
              onClick={() => { setSelectedTrade('all'); setSelectedWageType('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-midnight text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default FindJobsPage;
