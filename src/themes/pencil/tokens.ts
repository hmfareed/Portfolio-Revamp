export const pencilTokens = {
  colors: {
    paper: '#FBF8EF',          // Warm cream exercise book paper
    paperDark: '#F4EED9',      // Slightly darker cream for depth
    ruledLine: '#A9C5E8',      // Faint blue ruled lines
    marginLine: '#E4572E',     // Classic red exercise book margin line
    graphite: '#2B2B2B',       // Deep graphite pencil text
    graphiteMuted: '#525252',  // Secondary graphite
    graphiteLight: '#787878',  // Light pencil markings
    highlighter: '#FFE66D',    // Highlighter yellow accent
    highlighterGreen: '#C7F9CC',
    highlighterPink: '#FFCAD4',
    stickyYellow: '#FEF9C3',   // Pastel yellow sticky note
    stickyPink: '#FCE7F3',     // Pastel pink sticky note
    stickyBlue: '#E0F2FE',     // Pastel blue sticky note
    stickyGreen: '#DCFCE7',    // Pastel green sticky note
    stickyAmber: '#FEF3C7',    // Pastel amber sticky note
    tape: 'rgba(255, 255, 255, 0.65)', // Semi-translucent masking tape
    tapeShadow: 'rgba(0, 0, 0, 0.08)',
    stampRed: '#B91C1C',       // Red ink stamp color
    stampBlue: '#1E40AF',      // Blue ink stamp color
  },
  typography: {
    headingFont: 'var(--font-caveat)',
    bodyFont: 'var(--font-kalam)',
    fallback: 'system-ui, -apple-system, sans-serif',
  },
  borders: {
    pencilThin: '1.5px solid #2B2B2B',
    pencilMedium: '2px solid #2B2B2B',
    pencilThick: '3px solid #2B2B2B',
  },
  favicon: '/favicon.svg',
} as const;
