'use client';

import React from 'react';
import { BrickStud } from './BrickStud';

interface BrickTagProps {
  label: string;
  color?: 'red' | 'blue' | 'yellow' | 'green' | 'white';
  className?: string;
}

export const BrickTag: React.FC<BrickTagProps> = ({
  label,
  color = 'red',
  className = '',
}) => {
  const colorMap = {
    red: {
      bg: '#D1382B',
      text: '#FFFFFF',
      border: '#9E2419',
      stud: '#E54536',
    },
    blue: {
      bg: '#1F6FEB',
      text: '#FFFFFF',
      border: '#134FB0',
      stud: '#3B82F6',
    },
    yellow: {
      bg: '#FFC62B',
      text: '#1A1F2B',
      border: '#C99812',
      stud: '#FFD252',
    },
    green: {
      bg: '#2E9E4F',
      text: '#FFFFFF',
      border: '#20783A',
      stud: '#38B55E',
    },
    white: {
      bg: '#F4F1E8',
      text: '#1A1F2B',
      border: '#D5D0C2',
      stud: '#FFFFFF',
    },
  }[color];

  return (
    <div
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-b-2 font-heading text-xs sm:text-sm font-bold tracking-wide select-none shadow-sm transition-transform hover:-translate-y-0.5 ${className}`}
      style={{
        backgroundColor: colorMap.bg,
        color: colorMap.text,
        borderColor: colorMap.border,
        boxShadow:
          'inset 0 1.5px 0 rgba(255, 255, 255, 0.4), 0 3px 6px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* 2 round studs indicating 1x2 brick shape */}
      <div className="flex items-center gap-1 shrink-0 -ml-0.5" aria-hidden="true">
        <BrickStud color={colorMap.stud} size="xs" />
        <BrickStud color={colorMap.stud} size="xs" />
      </div>
      <span>{label}</span>
    </div>
  );
};
