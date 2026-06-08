import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/65 dark:border-zinc-900 transition-colors pt-16 pb-12 mt-24 text-sm text-zinc-500 dark:text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-zinc-200/50 dark:border-zinc-900/50">
        
        {/* Brand details */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black text-sm">
              U
            </div>
            <span className="font-bold text-base text-zinc-900 dark:text-zinc-100 tracking-tight">
              Utility<span className="text-violet-600">Hub</span>
            </span>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">
            A secure, traffic-first platform containing the highest-demand calculators, unit converters, developer formatters, and client-side secure PDF processing workspaces.
          </p>
          <p className="text-[10px] text-zinc-400">
            © {new Date().getFullYear()} UtilityHub. All rights reserved.
          </p>
        </div>

        {/* Column 1: Calculators */}
        <div className="space-y-3">
          <h4 className="font-semibold text-zinc-800 dark:text-zinc-300 text-xs uppercase tracking-wider">Calculators</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/tools/bmi-calculator" className="hover:text-zinc-900 dark:hover:text-zinc-300">BMI Calculator</Link></li>
            <li><Link href="/tools/emi-calculator" className="hover:text-zinc-900 dark:hover:text-zinc-300">EMI Calculator</Link></li>
            <li><Link href="/tools/age-calculator" className="hover:text-zinc-900 dark:hover:text-zinc-300">Age Calculator</Link></li>
            <li><Link href="/tools/sip-calculator" className="hover:text-zinc-900 dark:hover:text-zinc-300">SIP Calculator</Link></li>
            <li><Link href="/tools/compound-interest-calculator" className="hover:text-zinc-900 dark:hover:text-zinc-300">Compound Interest</Link></li>
          </ul>
        </div>

        {/* Column 2: Core Utilities */}
        <div className="space-y-3">
          <h4 className="font-semibold text-zinc-800 dark:text-zinc-300 text-xs uppercase tracking-wider">Utilities</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/tools/pdf-merge" className="hover:text-zinc-900 dark:hover:text-zinc-300">Merge PDF</Link></li>
            <li><Link href="/tools/pdf-split" className="hover:text-zinc-900 dark:hover:text-zinc-300">Split PDF</Link></li>
            <li><Link href="/tools/json-formatter" className="hover:text-zinc-900 dark:hover:text-zinc-300">JSON Formatter</Link></li>
            <li><Link href="/tools/uuid-generator" className="hover:text-zinc-900 dark:hover:text-zinc-300">UUID Generator</Link></li>
            <li><Link href="/tools/base64-encoder-decoder" className="hover:text-zinc-900 dark:hover:text-zinc-300">Base64 Codec</Link></li>
            <li><Link href="/tools/image-compressor" className="hover:text-zinc-900 dark:hover:text-zinc-300">Image Compressor</Link></li>
            <li><Link href="/tools/invoice-generator" className="hover:text-zinc-900 dark:hover:text-zinc-300">Invoice Generator</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal & About */}
        <div className="space-y-3">
          <h4 className="font-semibold text-zinc-800 dark:text-zinc-300 text-xs uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-300">About Us</Link></li>
            <li><Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-300">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-300">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-300">Contact</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-zinc-400">
        <div>
          Hosting optimized globally. Low infra overhead enabled. Secure data validation active.
        </div>
        <div className="flex gap-4">
          <span>Google Analytics</span>
          <span>PostHog Enabled</span>
          <span>Sentry Shield Active</span>
        </div>
      </div>
    </footer>
  );
}
