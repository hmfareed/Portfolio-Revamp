import * as pencilTheme from './pencil';

export const THEMES = {
  pencil: pencilTheme,
} as const;

export type ThemeKey = 'pencil';

// Default active theme key:
export const CURRENT_THEME_KEY: ThemeKey = 'pencil';

/**
 * Standard active theme contract:
 * Directly provides the Pencil theme components and tokens.
 */
export const activeTheme = pencilTheme;
