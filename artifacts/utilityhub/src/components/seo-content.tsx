

import React, { useState } from 'react';
import { Tool } from '@/types/tool';
import { Link } from 'wouter';
import { getToolBySlug } from '@/lib/registry';

interface SeoContentProps {
  slug: string;
}

// Internal linking relationships map for strong SEO structure
const relatedToolsMap: Record<string, string[]> = {
  'bmi-calculator': ['calorie-calculator', 'ideal-weight-calculator', 'body-fat-calculator', 'bmr-calculator'],
  'bmr-calculator': ['calorie-calculator', 'bmi-calculator', 'macro-calculator'],
  'calorie-calculator': ['macro-calculator', 'water-intake-calculator', 'bmr-calculator'],
  'emi-calculator': ['loan-calculator', 'mortgage-calculator', 'compound-interest-calculator', 'sip-calculator'],
  'loan-calculator': ['emi-calculator', 'mortgage-calculator', 'roi-calculator'],
  'mortgage-calculator': ['loan-calculator', 'emi-calculator', 'inflation-calculator'],
  'sip-calculator': ['compound-interest-calculator', 'roi-calculator', 'retirement-calculator'],
  'compound-interest-calculator': ['sip-calculator', 'roi-calculator', 'inflation-calculator'],
  'pdf-merge': ['pdf-split', 'pdf-compress', 'pdf-rotate', 'pdf-signer'],
  'pdf-split': ['pdf-merge', 'pdf-rotate', 'pdf-compress'],
  'pdf-compress': ['pdf-merge', 'pdf-split', 'pdf-watermark'],
  'json-formatter': ['xml-formatter', 'base64-encoder-decoder', 'uuid-generator'],
  'xml-formatter': ['json-formatter', 'jwt-decoder'],
  'base64-encoder-decoder': ['jwt-decoder', 'json-formatter', 'uuid-generator'],
  'currency-converter': ['length-converter', 'weight-converter', 'temperature-converter'],
};

export default function SeoContent({ slug }: SeoContentProps) {
  const tool = getToolBySlug(slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!tool) return null;

  // Retrieve matching related tools or fallback to category siblings
  const getRelatedLinks = () => {
    const slugs = relatedToolsMap[tool.slug] || [];
    if (slugs.length > 0) return slugs;
    
    // Fallback to category defaults (e.g. first few tools of the category)
    return [];
  };

  const relatedSlugs = getRelatedLinks();

  return (
    <article className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-12 text-zinc-600 dark:text-zinc-400">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Schema injection (FAQ, How-To, Breadcrumb JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'BreadcrumbList',
                  'itemListElement': [
                    {
                      '@type': 'ListItem',
                      'position': 1,
                      'name': 'Home',
                      'item': 'https://utilityverse.com',
                    },
                    {
                      '@type': 'ListItem',
                      'position': 2,
                      'name': tool.category.toUpperCase(),
                      'item': `https://utilityverse.com/category/${tool.category}`,
                    },
                    {
                      '@type': 'ListItem',
                      'position': 3,
                      'name': tool.title,
                      'item': `https://utilityverse.com/tools/${tool.slug}`,
                    },
                  ],
                },
                {
                  '@type': 'HowTo',
                  'name': `How to use ${tool.title}`,
                  'description': tool.description,
                  'step': tool.seo.howToUse.map((step, idx) => ({
                    '@type': 'HowToStep',
                    'position': idx + 1,
                    'text': step,
                  })),
                },
                {
                  '@type': 'FAQPage',
                  'mainEntity': tool.seo.faqs.map((faq) => ({
                    '@type': 'Question',
                    'name': faq.question,
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': faq.answer,
                    },
                  })),
                },
              ],
            }),
          }}
        />

        {/* Section 1: Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            About the {tool.title}
          </h2>
          <p className="leading-relaxed text-lg font-light">
            {tool.seo.overview}
          </p>
          <p className="leading-relaxed">
            Whether you are calculating results for business projects, academic studies, or daily fitness checks, this free online tool provides quick results instantly. Everything runs secure and local to your system.
          </p>
        </section>

        {/* Section 2: Mathematical Formula / Algorithm */}
        {tool.seo.formula && (
          <section className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-600"></span>
              Formula & Calculation Method
            </h3>
            <div className="bg-white dark:bg-zinc-950 px-6 py-4 rounded-xl border border-zinc-100 dark:border-zinc-900 overflow-x-auto text-center font-mono text-lg text-violet-600 dark:text-violet-400">
              {tool.seo.formula.expression}
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              {tool.seo.formula.explanation}
            </p>
          </section>
        )}

        {/* Section 3: How to Use */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Step-by-Step Instructions
          </h3>
          <ol className="space-y-3 list-none">
            {tool.seo.howToUse.map((step, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-mono text-sm">
                  {idx + 1}
                </span>
                <p className="mt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Section 4: Practical Examples */}
        {tool.seo.examples && tool.seo.examples.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Practical Examples
            </h3>
            <div className="space-y-4">
              {tool.seo.examples.map((example, idx) => (
                <div key={idx} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/50">
                  <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Example Scenario {idx + 1}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                    <div className="bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200/50 dark:border-zinc-900">
                      <span className="text-zinc-400 block mb-1 uppercase tracking-wider text-xs">Inputs</span>
                      <pre className="whitespace-pre-wrap">{JSON.stringify(example.input, null, 2)}</pre>
                    </div>
                    <div className="bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200/50 dark:border-zinc-900">
                      <span className="text-zinc-400 block mb-1 uppercase tracking-wider text-xs">Outputs</span>
                      <pre className="whitespace-pre-wrap">{JSON.stringify(example.output, null, 2)}</pre>
                    </div>
                  </div>
                  <p className="text-sm mt-2">{example.explanation}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: FAQs */}
        {tool.seo.faqs && tool.seo.faqs.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Frequently Asked Questions (FAQ)
            </h3>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden bg-white dark:bg-zinc-950">
              {tool.seo.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="transition-colors">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                      <span>{faq.question}</span>
                      <span className="text-zinc-400 text-xl font-light">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-900/50 bg-zinc-50/20 dark:bg-zinc-900/10">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 6: Internal SEO Linking */}
        {relatedSlugs.length > 0 && (
          <section className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Related Online Calculators & Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {relatedSlugs.map((slug) => {
                // Formatting slug to clean title
                const name = slug
                  .split('-')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ');
                return (
                  <Link
                    key={slug}
                    href={`/tools/${slug}`}
                    className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl hover:border-violet-600 hover:text-violet-600 transition-all flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                    {name}
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
