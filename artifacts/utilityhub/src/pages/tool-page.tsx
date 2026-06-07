import React from 'react';
import { Link } from 'wouter';
import { getToolBySlug } from '@/lib/registry';
import ToolRunner from '@/components/tool-runner';
import PdfWorkspace from '@/components/pdf-workspace';
import ImageWorkspace from '@/components/image-workspace';
import SeoContent from '@/components/seo-content';
import AdSense from '@/components/adsense';

interface ToolPageProps {
  slug: string;
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

        <div className="text-left space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            {tool.title}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            {tool.description}
          </p>
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

      <AdSense adSlot="tool-page-bottom" />

      <section className="border-t border-zinc-200 dark:border-zinc-800/85 pt-4">
        <SeoContent slug={tool.slug} />
      </section>
    </div>
  );
}
