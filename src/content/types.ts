export type ProjectCategory = 'e-commerce' | 'SaaS' | 'education' | 'AI';

export interface ProjectLinks {
  live?: string | null;
  github?: string | null;
  caseStudySlug?: string | null;
}

export interface Project {
  slug: string;
  title: string;
  pitch: string;
  role: string;
  stack: string[];
  categories: ProjectCategory[];
  featured: boolean;
  features: string[];
  links: ProjectLinks;
  image?: string | null;
  placeholders?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  location: string;
  logo?: string;
  bullets: string[];
  placeholders?: string[];
  highlightStats?: {
    value: string;
    label: string;
  }[];
}

export interface TeachingExperience {
  classes: string;
  impact: string;
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  skills: string[];
  doodle: 'languages' | 'frontend' | 'backend' | 'database' | 'payments' | 'ai' | 'tooling' | 'beyond';
  stickyColor: 'yellow' | 'pink' | 'blue' | 'green' | 'amber';
  tilt: number;
}

export interface AboutData {
  name: string;
  roleDescription: string;
  location: string;
  story: string[];
  quickFacts: string[];
  teachingExperience: TeachingExperience;
  education: {
    degree: string;
    institution: string;
    period: string;
    status: string;
  };
  leadership: string[];
}

export interface HeroData {
  name: string;
  headline: string;
  subline: string;
  buttons: {
    projects: string;
    resume: string;
    contact: string;
  };
}

export interface ContactData {
  email: string;
  github: {
    url: string;
    label: string;
  };
  linkedin: {
    url: string;
    label: string;
  };
  location: string;
  availability: string;
}
