import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Building2, AlertCircle } from 'lucide-react';
import type { Job } from '../../types';

interface JobApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({ job, isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('3-5 Years');
  const [hasTools, setHasTools] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="bg-midnight text-white px-6 py-5 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-teal/30 text-soft-cyan text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-bright-teal" />
              <span>Fair Work Verified Listing</span>
            </div>
            <h3 id="modal-title" className="text-lg font-bold leading-snug">
              {job.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                {job.employer}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {job.city}
              </span>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-deep-ink">Application Submitted (Demo Mode)</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                In Phase 4, your verified Digital Skill Card and biometric profile will instantly be routed to <strong className="text-deep-ink">{job.employer}</strong>.
              </p>
              
              <div className="p-3 bg-mist-blue/50 rounded-xl text-xs text-slate-700 text-left border border-blue-200">
                <span className="font-semibold block text-primary-teal mb-1">What happens next in SAHAYAK?</span>
                • Contractor reviews credentials within 2 hours<br/>
                • Daily rate of <strong className="text-deep-ink">{job.wage}</strong> locked in escrow<br/>
                • SMS / WhatsApp interview ping sent to worker
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full mt-4 py-2.5 px-4 rounded-xl bg-midnight text-white text-sm font-semibold hover:bg-primary-teal transition-colors"
              >
                Close & Explore More Jobs
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Job summary pill */}
              <div className="p-3.5 bg-canvas rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Offered Wage</span>
                  <div className="text-base font-extrabold text-midnight">{job.wage}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Job Type</span>
                  <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {job.wageType} • {job.type}
                  </div>
                </div>
              </div>

              {/* Demo notice */}
              <div className="flex items-start gap-2 p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-800">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  <strong>Demo Mode (Phase 1):</strong> This form demonstrates the direct application flow. No personal data will be transmitted.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Worker Mobile Number (for OTP & WhatsApp)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    pattern="[0-9]{10}"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-r-lg focus:ring-2 focus:ring-bright-teal focus:border-bright-teal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Relevant Work Experience in Trade
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-bright-teal focus:border-bright-teal outline-none bg-white"
                >
                  <option value="1-2 Years">1 - 2 Years (Junior Artisan)</option>
                  <option value="3-5 Years">3 - 5 Years (Skilled Craftsman)</option>
                  <option value="5-8 Years">5 - 8 Years (Senior Master / Ustad)</option>
                  <option value="8+ Years">8+ Years (Site Foreman / Lead)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block">Do you own standard trade tools?</span>
                  <span className="text-slate-500">Multimeter, tool belt, safety boots, etc.</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasTools}
                  onChange={(e) => setHasTools(e.target.checked)}
                  className="w-4 h-4 text-bright-teal rounded focus:ring-bright-teal"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary-teal text-white text-sm font-bold hover:bg-bright-teal transition-colors shadow-sm"
                >
                  Submit 1-Click Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
