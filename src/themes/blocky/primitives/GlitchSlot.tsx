'use client';

import React from 'react';
import { Lock } from 'lucide-react';

interface GlitchSlotProps {
  text: string;
  className?: string;
}

export const GlitchSlot: React.FC<GlitchSlotProps> = ({ text, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 my-1.5 bg-[#451A03] border-2 border-dashed border-[#F59E0B] text-[#FEF3C7] text-xs font-pixel shadow-xs ${className}`}
      title="Locked quest data waiting to be unlocked"
    >
      <Lock className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
      <span className="tracking-wider">{text}</span>
      <span className="text-[9px] uppercase px-1 py-0.5 bg-[#B45309] text-white border border-[#F59E0B]">
        LOCKED
      </span>
    </div>
  );
};
