'use client';

import React from 'react';
import { contactContent } from '@/content/contact';
import { Mail, MapPin, Heart } from 'lucide-react';

export const PlatformFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[#393B3D] bg-[#232527] pt-12 pb-24 md:pb-12 text-stone-400 font-body text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#393B3D]">
          {/* Platform Brand Note */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-md bg-[#00B06F] text-white flex items-center justify-center font-heading font-extrabold text-xs">
                P
              </span>
              <span className="font-heading font-bold text-base text-white">
                Playground Lobby
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Thanks for visiting! Built with spec-first requirements and clean architecture.
            </p>
          </div>

          {/* Contact Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-5 font-heading text-sm">
            <a
              href={`mailto:${contactContent.email}`}
              className="hover:text-[#00B06F] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>{contactContent.email}</span>
            </a>

            <a
              href={contactContent.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>GitHub</span>
            </a>

            <a
              href={contactContent.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2F7BFF] transition-colors flex items-center gap-1.5"
            >
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Location */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            © {currentYear} Mohammed Fareed Mandeeya Haruna · Tamale, Ghana
          </div>
          <div className="flex items-center gap-1">
            <span>Platform Status:</span>
            <span className="text-[#00B06F] font-semibold">100% Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
