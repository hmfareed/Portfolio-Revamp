'use client';

import React from 'react';
import { Hammer } from 'lucide-react';

interface BrickSlotProps {
  text: string;
  className?: string;
}

export const BrickSlot: React.FC<BrickSlotProps> = ({ text, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 my-1.5 rounded-lg border-2 border-dashed border-[#C99812] bg-[#FEF3C7] text-[#78350F] text-sm font-body shadow-xs ${className}`}
      style={{
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
      }}
      title="Unassembled brick slot waiting for pieces"
    >
      <Hammer className="w-3.5 h-3.5 text-[#B45309] animate-bounce shrink-0" />
      <span className="font-bold tracking-wide">{text}</span>
      <span className="text-[10px] uppercase font-heading font-bold px-1.5 py-0.5 rounded-md bg-[#FDE68A] text-[#92400E] border border-[#F59E0B]/40">
        Brick Slot
      </span>
    </div>
  );
};
