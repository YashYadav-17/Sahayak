import React from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Users, 
  UtensilsCrossed, 
  Flame, 
  ArrowRight 
} from 'lucide-react';
import type { Job } from '../../types';
import { Badge } from '../common/Badge';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onViewDetails?: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onViewDetails }) => {
  return (
    <article className="group bg-white rounded-2xl p-6 border border-app-border transition-all duration-300 hover:shadow-card-hover hover:border-bright-teal/40 flex flex-col justify-between">
      <div>
        {/* Top bar: Trade badge, urgency, posted time */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="teal">{job.trade}</Badge>
            {job.urgent && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-amber-600 animate-pulse" />
                Urgent Hire
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {job.postedAt}
          </span>
        </div>

        {/* Job Title & Employer */}
        <h3 
          onClick={() => onViewDetails?.(job)}
          className="text-lg font-bold text-deep-ink group-hover:text-primary-teal transition-colors cursor-pointer line-clamp-1"
        >
          {job.title}
        </h3>

        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600 font-medium">
          <span>{job.employer}</span>
          {job.employerVerified && (
            <span className="inline-flex items-center text-primary-teal" title="Verified Employer">
              <CheckCircle2 className="w-3.5 h-3.5 fill-bright-teal/15 text-primary-teal" />
            </span>
          )}
        </div>

        {/* Location & Wage Row */}
        <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-canvas rounded-xl border border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
              Location
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-primary-teal shrink-0" />
              <span className="truncate">{job.city}</span>
            </div>
            <span className="text-[11px] text-slate-500 block truncate">{job.location}</span>
          </div>

          <div className="border-l border-slate-200/60 pl-3">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
              Wage / Remuneration
            </span>
            <div className="text-sm font-extrabold text-midnight mt-0.5">
              {job.wage}
            </div>
            <span className="text-[11px] font-medium text-emerald-700 block">
              {job.wageType}
            </span>
          </div>
        </div>

        {/* Key Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skillsRequired.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.skillsRequired.length > 3 && (
            <span className="text-[11px] font-medium text-slate-400 px-1 py-0.5">
              +{job.skillsRequired.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer bar with perks, vacancies & CTA */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1" title={`${job.openings} positions available`}>
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <strong className="text-slate-700 font-semibold">{job.openings}</strong> open
          </span>

          {job.foodAccomodation && (
            <span className="inline-flex items-center gap-1 text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-[11px] font-medium" title="Food & Stay Provided">
              <UtensilsCrossed className="w-3 h-3 text-primary-teal" />
              Stay/Food
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onApply(job)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-midnight text-white text-xs font-semibold hover:bg-primary-teal transition-all duration-200 shadow-sm group/btn"
        >
          <span>Quick Apply</span>
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
};
