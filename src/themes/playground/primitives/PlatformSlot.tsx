'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface PlatformSlotProps {
  text: string;
  className?: string;
}

export const PlatformSlot: React.FC<PlatformSlotProps> = ({ text, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 my-1 bg-[#1F2529] border border-[#2F7BFF]/50 text-[#8EC5FC] text-xs font-heading font-semibold rounded-lg shadow-sm ${className}`}
      title="Platform asset slot waiting for update"
    >
      <Sparkles className="w-3.5 h-3.5 text-[#2F7BFF] shrink-0" />
      <span>{text}</span>
      <span className="text-[10px] uppercase px-1.5 py-0.2 bg-[#2F7BFF]/20 text-[#8EC5FC] rounded font-mono font-bold">
        SLOT
      </span>
    </div>
  );
};
