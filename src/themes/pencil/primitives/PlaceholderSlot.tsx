'use client';

import React from 'react';
import { Pencil } from 'lucide-react';

interface PlaceholderSlotProps {
  text: string;
  className?: string;
}

export const PlaceholderSlot: React.FC<PlaceholderSlotProps> = ({
  text,
  className = ""
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 my-1.5 rounded-sm bg-amber-50/90 border-2 border-dashed border-amber-500/80 text-amber-900 text-sm font-handwriting shadow-xs ${className}`}
      style={{ filter: 'url(#pencil-wobble)' }}
      title="Content placeholder waiting for author update"
    >
      <Pencil className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
      <span className="font-semibold tracking-wide">
        {text}
      </span>
      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-200/90 text-amber-800">
        Draft Slot
      </span>
    </div>
  );
};
