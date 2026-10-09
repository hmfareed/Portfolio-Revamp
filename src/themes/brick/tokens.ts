export const brickTokens = {
  colors: {
    // Baseplate Canvas
    baseplateGreen: '#2E9E4F',
    baseplateDark: '#20783A',
    baseplateStud: '#38B55E',
    baseplateStudHighlight: '#56CD78',
    baseplateStudShadow: '#195F2E',

    // Core Toy Bricks Palette
    brickRed: '#D1382B',
    brickRedDark: '#9E2419',
    brickRedLight: '#E84E42',

    brickYellow: '#FFC62B',
    brickYellowDark: '#C99812',
    brickYellowLight: '#FFD75E',

    brickBlue: '#1F6FEB',
    brickBlueDark: '#134FB0',
    brickBlueLight: '#478DFE',

    brickWhite: '#F4F1E8',
    brickWhiteDark: '#D5D0C2',
    brickWhiteLight: '#FFFFFF',

    brickDark: '#1A1F2B',
    brickDarkMuted: '#384152',

    // Specular plastic sheen and cast shadows
    plasticHighlight: 'rgba(255, 255, 255, 0.4)',
    plasticShadow: 'rgba(0, 0, 0, 0.28)',
    studShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
  },
  typography: {
    headingFont: 'var(--font-lilita), "Lilita One", cursive, sans-serif',
    bodyFont: 'var(--font-nunito), "Nunito", sans-serif',
  },
  favicon: '/brick-favicon.svg',
} as const;
