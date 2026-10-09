'use client';

import React from 'react';

interface ContentSlotProps {
  text: string;
  className?: string;
}

export const ContentSlot: React.FC<ContentSlotProps> = ({ text, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-[#f0f0f0] text-[#6b6b6b] border border-[#e5e5e5] ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#D1AA67]" />
      <span>{text}</span>
    </span>
  );
};
