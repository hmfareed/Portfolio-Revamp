import * as pencilTheme from './pencil';

/**
 * THEME REGISTRY
 *
 * All themes implement the standard portfolio theme interface (Layout, Sections, Tokens).
 * To switch the entire site to a new visual theme (e.g. blueprint, terminal, minimal),
 * simply change CURRENT_THEME_KEY below to the target theme name.
 */
export const THEMES = {
  pencil: pencilTheme,
  // Future themes can be registered here:
  // blueprint: blueprintTheme,
  // terminal: terminalTheme,
} as const;

export type ThemeKey = keyof typeof THEMES;

// SWITCH THE THEME HERE BY CHANGING THIS VALUE:
export const CURRENT_THEME_KEY: ThemeKey = 'pencil';

export const activeTheme = THEMES[CURRENT_THEME_KEY];
