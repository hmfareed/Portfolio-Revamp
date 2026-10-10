'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

interface KanbanTask {
  id: string;
  title: string;
  tag: string;
  assignee: string;
  status: 'backlog' | 'in_progress' | 'done';
}

const INITIAL_TASKS: KanbanTask[] = [
  { id: 'task-1', title: 'Implement WebSocket delta sync', tag: 'Realtime', assignee: 'Fareed', status: 'done' },
  { id: 'task-2', title: 'Mako AI vector embeddings pipeline', tag: 'AI Engine', assignee: 'Mako AI', status: 'in_progress' },
  { id: 'task-3', title: 'Multi-tenant workspace isolation', tag: 'Database', assignee: 'Fareed', status: 'backlog' },
];

const MAKO_PROMPTS: Record<string, string> = {
  blockers: 'Mako AI Analysis: "Task-3 (Multi-tenant isolation) has an open dependency on DB connection pooling. All other sprint tasks are progressing on schedule (<50ms latency target met)."',
  velocity: 'Mako AI Analysis: "Current sprint velocity is 94% on track. 2 of 3 roadmap deliverables completed or actively passing automated tests. Projected release: 24h ahead of schedule."',
  optimize: 'Mako AI Analysis: "Rebalancing task loads: Task-2 AI embeddings indexed. Reassigning sub-tasks to Fareed with spec-first modular testing harnesses."',
};

export const KlyroTaskAiPlayground: React.FC = () => {
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const moveTask = (id: string) => {
    pencilSoundEngine.playPop();
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus = t.status === 'backlog' ? 'in_progress' : t.status === 'in_progress' ? 'done' : 'backlog';
        return { ...t, status: nextStatus };
      })
    );
  };

  const handleAskMako = (key: string) => {
    pencilSoundEngine.playPencilScribble();
    setIsAiThinking(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsAiThinking(false);
      setAiResponse(MAKO_PROMPTS[key]);
      pencilSoundEngine.playPop();
    }, 650);
  };

  return (
    <div className="my-10 p-5 sm:p-6 bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[5px_5px_0px_#2B2B2B] font-mono text-xs sm:text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b-2 border-dashed border-[#2B2B2B]/20">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <div>
            <span className="font-heading font-bold text-lg text-[#2B2B2B] block">
              Interactive System Simulator: Klyro Sprint Board &amp; Mako AI
            </span>
            <span className="text-xs text-[#2B2B2B]/70">
              Click any card to advance its sprint state, or ask Mako AI for live workflow analysis.
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#FEF08A] border border-[#2B2B2B]/30 font-bold text-[11px]">
          Live WebSocket Sync Simulation
        </span>
      </div>

      {/* Mini 3-Lane Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {[
          { key: 'backlog', label: '1. Sprint Backlog', bg: '#F5EFEB' },
          { key: 'in_progress', label: '2. In Progress', bg: '#FEF08A' },
          { key: 'done', label: '3. Deployed / Done', bg: '#BBF7D0' },
        ].map((lane) => (
          <div key={lane.key} className="p-3 rounded border border-[#2B2B2B]/25 bg-white/60 flex flex-col min-h-[140px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2B2B2B]/15">
              <span className="font-bold text-xs text-[#2B2B2B]">{lane.label}</span>
              <span className="text-[10px] text-[#2B2B2B]/50">
                ({tasks.filter((t) => t.status === lane.key).length})
              </span>
            </div>

            <div className="space-y-2 flex-1">
              {tasks
                .filter((t) => t.status === lane.key)
                .map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    onClick={() => moveTask(task.id)}
                    className="p-2.5 rounded bg-white border border-[#2B2B2B]/30 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer select-none group"
                  >
                    <div className="font-bold text-xs text-[#2B2B2B] mb-1 group-hover:text-[#E4572E] transition-colors">
                      {task.title}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#2B2B2B]/70">
                      <span className="px-1 py-0.2 bg-[#FAF6EC] rounded border border-[#2B2B2B]/20">
                        {task.tag}
                      </span>
                      <span>Assignee: {task.assignee}</span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mako AI Command Bar */}
      <div className="p-3.5 bg-[#FAF6EC] rounded border border-[#2B2B2B]/25 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold text-xs text-[#2B2B2B]">
            Query Mako AI Autonomous Assistant:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleAskMako('blockers')}
              className="px-2 py-1 rounded bg-white hover:bg-stone-50 border border-[#2B2B2B]/30 text-xs font-bold cursor-pointer text-[#2B2B2B]"
            >
              Check Sprint Blockers
            </button>
            <button
              onClick={() => handleAskMako('velocity')}
              className="px-2 py-1 rounded bg-white hover:bg-stone-50 border border-[#2B2B2B]/30 text-xs font-bold cursor-pointer text-[#2B2B2B]"
            >
              Project Velocity
            </button>
            <button
              onClick={() => handleAskMako('optimize')}
              className="px-2 py-1 rounded bg-white hover:bg-stone-50 border border-[#2B2B2B]/30 text-xs font-bold cursor-pointer text-[#2B2B2B]"
            >
              Rebalance Workload
            </button>
          </div>
        </div>

        {/* AI Output Stream Box */}
        <AnimatePresence mode="wait">
          {isAiThinking ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-2.5 bg-white rounded border border-[#2B2B2B]/20 text-xs text-[#2B2B2B]/60 italic"
            >
              Mako AI is parsing repository AST &amp; sprint lane dependencies...
            </motion.div>
          ) : aiResponse ? (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-2.5 bg-white rounded border border-[#059669] text-xs text-[#065F46] font-medium leading-relaxed"
            >
              {aiResponse}
            </motion.div>
          ) : (
            <div className="text-[11px] text-[#2B2B2B]/50 italic">
              Click a prompt above to simulate Mako AI contextual project management.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
