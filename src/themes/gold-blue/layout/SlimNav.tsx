'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MonogramLogo } from '../primitives/MonogramLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'resume', label: 'Resume', href: '#resume' },
];

export const SlimNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Scrollspy observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const ids = ['hero', ...NAV_ITEMS.map((item) => item.id), 'contact'];

      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop - 120 <= scrollY) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#e5e5e5] bg-[#f9f9f9]/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Monogram and Name */}
        <a
          href="#hero"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3248C3] rounded-lg"
        >
          <MonogramLogo size={34} />
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base text-[#1a1a1a] tracking-tight group-hover:text-[#3248C3] transition-colors">
              Mohammed Fareed
            </span>
            <span className="text-[11px] text-[#6b6b6b] font-medium tracking-tight hidden sm:inline">
              Full-Stack Developer
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Primary Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#3248C3] font-semibold'
                    : 'text-[#6b6b6b] hover:text-[#1a1a1a] hover:bg-black/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#D1AA67] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Contact CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold bg-[#D1AA67] text-[#1a1a1a] hover:bg-[#C29955] transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3248C3]"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-[#1a1a1a] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3248C3]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-[#e5e5e5] bg-[#f9f9f9] px-6 py-4 overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-[#3248C3] font-semibold bg-[#3248C3]/5'
                      : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-[#e5e5e5]">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold bg-[#D1AA67] text-[#1a1a1a]"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
