import React from 'react';

export default function TermsPage() {
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing or using the UtilityHub platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, you must discontinue using our services immediately.' },
    { title: '2. License & Allowed Use', content: 'UtilityHub grants you a personal, non-exclusive, non-transferable, revocable license to use our online tools, calculators, and PDF utilities. You agree not to abuse, reverse-engineer, or attempt to disrupt the client-side scripts, CDNs, or standard hosting endpoints.' },
    { title: '3. Disclaimer of Warranties', content: 'All tools, converters, and calculators are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. While we strive to maintain calculation accuracy (e.g. progressive tax formulas, amortization schedules), we do not guarantee the completeness or precision of mathematical yields. Users should consult licensed professionals for critical financial or medical decisions.' },
    { title: '4. Limitation of Liability', content: 'In no event shall UtilityHub, its creators, or contributors be liable for any direct, indirect, incidental, special, or consequential damages (including, but not limited to, loss of data, file corruption, or financial loss) arising out of the use or inability to use the platform.' },
    { title: '5. Changes to the Platform', content: 'We reserve the right to modify, add, or remove calculators, page routes, or file utilities at any time without prior notice. Continued use of the platform after updates indicates acceptance of the revised Terms of Service.' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <section className="border-b border-zinc-200 dark:border-zinc-850 pb-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Terms of Service</h1>
        <p className="text-xs text-zinc-400 dark:text-zinc-550 mt-2 font-mono">Last Updated: June 4, 2026 • Platform Access Agreement</p>
      </section>
      <section className="prose dark:prose-invert text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 space-y-8">
        <p className="leading-relaxed">Please review the following terms carefully before using our software tools. By using UtilityHub, you agree that you are bound by these rules.</p>
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
