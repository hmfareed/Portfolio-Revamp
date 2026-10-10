import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { projectsContent } from '@/content/projects';
import { caseStudiesContent } from '@/content/caseStudies';
import { activeTheme } from '@/themes/theme.config';
import { CaseStudyDetailView } from '@/themes/pencil/sections/CaseStudyDetailView';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projectsContent.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsContent.find((p) => p.slug === slug);
  const study = caseStudiesContent[slug];

  if (!project || !study) {
    return {
      title: 'Project Case Study | Mohammed Fareed',
    };
  }

  return {
    title: `${study.title} | Architectural Case Study`,
    description: study.subtitle,
    openGraph: {
      title: `${study.title} — Architecture Case Study`,
      description: study.overview.slice(0, 160),
      images: project.image ? [{ url: project.image }] : [],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsContent.find((p) => p.slug === slug);
  const study = caseStudiesContent[slug];

  if (!project || !study) {
    notFound();
  }

  const { PaperSheet, PencilFooter } = activeTheme;

  const currentIndex = projectsContent.findIndex((p) => p.slug === slug);
  const prevIndex = (currentIndex - 1 + projectsContent.length) % projectsContent.length;
  const nextIndex = (currentIndex + 1) % projectsContent.length;

  return (
    <PaperSheet>
      <CaseStudyDetailView
        study={study}
        project={project}
        allProjects={projectsContent}
        prevStudy={{
          slug: projectsContent[prevIndex].slug,
          title: projectsContent[prevIndex].title,
        }}
        nextStudy={{
          slug: projectsContent[nextIndex].slug,
          title: projectsContent[nextIndex].title,
        }}
      />
      <PencilFooter />
    </PaperSheet>
  );
}
