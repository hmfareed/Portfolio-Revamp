'use client';

import React from 'react';

interface MonogramLogoProps {
  className?: string;
  size?: number;
}

export const MonogramLogo: React.FC<MonogramLogoProps> = ({
  className = '',
  size = 32,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="Mohammed Fareed Monogram"
    >
      {/* Soft rounded frame */}
      <rect width="64" height="64" rx="14" fill="#f4f4f4" />
      <rect x="1" y="1" width="62" height="62" rx="13" stroke="#e5e5e5" strokeWidth="2" />

      {/* Geometric "M" in Brand Blue #3248C3 */}
      <path
        d="M14 46V18h6l8 14 8-14h6v28h-6V27.5L28 41.5 20 27.5V46H14z"
        fill="#3248C3"
      />

      {/* Geometric "F" top bar & accent in Company Gold #D1AA67 */}
      <path d="M38 18h12v5H38v-5z" fill="#D1AA67" />
      <path d="M38 29h8v4.5H38V29z" fill="#FFBF23" />
    </svg>
  );
};
