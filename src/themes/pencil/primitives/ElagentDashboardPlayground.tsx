'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

interface QueryResult {
  columns: string[];
  rows: (string | number)[][];
  timing: string;
}

const PRESET_QUERIES: Record<string, { sql: string; result: QueryResult }> = {
  users: {
    sql: 'SELECT id, role, email_domain, status FROM platform_users LIMIT 3;',
    result: {
      columns: ['id', 'role', 'email_domain', 'status'],
      rows: [
        ['usr_9a41', 'super_admin', '@elagent.io', 'ACTIVE'],
        ['usr_210c', 'operator', '@client.corp', 'ACTIVE'],
        ['usr_77f3', 'analyst', '@partner.dev', 'ACTIVE'],
      ],
      timing: '1.2ms (Supabase PostgreSQL indexed scan)',
    },
  },
  metrics: {
    sql: 'SELECT service, memory_mb, cpu_pct, container_status FROM docker_topology;',
    result: {
      columns: ['service', 'memory_mb', 'cpu_pct', 'container_status'],
      rows: [
        ['elagent-admin-web', '142 MB', '1.4%', 'RUNNING (port 3000)'],
        ['supabase-db-pg16', '384 MB', '3.1%', 'HEALTHY (port 5432)'],
        ['redis-cache', '38 MB', '0.4%', 'RUNNING (port 6379)'],
      ],
      timing: '0.8ms (Docker daemon socket query)',
    },
  },
  audit: {
    sql: "SELECT event_id, action, actor, timestamp FROM audit_logs ORDER BY timestamp DESC LIMIT 3;",
    result: {
      columns: ['event_id', 'action', 'actor', 'timestamp'],
      rows: [
        ['evt_1042', 'SCHEMA_MIGRATION_V4', 'fareed@elagent', '2 mins ago'],
        ['evt_1041', 'ADMIN_PORTAL_DEPLOY', 'github-actions', '14 mins ago'],
        ['evt_1040', 'DOCKER_COMPOSE_RELOAD', 'system', '1 hour ago'],
      ],
      timing: '1.6ms (PostgreSQL B-Tree index scan)',
    },
  },
};

export const ElagentDashboardPlayground: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'sql' | 'docker' | 'kpis'>('sql');
  const [activeQueryKey, setActiveQueryKey] = useState<string>('users');
  const [restartingContainer, setRestartingContainer] = useState<string | null>(null);

  const handleQuerySelect = (key: string) => {
    pencilSoundEngine.playPop();
    setActiveQueryKey(key);
  };

  const handleRestartContainer = (name: string) => {
    pencilSoundEngine.playPencilScribble();
    setRestartingContainer(name);
    setTimeout(() => {
      setRestartingContainer(null);
      pencilSoundEngine.playChime();
    }, 1200);
  };

  const currentQuery = PRESET_QUERIES[activeQueryKey] || PRESET_QUERIES.users;

  return (
    <div className="mt-4 pt-3 border-t border-dashed border-[#2B2B2B]/20">
      {/* Accordion Toggle */}
      <button
        onClick={() => {
          pencilSoundEngine.playPaperFlip();
          setIsOpen((prev) => !prev);
        }}
        className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded bg-[#FAF6EC] border-2 border-[#2B2B2B] shadow-[2px_2px_0px_#2B2B2B] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="text-lg sm:text-xl">⚡</span>
          <div>
            <div className="font-heading font-bold text-sm sm:text-base text-[#2B2B2B] group-hover:text-[#E4572E] transition-colors">
              Interactive Ops Console: Admin Dashboard &amp; Supabase / Docker Stack
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-[#2B2B2B]/70">
              Live SQL query scratchpad, Supabase data models &amp; Docker container topology
            </div>
          </div>
        </div>
        <span className="font-mono font-bold text-xs px-2 py-1 bg-white rounded border border-[#2B2B2B]/30 text-[#2B2B2B] shrink-0 ml-2">
          {isOpen ? '▲ Close Console' : '▼ Inspect Stack'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2.5 p-4 rounded bg-[#FFFDF8] border-2 border-[#2B2B2B] shadow-[4px_4px_0px_#2B2B2B] font-mono text-xs sm:text-sm">
              {/* Header Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#2B2B2B]/20">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="font-bold text-[#2B2B2B] text-xs">
                    ELAGENT Ops Environment
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      pencilSoundEngine.playPop();
                      setActiveTab('sql');
                    }}
                    className={`px-2.5 py-1 rounded text-xs border border-[#2B2B2B] transition-colors cursor-pointer ${
                      activeTab === 'sql'
                        ? 'bg-[#2B2B2B] text-white font-bold'
                        : 'bg-white hover:bg-[#FAF6EC] text-[#2B2B2B]'
                    }`}
                  >
                    Supabase SQL
                  </button>
                  <button
                    onClick={() => {
                      pencilSoundEngine.playPop();
                      setActiveTab('docker');
                    }}
                    className={`px-2.5 py-1 rounded text-xs border border-[#2B2B2B] transition-colors cursor-pointer ${
                      activeTab === 'docker'
                        ? 'bg-[#2B2B2B] text-white font-bold'
                        : 'bg-white hover:bg-[#FAF6EC] text-[#2B2B2B]'
                    }`}
                  >
                    Docker Topology
                  </button>
                  <button
                    onClick={() => {
                      pencilSoundEngine.playPop();
                      setActiveTab('kpis');
                    }}
                    className={`px-2.5 py-1 rounded text-xs border border-[#2B2B2B] transition-colors cursor-pointer ${
                      activeTab === 'kpis'
                        ? 'bg-[#2B2B2B] text-white font-bold'
                        : 'bg-white hover:bg-[#FAF6EC] text-[#2B2B2B]'
                    }`}
                  >
                    Admin Metrics
                  </button>
                </div>
              </div>

              {/* Tab 1: Supabase SQL Query Sandbox */}
              {activeTab === 'sql' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                    <span className="text-[#2B2B2B]/70">Run preset Supabase PostgreSQL queries:</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleQuerySelect('users')}
                        className={`px-2 py-0.5 rounded border text-[11px] cursor-pointer ${
                          activeQueryKey === 'users'
                            ? 'bg-[#E4572E] text-white font-bold border-[#2B2B2B]'
                            : 'bg-white border-[#2B2B2B]/20 text-[#2B2B2B]'
                        }`}
                      >
                        users
                      </button>
                      <button
                        onClick={() => handleQuerySelect('metrics')}
                        className={`px-2 py-0.5 rounded border text-[11px] cursor-pointer ${
                          activeQueryKey === 'metrics'
                            ? 'bg-[#E4572E] text-white font-bold border-[#2B2B2B]'
                            : 'bg-white border-[#2B2B2B]/20 text-[#2B2B2B]'
                        }`}
                      >
                        docker_topology
                      </button>
                      <button
                        onClick={() => handleQuerySelect('audit')}
                        className={`px-2 py-0.5 rounded border text-[11px] cursor-pointer ${
                          activeQueryKey === 'audit'
                            ? 'bg-[#E4572E] text-white font-bold border-[#2B2B2B]'
                            : 'bg-white border-[#2B2B2B]/20 text-[#2B2B2B]'
                        }`}
                      >
                        audit_logs
                      </button>
                    </div>
                  </div>

                  {/* SQL Code Box */}
                  <div className="p-2.5 bg-[#2B2B2B] text-[#FAF6EC] rounded border border-[#2B2B2B] text-xs font-mono overflow-x-auto">
                    <div className="text-[#10B981] font-bold mb-1">-- Supabase PostgreSQL 16</div>
                    <code className="text-[#FFE66D]">{currentQuery.sql}</code>
                  </div>

                  {/* Simulated Result Table */}
                  <div className="overflow-x-auto bg-white rounded border border-[#2B2B2B]/25">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#FAF6EC] border-b border-[#2B2B2B]/20">
                          {currentQuery.result.columns.map((col) => (
                            <th key={col} className="p-2 font-bold text-[#2B2B2B] uppercase text-[10px] tracking-wider">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentQuery.result.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-[#2B2B2B]/10 hover:bg-stone-50">
                            {row.map((val, cIdx) => (
                              <td key={cIdx} className="p-2 text-[#2B2B2B]/90 font-mono text-[11px]">
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="text-[11px] text-[#2B2B2B]/60 flex items-center justify-between">
                    <span>⚡ Query Execution Time: {currentQuery.result.timing}</span>
                    <span className="text-[#10B981] font-bold">✓ SSL Encrypted Session</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Docker Container Topology */}
              {activeTab === 'docker' && (
                <div className="space-y-3">
                  <div className="text-xs text-[#2B2B2B]/70">
                    Production Container Stack (Docker Compose / Remote Host):
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      {
                        name: 'elagent-admin-web',
                        port: '3000',
                        status: 'Up 42 days',
                        role: 'Next.js Admin UI & SSR',
                      },
                      {
                        name: 'supabase-db',
                        port: '5432',
                        status: 'Healthy',
                        role: 'PostgreSQL Relational DB',
                      },
                      {
                        name: 'redis-cache',
                        port: '6379',
                        status: 'Up 42 days',
                        role: 'Session & Metrics Store',
                      },
                    ].map((c) => (
                      <div
                        key={c.name}
                        className="p-3 bg-white rounded border border-[#2B2B2B]/20 flex flex-col justify-between space-y-2"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-bold text-xs text-[#2B2B2B] truncate">{c.name}</span>
                            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          </div>
                          <div className="text-[11px] text-[#2B2B2B]/70">Port: {c.port}</div>
                          <div className="text-[10px] text-[#E4572E] font-medium">{c.role}</div>
                        </div>

                        <button
                          onClick={() => handleRestartContainer(c.name)}
                          disabled={restartingContainer === c.name}
                          className="w-full py-1 text-[10px] font-bold rounded border border-[#2B2B2B]/30 bg-[#FAF6EC] hover:bg-[#FFE66D] transition-colors cursor-pointer text-[#2B2B2B]"
                        >
                          {restartingContainer === c.name ? '↻ Restarting...' : '↻ Reload Container'}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 bg-[#FAF6EC] rounded border border-[#2B2B2B]/15 text-[11px] text-[#2B2B2B]/80 flex items-center justify-between">
                    <span>Engine: Docker v26.1 / Linux x86_64</span>
                    <span className="text-[#059669] font-bold">100% Environment Parity</span>
                  </div>
                </div>
              )}

              {/* Tab 3: Admin Metrics */}
              {activeTab === 'kpis' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-2.5 bg-white rounded border border-[#2B2B2B]/20 text-center">
                      <div className="text-[10px] text-[#2B2B2B]/60 uppercase">System Uptime</div>
                      <div className="text-lg font-bold text-[#10B981] font-heading">99.98%</div>
                      <div className="text-[9px] text-[#2B2B2B]/50">30-day window</div>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-[#2B2B2B]/20 text-center">
                      <div className="text-[10px] text-[#2B2B2B]/60 uppercase">DB Latency</div>
                      <div className="text-lg font-bold text-[#2563EB] font-heading">1.4 ms</div>
                      <div className="text-[9px] text-[#2B2B2B]/50">P95 read speed</div>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-[#2B2B2B]/20 text-center">
                      <div className="text-[10px] text-[#2B2B2B]/60 uppercase">Admin Queries</div>
                      <div className="text-lg font-bold text-[#E4572E] font-heading">14.2k</div>
                      <div className="text-[9px] text-[#2B2B2B]/50">Daily volume</div>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-[#2B2B2B]/20 text-center">
                      <div className="text-[10px] text-[#2B2B2B]/60 uppercase">Containers</div>
                      <div className="text-lg font-bold text-[#7C3AED] font-heading">3 / 3</div>
                      <div className="text-[9px] text-[#2B2B2B]/50">All healthy</div>
                    </div>
                  </div>

                  <p className="text-xs text-[#2B2B2B]/80 leading-relaxed bg-[#FAF6EC] p-2.5 rounded border border-[#2B2B2B]/15">
                    The ELAGENT centralized Admin Hub connects database schemas, user roles, and service health into a single operational interface engineered with Next.js, Supabase PostgreSQL, and Docker containerization.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
