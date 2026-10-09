'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { contactContent } from '@/content/contact';
import { heroContent } from '@/content/hero';
import { aboutContent } from '@/content/about';
import { MessageSquare, X, Send, Bot, User, Check, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const PREWRITTEN_QA = [
  {
    id: 'availability',
    question: 'Are you available for work?',
    answer: contactContent.availability,
  },
  {
    id: 'products',
    question: 'What do you build?',
    answer: `${heroContent.subline} ${aboutContent.story[1]}`,
  },
  {
    id: 'stack',
    question: 'What is your core tech stack?',
    answer:
      'My primary stack is Next.js, React, TypeScript, Node.js, Express, MongoDB, and Tailwind CSS, along with PostgreSQL, Paystack payments, and offline-first data sync.',
  },
  {
    id: 'location',
    question: 'Where are you based?',
    answer: `I am based in ${contactContent.location}, finishing my Level 400 BSc in Computer Science at UTAS in Navrongo.`,
  },
];

export const CornerChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hey there! Welcome to my portfolio lobby. Pick any question below to learn more about my background:',
    },
  ]);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const handleAsk = (item: (typeof PREWRITTEN_QA)[0]) => {
    if (askedQuestions.includes(item.id)) return;

    setAskedQuestions((prev) => [...prev, item.id]);

    // Append user question and immediate answer
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${item.id}`,
        sender: 'user',
        text: item.question,
      },
      {
        id: `bot-${item.id}`,
        sender: 'bot',
        text: item.answer,
      },
    ]);
  };

  const scrollToContact = () => {
    setIsOpen(false);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Interactive portfolio lobby chat"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 select-none"
    >
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-label="Open portfolio lobby chat"
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#00B06F] hover:bg-[#00C87E] text-white border-2 border-[#008C57] font-heading font-bold shadow-lg shadow-[#00B06F]/30 transition-colors cursor-pointer"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FFC933] rounded-full border border-[#008C57]" />
          </div>
          <span className="text-sm">Lobby Chat</span>
        </motion.button>
      )}

      {/* Expanded Chat Window Popover / Mobile Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-2 bottom-20 md:bottom-6 md:right-6 md:left-auto md:w-96 max-h-[80vh] flex flex-col bg-[#2F3133] border-2 border-[#424549] rounded-2xl shadow-2xl overflow-hidden z-50 text-[#F7F7F8]"
          >
            {/* Chat Window Header */}
            <div className="flex items-center justify-between p-3.5 bg-[#232527] border-b border-[#424549]">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#00B06F] animate-pulse" />
                <div>
                  <h3 className="font-heading font-bold text-sm text-white">
                    Fareed&apos;s Assistant
                  </h3>
                  <span className="text-[11px] font-body text-stone-400">
                    Online now · Live Verified Info
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat window"
                className="p-1.5 rounded-lg hover:bg-[#393B3D] text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Thread Scroll Area */}
            <div className="flex-1 p-3.5 space-y-3 overflow-y-auto max-h-72 sm:max-h-80 font-body text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-md bg-[#00B06F] text-white flex items-center justify-center shrink-0 text-xs font-bold font-heading">
                      F
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-2.5 rounded-xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#2F7BFF] text-white rounded-tr-xs'
                        : 'bg-[#393B3D] text-stone-200 border border-[#4A4E53] rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Question Buttons */}
            <div className="p-3 bg-[#232527] border-t border-[#424549] space-y-2">
              <span className="font-heading text-xs text-stone-400 font-bold block uppercase tracking-wider">
                Select a Question:
              </span>

              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                {PREWRITTEN_QA.map((item) => {
                  const hasBeenAsked = askedQuestions.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={hasBeenAsked}
                      onClick={() => handleAsk(item)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg font-heading transition-all text-left ${
                        hasBeenAsked
                          ? 'bg-[#1E2022] text-stone-500 cursor-default line-through'
                          : 'bg-[#393B3D] hover:bg-[#2F7BFF] text-white cursor-pointer active:scale-98'
                      }`}
                    >
                      {item.question}
                    </button>
                  );
                })}
              </div>

              {/* End CTA Action Button */}
              <button
                type="button"
                onClick={scrollToContact}
                className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#00B06F] hover:bg-[#00C87E] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Write Direct Message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
