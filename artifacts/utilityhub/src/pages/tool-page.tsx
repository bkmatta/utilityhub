import React from 'react';
import { Link } from 'wouter';
import { getToolBySlug } from '@/lib/registry';
import ToolRunner from '@/components/tool-runner';
import PdfWorkspace from '@/components/pdf-workspace';
import ImageWorkspace from '@/components/image-workspace';
import SeoContent from '@/components/seo-content';
import AdSense from '@/components/adsense';
import { useFavorites } from '@/hooks/useFavorites';

interface ToolPageProps {
  slug: string;
}

function StarButton({ slug }: { slug: string }) {
  const { isFavorite, toggle } = useFavorites();
  const pinned = isFavorite(slug);
  return (
    <button
      onClick={() => toggle(slug)}
      title={pinned ? 'Remove from pinned' : 'Pin to home page'}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
        pinned
          ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-300 dark:border-violet-800 text-violet-600 dark:text-violet-400'
          : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-violet-300 dark:hover:border-violet-800 hover:text-violet-600 dark:hover:text-violet-400'
      }`}
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
      {pinned ? 'Pinned' : 'Pin to home'}
    </button>
  );
}

export default function ToolPage({ slug }: ToolPageProps) {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tool Not Found</h1>
        <p className="mt-2 text-sm text-zinc-500">The tool <code className="font-mono">{slug}</code> does not exist.</p>
        <Link href="/" className="mt-6 inline-block px-6 py-2 bg-violet-600 text-white rounded-xl text-sm font-bold">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-2 pb-10 px-4 sm:px-6 lg:px-8 space-y-4">
      <header className="max-w-6xl mx-auto space-y-3">
        <nav className="flex items-center gap-2 text-[10px] font-semibold text-zinc-400">
          <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-205">Home</Link>
          <span>/</span>
          <Link href={`/category/${tool.category}`} className="hover:text-zinc-600 dark:hover:text-zinc-205 capitalize">
            {tool.category}
          </Link>
          <span>/</span>
          <span className="text-zinc-700 dark:text-zinc-305 truncate">{tool.title}</span>
        </nav>

        <div className="flex items-start justify-between gap-4">
          <div className="text-left space-y-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              {tool.title}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
              {tool.description}
            </p>
          </div>
          <div className="flex-shrink-0 pt-1">
            <StarButton slug={tool.slug} />
          </div>
        </div>
      </header>

      <section className="relative">
        {tool.category === 'pdf' ? (
          <PdfWorkspace slug={tool.slug} key={tool.slug} />
        ) : tool.category === 'image' ? (
          <ImageWorkspace slug={tool.slug} key={tool.slug} />
        ) : (
          <ToolRunner slug={tool.slug} key={tool.slug} />
        )}
      </section>

      <AdSense />

      <section className="border-t border-zinc-200 dark:border-zinc-800/85 pt-4">
        <SeoContent slug={tool.slug} />
      </section>
    </div>
  );
}
