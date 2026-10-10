'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDoodleTerminal } from '../context/DoodleTerminalContext';
import { useInkColor, InkColor } from '../context/InkColorContext';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';
import { projectsContent } from '@/content/projects';
import { skillsContent } from '@/content/skills';
import { experienceContent } from '@/content/experience';
import { aboutContent } from '@/content/about';
import { contactContent } from '@/content/contact';

interface LogEntry {
  id: string;
  command: string;
  content: React.ReactNode;
  timestamp: string;
}

const COMMAND_SUGGESTIONS = [
  'help',
  'projects',
  'skills',
  'experience',
  'resume',
  'whoami',
  'contact',
  'sudo hire fareed',
];

const CELEBRATION_STARS = [
  { id: 1, symbol: '★', color: '#F59E0B', x: -80, y: -70, rot: -20, delay: 0 },
  { id: 2, symbol: '✦', color: '#3B82F6', x: 80, y: -80, rot: 25, delay: 0.05 },
  { id: 3, symbol: '✎', color: '#E4572E', x: -120, y: -20, rot: -45, delay: 0.1 },
  { id: 4, symbol: 'HIRED!', color: '#B91C1C', x: 0, y: -110, rot: -3, delay: 0.08 },
  { id: 5, symbol: '✔', color: '#059669', x: 100, y: -25, rot: 15, delay: 0.12 },
  { id: 6, symbol: '✧', color: '#8B5CF6', x: 50, y: -100, rot: -15, delay: 0.14 },
  { id: 7, symbol: '★', color: '#F59E0B', x: -30, y: -120, rot: 30, delay: 0.16 },
];

export const DoodleTerminal: React.FC = () => {
  const { isOpen, closeTerminal } = useDoodleTerminal();
  const { ink, setInk, currentPreset } = useInkColor();
  const router = useRouter();

  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [celebrating, setCelebrating] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll output when logs update
  useEffect(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Focus input automatically when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [isOpen]);

  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const executeCommand = useCallback(
    (rawCmd: string) => {
      const trimmed = rawCmd.trim();
      if (!trimmed) return;

      pencilSoundEngine.playPop();

      // Add to command history
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.split(' ');
      const mainCmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ').trim().toLowerCase();

      const entryId = `entry-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const timeStr = getTimeString();

      // Clear command
      if (mainCmd === 'clear' || mainCmd === 'cls') {
        setLogs([]);
        setInput('');
        return;
      }

      // Exit command
      if (mainCmd === 'exit' || mainCmd === 'close' || mainCmd === 'quit') {
        closeTerminal();
        setInput('');
        return;
      }

      let content: React.ReactNode = null;

      switch (mainCmd) {
        case 'help':
        case '?': {
          content = (
            <div className="space-y-3 text-xs sm:text-sm font-mono leading-relaxed">
              <div className="text-[#2B2B2B]/70 italic border-b border-[#2B2B2B]/20 pb-1">
                Sketchbook Developer CLI — Available Commands:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                <div className="p-2.5 rounded bg-white/60 border border-[#2B2B2B]/20 space-y-1">
                  <div className="font-bold text-[#E4572E] text-xs uppercase tracking-wider">
                    📁 Portfolios &amp; Builds
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">projects</span> /{' '}
                    <span className="font-bold text-[#2B2B2B]">ls</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      List all 6 software products &amp; deep-dive architectural case studies
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">case-study &lt;slug&gt;</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      Open deep dive for klyro, kayspacks, hanara-portal, etc.
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white/60 border border-[#2B2B2B]/20 space-y-1">
                  <div className="font-bold text-[#2563EB] text-xs uppercase tracking-wider">
                    👤 Profile &amp; Background
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">skills</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      Languages, frontend, backend, databases &amp; DevOps
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">experience</span> /{' '}
                    <span className="font-bold text-[#2B2B2B]">history</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      ELAGENT, TMA MIS Dept, UTAS ML Team, Hanara Schools
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">resume</span> /{' '}
                    <span className="font-bold text-[#2B2B2B]">cat resume</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      Credentials, tech summary &amp; direct PDF download
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">whoami</span> /{' '}
                    <span className="font-bold text-[#2B2B2B]">about</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      Bio of Mohammed Fareed Mandeeya Haruna
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">contact</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      Email, GitHub, LinkedIn and direct channels
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white/60 border border-[#2B2B2B]/20 space-y-1">
                  <div className="font-bold text-[#059669] text-xs uppercase tracking-wider">
                    🎨 Desk &amp; Sketch Settings
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">tint &lt;color&gt;</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      Switch ink: <code className="bg-black/5 px-1 rounded">graphite</code> |{' '}
                      <code className="bg-black/5 px-1 rounded">blue</code> |{' '}
                      <code className="bg-black/5 px-1 rounded">red</code> |{' '}
                      <code className="bg-black/5 px-1 rounded">emerald</code>
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">sound &lt;on|off|toggle&gt;</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      Control Web Audio tactile sketchbook sound synthesizer
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white/60 border border-[#2B2B2B]/20 space-y-1">
                  <div className="font-bold text-[#D97706] text-xs uppercase tracking-wider">
                    ⚡ Utilities &amp; Easter Eggs
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">sudo hire fareed</span> /{' '}
                    <span className="font-bold text-[#2B2B2B]">hire</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      Launch candidate hiring sequence &amp; celebration ★
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2B2B2B]">clear</span> /{' '}
                    <span className="font-bold text-[#2B2B2B]">exit</span>
                    <span className="text-[#2B2B2B]/70 block text-[11px]">
                      Clear terminal screen or close terminal drawer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
          break;
        }

        case 'projects':
        case 'ls': {
          content = (
            <div className="space-y-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-[#2B2B2B]/20 pb-1.5">
                <span className="font-bold text-[#2B2B2B]">
                  Found {projectsContent.length} Flagship Engineering Builds:
                </span>
                <span className="text-[#2B2B2B]/60 text-[11px]">Type `case-study &lt;slug&gt;`</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {projectsContent.map((p, idx) => (
                  <div
                    key={p.slug}
                    className="p-3 bg-white/70 rounded border border-[#2B2B2B]/25 hover:border-[#2B2B2B] transition-colors"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                      <div className="font-bold text-sm text-[#2B2B2B]">
                        <span className="text-[#E4572E] mr-1.5">{idx + 1}.</span>
                        {p.title}
                      </div>
                      <span className="text-[11px] font-handwriting px-1.5 py-0.5 rounded bg-[#FEF08A] border border-[#2B2B2B]/30 font-bold">
                        {p.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#2B2B2B]/80 mb-2 leading-relaxed">{p.pitch}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {p.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-1.5 py-0.5 bg-[#2B2B2B]/5 rounded border border-[#2B2B2B]/15 text-[#2B2B2B]/90"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.stack.length > 5 && (
                        <span className="text-[10px] text-[#2B2B2B]/60 self-center">
                          +{p.stack.length - 5} more
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#2B2B2B]/10">
                      <button
                        onClick={() => {
                          closeTerminal();
                          router.push(`/projects/${p.slug}`);
                        }}
                        className="text-xs px-2 py-0.5 font-bold bg-[#E4572E] text-white rounded border border-[#2B2B2B] hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>📖 Architectural Case Study →</span>
                      </button>
                      {p.links.live && (
                        <a
                          href={p.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-0.5 font-medium bg-[#2B2B2B]/5 text-[#2B2B2B] rounded border border-[#2B2B2B]/20 hover:bg-[#2B2B2B]/10 transition-colors"
                        >
                          Live Demo ↗
                        </a>
                      )}
                      {p.links.github && (
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-0.5 font-medium bg-[#2B2B2B]/5 text-[#2B2B2B] rounded border border-[#2B2B2B]/20 hover:bg-[#2B2B2B]/10 transition-colors"
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
          break;
        }

        case 'case-study': {
          const targetSlug = arg;
          const found = projectsContent.find(
            (p) => p.slug.toLowerCase() === targetSlug || p.slug.toLowerCase().includes(targetSlug)
          );
          if (found) {
            content = (
              <div className="text-xs sm:text-sm font-mono text-[#059669]">
                ✓ Navigating to deep-dive case study for: <strong>{found.title}</strong>...
              </div>
            );
            setTimeout(() => {
              closeTerminal();
              router.push(`/projects/${found.slug}`);
            }, 500);
          } else {
            content = (
              <div className="text-xs sm:text-sm font-mono text-[#B91C1C]">
                Case study not found: &quot;{arg}&quot;. Available slugs:{' '}
                {projectsContent.map((p) => p.slug).join(', ')}
              </div>
            );
          }
          break;
        }

        case 'skills': {
          content = (
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="font-bold text-[#2B2B2B] border-b border-[#2B2B2B]/20 pb-1">
                Technical Stack &amp; Skill Matrix:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {skillsContent.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-2.5 bg-white/70 rounded border border-[#2B2B2B]/20"
                  >
                    <div className="font-bold text-xs uppercase text-[#E4572E] mb-1.5 flex items-center justify-between">
                      <span>{cat.title}</span>
                      <span className="text-[10px] text-[#2B2B2B]/50 font-normal">
                        ({cat.skills.length})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] px-1.5 py-0.5 bg-[#FAF6EC] border border-[#2B2B2B]/15 rounded text-[#2B2B2B]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
          break;
        }

        case 'experience':
        case 'history':
        case 'work': {
          content = (
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="font-bold text-[#2B2B2B] border-b border-[#2B2B2B]/20 pb-1 flex items-center justify-between">
                <span>Engineering Experience Timeline:</span>
                <span className="text-xs text-[#2B2B2B]/60 font-normal">Ghana &amp; Remote</span>
              </div>
              <div className="space-y-2.5">
                {experienceContent.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3 bg-white/70 rounded border border-[#2B2B2B]/20 space-y-1.5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <div className="font-bold text-[#2B2B2B]">
                        {exp.role} <span className="text-[#E4572E]">@ {exp.organization}</span>
                      </div>
                      <span className="text-[11px] text-[#2B2B2B]/70 bg-[#2B2B2B]/5 px-1.5 py-0.5 rounded">
                        {exp.period} ({exp.type})
                      </span>
                    </div>
                    <div className="text-[11px] text-[#2B2B2B]/60 italic">{exp.location}</div>
                    <ul className="list-disc list-inside space-y-0.5 text-xs text-[#2B2B2B]/85">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
          break;
        }

        case 'resume':
        case 'cat': {
          if (mainCmd === 'cat' && arg !== 'resume' && arg !== 'resume.pdf') {
            content = (
              <div className="text-xs font-mono text-[#B91C1C]">
                cat: {arg || 'file'}: No such file or directory. Try: `cat resume` or `resume`
              </div>
            );
            break;
          }
          content = (
            <div className="space-y-3 font-mono text-xs sm:text-sm bg-white/80 p-3.5 rounded border border-[#2B2B2B]/25">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2B2B2B]/20 pb-2">
                <div>
                  <div className="font-bold text-sm sm:text-base text-[#2B2B2B]">
                    Mohammed Fareed Mandeeya Haruna
                  </div>
                  <div className="text-xs text-[#2B2B2B]/70">
                    Full-Stack Software Developer &amp; Computer Science Student
                  </div>
                </div>
                <a
                  href="/Mohammed-Fareed_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Mohammed-Fareed_Resume.pdf"
                  className="px-3 py-1 bg-[#E4572E] text-white rounded font-bold text-xs border border-[#2B2B2B] shadow-[2px_2px_0px_#2B2B2B] hover:opacity-95 transition-opacity inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>📄 Download Resume (PDF)</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="font-bold text-xs uppercase text-[#E4572E] mb-1">Education</div>
                  <div className="text-xs text-[#2B2B2B] leading-relaxed">
                    <strong>BSc Computer Science (Level 400)</strong>
                    <br />
                    University of Technology and Applied Sciences (UTAS), Navrongo
                    <br />
                    <span className="text-[#2B2B2B]/60">2024 – 2027 (expected)</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-xs uppercase text-[#2563EB] mb-1">
                    Core Technologies
                  </div>
                  <div className="text-xs text-[#2B2B2B] leading-relaxed">
                    TypeScript, React, Next.js, Node.js, Express, PostgreSQL, Supabase, Docker,
                    MongoDB, Tailwind CSS, REST APIs, WebSockets.
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2B2B2B]/15 text-[11px] text-[#2B2B2B]/80 flex items-center justify-between">
                <span>Location: Tamale, Ghana (open to remote &amp; relocation)</span>
                <span className="font-bold text-[#059669]">Status: Available for Opportunities</span>
              </div>
            </div>
          );
          break;
        }

        case 'whoami':
        case 'about': {
          content = (
            <div className="space-y-2.5 font-mono text-xs sm:text-sm bg-white/70 p-3 rounded border border-[#2B2B2B]/20 leading-relaxed">
              <div className="font-bold text-sm text-[#2B2B2B]">
                {aboutContent.name} — {aboutContent.roleDescription}
              </div>
              <div className="text-xs text-[#2B2B2B]/70">Based in {aboutContent.location}</div>
              <div className="space-y-1.5 pt-1 text-xs text-[#2B2B2B]/90">
                {aboutContent.story.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className="pt-2 border-t border-[#2B2B2B]/15">
                <span className="font-bold text-xs text-[#E4572E]">Key Highlights:</span>
                <ul className="list-disc list-inside text-xs text-[#2B2B2B]/80 mt-1 space-y-0.5">
                  {aboutContent.quickFacts.map((fact, i) => (
                    <li key={i}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
          break;
        }

        case 'contact': {
          content = (
            <div className="space-y-2.5 font-mono text-xs sm:text-sm bg-white/70 p-3 rounded border border-[#2B2B2B]/20">
              <div className="font-bold text-[#2B2B2B] border-b border-[#2B2B2B]/20 pb-1">
                Direct Contact Channels:
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-20 text-[#2B2B2B]/60 font-bold">Email:</span>
                  <a
                    href={`mailto:${contactContent.email}`}
                    className="text-[#E4572E] font-bold underline hover:opacity-80"
                  >
                    {contactContent.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-20 text-[#2B2B2B]/60 font-bold">GitHub:</span>
                  <a
                    href={contactContent.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] underline hover:opacity-80"
                  >
                    {contactContent.github.label}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-20 text-[#2B2B2B]/60 font-bold">LinkedIn:</span>
                  <a
                    href={contactContent.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] underline hover:opacity-80"
                  >
                    {contactContent.linkedin.label}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-20 text-[#2B2B2B]/60 font-bold">Location:</span>
                  <span className="text-[#2B2B2B]">{contactContent.location}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#2B2B2B]/15 flex items-center gap-2">
                <a
                  href={`mailto:${contactContent.email}?subject=Project%20Opportunity`}
                  className="px-2.5 py-1 bg-[#059669] text-white rounded font-bold text-xs border border-[#2B2B2B] hover:opacity-90 inline-block"
                >
                  ✉ Send Email Message
                </a>
              </div>
            </div>
          );
          break;
        }

        case 'tint': {
          const validColors: InkColor[] = ['graphite', 'blue', 'red', 'emerald'];
          if (validColors.includes(arg as InkColor)) {
            setInk(arg as InkColor);
            pencilSoundEngine.playPencilScribble();
            content = (
              <div className="text-xs sm:text-sm font-mono text-[#059669]">
                ✓ Switched active pencil ink to &quot;<strong>{arg}</strong>&quot;. Notebook margins,
                doodles, and highlights are now tinted.
              </div>
            );
          } else {
            content = (
              <div className="space-y-1 text-xs font-mono">
                <div className="text-[#B91C1C]">
                  Unknown ink tint &quot;{arg || '(empty)'}&quot;.
                </div>
                <div className="text-[#2B2B2B]/80">
                  Available options:{' '}
                  {validColors.map((c) => (
                    <button
                      key={c}
                      onClick={() => executeCommand(`tint ${c}`)}
                      className={`mr-2 px-1.5 py-0.5 rounded border border-[#2B2B2B]/30 font-bold ${
                        ink === c ? 'bg-[#FFE66D]' : 'bg-white/80'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            );
          }
          break;
        }

        case 'sound': {
          if (arg === 'on') {
            pencilSoundEngine.setEnabled(true);
            pencilSoundEngine.playPop();
            content = (
              <div className="text-xs font-mono text-[#059669]">
                🔊 Synthesized tactile sound effects: <strong>ENABLED</strong>
              </div>
            );
          } else if (arg === 'off') {
            pencilSoundEngine.setEnabled(false);
            content = (
              <div className="text-xs font-mono text-[#2B2B2B]/70">
                🔇 Synthesized tactile sound effects: <strong>MUTED</strong>
              </div>
            );
          } else {
            const next = pencilSoundEngine.toggle();
            content = (
              <div className="text-xs font-mono text-[#2B2B2B]">
                Tactile sound effects toggled to:{' '}
                <strong>{next ? '🔊 ENABLED' : '🔇 MUTED'}</strong>
              </div>
            );
          }
          break;
        }

        case 'sudo':
        case 'hire': {
          if (mainCmd === 'sudo' && arg !== 'hire fareed' && arg !== 'hire') {
            content = (
              <div className="text-xs font-mono text-[#B91C1C]">
                sudo: {arg}: command not found. Did you mean `sudo hire fareed`?
              </div>
            );
            break;
          }

          // Easter egg celebration!
          pencilSoundEngine.playChime();
          setCelebrating(true);
          setTimeout(() => setCelebrating(false), 4500);

          content = (
            <div className="space-y-3 font-mono text-xs sm:text-sm bg-[#FEF08A]/70 p-3 sm:p-4 rounded border-2 border-[#2B2B2B] shadow-[3px_3px_0px_#2B2B2B]">
              <div className="text-center font-bold text-[#B91C1C] text-sm sm:text-base tracking-wider uppercase">
                ★ ★ ★ HIRING SEQUENCE INITIALIZED ★ ★ ★
              </div>
              <p className="text-xs text-[#2B2B2B] leading-relaxed">
                <strong>Congratulations!</strong> You just made an exceptional engineering decision.
                Fareed brings full-stack speed, spec-first planning, real-world database &amp; Docker
                rigor, and genuine dedication to building products that work.
              </p>
              <div className="p-2.5 bg-white/80 rounded border border-[#2B2B2B]/20 space-y-1 text-xs">
                <div>
                  <strong>Candidate:</strong> Mohammed Fareed Mandeeya Haruna
                </div>
                <div>
                  <strong>Target Roles:</strong> Full-Stack Engineer, Frontend / Backend Engineer
                </div>
                <div>
                  <strong>Status:</strong> Available immediately for remote roles &amp; high-impact
                  contracts
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={`mailto:${contactContent.email}?subject=Interview%20Invitation%20for%20Mohammed%20Fareed`}
                  className="px-3 py-1.5 bg-[#B91C1C] text-white font-bold rounded border border-[#2B2B2B] shadow-xs hover:opacity-90 inline-flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <span>✉ Schedule Interview / Send Offer</span>
                </a>
                <a
                  href="/Mohammed-Fareed_Resume.pdf"
                  download="Mohammed-Fareed_Resume.pdf"
                  className="px-3 py-1.5 bg-white text-[#2B2B2B] font-bold rounded border border-[#2B2B2B] hover:bg-[#FAF6EC] inline-flex items-center gap-1.5 text-xs"
                >
                  <span>📄 Grab Resume PDF</span>
                </a>
              </div>
            </div>
          );
          break;
        }

        default: {
          content = (
            <div className="text-xs font-mono text-[#B91C1C] space-y-1">
              <div>
                Command not found: &quot;<strong>{trimmed}</strong>&quot;.
              </div>
              <div className="text-[#2B2B2B]/70">
                Type <button onClick={() => executeCommand('help')} className="underline font-bold text-[#2B2B2B]">help</button> to see available commands, or click any suggestion pill above.
              </div>
            </div>
          );
        }
      }

      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          command: trimmed,
          content,
          timestamp: timeStr,
        },
      ]);
      setInput('');
    },
    [closeTerminal, ink, router, setInk]
  );

  // Keyboard navigation & tab autocompletion
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (!current) return;
      const match = COMMAND_SUGGESTIONS.find((cmd) => cmd.startsWith(current));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-label="Developer Terminal"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
        >
          {/* Backdrop blur with hand-drawn pencil hatching texture */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeTerminal}
            className="absolute inset-0 bg-[#2B2B2B]/45 backdrop-blur-xs cursor-pointer"
          />

          {/* Celebratory Doodle Particles */}
          {celebrating && (
            <div className="pointer-events-none absolute inset-0 z-60 overflow-hidden flex items-center justify-center">
              {CELEBRATION_STARS.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.3, 1.4, 1.2, 0.5],
                    x: p.x * 2.2,
                    y: p.y * 2.2,
                    rotate: p.rot,
                  }}
                  transition={{ duration: 1.8, delay: p.delay, ease: 'easeOut' }}
                  style={{ color: p.color }}
                  className="absolute text-3xl font-bold select-none"
                >
                  {p.symbol}
                </motion.div>
              ))}
            </div>
          )}

          {/* Terminal Window Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-[#FAF6EC] rounded-lg border-2 border-[#2B2B2B] shadow-[8px_8px_0px_#2B2B2B] overflow-hidden z-10"
            style={{
              backgroundImage:
                'radial-gradient(#2B2B2B 0.5px, transparent 0.5px), repeating-linear-gradient(to bottom, transparent, transparent 23px, #E5DFC8 23px, #E5DFC8 24px)',
              backgroundSize: '16px 16px, 100% 24px',
            }}
          >
            {/* Vintage masking tape strip over top frame */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#EBDDBE]/90 border border-[#2B2B2B]/30 rotate-[-1deg] shadow-xs pointer-events-none z-30"
              aria-hidden="true"
            />

            {/* Window Header */}
            <div className="shrink-0 px-3 sm:px-4 py-2.5 bg-[#EFE8D6] border-b-2 border-[#2B2B2B] flex items-center justify-between gap-2 select-none">
              {/* Window Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={closeTerminal}
                  title="Close Terminal (Esc)"
                  className="w-3.5 h-3.5 rounded-full bg-[#E4572E] border border-[#2B2B2B] hover:opacity-80 transition-opacity cursor-pointer"
                />
                <button
                  onClick={() => setLogs([])}
                  title="Clear Terminal Screen"
                  className="w-3.5 h-3.5 rounded-full bg-[#FFE66D] border border-[#2B2B2B] hover:opacity-80 transition-opacity cursor-pointer"
                />
                <button
                  onClick={() => executeCommand('sudo hire fareed')}
                  title="Initialize Hiring Easter Egg ★"
                  className="w-3.5 h-3.5 rounded-full bg-[#059669] border border-[#2B2B2B] hover:opacity-80 transition-opacity cursor-pointer"
                />
              </div>

              {/* Title / Path */}
              <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-[#2B2B2B] truncate">
                <span className="text-[#E4572E]">✎</span>
                <span className="truncate">fareed@sketchbook: ~/portfolio</span>
                <span className="hidden sm:inline text-[#2B2B2B]/40 font-normal">
                  (Doodle CLI v1.0)
                </span>
              </div>

              {/* Shortcuts & Ink Indicator */}
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-[#2B2B2B]"
                  style={{ backgroundColor: currentPreset.hex }}
                  title={`Active Ink: ${currentPreset.name}`}
                />
                <kbd
                  onClick={closeTerminal}
                  className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/80 border border-[#2B2B2B]/30 rounded shadow-2xs text-[#2B2B2B]/70 cursor-pointer hover:bg-white"
                >
                  ESC
                </kbd>
              </div>
            </div>

            {/* Quick Action Suggestion Chips Bar */}
            <div className="shrink-0 px-3 sm:px-4 py-1.5 bg-[#F5EFEB]/95 border-b border-[#2B2B2B]/15 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <span className="text-[11px] font-mono text-[#2B2B2B]/60 shrink-0 mr-1">
                Quick cmds:
              </span>
              {COMMAND_SUGGESTIONS.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="shrink-0 px-2 py-0.5 rounded bg-white/80 border border-[#2B2B2B]/20 font-mono text-[11px] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-[#FAF6EC] hover:border-[#2B2B2B] transition-colors cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Body / Output History */}
            <div
              ref={terminalBodyRef}
              className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-4 max-h-[58vh] min-h-[220px]"
            >
              {/* Terminal Welcome Header */}
              <div className="p-3 bg-white/75 rounded border border-[#2B2B2B]/20 font-mono text-xs leading-relaxed space-y-1">
                <div className="font-bold text-[#E4572E]">
                  ╔════════════════════════════════════════════════════════════════════╗
                </div>
                <div className="font-bold text-[#2B2B2B] flex flex-wrap items-center justify-between">
                  <span>✎ MOHAMMED FAREED — DOODLE CLI v1.0</span>
                  <span className="text-[11px] text-[#2B2B2B]/60 font-normal">Tamale, Ghana</span>
                </div>
                <div className="text-[#2B2B2B]/80 text-[11px]">
                  Welcome to my portfolio sketchbook terminal. Type <code className="font-bold text-[#2B2B2B]">help</code> or click any quick pill above to explore builds, skills, credentials, and interactive desk controls.
                </div>
                <div className="font-bold text-[#E4572E]">
                  ╚════════════════════════════════════════════════════════════════════╝
                </div>
              </div>

              {/* Past Executed Logs */}
              {logs.map((entry) => (
                <div key={entry.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-[#2B2B2B]/80">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#059669] font-bold">➜</span>
                      <span className="text-[#2B2B2B]/60 font-bold">fareed@sketchbook:~$</span>
                      <span className="font-bold text-[#2B2B2B]">{entry.command}</span>
                    </div>
                    <span className="text-[10px] text-[#2B2B2B]/40">{entry.timestamp}</span>
                  </div>
                  <div className="pl-4 border-l-2 border-[#2B2B2B]/20 py-0.5">{entry.content}</div>
                </div>
              ))}

              <div ref={outputEndRef} />
            </div>

            {/* Terminal Input Bar */}
            <div className="shrink-0 p-2.5 sm:p-3 bg-[#EFE8D6] border-t-2 border-[#2B2B2B] flex items-center gap-2">
              <span className="font-mono font-bold text-xs sm:text-sm text-[#059669] shrink-0 select-none">
                fareed@sketchbook:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. help, projects, hire)..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-[#2B2B2B] placeholder:text-[#2B2B2B]/40 selection:bg-[#FFE66D]"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <button
                onClick={() => executeCommand(input)}
                className="px-2.5 py-1 bg-[#2B2B2B] text-[#FAF6EC] font-mono text-xs font-bold rounded hover:bg-[#404040] transition-colors cursor-pointer shrink-0"
              >
                ↵ Run
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
