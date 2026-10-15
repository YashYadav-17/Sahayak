import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { POPULAR_TRADES } from '../../data/trades';
import { TradeCard } from '../cards/TradeCard';
import { SectionHeading } from '../common/SectionHeading';
import type { Trade, PageView } from '../../types';

interface PopularTradesProps {
  onSelectTrade: (trade: Trade) => void;
  onNavigate: (page: PageView) => void;
}

export const PopularTrades: React.FC<PopularTradesProps> = ({ onSelectTrade, onNavigate }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Trades (सभी हुनर)' },
    { id: 'electrical', label: 'Electrical & AC' },
    { id: 'plumbing', label: 'Plumbing' },
    { id: 'carpentry', label: 'Carpentry & Interiors' },
    { id: 'welding', label: 'Welding & Steel' },
    { id: 'construction', label: 'Civil & Masonry' },
    { id: 'renewable', label: 'Solar & Green Energy' },
  ];

  const filteredTrades = filter === 'all'
    ? POPULAR_TRADES
    : POPULAR_TRADES.filter((t) => t.category === filter || (filter === 'electrical' && t.id === 'hvac'));

  const handleCardClick = (trade: Trade) => {
    onSelectTrade(trade);
    onNavigate('find-jobs');
  };

  return (
    <section id="popular-trades-section" className="py-20 md:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="High-Demand Trades"
          title="Popular Skilled"
          highlightedText="Trades in India"
          subtitle="Explore India's most sought-after blue-collar specializations with transparent market day-rates and daily verified job demands."
        />

        {/* Filter Pills */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                filter === cat.id
                  ? 'bg-midnight text-white shadow-sm'
                  : 'bg-canvas text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Trades Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTrades.map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              onSelect={handleCardClick}
            />
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => onNavigate('find-jobs')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-canvas hover:bg-slate-100 text-deep-ink font-bold text-sm border border-slate-300 transition-all hover:scale-[1.01] shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-primary-teal" />
            <span>Looking for another skill? View All 35+ Trade Categories</span>
            <ArrowRight className="w-4 h-4 text-primary-teal" />
          </button>
        </div>

      </div>
    </section>
  );
};
