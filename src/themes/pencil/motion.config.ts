/**
 * Centralized Motion & Animation Configuration for Pencil Theme
 * Tuning knobs for durations, easings, spring physics, staggers, and scroll thresholds.
 */

export const pencilMotion = {
  // Landing Page Loader Sequence (slower, unhurried, super smooth ~5.5s total)
  loader: {
    totalMaxTime: 5.5,
    pencilEnterDelay: 0.3,
    nameDrawDuration: 2.4,
    underlineDuration: 0.85,
    starTapDuration: 0.4,
    progressBarDuration: 2.2,
    pencilFlickDuration: 0.35,
    eraserSwipeDuration: 0.65,
    fadeDelayRepeatSession: 0.2,
  },

  // Spring physics configs
  springs: {
    bouncy: { type: 'spring', stiffness: 380, damping: 18 } as const,
    gentle: { type: 'spring', stiffness: 220, damping: 24 } as const,
    stickyNoteDrop: { type: 'spring', stiffness: 260, damping: 19 } as const,
    cardHover: { type: 'spring', stiffness: 340, damping: 22 } as const,
    paperFold: { type: 'spring', stiffness: 180, damping: 20 } as const,
    airplaneGlide: { type: 'spring', stiffness: 120, damping: 16 } as const,
    wobbleOvershoot: { type: 'spring', stiffness: 420, damping: 12 } as const,
  },

  // Standard animation durations (seconds)
  durations: {
    fast: 0.25,
    medium: 0.5,
    slow: 0.9,
    drawStroke: 0.75,
    drawCircle: 0.85,
    highlighterSweep: 0.45,
    card3DTilt: 0.6,
    timelineUnfold: 0.55,
    shavingFall: 1.8,
  },

  // Cubic bezier easing curves
  easings: {
    handDrawn: [0.25, 0.1, 0.25, 1.0] as const,
    overshoot: [0.34, 1.45, 0.64, 1.0] as const,
    smooth: [0.4, 0.0, 0.2, 1.0] as const,
    eraserWipe: [0.65, 0, 0.35, 1] as const,
    sharp: [0.16, 1, 0.3, 1] as const,
  },

  // Stagger intervals (seconds)
  staggers: {
    stickyNotes: 0.08,
    projectCards: 0.12,
    skillsBadges: 0.035,
    shavings: 0.1,
    timelineNodes: 0.14,
  },

  // Viewport trigger amounts / thresholds
  thresholds: {
    headingUnderline: 0.4,
    highlighter: 0.3,
    statsCounter: 0.25,
    cards: 0.15,
    timeline: 0.2,
    sectionDivider: 0.1,
  },

  // Mobile thresholds and particle limits
  mobile: {
    maxParticles: 4,
    parallaxScale: 0.4,
    simplifiedLoaderDuration: 1.8,
  },
} as const;
