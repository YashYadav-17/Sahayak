import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Globe 
} from 'lucide-react';
import type { PageView } from '../../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-midnight text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column (2 cols wide on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 cursor-pointer inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-teal to-bright-teal p-0.5 shadow-glow-teal">
                <div className="w-full h-full bg-midnight rounded-[10px] flex items-center justify-center font-display font-black text-xl text-soft-cyan">
                  S
                </div>
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-wider text-white">
                  SAHAYAK
                </span>
                <span className="text-[10px] text-slate-400 block -mt-0.5">
                  Where Skills Meet Opportunity
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              SAHAYAK is India's dedicated platform elevating skilled blue-collar professionals through digital skill cards, verified fair-wage contracts, and direct escrow security.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-bright-teal" />
                <span>Fair Work Certified</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                <Globe className="w-3.5 h-3.5 text-soft-cyan" />
                <span>Pan-India Presence</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-soft-cyan">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home (मुख्य पृष्ठ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-jobs')}
                  className="hover:text-white transition-colors"
                >
                  Find Jobs (काम खोजें)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hire-workers')}
                  className="hover:text-white transition-colors"
                >
                  Hire Workers (कारीगर hire करें)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-white transition-colors"
                >
                  My Profile & Skill Card
                </button>
              </li>
            </ul>
          </div>

          {/* Key Trades */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-soft-cyan">
              Popular Trades
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('find-jobs')}
                  className="hover:text-white transition-colors"
                >
                  Electrician & Wireman
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-jobs')}
                  className="hover:text-white transition-colors"
                >
                  Plumber & Pipefitter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-jobs')}
                  className="hover:text-white transition-colors"
                >
                  Carpenter & Wood Artisan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-jobs')}
                  className="hover:text-white transition-colors"
                >
                  Welder & Fabricator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-jobs')}
                  className="hover:text-white transition-colors"
                >
                  Solar Panel Technician
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-soft-cyan">
              Worker Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-bright-teal shrink-0" />
                <span>1800-200-SAHAYAK (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp Sahayak: +91 98200 12345</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-soft-cyan shrink-0 mt-0.5" />
                <span>Operational in 120+ Industrial & Urban hubs across India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} SAHAYAK Technologies India Pvt. Ltd.</span>
            <span>•</span>
            <span className="text-slate-400">All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>for Bharat's skilled workforce.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Fair Work Terms</span>
            <span className="hover:text-white cursor-pointer">Safety Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
