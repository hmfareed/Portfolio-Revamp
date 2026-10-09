'use client';

import React from 'react';
import { PencilFilters } from '../primitives/PencilFilters';

interface PaperSheetProps {
  children: React.ReactNode;
}

export const PaperSheet: React.FC<PaperSheetProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#FBF8EF] text-[#2B2B2B] font-handwriting overflow-x-hidden selection:bg-[#FFE66D] selection:text-[#2B2B2B]">
      {/* SVG filter definitions for pencil tremor and textures */}
      <PencilFilters />

      {/* Faint blue ruled lines repeating down the whole page */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-45"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent, transparent 31px, #A9C5E8 31px, #A9C5E8 32px)',
          backgroundAttachment: 'local',
        }}
        aria-hidden="true"
      />

      {/* Subtle paper grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#2B2B2B 0.5px, transparent 0.5px)`,
          backgroundSize: '12px 12px',
        }}
        aria-hidden="true"
      />

      {/* Vertical Red Exercise Book Margin Line (Desktop only, 72px from left) */}
      <div
        className="pointer-events-none fixed top-0 bottom-0 left-6 sm:left-12 lg:left-24 w-0.5 bg-[#E4572E]/70 z-10 hidden md:block"
        aria-hidden="true"
      >
        {/* Double-stroke notebook margin line detail */}
        <div className="absolute top-0 bottom-0 -left-1 w-[1px] bg-[#E4572E]/40" />
      </div>

      {/* Main page content area with responsive margin indent on desktop */}
      <div className="relative z-20 md:pl-16 lg:pl-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </div>
    </div>
  );
};
