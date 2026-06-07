import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import SearchBar from '@/components/search-bar';
import { Tool } from '@/types/tool';
import { getTrendingTools, getToolBySlug } from '@/lib/registry';
import AdSense from '@/components/adsense';
import { useFavorites } from '@/hooks/useFavorites';

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

function StarButton({ slug, className = '' }: { slug: string; className?: string }) {
  const { isFavorite, toggle } = useFavorites();
  const pinned = isFavorite(slug);
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(slug); }}
      title={pinned ? 'Unpin tool' : 'Pin to top'}
      className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
        pinned
          ? 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 border border-violet-300 dark:border-violet-800'
          : 'text-zinc-300 dark:text-zinc-600 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/30 border border-transparent hover:border-violet-200 dark:hover:border-violet-800'
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={pinned ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        className="w-3.5 h-3.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
    </button>
  );
}

export default function Home() {
  const [recentTools, setRecentTools] = useState<Tool[]>([]);
  const { favorites } = useFavorites();
  const trending = getTrendingTools();

  const pinnedTools = favorites
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as Tool[];

  useEffect(() => {
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
      {/* Hero */}
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
          <div className="pt-4">
            <SearchBar />
          </div>
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

      {/* Pinned Tools */}
      {pinnedTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-900/50 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-violet-500">
                  <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <h3 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Pinned Tools</h3>
              </div>
              <span className="text-[10px] text-violet-400 dark:text-violet-500">{pinnedTools.length} pinned</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {pinnedTools.map((tool) => (
                <div key={tool.id} className="relative group">
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-violet-200/60 dark:border-violet-900/40 rounded-2xl hover:border-violet-500 transition-all shadow-sm pr-10"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100 truncate">{tool.title}</p>
                      <p className="text-[10px] text-zinc-400 truncate mt-0.5">{tool.description}</p>
                    </div>
                  </Link>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <StarButton slug={tool.slug} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Used */}
      {recentTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">Recently Used Tools</h3>
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

      {/* Browse Categories */}
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
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base">{cat.name}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-normal">{cat.desc}</p>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs font-semibold text-violet-600 dark:text-violet-400">
                <span>View tools</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Trending Tools</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Most popular calculators and converters used globally</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trending.map((tool) => (
            <div key={tool.id} className="relative group">
              <Link
                href={`/tools/${tool.slug}`}
                className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-violet-600 transition-all flex items-center justify-between shadow-sm pr-12"
              >
                <div className="space-y-1 truncate">
                  <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-100 truncate">{tool.title}</h3>
                  <p className="text-xs text-zinc-500 truncate">{tool.description}</p>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850 text-zinc-450 uppercase flex-shrink-0 ml-3">
                  {tool.category}
                </span>
              </Link>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <StarButton slug={tool.slug} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSense adSlot="home-page-bottom" className="px-4 sm:px-6 lg:px-8" />
    </div>
  );
}
