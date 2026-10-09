'use client';

import React from 'react';
import { contactContent } from '@/content/contact';
import { MonogramLogo } from '../primitives/MonogramLogo';
import { Mail, ExternalLink, MapPin } from 'lucide-react';

export const CorporateFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e5e5] bg-[#f9f9f9] text-[#6b6b6b] text-sm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-[#e5e5e5]">
          {/* Col 1-2: Monogram, Name, Mission */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <MonogramLogo size={36} />
              <div>
                <span className="font-bold text-base text-[#1a1a1a] block tracking-tight">
                  Mohammed Fareed
                </span>
                <span className="text-xs text-[#6b6b6b]">
                  Full-Stack Software Engineer
                </span>
              </div>
            </div>
            <p className="text-sm text-[#6b6b6b] max-w-md leading-relaxed">
              Engineering resilient web products, reliable backend systems, and modern user experiences for businesses and developers.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#6b6b6b] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#3248C3]" />
              <span>{contactContent.location}</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="lg:col-span-1 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] block">
              Navigation
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-[#3248C3] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#3248C3] transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#3248C3] transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#3248C3] transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#resume" className="hover:text-[#3248C3] transition-colors">
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4-5: Verified Channels */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] block">
              Connect Channels
            </span>
            <div className="space-y-2.5 text-sm">
              <a
                href={`mailto:${contactContent.email}`}
                className="flex items-center gap-2 text-[#1a1a1a] hover:text-[#3248C3] transition-colors font-medium group"
              >
                <Mail className="w-4 h-4 text-[#D1AA67] group-hover:scale-110 transition-transform" />
                <span className="truncate">{contactContent.email}</span>
              </a>

              <a
                href={contactContent.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#3248C3] transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#6b6b6b]" />
              </a>

              <a
                href={contactContent.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#3248C3] transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#6b6b6b]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b6b6b]">
          <div>
            © {currentYear} Mohammed Fareed Mandeeya Haruna. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#06d6a0]" />
              <span className="text-[#1a1a1a] font-medium">Systems Operational</span>
            </div>
            <span className="text-[#e5e5e5]">|</span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#eeeeee] text-[#6b6b6b] border border-[#e5e5e5]">
              v2.2.3
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
