import React, { useRef, useEffect, useState } from 'react';

export interface VaporTypeProps {
  text: string;
  hindiSubtitle?: string;
  tagline?: string;
  className?: string;
  color?: string;
  glowColor?: string;
  particleDensity?: number;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  color: string;
}

export const VaporType: React.FC<VaporTypeProps> = ({
  text,
  hindiSubtitle,
  tagline,
  className = '',
  color = '#FFFFFF',
  glowColor = '#14B8A6',
  particleDensity = 60,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCondensed(true);
      onComplete?.();
      return;
    }

    let animationId: number;
    let particles: Particle[] = [];
    let progress = 0;

    const init = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width || 600;
      const h = Math.min(rect.height || 160, 200);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      // Render temporary offscreen text to sample points
      const offCanvas = document.createElement('canvas');
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      const fontSize = Math.max(Math.min(w * 0.16, 76), 36);
      offCtx.font = `900 ${fontSize}px "Outfit", sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillStyle = '#FFFFFF';
      offCtx.fillText(text, w / 2, h / 2);

      const imgData = offCtx.getImageData(0, 0, w, h);
      const data = imgData.data;
      particles = [];

      const step = Math.max(Math.floor(100 / particleDensity) * 3, 4);

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const index = (y * w + x) * 4;
          if (data[index + 3] > 140) {
            // Scattered starting vapor position
            const angle = Math.random() * Math.PI * 2;
            const dist = 60 + Math.random() * 120;
            const scatterX = x + Math.cos(angle) * dist;
            const scatterY = y + Math.sin(angle) * dist;

            const rand = Math.random();
            const particleColor = rand > 0.6 ? color : rand > 0.3 ? glowColor : '#67E8F9';

            particles.push({
              x: scatterX,
              y: scatterY,
              originX: x,
              originY: y,
              vx: (Math.random() - 0.5) * 0.8,
              vy: (Math.random() - 0.5) * 0.8,
              size: 1.5 + Math.random() * 2.5,
              alpha: 0,
              targetAlpha: 0.6 + Math.random() * 0.4,
              color: particleColor,
            });
          }
        }
      }
    };

    init();

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = Math.min(rect.height || 160, 200);

      ctx.clearRect(0, 0, w, h);

      progress += 0.014;
      const ease = Math.min(1, Math.sin((progress * Math.PI) / 2));

      particles.forEach((p) => {
        // Vapor condensation motion toward target letter coordinates
        p.x = p.x + (p.originX - p.x) * 0.08 + (Math.sin(progress * 4 + p.originY) * 0.4 * (1 - ease));
        p.y = p.y + (p.originY - p.y) * 0.08 + (Math.cos(progress * 4 + p.originX) * 0.4 * (1 - ease));
        p.alpha = Math.min(p.targetAlpha, p.alpha + 0.025);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - ease * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (1 - ease * 0.85); // Vapor fades as crisp text solidifies
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      if (progress >= 1 && !condensed) {
        setCondensed(true);
        onComplete?.();
      }

      if (progress < 1.35) {
        animationId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };

    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [text, glowColor, particleDensity, condensed, onComplete]);

  return (
    <div ref={containerRef} className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Canvas for condensing vapor particles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10 w-full h-full"
      />

      {/* Solid text reveal with smooth transition */}
      <div className="relative z-0 text-center">
        <h1
          className={`font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-soft-cyan to-bright-teal transition-all duration-1000 ${
            condensed ? 'opacity-100 filter-none scale-100' : 'opacity-0 blur-sm scale-95'
          }`}
          style={{ textShadow: condensed ? `0 0 35px ${glowColor}66` : 'none' }}
        >
          {text}
          {hindiSubtitle && (
            <span className="ml-2 sm:ml-4 font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl text-soft-cyan/90 align-middle">
              {hindiSubtitle}
            </span>
          )}
        </h1>

        {tagline && (
          <p
            className={`mt-4 font-display text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-soft-cyan via-bright-teal to-white transition-all duration-1000 delay-300 ${
              condensed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
};

export default VaporType;
