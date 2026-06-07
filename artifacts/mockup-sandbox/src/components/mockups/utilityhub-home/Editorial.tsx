import React from 'react';
import { 
  ArrowRight, 
  Calculator, 
  FileText, 
  Coins, 
  HeartPulse, 
  Image as ImageIcon, 
  Code, 
  Briefcase, 
  Wrench,
  Search,
  Star,
  Zap,
  TrendingUp,
  Settings2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const CATEGORIES = [
  { name: 'Finance', icon: Coins, description: 'Calculators, currency converters, and financial planning tools.', color: 'bg-amber-100 text-amber-800' },
  { name: 'Health', icon: HeartPulse, description: 'Trackers, BMI calculators, and wellness utilities.', color: 'bg-rose-100 text-rose-800' },
  { name: 'PDF', icon: FileText, description: 'Merge, split, compress, and edit PDF documents.', color: 'bg-violet-100 text-violet-800' },
  { name: 'Developer', icon: Code, description: 'JSON formatters, base64 encoders, and dev utilities.', color: 'bg-slate-200 text-slate-800' },
  { name: 'Image', icon: ImageIcon, description: 'Resize, crop, format conversion, and optimization.', color: 'bg-orange-100 text-orange-800' },
  { name: 'Business', icon: Briefcase, description: 'Invoice generators, tax calculators, and more.', color: 'bg-blue-100 text-blue-800' },
  { name: 'Converters', icon: Zap, description: 'Unit converters, timezones, and format changes.', color: 'bg-emerald-100 text-emerald-800' },
  { name: 'General', icon: Wrench, description: 'Everyday tools for everyday tasks.', color: 'bg-stone-200 text-stone-800' },
];

const TRENDING_TOOLS = [
  { name: 'BMI Calculator', category: 'Health', icon: HeartPulse, views: '12k' },
  { name: 'EMI Calculator', category: 'Finance', icon: Coins, views: '18k' },
  { name: 'Currency Converter', category: 'Finance', icon: ArrowRight, views: '24k' },
  { name: 'PDF Merge', category: 'PDF', icon: FileText, views: '32k' },
  { name: 'JSON Formatter', category: 'Developer', icon: Code, views: '15k' },
];

export function Editorial() {
  return (
    <div className="min-h-screen overflow-y-auto bg-[#fafaf9] text-stone-900 font-sans selection:bg-amber-200">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#fafaf9]/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-violet-600 flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              U
            </div>
            <span className="font-serif font-semibold text-xl tracking-tight">UtilityHub</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#" className="hover:text-amber-600 transition-colors">Categories</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Collections</a>
            <a href="#" className="hover:text-amber-600 transition-colors">About</a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="pl-9 pr-4 py-2 bg-stone-100 border-none rounded-full text-sm focus:ring-2 focus:ring-amber-500/50 outline-none w-48 transition-all focus:w-64"
              />
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 shadow-md shadow-violet-200">
              Explore Tools
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        {/* Hero Section - Asymmetric */}
        <section className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center mb-24">
          <div className="flex-1 space-y-8">
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none font-medium px-3 py-1 rounded-full">
              <Star className="w-3 h-3 inline mr-1 fill-amber-500 text-amber-500" /> Issue No. 42
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-stone-900">
              Your ultimate digital <span className="italic text-violet-700">utility</span> workspace.
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-md font-light">
              Free, 100% private, runs entirely in your browser. A curated collection of tools for finance, health, development, and beyond.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-amber-200 transition-transform hover:-translate-y-1">
                Start Exploring
              </Button>
              <span className="text-sm text-stone-500 font-medium">No sign-in required</span>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-md md:max-w-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-200 to-amber-100 rounded-[2.5rem] transform rotate-3 scale-105 opacity-50 blur-xl"></div>
            <div className="relative bg-white p-8 rounded-[2rem] shadow-xl border border-stone-100 flex flex-col gap-6 transform -rotate-1 transition-transform hover:rotate-0 duration-500">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <h3 className="font-serif font-semibold text-2xl">Featured Tool</h3>
                  <p className="text-sm text-stone-500">Editor's Choice</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-medium mb-2">Smart PDF Merger</h4>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Combine multiple PDFs instantly. Your files never leave your device, ensuring complete privacy and security.
                </p>
                <div className="space-y-3">
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 w-2/3 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-stone-400 font-medium">
                    <span>Processing local files...</span>
                    <span>66%</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full rounded-xl border-stone-200 hover:border-violet-300 hover:bg-violet-50 text-violet-700">
                Try it now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 bg-amber-400 text-amber-950 p-4 rounded-2xl shadow-lg transform -rotate-6 hidden md:block">
              <div className="flex items-center gap-2 font-medium text-sm">
                <Settings2 className="w-4 h-4" /> 100% Private
              </div>
            </div>
          </div>
        </section>

        {/* Curation / Trending */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-8 border-b border-stone-200 pb-4">
            <h2 className="font-serif text-3xl text-stone-900">Popular This Week</h2>
            <a href="#" className="text-sm font-medium text-violet-600 hover:text-violet-800 flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {TRENDING_TOOLS.map((tool, i) => (
              <a href="#" key={i} className="group block p-5 rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                    <tool.icon className="w-5 h-5 text-stone-600 group-hover:text-amber-600" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-stone-300 group-hover:text-amber-400" />
                </div>
                <h3 className="font-medium text-stone-900 mb-1">{tool.name}</h3>
                <p className="text-xs text-stone-500">{tool.category}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Directory */}
        <section>
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-4xl text-stone-900">The Directory</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CATEGORIES.map((cat, i) => (
              <a href="#" key={i} className="group relative overflow-hidden rounded-3xl bg-white p-8 border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 transition-transform group-hover:scale-110 ${cat.color.split(' ')[0]}`}></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${cat.color}`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium mb-3 group-hover:text-violet-700 transition-colors">{cat.name}</h3>
                  <p className="text-stone-600 leading-relaxed mb-6">{cat.description}</p>
                  
                  <div className="flex items-center text-sm font-medium text-amber-600 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                    Explore tools <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
        
      </main>
      
      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-violet-600 flex items-center justify-center text-white font-serif font-bold text-lg">
                U
              </div>
              <span className="font-serif font-semibold text-xl text-stone-100">UtilityHub</span>
            </div>
            <p className="max-w-xs text-sm">
              Your ultimate digital utility workspace. Free, private, and beautifully crafted tools for everyone.
            </p>
          </div>
          <div>
            <h4 className="text-stone-100 font-medium mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">All Tools</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Request a Tool</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-100 font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
