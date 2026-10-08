import React from 'react';

/**
 * SVG filter definitions used across the Pencil theme to give borders,
 * strokes, and paper textures an organic hand-sketched wobble and paper grain.
 */
export const PencilFilters: React.FC = () => {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      style={{ position: 'absolute', width: 0, height: 0 }}
    >
      <defs>
        {/* Subtle pencil edge tremor for borders and cards */}
        <filter id="pencil-wobble" x="-5%" y="-5%" width="110%" height="110%" filterUnits="objectBoundingBox">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="3"
            result="noise"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Medium wobble for buttons, tags and stamps */}
        <filter id="pencil-wobble-rough" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            result="noise"
            seed="5"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Very light paper grain texture */}
        <filter id="paper-texture">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.035 0"
          />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </defs>
    </svg>
  );
};
