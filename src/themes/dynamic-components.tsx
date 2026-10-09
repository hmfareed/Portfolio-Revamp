'use client';

import React from 'react';
import { useTheme, ThemeKey } from './ThemeContext';
import * as pencilTheme from './pencil';
import * as brickTheme from './brick';
import * as blockyTheme from './blocky';
import * as chalkTheme from './chalk';
import * as playgroundTheme from './playground';

function getActiveTheme(currentTheme: ThemeKey) {
  if (currentTheme === 'pencil') return pencilTheme;
  if (currentTheme === 'brick') return brickTheme;
  if (currentTheme === 'blocky') return blockyTheme;
  if (currentTheme === 'chalk') return chalkTheme;
  if (currentTheme === 'playground') return playgroundTheme;
  return playgroundTheme;
}

export function DynamicPaperSheet({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.PaperSheet;
  return <Component>{children}</Component>;
}

export function DynamicNotebookNav() {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.NotebookNav;
  return <Component />;
}

export function DynamicHeroSection() {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.HeroSection;
  return <Component />;
}

export function DynamicAboutSection() {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.AboutSection;
  return <Component />;
}

export function DynamicProjectsSection() {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.ProjectsSection;
  return <Component />;
}

export function DynamicExperienceSection() {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.ExperienceSection;
  return <Component />;
}

export function DynamicSkillsSection() {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.SkillsSection;
  return <Component />;
}

export function DynamicResumeSection() {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.ResumeSection;
  return <Component />;
}

export function DynamicContactSection() {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.ContactSection;
  return <Component />;
}

export function DynamicPencilFooter() {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.PencilFooter;
  return <Component />;
}

export function DynamicHandDrawnUnderline(props: any) {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.HandDrawnUnderline;
  return <Component {...props} />;
}

export function DynamicPencilCircle(props: any) {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.PencilCircle;
  return <Component {...props} />;
}

export function DynamicTornPageCard(props: any) {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.TornPageCard;
  return <Component {...props} />;
}

export function DynamicStampButton(props: any) {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.StampButton;
  return <Component {...props} />;
}

export function DynamicPlaceholderSlot(props: any) {
  const { currentTheme } = useTheme();
  const theme = getActiveTheme(currentTheme);
  const Component = theme.PlaceholderSlot;
  return <Component {...props} />;
}
