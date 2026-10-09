'use client';

import React, { useActionState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { contactContent } from '@/content/contact';
import { GoldAccentLine } from '../primitives/GoldAccentLine';
import { GoldBlueButton } from '../primitives/GoldBlueButton';
import { sendContactEmail, ContactFormState } from '@/app/actions/send-contact';
import {
  Mail,
  MapPin,
  Send,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

const initialState: ContactFormState = {};

export const CalmContactSection: React.FC = () => {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-[#e5e5e5] bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] mb-3">
            Initiate Contact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
            Start a Conversation
          </h2>
          <GoldAccentLine className="w-24 h-1 mt-3" />
          <p className="mt-4 text-base text-[#6b6b6b] leading-relaxed">
            {contactContent.availability}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-7 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-[#1a1a1a] tracking-tight pb-3 border-b border-[#e5e5e5]">
                Verified Channels
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${contactContent.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-[#f9f9f9] border border-[#e5e5e5] hover:border-[#3248C3] hover:bg-white transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-[#3248C3]/10 text-[#3248C3]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs uppercase tracking-wider text-[#6b6b6b] font-medium block">
                      Direct Email
                    </span>
                    <span className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#3248C3] truncate block">
                      {contactContent.email}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#3248C3] shrink-0" />
                </a>

                {/* GitHub */}
                <a
                  href={contactContent.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-[#f9f9f9] border border-[#e5e5e5] hover:border-[#D1AA67] hover:bg-white transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-[#D1AA67]/15 text-[#9E7329]">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs uppercase tracking-wider text-[#6b6b6b] font-medium block">
                      Repositories
                    </span>
                    <span className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#9E7329] truncate block">
                      {contactContent.github.label}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#9E7329] shrink-0" />
                </a>

                {/* LinkedIn */}
                <a
                  href={contactContent.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-[#f9f9f9] border border-[#e5e5e5] hover:border-[#3248C3] hover:bg-white transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-[#3248C3]/10 text-[#3248C3]">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66A1.66 1.66 0 0 0 6.46 5.44 1.66 1.66 0 0 0 4.8 7.1a1.65 1.65 0 0 0 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs uppercase tracking-wider text-[#6b6b6b] font-medium block">
                      Network
                    </span>
                    <span className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#3248C3] truncate block">
                      {contactContent.linkedin.label}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#3248C3] shrink-0" />
                </a>

                {/* Location (NO phone number) */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#f9f9f9] border border-[#e5e5e5]">
                  <div className="p-2.5 rounded-lg bg-[#06d6a0]/15 text-[#047857]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#6b6b6b] font-medium block">
                      Primary Location
                    </span>
                    <span className="text-sm font-semibold text-[#1a1a1a]">
                      {contactContent.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-7 sm:p-10 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#e5e5e5]">
                <h3 className="text-xl font-bold text-[#1a1a1a] tracking-tight">
                  Direct Inquiries
                </h3>
                <span className="text-xs text-[#047857] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#06d6a0]" />
                  Usually replies in 24h
                </span>
              </div>

              {/* Status Alert Banner */}
              {state.message && (
                <div
                  className={`p-4 rounded-xl mb-6 text-sm font-semibold flex items-start gap-2.5 border ${
                    state.success
                      ? 'bg-[#06d6a0]/10 text-[#047857] border-[#06d6a0]/30'
                      : 'bg-[#FF0000]/10 text-[#D90000] border-[#FF0000]/30'
                  }`}
                >
                  {state.success ? (
                    <CheckCircle2 className="w-5 h-5 text-[#047857] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#D90000] shrink-0 mt-0.5" />
                  )}
                  <span>{state.message}</span>
                </div>
              )}

              <form ref={formRef} action={formAction} className="space-y-5">
                {/* Honeypot field (hidden) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Alex Hunter"
                      className="w-full px-4 py-2.5 text-sm bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl focus:border-[#3248C3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3248C3]/20 text-[#1a1a1a] transition-all"
                    />
                    {state.errors?.name && (
                      <p className="text-xs text-[#D90000] mt-1 font-medium">
                        {state.errors.name[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] mb-1.5"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. alex@example.com"
                      className="w-full px-4 py-2.5 text-sm bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl focus:border-[#3248C3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3248C3]/20 text-[#1a1a1a] transition-all"
                    />
                    {state.errors?.email && (
                      <p className="text-xs text-[#D90000] mt-1 font-medium">
                        {state.errors.email[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] mb-1.5"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="e.g. Engineering Role / Freelance Inquiry"
                    className="w-full px-4 py-2.5 text-sm bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl focus:border-[#3248C3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3248C3]/20 text-[#1a1a1a] transition-all"
                  />
                  {state.errors?.subject && (
                    <p className="text-xs text-[#D90000] mt-1 font-medium">
                      {state.errors.subject[0]}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your initiative, timeline, or project goals..."
                    className="w-full px-4 py-3 text-sm bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl focus:border-[#3248C3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3248C3]/20 text-[#1a1a1a] transition-all resize-y min-h-[110px]"
                  />
                  {state.errors?.message && (
                    <p className="text-xs text-[#D90000] mt-1 font-medium">
                      {state.errors.message[0]}
                    </p>
                  )}
                </div>

                {/* Primary Company Gold Button */}
                <div className="pt-2">
                  <GoldBlueButton
                    type="submit"
                    disabled={isPending}
                    variant="highlighter"
                    className="w-full py-3.5 text-base shadow-sm"
                  >
                    {isPending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#1a1a1a] border-t-transparent animate-spin mr-1 rounded-full" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-1.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </GoldBlueButton>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
