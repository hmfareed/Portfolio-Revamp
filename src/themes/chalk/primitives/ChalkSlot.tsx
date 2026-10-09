'use client';

import React from 'react';

interface ChalkSlotProps {
  text: string;
  className?: string;
}

export const ChalkSlot: React.FC<ChalkSlotProps> = ({ text, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 my-1.5 bg-[#20332B] border border-dashed border-[#F4A6B8]/80 text-[#F4A6B8] text-xs sm:text-sm font-heading rounded-md shadow-inner ${className}`}
      title="Lesson note pending update"
    >
      <span className="opacity-75">✎</span>
      <span>{text}</span>
      <span className="text-[10px] uppercase px-1.5 py-0.2 bg-[#F4A6B8]/20 text-[#F4A6B8] rounded border border-[#F4A6B8]/40">
        DRAFT NOTE
      </span>
    </div>
  );
};
