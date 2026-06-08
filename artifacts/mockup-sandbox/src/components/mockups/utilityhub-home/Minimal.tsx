import React, { useState } from "react";
import { Search, Calculator, HeartPulse, Sparkles, ArrowRightLeft, FileText, Code, Image as ImageIcon, Briefcase, ArrowRight, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Finance", icon: Calculator },
  { name: "Health", icon: HeartPulse },
  { name: "General", icon: Sparkles },
  { name: "Converters", icon: ArrowRightLeft },
  { name: "PDF", icon: FileText },
  { name: "Developer", icon: Code },
  { name: "Image", icon: ImageIcon },
  { name: "Business", icon: Briefcase },
];

const trendingTools = [
  { name: "BMI Calculator", category: "Health", users: "1.2k today" },
  { name: "EMI Calculator", category: "Finance", users: "850 today" },
  { name: "Currency Converter", category: "Converters", users: "3.4k today" },
  { name: "PDF Merge", category: "PDF", users: "5.1k today" },
  { name: "JSON Formatter", category: "Developer", users: "2.8k today" },
];

export function Minimal() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen overflow-y-auto bg-zinc-50 font-sans text-zinc-900 selection:bg-violet-100 selection:text-violet-900">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Navigation */}
      <header className="sticky top-0 z-10 bg-zinc-50/80 backdrop-blur-md border-b border-zinc-200/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium tracking-tight">
            <div className="w-6 h-6 rounded-md bg-violet-600 text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            UtilityHub
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-500 font-medium">
            <a href="#" className="hover:text-zinc-900 transition-colors">Categories</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Trending</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center">
        {/* Hero Section */}
        <div className="w-full text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900">
            Your Ultimate Digital Utility Workspace
          </h1>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg font-light">
            Free, 100% private, runs entirely in your browser. No sign-in required.
          </p>
          
          <div className="relative max-w-2xl mx-auto mt-10 shadow-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for tools..." 
              className="w-full h-14 pl-12 pr-4 bg-white border-zinc-200 rounded-xl text-lg focus-visible:ring-violet-500 focus-visible:border-violet-500 placeholder:text-zinc-400 font-light"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400 border border-zinc-200 rounded px-2 py-1 bg-zinc-50">
              ⌘K
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="w-full mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">Browse Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button 
                key={category.name}
                className="group flex flex-col items-center justify-center p-6 bg-white border border-zinc-200/60 rounded-2xl hover:border-violet-500/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 mb-4 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors">
                  <category.icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-sm font-medium text-zinc-700">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Tools Horizontal List */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Trending Now
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200/60 overflow-hidden">
            {trendingTools.map((tool, idx) => (
              <div 
                key={tool.name}
                className={`group flex items-center justify-between p-4 px-6 hover:bg-zinc-50 transition-colors cursor-pointer ${
                  idx !== trendingTools.length - 1 ? 'border-b border-zinc-100' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="font-medium text-zinc-900 group-hover:text-violet-600 transition-colors">
                    {tool.name}
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 text-xs font-medium text-zinc-500">
                    {tool.category}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-400 font-light hidden sm:block">
                    {tool.users}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-violet-500 transition-colors transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 mt-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-500 font-light">
            © {new Date().getFullYear()} UtilityHub. Open source workspace.
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
