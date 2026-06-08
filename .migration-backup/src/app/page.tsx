'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/search-bar';
import { Tool } from '@/types/tool';
import { getTrendingTools } from '@/lib/registry';

import AdSense from '@/components/adsense';

// Static categories metadata for rendering navigation cards
const categories = [
  {
    name: 'Finance Tools',
    slug: 'finance',
    desc: 'EMI, SIP, Loan, Compound Interest, Tax, and Inflation planners.',
    icon: '💵',
    color: 'border-emerald-500/20 dark:border-emerald-500/10 hover:border-emerald-500 hover:shadow-emerald-500/5',
    tagColor: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-450',
  },
  {
    name: 'Health Tools',
    slug: 'health',
    desc: 'BMI, BMR, Calorie, Macros, Ovulation, and Ideal Weight estimators.',
    icon: '❤️',
    color: 'border-rose-500/20 dark:border-rose-500/10 hover:border-rose-500 hover:shadow-rose-500/5',
    tagColor: 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-450',
  },
  {
    name: 'General Calculators',
    slug: 'general',
    desc: 'Age trackers, Date offsets, Discounts, Tip splits, and Percentages.',
    icon: '📊',
    color: 'border-amber-500/20 dark:border-amber-500/10 hover:border-amber-500 hover:shadow-amber-500/5',
    tagColor: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-450',
  },
  {
    name: 'Unit Converters',
    slug: 'converters',
    desc: 'Currency, Length, Weight, Temperature, Pressure, and Speed codecs.',
    icon: '🔄',
    color: 'border-blue-500/20 dark:border-blue-500/10 hover:border-blue-500 hover:shadow-blue-500/5',
    tagColor: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-450',
  },
  {
    name: 'PDF Utilities',
    slug: 'pdf',
    desc: 'Secure browser-side PDF Merge, Split, Compress, Sign, and OCR text extraction.',
    icon: '📄',
    color: 'border-indigo-500/20 dark:border-indigo-500/10 hover:border-indigo-500 hover:shadow-indigo-500/5',
    tagColor: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-450',
  },
  {
    name: 'Developer Tools',
    slug: 'developer',
    desc: 'JSON/XML formatters, UUID random generators, JWT decoders, and Base64 streams.',
    icon: '🛠️',
    color: 'border-slate-500/20 dark:border-slate-500/10 hover:border-slate-500 hover:shadow-slate-500/5',
    tagColor: 'bg-slate-50 dark:bg-slate-950/30 text-slate-650 dark:text-slate-400',
  },
  {
    name: 'Image Tools',
    slug: 'image',
    desc: 'Browser-side Image Compressor, Resizer, HEIC to JPG, WebP, and Background Remover.',
    icon: '🖼️',
    color: 'border-violet-500/20 dark:border-violet-500/10 hover:border-violet-500 hover:shadow-violet-500/5',
    tagColor: 'bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400',
  },
  {
    name: 'Business Utilities',
    slug: 'business',
    desc: 'Professional Invoice & Quote Generators, Salary Estimators, and Profit Margins.',
    icon: '💼',
    color: 'border-cyan-500/20 dark:border-cyan-500/10 hover:border-cyan-500 hover:shadow-cyan-500/5',
    tagColor: 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400',
  },
];

export default function Home() {
  const [recentTools, setRecentTools] = useState<Tool[]>([]);
  const trending = getTrendingTools();

  useEffect(() => {
    // Fetch recently used tools from local storage
    const stored = localStorage.getItem('recently_used_tools');
    if (stored) {
      try {
        setRecentTools(JSON.parse(stored));
      } catch {
        // Safe skip
      }
    }
  }, []);

  return (
    <div className="space-y-16 pb-24">
      {/* Hero Header block */}
      <section className="relative text-center py-20 px-4 bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-950 dark:to-zinc-950 border-b border-zinc-200/50 dark:border-zinc-900/50 transition-colors">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 dark:bg-violet-950/30 border border-violet-200/60 dark:border-violet-900/50 text-violet-600 dark:text-violet-400 rounded-full text-xs font-semibold">
            ✨ Free & 100% Private Client-Side Executions
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
            Your Ultimate Digital <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">Utility Workspace</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            Zero limits. Secure local processing. Run standard calculators, PDF utilities, converters, and developer formatters instantly.
          </p>

          {/* Autocomplete global search bar */}
          <div className="pt-4">
            <SearchBar />
          </div>

          {/* Core search suggestions links */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-2 text-xs text-zinc-400">
            <span>Try searching:</span>
            <Link href="/tools/bmi-calculator" className="text-zinc-600 dark:text-zinc-350 hover:text-violet-600 underline">BMI Calculator</Link>
            <span>•</span>
            <Link href="/tools/emi-calculator" className="text-zinc-600 dark:text-zinc-350 hover:text-violet-600 underline">EMI Calculator</Link>
            <span>•</span>
            <Link href="/tools/pdf-merge" className="text-zinc-600 dark:text-zinc-350 hover:text-violet-600 underline">PDF Merge</Link>
            <span>•</span>
            <Link href="/tools/currency-converter" className="text-zinc-600 dark:text-zinc-350 hover:text-violet-600 underline">Currency Converter</Link>
          </div>
        </div>
      </section>

      {/* Recents banner if populated */}
      {recentTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
              Recently Used Tools
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recentTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl hover:border-violet-600 transition-all flex items-center gap-3 text-xs text-zinc-700 dark:text-zinc-300 font-medium"
                >
                  <span className="text-base">⏱️</span>
                  <span className="truncate">{tool.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Browse Categories</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Explore standard categorized micro-tools</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`block border bg-white dark:bg-zinc-900 p-6 rounded-3xl transition-all shadow-sm flex flex-col justify-between min-h-[160px] ${cat.color}`}
            >
              <div className="space-y-2">
                <span className="text-2xl block">{cat.icon}</span>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-normal">
                  {cat.desc}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs font-semibold text-violet-600 dark:text-violet-400">
                <span>View tools</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Trending Tools</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Most popular calculators and converters used globally</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trending.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-violet-600 transition-all flex items-center justify-between shadow-sm"
            >
              <div className="space-y-1 truncate pr-4">
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-100 truncate">{tool.title}</h3>
                <p className="text-xs text-zinc-500 truncate">{tool.description}</p>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850 text-zinc-450 uppercase flex-shrink-0">
                {tool.category}
              </span>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Google AdSense Responsive Advertisement Display Banner */}
      <AdSense adSlot="home-page-bottom" className="px-4 sm:px-6 lg:px-8" />
    </div>
  );
}
