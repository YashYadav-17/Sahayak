import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Users, 
  Flame, 
  ArrowRight
} from 'lucide-react';
import type { Job } from '../../types';

export interface PrismCarouselProps {
  jobs: Job[];
  onApplyJob: (job: Job) => void;
  startIndex?: number;
  neighborScale?: number;
  sweepDuration?: number;
  autoplay?: boolean;
  interval?: number;
  className?: string;
}

export const PrismCarousel: React.FC<PrismCarouselProps> = ({
  jobs,
  onApplyJob,
  startIndex = 0,
  neighborScale = 0.85,
  sweepDuration = 1.1,
  autoplay = false,
  interval = 4.5,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const total = jobs.length;

  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, interval * 1000);
    return () => clearInterval(timer);
  }, [autoplay, isHovered, total, interval]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Prism Coverflow Job Carousel"
      className={`relative select-none overflow-hidden py-10 outline-none ${className}`}
    >
      {/* 3D Coverflow Container */}
      <div className="relative h-[440px] sm:h-[460px] w-full max-w-6xl mx-auto flex items-center justify-center [perspective:1200px]">
        {jobs.map((job, index) => {
          // Calculate offset relative to active card
          let offset = index - currentIndex;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isActive = offset === 0;
          const isImmediateNeighbor = Math.abs(offset) === 1;

          if (Math.abs(offset) > 2) return null; // Only render visible coverflow neighborhood

          const translateX = offset * 280; // Distance spacing
          const scale = isActive ? 1 : isImmediateNeighbor ? neighborScale : neighborScale * 0.85;
          const rotateY = offset * -24; // Coverflow card tilt
          const zIndex = 20 - Math.abs(offset) * 5;
          const opacity = isActive ? 1 : isImmediateNeighbor ? 0.82 : 0.45;
          const saturation = isActive ? 'saturate(1)' : 'saturate(0.4)';

          return (
            <div
              key={job.id}
              onClick={() => setCurrentIndex(index)}
              style={{
                transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
                filter: saturation,
                transition: 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1), opacity 400ms ease, filter 400ms ease',
              }}
              className={`absolute w-[320px] sm:w-[380px] rounded-3xl cursor-pointer ${
                isActive
                  ? 'ring-2 ring-bright-teal shadow-2xl'
                  : 'hover:ring-1 hover:ring-white/40'
              }`}
            >
              {/* Card Container */}
              <div className="relative rounded-3xl bg-midnight text-white p-6 sm:p-7 border border-white/15 overflow-hidden flex flex-col justify-between h-[390px] sm:h-[410px]">
                
                {/* Spectral Color Sweep Effect on Arrival (Prism Effect) */}
                {isActive && (
                  <div
                    style={{ animationDuration: `${sweepDuration}s` }}
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-soft-cyan/25 to-transparent -translate-x-full animate-shimmer"
                  />
                )}

                {/* Subtle Card Glow Aura */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary-teal/20 blur-[70px] pointer-events-none rounded-full" />

                {/* Top Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-teal/30 text-soft-cyan border border-bright-teal/40">
                      {job.trade}
                    </span>

                    {job.urgent && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                        <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        Urgent Hire
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white leading-snug line-clamp-2">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
                    <span className="font-semibold">{job.employer}</span>
                    {job.employerVerified && (
                      <CheckCircle2 className="w-4 h-4 text-bright-teal shrink-0" />
                    )}
                  </div>
                </div>

                {/* Mid Details Pill */}
                <div className="relative z-10 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-bright-teal" />
                      <span className="truncate max-w-[140px]">{job.city}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.postedAt}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1 border-t border-white/10">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Guaranteed Remuneration
                      </span>
                      <span className="text-base sm:text-lg font-black text-soft-cyan">
                        {job.wage}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                      {job.wageType}
                    </span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="relative z-10 flex flex-wrap gap-1.5">
                  {job.skillsRequired.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-white/10 text-slate-200 px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skillsRequired.length > 3 && (
                    <span className="text-[10px] text-slate-400 py-0.5">
                      +{job.skillsRequired.length - 3}
                    </span>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong className="text-white">{job.openings}</strong> positions</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onApplyJob(job);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-teal to-bright-teal text-white text-xs font-bold shadow-glow-teal hover:opacity-95 active:scale-95 transition-all"
                  >
                    <span>Quick Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls & Position Dots */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={handlePrev}
          type="button"
          aria-label="Previous job slide"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-bright-teal text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {jobs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-bright-teal' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          type="button"
          aria-label="Next job slide"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-bright-teal text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Touch & Keyboard Hint */}
      <p className="text-center text-xs text-slate-400 mt-3 font-medium">
        Use arrow keys, swipe, or click adjacent cards to glide across verified opportunities
      </p>

    </div>
  );
};

export default PrismCarousel;
