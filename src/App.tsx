import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { HandshakeStory } from './components/home/HandshakeStory';
import { HowItWorks } from './components/home/HowItWorks';
import { PopularTrades } from './components/home/PopularTrades';
import { ArtisanPassage } from './components/home/ArtisanPassage';
import { FeaturedJobs } from './components/home/FeaturedJobs';
import { TrustSafety } from './components/home/TrustSafety';
import { WorkerEmpowerment } from './components/home/WorkerEmpowerment';
import { CTASection } from './components/home/CTASection';
import { Footer } from './components/layout/Footer';
import { JobApplyModal } from './components/common/JobApplyModal';
import { SahayakAssistant } from './components/sahayak/SahayakAssistant';
import { FloatingSahayakButton } from './components/sahayak/FloatingSahayakButton';
import { LanguageProvider } from './context/LanguageContext';

import { FindJobsPage } from './components/placeholders/FindJobsPage';
import { HireWorkersPage } from './components/placeholders/HireWorkersPage';
import { ProfilePage } from './components/placeholders/ProfilePage';

import type { PageView, Job, Trade } from './types';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedTradeFilter, setSelectedTradeFilter] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTrade = (trade: Trade) => {
    setSelectedTradeFilter(trade.name);
    setCurrentPage('find-jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApplyModal = (job: Job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleCloseApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  const handleHeroSearch = (trade: string, _city: string) => {
    setSelectedTradeFilter(trade === 'All Trades' ? 'all' : trade);
    setCurrentPage('find-jobs');
  };

  const handleAssistantSelectTrade = (tradeCategory: string) => {
    setSelectedTradeFilter(tradeCategory);
    setCurrentPage('find-jobs');
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-deep-ink font-sans selection:bg-bright-teal selection:text-white relative">
      {/* Top Universal Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* Section 1: Hero with Moving Passage Gallery Background & Centered Vapor Type */}
            <Hero 
              onNavigate={handleNavigate}
              onSearch={handleHeroSearch}
            />

            {/* Section 1.5: The Handshake of Dignity (Connecting Hands Spotlight with Frame Border) */}
            <HandshakeStory 
              onNavigate={handleNavigate}
            />

            {/* Section 2: How SAHAYAK Works (Clean Light) */}
            <HowItWorks 
              onNavigate={handleNavigate}
            />

            {/* Section 3: Popular Trades (Editorial Light) */}
            <PopularTrades 
              onSelectTrade={handleSelectTrade}
              onNavigate={handleNavigate}
            />

            {/* Section 3.5: The Artisan Passage (Passage Gallery 3D Photo Tunnel) */}
            <ArtisanPassage />

            {/* Section 4: Featured Jobs (Premium Immersive with Prism Carousel) */}
            <FeaturedJobs 
              onApplyJob={handleOpenApplyModal}
              onNavigate={handleNavigate}
            />

            {/* Section 5: Trust and Safety / Fair Work Check (Bright Trustworthy with Frame Border) */}
            <TrustSafety 
              onNavigate={handleNavigate}
            />

            {/* Section 6: Worker Empowerment (Distinctive Digital Skill Pass with Frame Border) */}
            <WorkerEmpowerment 
              onNavigate={handleNavigate}
            />

            {/* Section 7: Final Call to Action (Bold Teal Conversion Field) */}
            <CTASection 
              onNavigate={handleNavigate}
            />
          </>
        )}

        {currentPage === 'find-jobs' && (
          <FindJobsPage
            onNavigate={handleNavigate}
            onApplyJob={handleOpenApplyModal}
            initialTradeFilter={selectedTradeFilter}
          />
        )}

        {currentPage === 'hire-workers' && (
          <HireWorkersPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'profile' && (
          <ProfilePage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'sahayak' && (
          <SahayakAssistant
            onNavigate={handleNavigate}
            onSelectTradeFilter={handleAssistantSelectTrade}
          />
        )}
      </main>

      {/* Persistent Floating Sahayak Dial & Help Trigger */}
      <FloatingSahayakButton
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Interactive Quick Apply Demo Modal */}
      <JobApplyModal
        job={selectedJob}
        isOpen={isApplyModalOpen}
        onClose={handleCloseApplyModal}
      />

      {/* Platform Universal Footer (Calm Structured Dark) */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
