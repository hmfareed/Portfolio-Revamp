'use client';

import React from 'react';

export const ChalkStar: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#F6D860',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeDasharray="1 0.5"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2 L15 8.5 L22 9.5 L17 14.5 L18.5 21.5 L12 18 L5.5 21.5 L7 14.5 L2 9.5 L9 8.5 Z" />
  </svg>
);

export const ChalkArrow: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-4',
  color = '#8EC5E8',
}) => (
  <svg
    viewBox="0 0 40 16"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M2 8 Q 20 6, 36 8" strokeDasharray="1 1" />
    <path d="M28 2 L37 8 L28 14" strokeDasharray="1 1" />
  </svg>
);

export const ChalkStick: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-10 h-3.5',
  color = '#F2F0E6',
}) => (
  <svg viewBox="0 0 48 14" fill="none" className={className} aria-hidden="true">
    {/* Chalk Shadow */}
    <rect x="3" y="4" width="42" height="8" rx="2" fill="#1C2F27" opacity="0.6" />
    {/* Chalk Stick */}
    <rect x="2" y="2" width="42" height="8" rx="2" fill={color} stroke="#D4D1C5" strokeWidth="0.8" />
    {/* Chalk Highlight */}
    <path d="M4 4 L42 4" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const FeltEraser: React.FC<{ className?: string }> = ({ className = 'w-12 h-6' }) => (
  <svg viewBox="0 0 54 24" fill="none" className={className} aria-hidden="true">
    {/* Shadow */}
    <rect x="3" y="6" width="48" height="16" rx="3" fill="#182821" opacity="0.7" />
    {/* Wooden Top Grip */}
    <rect x="2" y="3" width="48" height="8" rx="2" fill="#8A5A33" stroke="#5A3A1E" strokeWidth="1" />
    <path d="M6 7 L46 7" stroke="#A67245" strokeWidth="1" opacity="0.6" />
    {/* Felt Pad (bottom) */}
    <rect x="2" y="11" width="48" height="8" rx="1.5" fill="#3D3A37" stroke="#262422" strokeWidth="1" />
    {/* Chalk dust on felt bottom */}
    <path d="M4 17 Q 26 15, 48 17" stroke="#F2F0E6" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.8" />
  </svg>
);

export const ChalkGithubIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#F2F0E6',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeDasharray="1 0.75"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const ChalkLinkedinIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#8EC5E8',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeDasharray="1 0.75"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
