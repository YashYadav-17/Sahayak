import React from 'react';
import { PhoneCall, Sparkles } from 'lucide-react';
import type { PageView } from '../../types';

interface FloatingSahayakButtonProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const FloatingSahayakButton: React.FC<FloatingSahayakButtonProps> = ({
  currentPage,
  onNavigate,
}) => {
  if (currentPage === 'sahayak') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
      <button
        type="button"
        id="floating-sahayak-trigger"
        onClick={() => onNavigate('sahayak')}
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-midnight text-white border-2 border-bright-teal/60 shadow-2xl hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-soft-cyan/40"
        aria-label="Open Sahayak Voice & Keypad Help"
      >
        {/* Glow halo */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-teal to-bright-teal opacity-40 blur-sm group-hover:opacity-80 transition-opacity" />

        <div className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-teal to-bright-teal flex items-center justify-center text-white shadow-glow-teal">
            <PhoneCall className="w-4 h-4 animate-pulse" />
          </div>

          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1">
              <span className="text-xs font-black text-white tracking-wide">सहायक / Sahayak Help</span>
              <Sparkles className="w-3 h-3 text-soft-cyan" />
            </div>
            <span className="text-[10px] text-soft-cyan font-mono block">
              Dial 1-9 • Voice • IVR
            </span>
          </div>

          <span className="sm:hidden text-xs font-bold text-soft-cyan">
            मदद / Help
          </span>
        </div>
      </button>
    </div>
  );
};
