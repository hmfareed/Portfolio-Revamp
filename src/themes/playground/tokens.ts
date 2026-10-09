export const playgroundTokens = {
  colors: {
    // App Shell & Panels
    shellBg: '#232527',
    panelBg: '#2F3133',
    panelBgHover: '#393B3D',
    panelBorder: '#424549',
    panelSubtle: '#1B1C1E',

    // Accents
    playGreen: '#00B06F',
    playGreenHover: '#00C87E',
    playGreenDark: '#008C57',
    blueAccent: '#2F7BFF',
    yellowHighlight: '#FFC933',
    coralAlert: '#FF5A5F',

    // Text
    textWhite: '#F7F7F8',
    textMuted: '#9EA2A8',
    textDark: '#1A1B1D',
  },
  typography: {
    headingFont: 'var(--font-fredoka), "Fredoka", cursive, sans-serif',
    bodyFont: 'var(--font-rubik), "Rubik", sans-serif',
  },
  favicon: '/playground-favicon.svg',
} as const;
