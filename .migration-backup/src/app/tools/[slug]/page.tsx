import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allTools, getToolBySlug } from '@/lib/registry';
import ToolRunner from '@/components/tool-runner';
import PdfWorkspace from '@/components/pdf-workspace';
import ImageWorkspace from '@/components/image-workspace';
import SeoContent from '@/components/seo-content';
import AdSense from '@/components/adsense';
import Link from 'next/link';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for all 50 tools at build time
export async function generateStaticParams() {
  return allTools.map((tool) => ({
    slug: tool.slug,
  }));
}

// Dynamic SEO tags compiler
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found - UtilityHub',
    };
  }

  return {
    title: `${tool.seo.title} | UtilityHub`,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      url: `https://utilityhub.com/tools/${tool.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seo.title,
      description: tool.seo.description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="pt-2 pb-10 px-4 sm:px-6 lg:px-8 space-y-4">
      {/* Consolidated page header to eliminate excessive vertical gaps */}
      <header className="max-w-6xl mx-auto space-y-3">
        {/* Dynamic breadcrumb header */}
        <nav className="flex items-center gap-2 text-[10px] font-semibold text-zinc-400">
          <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-205">Home</Link>
          <span>/</span>
          <Link href={`/category/${tool.category}`} className="hover:text-zinc-600 dark:hover:text-zinc-205 capitalize">
            {tool.category}
          </Link>
          <span>/</span>
          <span className="text-zinc-700 dark:text-zinc-305 truncate">{tool.title}</span>
        </nav>

        {/* Hero Title details */}
        <div className="text-left space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            {tool.title}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            {tool.description}
          </p>
        </div>
      </header>

      {/* Primary Interactive Workspace */}
      <section className="relative">
        {tool.category === 'pdf' ? (
          <PdfWorkspace slug={tool.slug} key={tool.slug} />
        ) : tool.category === 'image' ? (
          <ImageWorkspace slug={tool.slug} key={tool.slug} />
        ) : (
          <ToolRunner slug={tool.slug} key={tool.slug} />
        )}
      </section>

      {/* Google AdSense Responsive Advertisement Display Banner */}
      <AdSense adSlot="tool-page-bottom" />

      {/* SEO dynamic articles compiler */}
      <section className="border-t border-zinc-200 dark:border-zinc-800/85 pt-4">
        <SeoContent slug={tool.slug} />
      </section>
    </div>
  );
}
