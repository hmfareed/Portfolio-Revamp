import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsContent } from '@/content/projects';
import { activeTheme } from '@/themes/theme.config';
import { ArrowLeft, Construction, FileText } from 'lucide-react';

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

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsContent.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { PaperSheet, PencilFooter, HandDrawnUnderline, TornPageCard, StampButton, PlaceholderSlot } = activeTheme;

  return (
    <PaperSheet>
      <div className="py-12 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-handwriting text-lg text-stone-800 hover:text-[#E4572E] mb-8 font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>← Back to Exercise Book</span>
        </Link>

        {/* Case Study Scaffolded Card */}
        <TornPageCard className="p-8 sm:p-12">
          <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase text-stone-500 mb-3">
            <Construction className="w-4 h-4 text-amber-600" />
            <span>Case Study Scaffold · Draft Page</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-2">
            {project.title}
          </h1>
          <HandDrawnUnderline color="#E4572E" className="w-64 h-3 mb-6" />

          <p className="font-handwriting text-xl text-stone-700 mb-8 italic">
            &ldquo;{project.pitch}&rdquo;
          </p>

          <div className="p-6 bg-amber-50/70 border-2 border-dashed border-amber-400 rounded-xs mb-8">
            <h2 className="font-heading text-xl font-bold text-amber-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span>Dedicated Case Study in Development</span>
            </h2>
            <p className="font-handwriting text-base text-amber-800 leading-relaxed">
              This route is scaffolded for the full deep-dive architectural write-up, data schemas, and key technical challenges for <strong>{project.title}</strong>. Full case study content will be added here in the next iteration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StampButton href="/#projects" variant="highlighter">
              Return to All Projects
            </StampButton>

            {project.links.live && (
              <StampButton href={project.links.live} variant="pencil">
                Visit Live Site
              </StampButton>
            )}
          </div>
        </TornPageCard>
      </div>
      <PencilFooter />
    </PaperSheet>
  );
}
