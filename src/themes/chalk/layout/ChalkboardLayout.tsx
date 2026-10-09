'use client';

import React from 'react';

interface ChalkboardLayoutProps {
  children: React.ReactNode;
}

export const ChalkboardLayout: React.FC<ChalkboardLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#5A3A1E] p-2 sm:p-4 md:p-6 lg:p-8 selection:bg-[#F6D860] selection:text-[#23382F]">
      {/* Outer Wooden Chalkboard Frame */}
      <div
        className="relative min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)] w-full rounded-xl md:rounded-2xl border-4 md:border-8 border-[#4A2E14] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        style={{
          backgroundColor: '#8A5A33',
          boxShadow:
            'inset 0 3px 6px rgba(255, 255, 255, 0.2), inset 0 -4px 8px rgba(0, 0, 0, 0.5), 0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Inner Slate Board */}
        <div
          className="relative min-h-full w-full bg-[#2F4A3E] text-[#F2F0E6] font-body p-4 sm:p-8 md:p-12 lg:p-16 overflow-x-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(242, 240, 230, 0.05) 0%, transparent 45%),
              radial-gradient(circle at 80% 70%, rgba(242, 240, 230, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 50% 85%, rgba(242, 240, 230, 0.03) 0%, transparent 60%)
            `,
            boxShadow:
              'inset 0 6px 16px rgba(0, 0, 0, 0.6), inset 0 -6px 16px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Faint Chalk Smudge & Eraser Swipes Layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 120px,
                rgba(242, 240, 230, 0.015) 120px,
                rgba(242, 240, 230, 0.015) 240px
              )`,
            }}
            aria-hidden="true"
          />

          {/* Children container with standard max-width */}
          <div className="relative z-10 max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
