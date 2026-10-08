import React from 'react';
import { activeTheme } from '@/themes/theme.config';

export default function HomePage() {
  const {
    PaperSheet,
    NotebookNav,
    HeroSection,
    AboutSection,
    ProjectsSection,
    ExperienceSection,
    SkillsSection,
    ResumeSection,
    ContactSection,
    PencilFooter,
  } = activeTheme;

  return (
    <PaperSheet>
      <NotebookNav />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <PencilFooter />
    </PaperSheet>
  );
}
