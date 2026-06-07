import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import SearchBar from '@/components/search-bar';
import { Tool } from '@/types/tool';
import { getTrendingTools, getToolBySlug } from '@/lib/registry';
import AdSense from '@/components/adsense';
import { useFavorites } from '@/hooks/useFavorites';
import {
  ArrowRight,
  Calculator,
  FileText,
  Coins,
  HeartPulse,
  Image as ImageIcon,
  Code,
  Briefcase,
  Wrench,
  Star,
  TrendingUp,
  Settings2,
  Zap,
  Search,
} from 'lucide-react';

const categories = [
  {
    name: 'Finance',
    slug: 'finance',
    desc: 'EMI, SIP, Loan, Compound Interest, Tax, and Inflation planners.',
    icon: Coins,
    color: 'bg-amber-100 text-amber-800',
    bg: 'bg-amber-50',
  },
  {
    name: 'Health',
    slug: 'health',
    desc: 'BMI, BMR, Calorie, Macros, Ovulation, and Ideal Weight estimators.',
    icon: HeartPulse,
    color: 'bg-rose-100 text-rose-800',
    bg: 'bg-rose-50',
  },
  {
    name: 'PDF',
    slug: 'pdf',
    desc: 'Merge, split, compress, and sign PDF documents — entirely in your browser.',
    icon: FileText,
    color: 'bg-violet-100 text-violet-800',
    bg: 'bg-violet-50',
  },
  {
    name: 'Developer',
    slug: 'developer',
    desc: 'JSON/XML formatters, UUID generators, JWT decoders, and Base64 utilities.',
    icon: Code,
    color: 'bg-slate-200 text-slate-800',
    bg: 'bg-slate-50',
  },
  {
    name: 'Image',
    slug: 'image',
    desc: 'Resize, compress, convert, and optimize images without uploading anywhere.',
    icon: ImageIcon,
    color: 'bg-orange-100 text-orange-800',
    bg: 'bg-orange-50',
  },
  {
    name: 'Business',
    slug: 'business',
    desc: 'Invoice generators, salary estimators, profit margins, and more.',
    icon: Briefcase,
    color: 'bg-blue-100 text-blue-800',
    bg: 'bg-blue-50',
  },
  {
    name: 'Converters',
    slug: 'converters',
    desc: 'Currency, length, weight, temperature, pressure, and speed codecs.',
    icon: Zap,
    color: 'bg-emerald-100 text-emerald-800',
    bg: 'bg-emerald-50',
  },
  {
    name: 'General',
    slug: 'general',
    desc: 'Age trackers, date offsets, discounts, tip splits, and percentages.',
    icon: Wrench,
    color: 'bg-stone-200 text-stone-800',
    bg: 'bg-stone-50',
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
          ? 'text-amber-600 bg-amber-50 border border-amber-300'
          : 'text-stone-300 hover:text-amber-500 hover:bg-amber-50 border border-transparent hover:border-amber-200'
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
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 selection:bg-amber-200">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
        .font-editorial { font-family: 'Playfair Display', serif; }
      `}} />

      {/* Hero */}
      <section className="border-b border-stone-200/60 bg-[#fafaf9]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          {/* Left: Headline */}
          <div className="flex-1 space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              Free &amp; 100% Private
            </div>
            <h1 className="font-editorial text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-stone-900">
              Your ultimate digital{' '}
              <span className="italic text-violet-700">utility</span>{' '}
              workspace.
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed max-w-md font-light">
              Free tools for finance, health, PDF, development, and more. Runs entirely in your browser — nothing ever leaves your device.
            </p>
            <div className="pt-2 max-w-lg">
              <SearchBar />
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-stone-500 pt-1">
              <span className="font-medium">Try:</span>
              <Link href="/tools/bmi-calculator" className="hover:text-amber-600 underline underline-offset-2 transition-colors">BMI Calculator</Link>
              <span>·</span>
              <Link href="/tools/emi-calculator" className="hover:text-amber-600 underline underline-offset-2 transition-colors">EMI Calculator</Link>
              <span>·</span>
              <Link href="/tools/pdf-merge" className="hover:text-amber-600 underline underline-offset-2 transition-colors">PDF Merge</Link>
              <span>·</span>
              <Link href="/tools/currency-converter" className="hover:text-amber-600 underline underline-offset-2 transition-colors">Currency Converter</Link>
            </div>
          </div>

          {/* Right: Featured Tool Card */}
          <div className="flex-1 relative w-full max-w-md md:max-w-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-200 to-amber-100 rounded-[2.5rem] rotate-3 scale-105 opacity-50 blur-xl pointer-events-none" />
            <Link
              href="/tools/pdf-merge"
              className="relative bg-white p-8 rounded-[2rem] shadow-xl border border-stone-100 flex flex-col gap-6 -rotate-1 hover:rotate-0 transition-transform duration-500 block"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <h3 className="font-editorial font-semibold text-2xl">Featured Tool</h3>
                  <p className="text-sm text-stone-500">Editor's Choice</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">Smart PDF Merger</h4>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Combine multiple PDFs instantly. Your files never leave your device, ensuring complete privacy and security.
                </p>
                <div className="space-y-3">
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 w-2/3 rounded-full" />
                  </div>
                  <div className="flex justify-between text-xs text-stone-400 font-medium">
                    <span>Processing local files...</span>
                    <span>66%</span>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-stone-200 hover:border-violet-300 hover:bg-violet-50 text-violet-700 font-medium text-sm transition-colors">
                Try it now <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
            <div className="absolute -bottom-5 -left-5 bg-amber-400 text-amber-950 p-4 rounded-2xl shadow-lg -rotate-6 hidden md:block">
              <div className="flex items-center gap-2 font-medium text-sm">
                <Settings2 className="w-4 h-4" /> 100% Private
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 space-y-20 py-16 pb-24">

        {/* Pinned Tools */}
        {pinnedTools.length > 0 && (
          <section>
            <div className="flex items-baseline justify-between mb-6 border-b border-stone-200 pb-4">
              <h2 className="font-editorial text-2xl text-stone-900">Pinned Tools</h2>
              <span className="text-xs text-stone-400">{pinnedTools.length} pinned</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pinnedTools.map((tool) => (
                <div key={tool.id} className="relative group">
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="flex items-center justify-between p-4 bg-white border border-stone-100 rounded-2xl hover:border-amber-200 hover:shadow-md transition-all shadow-sm pr-10"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-stone-800 truncate">{tool.title}</p>
                      <p className="text-xs text-stone-400 truncate mt-0.5">{tool.description}</p>
                    </div>
                  </Link>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                    <StarButton slug={tool.slug} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recently Used */}
        {recentTools.length > 0 && (
          <section>
            <div className="flex items-baseline justify-between mb-6 border-b border-stone-200 pb-4">
              <h2 className="font-editorial text-2xl text-stone-900">Recently Used</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recentTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="p-3 bg-white border border-stone-100 rounded-2xl hover:border-amber-200 hover:shadow-sm transition-all flex items-center gap-3 text-xs text-stone-700 font-medium"
                >
                  <span className="text-base">⏱️</span>
                  <span className="truncate">{tool.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Popular This Week */}
        <section>
          <div className="flex items-baseline justify-between mb-8 border-b border-stone-200 pb-4">
            <h2 className="font-editorial text-3xl text-stone-900">Popular This Week</h2>
            <Link href="/category/all" className="text-sm font-medium text-violet-600 hover:text-violet-800 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {trending.map((tool) => (
              <div key={tool.id} className="relative group">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="flex items-center gap-4 p-5 bg-white border border-stone-100 rounded-2xl hover:border-amber-200 hover:shadow-md transition-all shadow-sm pr-12"
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-amber-50 transition-colors">
                    <TrendingUp className="w-5 h-5 text-stone-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm text-stone-800 truncate">{tool.title}</h3>
                    <p className="text-xs text-stone-500 truncate mt-0.5">{tool.description}</p>
                  </div>
                </Link>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <StarButton slug={tool.slug} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Directory */}
        <section>
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-editorial text-4xl text-stone-900">The Directory</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group relative overflow-hidden rounded-3xl bg-white p-8 border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 transition-transform group-hover:scale-110 ${cat.color.split(' ')[0]}`} />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${cat.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-editorial text-2xl font-medium mb-3 group-hover:text-violet-700 transition-colors">{cat.name}</h3>
                    <p className="text-stone-600 leading-relaxed mb-6 text-sm">{cat.desc}</p>
                    <div className="flex items-center text-sm font-medium text-amber-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                      Explore tools <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <AdSense adSlot="home-page-bottom" />
      </div>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-violet-600 flex items-center justify-center text-white font-bold text-sm">U</div>
              <span className="font-editorial font-semibold text-xl text-stone-100">UtilityHub</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              Your ultimate digital utility workspace. Free, private, and beautifully crafted tools for everyone.
            </p>
          </div>
          <div>
            <h4 className="text-stone-100 font-medium mb-4 text-sm">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/finance" className="hover:text-amber-400 transition-colors">All Tools</Link></li>
              <li><Link href="/category/pdf" className="hover:text-amber-400 transition-colors">PDF Utilities</Link></li>
              <li><Link href="/category/developer" className="hover:text-amber-400 transition-colors">Developer Tools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-100 font-medium mb-4 text-sm">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-stone-500">Privacy-first by design</span></li>
              <li><span className="text-stone-500">No account required</span></li>
              <li><span className="text-stone-500">100% free forever</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
