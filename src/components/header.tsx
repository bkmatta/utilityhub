'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './search-bar';
import { getToolsByCategory } from '@/lib/registry';
import { ToolCategory } from '@/types/tool';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    // Sync dark mode state from document root
    const root = window.document.documentElement;
    if (root.classList.contains('dark')) {
      setIsDarkMode(true);
    }

    // Sync session on mount
    const session = localStorage.getItem('user_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        // Safe skip
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.remove('dark');
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add('dark');
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Name */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-105 transition-transform">
            U
          </div>
          <span className="font-bold text-lg text-zinc-900 dark:text-zinc-50 tracking-tight">
            Utility<span className="text-violet-600">Hub</span>
          </span>
        </Link>

        {/* Dynamic Navigation Links with hover dropdowns */}
        <nav className="hidden md:flex items-center gap-6 h-full text-sm font-medium text-zinc-650 dark:text-zinc-400">
          {([
            { slug: 'finance', label: 'Finance' },
            { slug: 'health', label: 'Health' },
            { slug: 'pdf', label: 'PDF Tools' },
            { slug: 'converters', label: 'Converters' },
            { slug: 'developer', label: 'Developer' },
            { slug: 'image', label: 'Image' },
            { slug: 'business', label: 'Business' },
          ] as { slug: ToolCategory; label: string }[]).map((cat) => {
            const tools = getToolsByCategory(cat.slug);
            return (
              <div key={cat.slug} className="relative group h-full flex items-center">
                <Link
                  href={`/category/${cat.slug}`}
                  className="hover:text-zinc-900 dark:hover:text-zinc-250 flex items-center gap-1 transition-colors h-full cursor-pointer"
                >
                  {cat.label}
                  <span className="text-[7px] opacity-60 group-hover:rotate-180 transition-transform duration-200">▼</span>
                </Link>
                
                {/* Dropdown Menu Overlay */}
                <div className="absolute top-[80%] left-1/2 -translate-x-1/2 pt-3 z-50 transition-all duration-200 ease-out opacity-0 translate-y-1.5 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto w-72">
                  <div className="bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-3 grid grid-cols-1 gap-1 backdrop-blur-md">
                    {tools.slice(0, 8).map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="flex flex-col p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-950 text-left transition-colors"
                      >
                        <span className="text-xs font-bold text-zinc-850 dark:text-zinc-200">
                          {tool.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-light truncate mt-0.5">
                          {tool.description}
                        </span>
                      </Link>
                    ))}
                    {tools.length > 8 && (
                      <Link
                        href={`/category/${cat.slug}`}
                        className="text-[10px] font-bold text-center text-violet-650 dark:text-violet-400 hover:underline pt-2 border-t border-zinc-100 dark:border-zinc-800/80 mt-1"
                      >
                        View all {tools.length} tools →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Dynamic interactive items */}
        <div className="flex items-center gap-3">
          {/* Theme Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-450 hover:bg-zinc-100 transition-colors"
            title="Toggle theme mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* User Profile / Login Dynamic Switcher */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium hidden sm:inline">Hi, {user.name}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('user_session');
                  setUser(null);
                  window.location.href = '/';
                }}
                className="text-xs font-semibold px-4 py-2 border border-rose-500/20 text-rose-500 bg-rose-500/5 hover:bg-rose-500/10 rounded-xl transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-xs font-semibold px-4 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-xl hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-850 dark:text-zinc-300 transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
