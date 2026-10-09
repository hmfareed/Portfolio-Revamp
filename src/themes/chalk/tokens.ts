export const chalkTokens = {
  colors: {
    // Green Slate Board
    slate: '#2F4A3E',
    slateDark: '#23382F',
    slateLight: '#3D5E50',
    slateMuted: '#4A6F5F',

    // Wooden Frame & Tray
    wood: '#8A5A33',
    woodDark: '#663F1E',
    woodLight: '#A67245',
    woodBorder: '#4E2F14',

    // Chalk Colors
    chalkWhite: '#F2F0E6',
    chalkWhiteFaint: 'rgba(242, 240, 230, 0.18)',
    chalkWhiteSmudge: 'rgba(242, 240, 230, 0.08)',
    chalkPink: '#F4A6B8',
    chalkYellow: '#F6D860',
    chalkBlue: '#8EC5E8',
    chalkGreen: '#82D19B',

    // Text & Surfaces
    textPrimary: '#F2F0E6',
    textSecondary: '#E0DDD0',
    textMuted: '#A8B8AF',
  },
  typography: {
    headingFont: 'var(--font-chalk-heading), "Gaegu", cursive, sans-serif',
    bodyFont: 'var(--font-chalk-body), "Quicksand", sans-serif',
  },
  favicon: '/chalk-favicon.svg',
} as const;
