import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Star, 
  Building2, 
  Download,
  AlertCircle,
  PhoneCall
} from 'lucide-react';
import type { PageView } from '../../types';
import { FrameBorder } from '../animations/FrameBorder';

interface ProfilePageProps {
  onNavigate: (page: PageView) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [activeRole, setActiveRole] = useState<'worker' | 'contractor'>('worker');

  return (
    <div className="min-h-screen bg-canvas py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary-teal transition-colors py-1.5 px-3 rounded-lg bg-white border border-slate-200 shadow-sm cursor-pointer"
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
              Digital Identity Pass
            </span>
          </div>
        </div>

        {/* Header Profile Switcher */}
        <div className="bg-midnight text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-soft-cyan">
              Digital Identity & Portfolio
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              SAHAYAK Digital Skill Pass
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Your portable verified identity across India with integrated skill credentials, direct bank payout history, and work references.
            </p>
          </div>

          <div className="inline-flex p-1.5 rounded-2xl bg-white/10 border border-white/15">
            <button
              onClick={() => setActiveRole('worker')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeRole === 'worker'
                  ? 'bg-primary-teal text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Artisan Profile
            </button>
            <button
              onClick={() => setActiveRole('contractor')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeRole === 'contractor'
                  ? 'bg-primary-teal text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Employer Profile
            </button>
          </div>
        </div>

        {/* Role Content */}
        {activeRole === 'worker' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Card: Worker Digital Badge wrapped in FrameBorder */}
            <div className="lg:col-span-5">
              <FrameBorder lineWidth={2} radius={24} borderColor="#14B8A6" glow={1.2}>
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-app-border shadow-sm space-y-6 h-full">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-midnight text-white flex items-center justify-center font-display font-black text-2xl shadow-glow-teal border border-bright-teal/30">
                      RK
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-xl font-bold text-deep-ink">Ramesh Kumar</h2>
                        <ShieldCheck className="w-5 h-5 text-bright-teal" />
                      </div>
                      <p className="text-xs text-primary-teal font-semibold">Senior Industrial Wireman</p>
                      <p className="text-xs text-slate-500">Member since Feb 2024 • UID: SHK-88429</p>
                    </div>
                  </div>

                  {/* Status List */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-canvas">
                      <span className="text-slate-600 font-medium">Aadhaar Biometric KYC</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Verified ✓
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-canvas">
                      <span className="text-slate-600 font-medium">ITI Wireman Trade Certificate</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        NSDC Cleared ✓
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-canvas">
                      <span className="text-slate-600 font-medium">Local Police Clearance Certificate</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Verified Clean ✓
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-midnight text-white space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Total Escrow Disbursed</span>
                      <span className="font-mono text-soft-cyan">Direct UPI Linked</span>
                    </div>
                    <div className="text-2xl font-black text-white">₹38,400.00</div>
                    <span className="text-[11px] text-emerald-400 block">
                      100% of earnings paid with 0% platform deductions
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert('Digital Skill Pass PDF download simulated for demonstration.')}
                    className="w-full py-3 rounded-xl bg-canvas hover:bg-slate-100 text-deep-ink text-xs font-bold border border-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-primary-teal" />
                    <span>Download Verified Skill Pass (PDF)</span>
                  </button>
                </div>
              </FrameBorder>
            </div>

            {/* Right Card: Work History & Endorsements */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-app-border shadow-sm space-y-5">
                <h3 className="text-lg font-bold text-deep-ink">Completed Work History (Verified Escrow)</h3>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-deep-ink">L&T Infra Bengaluru Metro Substation</h4>
                      <span className="text-xs font-extrabold text-midnight">₹18,400</span>
                    </div>
                    <p className="text-xs text-slate-600">LT Cable tray laying, termination, and panel earthing testing.</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                      <span>16 Days Deployed</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">Payment Disbursed on Time</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Star className="w-3 h-3 fill-amber-500" /> 5.0
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-canvas border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-deep-ink">Prestige Tech Park Office Fit-out</h4>
                      <span className="text-xs font-extrabold text-midnight">₹12,000</span>
                    </div>
                    <p className="text-xs text-slate-600">Precision architectural lighting conduit wiring and testing.</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                      <span>10 Days Deployed</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">Payment Disbursed on Time</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Star className="w-3 h-3 fill-amber-500" /> 4.9
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Phase 1 Foundation Note:</strong> This profile screen serves as an illustrative demo. Live biometric authentication, real-time OTP logins, and dynamic worker profiles will be implemented in Phase 4.
                </span>
              </div>

            </div>

          </div>
        ) : (
          /* Contractor Profile */
          <div className="bg-white p-8 rounded-3xl border border-app-border shadow-sm space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-midnight text-soft-cyan flex items-center justify-center font-bold text-xl">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-deep-ink">Apex Engineering & Infra Corp</h2>
                <p className="text-xs text-primary-teal font-semibold">GSTIN: 29AAACA1234B1Z5 • Verified Contractor</p>
                <p className="text-xs text-slate-500">Operating in Bengaluru, Pune & Ahmedabad</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-canvas rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Workers Deployed</span>
                <span className="text-xl font-black text-midnight">32 Craftsmen</span>
              </div>
              <div className="p-4 bg-canvas rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Active Sites</span>
                <span className="text-xl font-black text-primary-teal">4 Projects</span>
              </div>
              <div className="p-4 bg-canvas rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Fair Wage Score</span>
                <span className="text-xl font-black text-emerald-600">100% Grade A</span>
              </div>
            </div>

            <div className="p-4 bg-mist-blue/50 rounded-xl text-xs text-slate-700">
              Live contractor compliance management, bulk biometric check-ins, and escrow ledger integrations are scheduled for Phase 4.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
