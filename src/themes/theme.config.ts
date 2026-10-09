import * as pencilTheme from './pencil';
import * as brickTheme from './brick';

/**
 * THEME REGISTRY
 *
 * All themes implement the standard portfolio theme interface (Layout, Sections, Tokens).
 * To switch the entire site to a new visual theme, simply change CURRENT_THEME_KEY below.
 */
export const THEMES = {
  pencil: pencilTheme,
  brick: brickTheme,
} as const;

export type ThemeKey = keyof typeof THEMES;

// SWITCH THE THEME HERE BY CHANGING THIS VALUE:
// Set to 'brick' or 'pencil'
export const CURRENT_THEME_KEY: ThemeKey = 'brick';

export const activeTheme = THEMES[CURRENT_THEME_KEY];
