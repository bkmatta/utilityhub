import React from 'react';
import { Link } from 'wouter';
import { getToolsByCategory } from '@/lib/registry';
import { ToolCategory } from '@/types/tool';
import AdSense from '@/components/adsense';

interface CategoryPageProps {
  slug: string;
}

const categoriesInfo: Record<ToolCategory, { title: string; desc: string; icon: string; accent: string }> = {
  finance: {
    title: 'Finance Tools',
    desc: 'Perform calculations for home loans, car loans, retirement targets, systematic investments (SIPs), compound interest, tax liabilities, GST percentages, and inflation values.',
    icon: '💵',
    accent: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/10',
  },
  health: {
    title: 'Health & Fitness Planners',
    desc: 'Monitor health metrics with BMI, Mifflin-St Jeor BMR calculators, calorie targets, water intake requirements, body fat estimations, pregnancy due dates, ovulation timelines, heart rate zones, and macro-nutrient splits.',
    icon: '❤️',
    accent: 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400 dark:border-rose-500/10',
  },
  general: {
    title: 'General Calculators',
    desc: 'Calculate exact ages, date differences, percentages, shopping discounts, tip divisions, and daily math problems.',
    icon: '📊',
    accent: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400 dark:border-amber-500/10',
  },
  converters: {
    title: 'Unit Converters',
    desc: 'Convert measurements on the fly: Currency, Length, Weight, Temperature, Area, Volume, Speed, Time, Energy, and Pressure scales.',
    icon: '🔄',
    accent: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400 dark:border-blue-500/10',
  },
  pdf: {
    title: 'Secure PDF Tools',
    desc: 'Process files securely right inside your browser: Merge, Split, Compress, Rotate, Sign documents, add Watermarks, protect with passwords, or run OCR text extraction.',
    icon: '📄',
    accent: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400 dark:border-indigo-500/10',
  },
  developer: {
    title: 'Developer Utilities',
    desc: 'Format JSON and XML payloads, generate random UUID v4s, decode JWT values, and encode/decode Base64 strings client-side.',
    icon: '🛠️',
    accent: 'bg-slate-500/10 text-slate-700 border-slate-500/20 dark:text-slate-400 dark:border-slate-500/10',
  },
  image: {
    title: 'Image Tools',
    desc: 'Modify and optimize images locally: Compress file size, Resize dimensions, Remove backgrounds, convert WebP, or transform HEIC images to JPG.',
    icon: '🖼️',
    accent: 'bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400 dark:border-violet-500/10',
  },
  business: {
    title: 'Business Utilities',
    desc: 'Streamline standard business paperwork: Generate invoices and quotes, calculate salaries, evaluate rate of returns (ROI), or compute profit margins.',
    icon: '💼',
    accent: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/10',
  },
};

export default function CategoryPage({ slug }: CategoryPageProps) {
  const categoryKey = slug as ToolCategory;
  const info = categoriesInfo[categoryKey];

  if (!info) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Category Not Found</h1>
        <Link href="/" className="mt-6 inline-block px-6 py-2 bg-violet-600 text-white rounded-xl text-sm font-bold">
          Back to Home
        </Link>
      </div>
    );
  }

  const tools = getToolsByCategory(categoryKey);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-12 space-y-6">
      <header className="space-y-3">
        <nav className="flex items-center gap-2 text-[10px] font-semibold text-zinc-400">
          <Link href="/" className="hover:text-zinc-650 dark:hover:text-zinc-200">Home</Link>
          <span>/</span>
          <span className="text-zinc-700 dark:text-zinc-300 capitalize">{categoryKey}</span>
        </nav>

        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{info.icon}</span>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              {info.title}
            </h1>
          </div>
          <p className="text-xs text-zinc-550 dark:text-zinc-400 font-normal leading-relaxed">
            {info.desc}
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="group flex flex-col justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-violet-600 hover:shadow-lg transition-all min-h-[185px] shadow-sm"
          >
            <div className="space-y-2">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed font-light">
                {tool.description}
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-850 mt-6 flex justify-between items-center text-xs text-zinc-400">
              <span className="font-mono text-[10px] uppercase bg-zinc-50 dark:bg-zinc-950 px-2 py-0.5 rounded border border-zinc-250/20 dark:border-zinc-800">
                {tool.slug}
              </span>
              <span className="group-hover:translate-x-1 transition-transform font-bold text-violet-600">Open Tool →</span>
            </div>
          </Link>
        ))}
      </section>

      <AdSense adSlot="category-page-bottom" />
    </div>
  );
}
