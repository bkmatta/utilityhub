import React, { useState } from 'react';
import { 
  Search, 
  Calculator, 
  Activity, 
  Box, 
  Repeat, 
  FileText, 
  Code, 
  Image as ImageIcon, 
  Briefcase,
  TrendingUp,
  ArrowRight,
  Shield,
  Zap,
  Lock,
  ChevronRight
} from 'lucide-react';

const categories = [
  { name: 'Finance', icon: Calculator, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-500/20' },
  { name: 'Health', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-500/20' },
  { name: 'General', icon: Box, color: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-500/20' },
  { name: 'Converters', icon: Repeat, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-500/20' },
  { name: 'PDF', icon: FileText, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-500/20' },
  { name: 'Developer', icon: Code, color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10', border: 'border-fuchsia-500/20' },
  { name: 'Image', icon: ImageIcon, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-500/20' },
  { name: 'Business', icon: Briefcase, color: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-500/20' },
];

const trendingTools = [
  { name: 'BMI Calculator', category: 'Health' },
  { name: 'EMI Calculator', category: 'Finance' },
  { name: 'Currency Converter', category: 'Finance' },
  { name: 'PDF Merge', category: 'PDF' },
  { name: 'JSON Formatter', category: 'Developer' }
];

export function Bold() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="min-h-screen overflow-y-auto bg-zinc-950 text-zinc-100 font-sans selection:bg-violet-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .glow-bg {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(9, 9, 11, 0) 70%);
          top: -400px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-title {
          letter-spacing: -0.04em;
        }
      `}} />

      <div className="glow-bg" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-zinc-900/50 bg-zinc-950/50 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-inter">UtilityHub</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Categories</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Trending</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">About</a>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors border border-zinc-700">
            Browse All Tools
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center w-full max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-semibold mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.8)]"></span>
            Free & 100% Private Browser Tools
          </div>
          
          <h1 className="hero-title text-6xl md:text-7xl font-black text-white leading-[1.1] mb-8 font-inter">
            Your Ultimate Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400">
              Utility Workspace
            </span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed mb-12">
            Hundreds of free tools that run completely in your browser. No sign-in required. No data leaves your device.
          </p>

          <div className="w-full max-w-2xl relative group">
            <div className={\`absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-xl blur transition-opacity duration-300 \${searchFocused ? 'opacity-30' : 'opacity-0'}\`} />
            <div className={\`relative flex items-center w-full bg-zinc-900 border \${searchFocused ? 'border-violet-500/50' : 'border-zinc-800'} rounded-xl shadow-2xl transition-all overflow-hidden\`}>
              <div className="pl-6 pr-4 flex items-center justify-center text-zinc-400">
                <Search className="w-6 h-6" />
              </div>
              <input 
                type="text" 
                placeholder="Search for any tool (e.g., PDF Merge, BMI Calculator)..." 
                className="w-full bg-transparent border-none py-5 text-lg text-white placeholder:text-zinc-600 focus:outline-none focus:ring-0"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="pr-3">
                <button className="px-5 py-2.5 bg-white text-zinc-950 font-bold rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2">
                  Search
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-8 text-sm font-medium text-zinc-500">
            <div className="flex items-center gap-2"><Lock className="w-4 h-4" /> 100% Private</div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4" /> Runs in Browser</div>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> No Sign-in</div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="w-full mb-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold font-inter tracking-tight">Browse by Category</h2>
            <a href="#" className="text-violet-400 font-semibold hover:text-violet-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className="group relative flex flex-col p-6 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-violet-500/30 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12),0_0_20px_rgba(124,58,237,0.1)]"
              >
                <div className={\`w-12 h-12 rounded-xl flex items-center justify-center \${cat.bg} \${cat.color} \${cat.border} border mb-6 transition-transform group-hover:scale-110 group-hover:-rotate-3\`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-inter text-zinc-100 group-hover:text-white transition-colors">{cat.name}</h3>
                <p className="text-sm text-zinc-500 font-medium">Explore tools <span className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-400 ml-1">→</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Tools */}
        <div className="w-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-bold font-inter tracking-tight">Trending Right Now</h2>
          </div>
          
          <div className="flex flex-col gap-3">
            {trendingTools.map((tool, idx) => (
              <div 
                key={idx} 
                className="group flex items-center justify-between p-4 bg-zinc-900/40 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-indigo-500/30 rounded-xl cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <span className="text-zinc-600 font-bold w-6 text-right group-hover:text-indigo-500 transition-colors">0{idx + 1}</span>
                  <span className="text-lg font-bold text-zinc-200 group-hover:text-white transition-colors">{tool.name}</span>
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-zinc-800 text-zinc-400 uppercase tracking-wider">{tool.category}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-indigo-500 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
      
      {/* Minimal Footer */}
      <footer className="border-t border-zinc-900/80 py-12 text-center text-zinc-500 text-sm font-medium bg-zinc-950">
        <p>© {new Date().getFullYear()} UtilityHub. Private, fast, and free forever.</p>
      </footer>
    </div>
  );
}
