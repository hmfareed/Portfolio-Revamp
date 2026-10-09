'use client';

import React from 'react';

interface CorporateAppLayoutProps {
  children: React.ReactNode;
}

export const CorporateAppLayout: React.FC<CorporateAppLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#f9f9f9] text-[#1a1a1a] font-sans selection:bg-[#D1AA67] selection:text-[#1a1a1a]">
      {/* Subtle 80px engineering grid backdrop */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Main Content Flow */}
      <div className="relative min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};
