import React from 'react';
import { 
  Zap, 
  Wrench, 
  Hammer, 
  Flame, 
  Layers, 
  Paintbrush, 
  SunMedium, 
  Fan, 
  ArrowUpRight, 
  TrendingUp 
} from 'lucide-react';
import type { Trade } from '../../types';

interface TradeCardProps {
  trade: Trade;
  onSelect?: (trade: Trade) => void;
}

export const TradeCard: React.FC<TradeCardProps> = ({ trade, onSelect }) => {
  const getIcon = (name: string) => {
    const iconClass = "w-5 h-5 text-primary-teal group-hover:text-bright-teal transition-colors";
    switch (name) {
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'Wrench':
        return <Wrench className={iconClass} />;
      case 'Hammer':
        return <Hammer className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Paintbrush':
        return <Paintbrush className={iconClass} />;
      case 'SunMedium':
        return <SunMedium className={iconClass} />;
      case 'Fan':
        return <Fan className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  return (
    <div
      onClick={() => onSelect?.(trade)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect?.(trade);
        }
      }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 transition-all duration-300 hover:shadow-card-hover hover:border-bright-teal/60 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between focus:ring-2 focus:ring-bright-teal focus:outline-none"
    >
      <div>
        {/* Optional Editorial Photo Header with smooth hover zoom */}
        {trade.imageUrl ? (
          <div className="relative h-36 w-full overflow-hidden bg-slate-100">
            <img
              src={trade.imageUrl}
              alt={trade.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
              <div className="w-8 h-8 rounded-lg bg-midnight/80 backdrop-blur-sm flex items-center justify-center border border-white/20">
                {getIcon(trade.iconName)}
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-emerald-500/30">
                <TrendingUp className="w-3 h-3" />
                {trade.growth}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-6 pb-0 flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-mist-blue/70 flex items-center justify-center group-hover:bg-primary-teal/10 transition-colors">
              {getIcon(trade.iconName)}
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3" />
              {trade.growth}
            </span>
          </div>
        )}

        <div className="p-5">
          <h3 className="text-base font-bold text-deep-ink group-hover:text-primary-teal transition-colors flex items-center justify-between">
            <span>{trade.name}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200" />
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-0.5">{trade.hindiName}</p>
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {trade.description}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
              Avg Market Rate
            </span>
            <span className="text-sm font-bold text-deep-ink">
              {trade.averageWage}
              <span className="text-xs font-normal text-slate-500">/{trade.wagePeriod}</span>
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
              Openings
            </span>
            <span className="text-xs font-bold text-primary-teal bg-primary-teal/10 px-2 py-0.5 rounded-md">
              {trade.activeJobs.toLocaleString()} active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeCard;
