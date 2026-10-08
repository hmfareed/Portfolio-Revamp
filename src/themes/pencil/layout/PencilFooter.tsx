'use client';

import React from 'react';
import { contactContent } from '@/content/contact';
import { StarDoodle } from '../primitives/Doodles';

export const PencilFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 mb-12 pt-12 border-t-2 border-dashed border-[#2B2B2B]/60 text-center font-handwriting">
      {/* Torn notebook page footer sign-off */}
      <div className="max-w-2xl mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <StarDoodle className="w-5 h-5 text-amber-400" />
          <p className="text-xl sm:text-2xl font-bold text-[#2B2B2B]">
            End of Notebook · Keep Building
          </p>
          <StarDoodle className="w-5 h-5 text-amber-400" />
        </div>

        <p className="text-lg text-stone-700 italic max-w-lg mb-6">
          &ldquo;I write the plan, data model and requirements before code, then build and ship against them.&rdquo;
        </p>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-base font-bold text-[#2B2B2B] mb-8">
          <a
            href={`mailto:${contactContent.email}`}
            className="hover:underline hover:text-[#E4572E] transition-colors"
          >
            {contactContent.email}
          </a>
          <span className="text-stone-400">·</span>
          <a
            href={contactContent.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#E4572E] transition-colors"
          >
            GitHub
          </a>
          <span className="text-stone-400">·</span>
          <a
            href={contactContent.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#E4572E] transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <div className="text-sm text-stone-600 flex flex-col items-center gap-1">
          <p>
            Designed &amp; Hand-Coded in {contactContent.location} · {currentYear}
          </p>
          <p className="text-xs text-stone-500">
            Hand-drawn Pencil Theme · Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
