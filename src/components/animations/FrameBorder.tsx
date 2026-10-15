import React, { useRef, useEffect, useState } from 'react';

export interface FrameBorderProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  lineWidth?: number;
  glow?: number;
  glowWidth?: number;
  flowSpeed?: number;
  interactive?: boolean;
  borderColor?: string;
  glowColor?: string;
  paused?: boolean;
}

export const FrameBorder: React.FC<FrameBorderProps> = ({
  children,
  className = '',
  radius = 16,
  lineWidth = 1.5,
  glow = 1,
  glowWidth = 24,
  flowSpeed = 1,
  interactive = true,
  borderColor = '#14B8A6',
  glowColor = 'rgba(20, 184, 166, 0.45)',
  paused = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const render = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      if (w <= 0 || h <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Draw subtle base rounded border
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(lineWidth / 2, lineWidth / 2, w - lineWidth, h - lineWidth, radius);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      if (!prefersReducedMotion && !paused) {
        offset += (isHovered ? flowSpeed * 1.8 : flowSpeed) * 0.008;

        // Traveling gradient glow segment
        const perimeter = 2 * (w + h - 2 * radius) + 2 * Math.PI * radius;
        const dashLength = perimeter * 0.28;
        const currentDashOffset = (offset * perimeter) % perimeter;

        // Inward Glow
        if (glow > 0) {
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = (glowWidth * (isHovered ? 1.4 : 1)) + (pulse * 15);
        }

        ctx.strokeStyle = borderColor;
        ctx.lineWidth = lineWidth * (isHovered ? 1.5 : 1.2);
        ctx.setLineDash([dashLength, perimeter - dashLength]);
        ctx.lineDashOffset = -currentDashOffset;
        ctx.stroke();
      }

      ctx.restore();

      if (pulse > 0) {
        setPulse((prev) => Math.max(0, prev - 0.05));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [radius, lineWidth, glow, glowWidth, flowSpeed, isHovered, paused, borderColor, glowColor, pulse]);

  const handleClick = () => {
    if (interactive) {
      setPulse(1);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      className={`relative rounded-[${radius}px] overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20 w-full h-full"
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default FrameBorder;
