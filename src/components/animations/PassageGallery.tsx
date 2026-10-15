import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, X, MapPin, Briefcase, Eye } from 'lucide-react';

export interface PassageItem {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  trade: string;
  city: string;
  description?: string;
}

export interface PassageGalleryProps {
  items: PassageItem[];
  className?: string;
  lanes?: number;
  cruisingSpeed?: number;
  fogColor?: string;
  interactive?: boolean;
  isHeroBackground?: boolean;
  onSelectPhoto?: (item: PassageItem) => void;
}

export const PassageGallery: React.FC<PassageGalleryProps> = ({
  items,
  className = '',
  cruisingSpeed = 0.6,
  interactive = true,
  isHeroBackground = false,
  onSelectPhoto,
}) => {
  const [activeItem, setActiveItem] = useState<PassageItem | null>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let pos = 0;
    const animate = () => {
      if (!isPaused && !activeItem) {
        pos += cruisingSpeed;
        setScrollPos(pos);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isPaused, cruisingSpeed, activeItem]);

  const handleTileClick = (item: PassageItem) => {
    if (!interactive || isHeroBackground) return;
    setActiveItem(item);
    onSelectPhoto?.(item);
  };

  return (
    <div className={`relative overflow-hidden select-none ${isHeroBackground ? 'absolute inset-0 w-full h-full pointer-events-none' : 'bg-midnight rounded-3xl border border-white/10 shadow-2xl'} ${className}`}>
      
      {/* Perspective Tunnel Stage */}
      <div 
        onMouseEnter={() => !isHeroBackground && setIsPaused(true)}
        onMouseLeave={() => !isHeroBackground && setIsPaused(false)}
        className={`relative w-full overflow-hidden flex items-center justify-center [perspective:1000px] ${isHeroBackground ? 'h-full min-h-[640px]' : 'h-[480px]'}`}
      >
        {/* Deep Atmosphere & Fog Vignette */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-midnight via-transparent to-midnight" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-midnight/80 via-transparent to-midnight" />
        
        {/* Subtle grid lines converging to vanishing point */}
        <div className="absolute inset-0 opacity-20 pointer-events-none grid-pattern-overlay" />

        {/* 3D Moving Tunnel of Real Skilled Artisan Photos */}
        <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {items.map((item, index) => {
            // Infinite cyclic position based on scrollPos
            const total = items.length;
            const cycle = (index * 140 - (scrollPos % (total * 140)) + total * 140) % (total * 140);
            const zDistance = 500 - cycle; // Moves toward viewer from distance
            const opacity = Math.max(0, Math.min(1, (zDistance + 200) / 400)) * (zDistance > 450 ? (550 - zDistance) / 100 : 1);
            
            // Alternating wall placement (left wall, right wall, top, bottom)
            const lane = index % 4;
            let translateX = 0;
            let translateY = 0;
            let rotateY = 0;
            let rotateX = 0;

            if (lane === 0) {
              translateX = -280;
              rotateY = 32;
            } else if (lane === 1) {
              translateX = 280;
              rotateY = -32;
            } else if (lane === 2) {
              translateY = -150;
              translateX = -120;
              rotateX = -20;
            } else {
              translateY = 150;
              translateX = 120;
              rotateX = 20;
            }

            if (zDistance < -250 || zDistance > 550) return null;

            return (
              <div
                key={item.id}
                onClick={() => handleTileClick(item)}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, ${zDistance}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                  opacity: Math.max(0.1, opacity),
                  zIndex: Math.floor(zDistance),
                }}
                className="absolute w-56 sm:w-64 h-40 sm:h-44 rounded-2xl overflow-hidden cursor-pointer group border border-white/20 shadow-2xl transition-transform duration-300 hover:scale-105 hover:border-bright-teal"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-105"
                  loading="lazy"
                />
                
                {/* Overlay card info */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent p-3 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold text-soft-cyan tracking-wider uppercase">
                    {item.trade}
                  </span>
                  <h4 className="text-xs font-bold truncate group-hover:text-bright-teal transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-300 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-primary-teal" />
                    <span>{item.city}</span>
                  </div>
                </div>

                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-midnight/80 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3 h-3 text-soft-cyan" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Overlay Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-xs font-semibold text-soft-cyan border border-white/10 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-bright-teal animate-spin" />
            <span>Passage Gallery: Hover to pause • Click any artisan photo to inspect</span>
          </div>
        </div>

      </div>

      {/* Interactive Click-to-Focus Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/85 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-xl w-full bg-deep-ink border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-white">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-midnight/80 hover:bg-white/20 text-white transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 w-full overflow-hidden">
              <img
                src={activeItem.url}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-ink via-transparent to-transparent" />
            </div>

            <div className="p-6 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-teal/30 text-soft-cyan text-xs font-bold border border-bright-teal/40">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{activeItem.trade}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {activeItem.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeItem.description || activeItem.subtitle}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-bright-teal" />
                  {activeItem.city}
                </span>
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-1.5 rounded-xl bg-bright-teal text-midnight font-bold text-xs hover:bg-soft-cyan transition-colors"
                >
                  Return to Tunnel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PassageGallery;
