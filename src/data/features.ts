export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
}

export const WORKER_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Create Your Digital Skill Card',
    description: 'Set up your profile in under 2 minutes in your regional language. Upload trade certificates or record a simple voice skill intro.',
    icon: 'UserCheck',
    badge: 'Quick Setup',
  },
  {
    step: '02',
    title: 'Direct Matching With Fair Wages',
    description: 'Receive verified job offers matching your exact trade, preferred city, and wage expectations. Zero middlemen or commission deductions.',
    icon: 'SlidersHorizontal',
    badge: 'No Middlemen',
  },
  {
    step: '03',
    title: 'Work Safely with Verified Employers',
    description: 'Every site is pre-vetted for safety gear, sanitation, and work conditions with a Fair Work check guarantee.',
    icon: 'ShieldCheck',
    badge: 'Safety First',
  },
  {
    step: '04',
    title: 'Guaranteed On-Time UPI Payouts',
    description: 'Wages are held in protected escrow and transferred directly to your bank account or UPI ID daily or on milestone sign-offs.',
    icon: 'Banknote',
    badge: 'Instant Transfer',
  },
];

export const EMPLOYER_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Post Requirements in Seconds',
    description: 'Specify trade, number of technicians required, work location, and proposed daily/monthly wages with transparent rate recommendations.',
    icon: 'FilePlus2',
    badge: 'Fast Posting',
  },
  {
    step: '02',
    title: 'Access Pre-Vetted Skilled Talent',
    description: 'Instantly view verified artisans with verified Aadhaar/police clearance, skill badges, and past project ratings.',
    icon: 'Users',
    badge: 'Verified Workers',
  },
  {
    step: '03',
    title: 'Biometric Attendance & Milestones',
    description: 'Track daily crew check-ins and job milestones through simple QR attendance without manual paperwork chaos.',
    icon: 'QrCode',
    badge: 'Smart Tracking',
  },
  {
    step: '04',
    title: 'Seamless Digital Compliance & Payout',
    description: 'Automated invoices, GST/labor law compliance checks, and single-click escrow disbursement directly to your workforce.',
    icon: 'BadgeCheck',
    badge: '100% Compliant',
  },
];

export const TRUST_PILLARS = [
  {
    id: 'fair-wage',
    title: 'Fair Wage Guarantee',
    description: 'Every job on SAHAYAK enforces standard minimum market floor wages or above. No exploitation, undercutting, or arbitrary payment cuts.',
    badge: 'Protected Pay',
    icon: 'Scale',
  },
  {
    id: 'identity-verification',
    title: 'Aadhaar & Police Vetted',
    description: 'Dual-sided verification for both workers and employers ensuring complete security, reliable identity, and trustworthy work environments.',
    badge: '100% Verified',
    icon: 'ShieldCheck',
  },
  {
    id: 'escrow-security',
    title: 'Escrow Protected Payments',
    description: 'Funds are securely deposited before work starts. Workers are guaranteed payout upon task verification, backed by dispute resolution.',
    badge: 'Escrow Safe',
    icon: 'Lock',
  },
  {
    id: 'insurance-safety',
    title: 'Accident Cover & PPE Compliance',
    description: 'On-site insurance coverage integration and mandatory Personal Protective Equipment protocols for every hazardous site assignment.',
    badge: 'Safety Insured',
    icon: 'HardHat',
  },
];

export const EMPOWERMENT_POINTS = [
  {
    title: 'Dignity of Labor & Verified Reputation',
    description: 'Transforming informal day-labor into a respected digital professional identity with portable, transparent client reviews.',
    stat: '98.4%',
    statLabel: 'Worker Satisfaction Rate',
  },
  {
    title: 'Skill India & ITI Certificate Integration',
    description: 'Government certified skill endorsements (NSDC, PMKVY, ITI) are showcased prominently to unlock top-tier commercial rates.',
    stat: '+35%',
    statLabel: 'Higher Average Earnings',
  },
  {
    title: 'Vernacular & Voice-First Usability',
    description: 'Engineered for simplicity with Indian regional languages (Hindi, Tamil, Bengali, Telugu, Marathi, Gujarati) and voice commands.',
    stat: '8+',
    statLabel: 'Indian Languages Supported',
  },
  {
    title: 'Direct Digital Credit & Benefits History',
    description: 'Verified work records help artisans secure formal credit, micro-loans, tool financing, and government worker welfare schemes.',
    stat: '₹4.8 Cr+',
    statLabel: 'Wages Disbursed Directly',
  },
];
