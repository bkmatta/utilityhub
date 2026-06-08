import React from 'react';

export default function PrivacyPage() {
  const sections = [
    { title: '1. No Server-Side File Storage', content: "UtilityHub is built around local, browser-side operations. When you upload a PDF or document for Merging, Splitting, Protecting, or OCR parsing, the file bytes are loaded directly into your browser's active memory as a Uint8Array. These bytes are processed locally by libraries like pdf-lib and tesseract.js. No document data is ever sent to or stored on our servers." },
    { title: '2. Local Storage Usage', content: 'We use the standard browser localStorage API to temporarily cache history indicators, such as your "Recently Used Tools" list or calculations you explicitly save. This data stays 100% locally on your machine and is never shared, synced, or distributed externally.' },
    { title: '3. Web Analytics & Cookie Policy', content: 'We collect minimal, aggregated traffic indicators to understand platform health, page views, and lookup queries. This analytics data is entirely anonymous and does not capture individual file names, specific numbers keyed into finance calculations, or clipboard content.' },
    { title: '4. Third-Party CDN Scripts', content: 'Some heavy packages (specifically pdf.js rendering script layers) are loaded on-demand from CDN resources (like cdnjs.cloudflare.com) to optimize bundle sizes. These CDNs do not parse or examine the document data processed by the scripts.' },
    { title: '5. Security Protocols', content: 'Our website traffic is served over strict HTTPS SSL protocols. All headers, API calls, and calculations history triggers are encrypted in transit. We prioritize client-side data boundaries to ensure your data stays where it belongs: in your control.' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <section className="border-b border-zinc-200 dark:border-zinc-850 pb-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-zinc-400 dark:text-zinc-550 mt-2 font-mono">Last Updated: June 4, 2026 • Privacy-First Architecture Active</p>
      </section>
      <section className="prose dark:prose-invert text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 space-y-8">
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl text-emerald-800 dark:text-emerald-350">
          <span className="font-bold">Summary</span>: UtilityHub is engineered so that your files and calculations never leave your computer. We process files 100% locally inside the browser.
        </div>
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-zinc-850 dark:text-zinc-250">{sec.title}</h2>
            <p className="leading-relaxed">{sec.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
