export type PageView = 'home' | 'find-jobs' | 'hire-workers' | 'profile' | 'sahayak';
export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface Trade {
  id: string;
  name: string;
  hindiName: string;
  iconName: string;
  activeJobs: number;
  averageWage: string;
  wagePeriod: 'day' | 'month';
  growth: string;
  category: 'electrical' | 'plumbing' | 'construction' | 'carpentry' | 'welding' | 'finishing' | 'renewable';
  description: string;
  imageUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  trade: string;
  employer: string;
  employerVerified: boolean;
  location: string;
  city: string;
  wage: string;
  wageType: 'Per Day' | 'Per Month' | 'Contract';
  type: 'Full-time' | 'Contract' | 'Daily Wage' | 'Urgent';
  postedAt: string;
  urgent?: boolean;
  skillsRequired: string[];
  openings: number;
  foodAccomodation?: boolean;
  description: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  iconName: string;
  badgeText: string;
}

export interface TrustPillar {
  title: string;
  description: string;
  iconName: string;
  tag: string;
}
