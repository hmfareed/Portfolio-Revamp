'use client';

import React from 'react';
import { CornerChatWidget } from '../primitives/CornerChatWidget';

interface PlaygroundAppLayoutProps {
  children: React.ReactNode;
}

export const PlaygroundAppLayout: React.FC<PlaygroundAppLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#232527] text-[#F7F7F8] font-body selection:bg-[#00B06F] selection:text-white">
      {/* Main app container */}
      <div className="relative min-h-screen flex flex-col md:flex-row">
        {/* Child content flows here (desktop sidebar & top bar are managed within the layout and top nav) */}
        <div className="flex-1 flex flex-col min-w-0">
          {children}
        </div>
      </div>

      {/* Floating Corner Pre-written Chat Widget */}
      <CornerChatWidget />
    </div>
  );
};
