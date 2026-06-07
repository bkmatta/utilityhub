'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Feedback', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    // Simulate form submission to backend/logging endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setForm({ name: '', email: '', subject: 'Feedback', message: '' });
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      {/* Intro Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Get in <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">Touch</span>
        </h1>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
          Have suggestions for new calculators? Found an error with a file compilation? Send us a note below and we will get back to you.
        </p>
      </section>

      {/* Grid Contact Cards */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Form */}
        <div className="md:col-span-7 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-850 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Send a Message</h2>
          
          {success && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900 rounded-2xl text-xs sm:text-sm text-emerald-800 dark:text-emerald-350">
              ✓ Thank you! Your message has been sent successfully. We will respond within 24 hours.
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-250 dark:border-rose-900 rounded-2xl text-xs sm:text-sm text-rose-800 dark:text-rose-350">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="yourname@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-violet-500 focus:outline-none cursor-pointer"
              >
                <option value="Feedback">General Feedback</option>
                <option value="Bug Report">Report a Bug</option>
                <option value="Feature Request">Request a New Tool</option>
                <option value="Partnership">Business Partnership</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Type your message here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-violet-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-55 text-white font-bold rounded-xl shadow transition-all cursor-pointer"
              >
                {isSubmitting ? 'Sending message...' : 'Submit Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Details */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl space-y-4">
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm sm:text-base">Support & Help</h3>
            <div className="space-y-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              <p>
                <strong>Email Support:</strong><br />
                <a href="mailto:support@utilityhub.com" className="text-violet-600 dark:text-violet-400 hover:underline">
                  support@utilityhub.com
                </a>
              </p>
              <p>
                <strong>Response Time:</strong><br />
                We aim to reply to all queries within 24 hours.
              </p>
              <p>
                <strong>Bug Reports:</strong><br />
                Be sure to include the tool slug and details about your input parameters if reporting a calculation error.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl space-y-4">
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm sm:text-base">Security Auditing</h3>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              For vulnerability disclosures, please coordinate directly with our developer security team at{' '}
              <a href="mailto:security@utilityhub.com" className="text-violet-600 dark:text-violet-400 hover:underline font-semibold">
                security@utilityhub.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
