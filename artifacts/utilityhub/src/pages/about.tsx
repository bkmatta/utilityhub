import React from 'react';
import { Link } from 'wouter';

export default function AboutPage() {
  const stats = [
    { value: '50+', label: 'Calculators & Tools' },
    { value: '100%', label: 'Private (Client-Side)' },
    { value: '0 Bytes', label: 'User Files Saved on Server' },
    { value: 'Ultra-fast', label: 'Static Site Rendering' },
  ];

  const values = [
    {
      icon: '🔒',
      title: 'Privacy & Security First',
      desc: 'All file manipulations, OCR recognition, and PDF protection algorithms run entirely in your local browser workspace using WebAssembly and Web Workers. We never send your documents to a remote server.',
    },
    {
      icon: '🚀',
      title: 'Zero Latency & Overhead',
      desc: 'By compiling and pre-rendering our utilities statically, we eliminate load times. Calculators render and respond instantly to custom parameters, sliders, and form adjustments.',
    },
    {
      icon: '💎',
      title: 'Modern Aesthetic Design',
      desc: 'UtilityHub is built for builders, developers, finance planners, and professionals. We deliver responsive layouts, high contrast visual cues, and cohesive themes designed to delight.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 dark:bg-violet-950/30 border border-violet-200/60 dark:border-violet-900/50 text-violet-650 dark:text-violet-400 rounded-full text-xs font-semibold">
          🛡️ Behind the Scenes
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          About <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">UtilityHub</span>
        </h1>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          We believe micro-utilities should be fast, elegant, and completely private. UtilityHub was created to assemble standard calculators and file tools into a single client-side ecosystem.
        </p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-850 rounded-2xl text-center shadow-sm">
            <div className="text-3xl font-black text-violet-600 dark:text-violet-400">{stat.value}</div>
            <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">Our Core Principles</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">The architectural choices that define our service</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, i) => (
            <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-250/60 dark:border-zinc-800 rounded-3xl space-y-4 shadow-sm">
              <div className="text-3xl">{val.icon}</div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base">{val.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-8 sm:p-12 bg-gradient-to-tr from-violet-600/10 to-indigo-500/10 dark:from-violet-950/20 dark:to-indigo-900/10 border border-violet-500/20 dark:border-violet-900/20 rounded-3xl text-center space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Ready to get started?</h2>
        <p className="max-w-md mx-auto text-xs text-zinc-500 dark:text-zinc-400">
          Browse through our 50 high-fidelity tools or use our autocomplete search query bar on the homepage to find calculators instantly.
        </p>
        <div>
          <Link href="/" className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold shadow transition-all">
            Explore Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
