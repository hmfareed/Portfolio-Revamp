import * as pencilTheme from './pencil';
import * as brickTheme from './brick';
import * as blockyTheme from './blocky';
import * as chalkTheme from './chalk';
import * as playgroundTheme from './playground';
import * as goldBlueTheme from './gold-blue';
import {
  DynamicPaperSheet,
  DynamicNotebookNav,
  DynamicHeroSection,
  DynamicAboutSection,
  DynamicProjectsSection,
  DynamicExperienceSection,
  DynamicSkillsSection,
  DynamicResumeSection,
  DynamicContactSection,
  DynamicPencilFooter,
  DynamicHandDrawnUnderline,
  DynamicPencilCircle,
  DynamicTornPageCard,
  DynamicStampButton,
  DynamicPlaceholderSlot,
} from './dynamic-components';

export const THEMES = {
  pencil: pencilTheme,
  brick: brickTheme,
  blocky: blockyTheme,
  chalk: chalkTheme,
  playground: playgroundTheme,
  'gold-blue': goldBlueTheme,
} as const;

export type ThemeKey = keyof typeof THEMES;

// Default initial server fallback theme:
export const CURRENT_THEME_KEY: ThemeKey = 'gold-blue';

/**
 * Standard active theme contract.
 * Automatically delegates to the active theme selected by the user
 * via the top-corner toggle or defaults to CURRENT_THEME_KEY.
 */
export const activeTheme = {
  tokens: THEMES[CURRENT_THEME_KEY].tokens,
  PaperSheet: DynamicPaperSheet,
  NotebookNav: DynamicNotebookNav,
  HeroSection: DynamicHeroSection,
  AboutSection: DynamicAboutSection,
  ProjectsSection: DynamicProjectsSection,
  ExperienceSection: DynamicExperienceSection,
  SkillsSection: DynamicSkillsSection,
  ResumeSection: DynamicResumeSection,
  ContactSection: DynamicContactSection,
  PencilFooter: DynamicPencilFooter,
  HandDrawnUnderline: DynamicHandDrawnUnderline,
  PencilCircle: DynamicPencilCircle,
  TornPageCard: DynamicTornPageCard,
  StampButton: DynamicStampButton,
  PlaceholderSlot: DynamicPlaceholderSlot,
};
