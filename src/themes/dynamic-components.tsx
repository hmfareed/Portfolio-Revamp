'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import * as pencilTheme from './pencil';
import * as brickTheme from './brick';

export function DynamicPaperSheet({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.PaperSheet : brickTheme.PaperSheet;
  return <Component>{children}</Component>;
}

export function DynamicNotebookNav() {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.NotebookNav : brickTheme.NotebookNav;
  return <Component />;
}

export function DynamicHeroSection() {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.HeroSection : brickTheme.HeroSection;
  return <Component />;
}

export function DynamicAboutSection() {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.AboutSection : brickTheme.AboutSection;
  return <Component />;
}

export function DynamicProjectsSection() {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.ProjectsSection : brickTheme.ProjectsSection;
  return <Component />;
}

export function DynamicExperienceSection() {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.ExperienceSection : brickTheme.ExperienceSection;
  return <Component />;
}

export function DynamicSkillsSection() {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.SkillsSection : brickTheme.SkillsSection;
  return <Component />;
}

export function DynamicResumeSection() {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.ResumeSection : brickTheme.ResumeSection;
  return <Component />;
}

export function DynamicContactSection() {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.ContactSection : brickTheme.ContactSection;
  return <Component />;
}

export function DynamicPencilFooter() {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.PencilFooter : brickTheme.PencilFooter;
  return <Component />;
}

export function DynamicHandDrawnUnderline(props: any) {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.HandDrawnUnderline : brickTheme.HandDrawnUnderline;
  return <Component {...props} />;
}

export function DynamicPencilCircle(props: any) {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.PencilCircle : brickTheme.PencilCircle;
  return <Component {...props} />;
}

export function DynamicTornPageCard(props: any) {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.TornPageCard : brickTheme.TornPageCard;
  return <Component {...props} />;
}

export function DynamicStampButton(props: any) {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.StampButton : brickTheme.StampButton;
  return <Component {...props} />;
}

export function DynamicPlaceholderSlot(props: any) {
  const { currentTheme } = useTheme();
  const Component = currentTheme === 'pencil' ? pencilTheme.PlaceholderSlot : brickTheme.PlaceholderSlot;
  return <Component {...props} />;
}
