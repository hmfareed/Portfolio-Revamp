'use client';

import React from 'react';

interface DoodleProps {
  className?: string;
  color?: string;
}

export const StarDoodle: React.FC<DoodleProps> = ({
  className = "w-6 h-6",
  color = "#FFE66D"
}) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: "url(#pencil-wobble)" }}
    aria-hidden="true"
  >
    <path
      d="M20 3 L24 14 L36 15 L27 23 L30 35 L20 28 L9 35 L12 23 L4 15 L15 14 Z"
      fill={color}
      stroke="#2B2B2B"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export const ArrowDoodle: React.FC<DoodleProps & { direction?: 'right' | 'down' | 'curved' }> = ({
  className = "w-8 h-8",
  color = "#2B2B2B",
  direction = "right"
}) => {
  return (
    <svg
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "url(#pencil-wobble)" }}
      aria-hidden="true"
    >
      {direction === 'curved' ? (
        <>
          <path
            d="M8 32 C 18 10, 38 8, 52 18"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M42 12 L53 19 L46 29"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M6 20 C 22 18, 38 22, 52 20"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M42 10 L54 20 L42 30"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

export const CodeBracketsDoodle: React.FC<DoodleProps> = ({
  className = "w-8 h-8",
  color = "#2B2B2B"
}) => (
  <svg
    viewBox="0 0 50 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: "url(#pencil-wobble)" }}
    aria-hidden="true"
  >
    <path
      d="M15 6 L6 17.5 L15 29"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 31 L29 4"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M35 6 L44 17.5 L35 29"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PaperclipDoodle: React.FC<DoodleProps> = ({
  className = "w-6 h-10",
  color = "#787878"
}) => (
  <svg
    viewBox="0 0 30 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: "url(#pencil-wobble)" }}
    aria-hidden="true"
  >
    <path
      d="M10 16 V36 C10 42, 22 42, 22 36 V12 C22 4, 4 4, 4 12 V38 C4 48, 28 48, 28 38 V18"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TapeStrip: React.FC<{ className?: string; angle?: number }> = ({
  className = "",
  angle = -2
}) => (
  <div
    className={`absolute h-6 w-24 bg-white/75 backdrop-blur-[1px] border border-amber-900/15 shadow-xs pointer-events-none z-20 ${className}`}
    style={{
      transform: `rotate(${angle}deg)`,
      clipPath: "polygon(0% 15%, 4% 0%, 96% 0%, 100% 20%, 97% 100%, 3% 100%)",
    }}
  />
);

export const LightbulbDoodle: React.FC<DoodleProps> = ({
  className = "w-6 h-6",
  color = "#2B2B2B"
}) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: "url(#pencil-wobble)" }}
    aria-hidden="true"
  >
    <path
      d="M12 18 C9 15, 9 10, 14 6 C19 2, 24 5, 25 10 C26 14, 22 17, 21 21 H14 Z"
      stroke={color}
      strokeWidth="2.2"
      fill="#FFE66D"
      fillOpacity="0.4"
    />
    <path d="M14 25 H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M15 28 H20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M7 6 L4 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M29 6 L32 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const CheckmarkDoodle: React.FC<DoodleProps> = ({
  className = "w-5 h-5",
  color = "#15803D"
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: "url(#pencil-wobble)" }}
    aria-hidden="true"
  >
    <path
      d="M3 12.5 L8.5 18 L21 5"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GithubDoodle: React.FC<DoodleProps> = ({
  className = "w-4 h-4",
  color = "#2B2B2B"
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: "url(#pencil-wobble)" }}
    aria-hidden="true"
  >
    <path
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LinkedinDoodle: React.FC<DoodleProps> = ({
  className = "w-4 h-4",
  color = "#2B2B2B"
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: "url(#pencil-wobble)" }}
    aria-hidden="true"
  >
    <path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="2"
      y="9"
      width="4"
      height="12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="4"
      cy="4"
      r="2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
