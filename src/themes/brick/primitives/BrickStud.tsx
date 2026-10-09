'use client';

import React from 'react';

interface BrickStudProps {
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrickStud: React.FC<BrickStudProps> = ({
  color = '#2E9E4F',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-4.5 h-4.5',
    lg: 'w-6 h-6',
  }[size];

  return (
    <div
      className={`relative inline-block rounded-full shrink-0 ${sizeClasses} ${className}`}
      style={{
        backgroundColor: color,
        boxShadow:
          'inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1.5px 1.5px rgba(0, 0, 0, 0.35), 0 2px 3px rgba(0, 0, 0, 0.25)',
      }}
      aria-hidden="true"
    >
      {/* Specular plastic sheen circle */}
      <div className="absolute inset-[15%] rounded-full border border-white/40 pointer-events-none" />
    </div>
  );
};
