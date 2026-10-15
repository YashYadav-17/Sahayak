import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  PlusCircle,
  PhoneCall
} from 'lucide-react';
import { POPULAR_TRADES } from '../../data/trades';
import type { PageView } from '../../types';

interface HireWorkersPageProps {
  onNavigate: (page: PageView) => void;
}

export const HireWorkersPage: React.FC<HireWorkersPageProps> = ({ onNavigate }) => {
  const [selectedTrade, setSelectedTrade] = useState('Electrician & Wireman');
  const [crewSize, setCrewSize] = useState('2');
  const [targetCity, setTargetCity] = useState('Bengaluru');
  const [postSuccess, setPostSuccess] = useState(false);

  // Sample pre-vetted workers
  const candidateWorkers = [
    {
      id: 'w-1',
      name: 'Santosh Yadav',
      trade: 'Senior Wireman & Conduit Specialist',
      experience: '7 Years',
      rating: 4.9,
      reviews: 86,
      city: 'Bengaluru, KA',
      badge: 'ITI Certified',
      rate: '₹1,000 / Day',
      availability: 'Immediate',
    },
    {
      id: 'w-2',
      name: 'Mohammad Rafiq',
      trade: 'TIG / 6G Pipe Welder',
      experience: '9 Years',
      rating: 4.95,
      reviews: 114,
      city: 'Pune, MH',
      badge: 'NSDC Level 5',
      rate: '₹1,200 / Day',
      availability: 'Immediate',
    },
    {
      id: 'w-3',
      name: 'Babu Lal Prajapati',
      trade: 'Master Tile & Italian Marble Craftsman',
      experience: '12 Years',
      rating: 4.88,
      reviews: 62,
      city: 'Ahmedabad, GJ',
      badge: 'Police Verified',
      rate: '₹1,150 / Day',
      availability: 'Within 24 Hours',
    },
  ];

  const handlePostRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    setPostSuccess(true);
  };

  return (
    <div className="min-h-screen bg-canvas py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary-teal transition-colors py-1.5 px-3 rounded-lg bg-white border border-slate-200 shadow-sm"
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
              Employer Hiring Portal
            </span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-midnight text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-white/10">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-soft-cyan">
              Enterprise & Contractor Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Hire Verified Blue-Collar Talent
            </h1>
            <p className="text-sm text-slate-300">
              Deploy pre-screened, certified electricians, plumbers, welders, and artisans in hours. Complete with biometric attendance, escrow safety, and GST compliance.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-bright-teal">
            <ShieldCheck className="w-4 h-4 text-bright-teal shrink-0" />
            <span>Phase 4 Roadmap: Real-time contractor dashboard, automated crew geofencing, and multi-milestone escrow disbursements.</span>
          </div>
        </div>

        {/* Main Grid: Post Requirement Wizard Preview + Pre-vetted Talent List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Quick Requirement Wizard Mockup */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-app-border shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-deep-ink">Post a Quick Requirement</h2>
                <p className="text-xs text-slate-500">Deploy artisans in 3 quick steps (Interactive Demo)</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary-teal/10 text-primary-teal">
                Demo Wizard
              </span>
            </div>

            {postSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Requirement Registered (Demo Mode)</h4>
                <p className="text-xs text-emerald-700">
                  Your request for <strong className="text-emerald-900">{crewSize} {selectedTrade}s</strong> in <strong className="text-emerald-900">{targetCity}</strong> has been matched against our active artisan pool.
                </p>
                <button
                  type="button"
                  onClick={() => setPostSuccess(false)}
                  className="px-4 py-2 rounded-xl bg-midnight text-white text-xs font-bold hover:bg-primary-teal"
                >
                  Create Another Requirement
                </button>
              </div>
            ) : (
              <form onSubmit={handlePostRequirement} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Select Skill / Trade
                  </label>
                  <select
                    value={selectedTrade}
                    onChange={(e) => setSelectedTrade(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-canvas border border-slate-200 rounded-xl focus:ring-2 focus:ring-bright-teal focus:border-bright-teal outline-none"
                  >
                    {POPULAR_TRADES.map((t) => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Workers Needed
                    </label>
                    <select
                      value={crewSize}
                      onChange={(e) => setCrewSize(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-canvas border border-slate-200 rounded-xl focus:ring-2 focus:ring-bright-teal focus:border-bright-teal outline-none"
                    >
                      <option value="1">1 Technician</option>
                      <option value="2">2 - 5 Artisans</option>
                      <option value="6">6 - 15 Crew Members</option>
                      <option value="16">16+ Large Site Deployment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Deployment City
                    </label>
                    <select
                      value={targetCity}
                      onChange={(e) => setTargetCity(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-canvas border border-slate-200 rounded-xl focus:ring-2 focus:ring-bright-teal focus:border-bright-teal outline-none"
                    >
                      <option value="Bengaluru">Bengaluru, KA</option>
                      <option value="Pune">Pune, MH</option>
                      <option value="Ahmedabad">Ahmedabad, GJ</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Hyderabad">Hyderabad, TS</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-canvas rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-deep-ink block">Platform Pricing Benchmark:</span>
                  <div className="flex justify-between">
                    <span>Recommended Daily Rate:</span>
                    <strong className="text-midnight">₹950 - ₹1,200 / Day</strong>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Platform Guarantee:</span>
                    <strong>Zero Middlemen Markup</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  id="post-requirement-submit-btn"
                  className="w-full py-3 px-4 rounded-xl bg-midnight text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-teal transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Submit Requirement (Demo)</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Pre-Vetted Workers Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-deep-ink">Pre-Vetted Artisans Ready for Deployment</h2>
              <span className="text-xs text-slate-500">Live availability status</span>
            </div>

            <div className="space-y-3">
              {candidateWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-white p-5 rounded-2xl border border-app-border hover:border-bright-teal/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-midnight text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {worker.name.split(' ').map((n) => n[0]).join('')}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-deep-ink">{worker.name}</h4>
                        <span className="text-[10px] font-bold text-primary-teal bg-primary-teal/10 px-2 py-0.5 rounded">
                          {worker.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{worker.trade}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span className="flex items-center gap-1 text-amber-600 font-semibold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          {worker.rating} ({worker.reviews})
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {worker.city}
                        </span>
                        <span>•</span>
                        <span>{worker.experience} exp</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <span className="text-xs font-extrabold text-midnight">{worker.rate}</span>
                    <button
                      type="button"
                      onClick={() => alert(`Interview request for ${worker.name} queued in Demo Mode.`)}
                      className="px-3 py-1.5 rounded-lg bg-canvas hover:bg-primary-teal hover:text-white text-deep-ink text-xs font-semibold border border-slate-200 transition-colors"
                    >
                      Request Artisan
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-mist-blue/40 rounded-2xl border border-blue-200 text-xs text-slate-700 flex items-center justify-between">
              <span>Looking to hire a full team of 20+ specialized craftsmen?</span>
              <button
                onClick={() => alert('Corporate dedicated manager contact requested.')}
                className="text-primary-teal font-bold hover:underline shrink-0"
              >
                Contact Enterprise Desk →
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
