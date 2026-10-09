export const blockyTokens = {
  colors: {
    // Voxel World Layers
    sky: '#7FD6FF',
    skyDark: '#5EB8E6',
    cloud: '#FFFFFF',

    grassland: '#58B947',
    grassLight: '#6FD45B',
    grassDark: '#419333',

    dirt: '#8B5A2B',
    dirtLight: '#A8733E',
    dirtDark: '#663F19',

    stone: '#9AA3AD',
    stoneLight: '#B8C1CB',
    stoneDark: '#76808B',

    // Accents & XP
    gold: '#FFD23F',
    goldLight: '#FFE57F',
    goldDark: '#D4A017',

    xpGreen: '#4ADE80',
    manaBlue: '#38BDF8',
    healthRed: '#EF4444',

    // Chunky UI Panels
    panelBg: '#2A303C',
    panelBgDark: '#1E232A',
    panelBgLight: '#394150',
    panelBorder: '#0F1217',

    textDark: '#1E232A',
    textLight: '#F3F4F6',
    textMuted: '#9CA3AF',
  },
  typography: {
    headingFont: 'var(--font-pixel), "Press Start 2P", monospace',
    uiFont: 'var(--font-vt323), "VT323", monospace',
    bodyFont: 'var(--font-nunito), "Nunito", sans-serif',
  },
  favicon: '/blocky-favicon.svg',
} as const;
