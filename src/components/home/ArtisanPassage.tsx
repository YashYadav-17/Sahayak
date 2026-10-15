import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { PassageGallery } from '../animations/PassageGallery';
import { PASSAGE_ITEMS } from '../../data/passageItems';

export const ArtisanPassage: React.FC = () => {
  return (
    <section id="artisan-passage-section" className="py-20 md:py-28 bg-midnight text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary-teal/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-violet-accent/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          dark
          badge="Immersive Photographic Journey"
          title="The Artisan Passage —"
          highlightedText="Real Work, Real Hands"
          subtitle="Glide through the real faces, workshops, and specialized craftsmanship building India's physical infrastructure every single day."
        />

        {/* The 3D Passage Gallery */}
        <PassageGallery 
          items={PASSAGE_ITEMS}
          cruisingSpeed={0.5}
        />

      </div>
    </section>
  );
};

export default ArtisanPassage;
