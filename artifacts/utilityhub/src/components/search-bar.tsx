import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Tool } from '@/types/tool';
import { searchTools, getTrendingTools } from '@/lib/registry';

export default function SearchBar() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentTools, setRecentTools] = useState<Tool[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const trending = getTrendingTools();

  useEffect(() => {
    const stored = localStorage.getItem('recently_used_tools');
    if (stored) {
      try {
        setRecentTools(JSON.parse(stored));
      } catch {
        // Safe skip
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const match = searchTools(query);
      setResults(match.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
    }
  }, [query]);

  const selectTool = (tool: Tool) => {
    const currentRecents = recentTools.filter((t) => t.slug !== tool.slug);
    const updated = [tool, ...currentRecents].slice(0, 4);
    localStorage.setItem('recently_used_tools', JSON.stringify(updated));
    setRecentTools(updated);
    setQuery('');
    setIsOpen(false);
    navigate(`/tools/${tool.slug}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-50">
      <div className="flex items-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-md px-4 py-3 gap-3 focus-within:ring-2 focus-within:ring-violet-500 transition-all">
        <span className="text-zinc-400">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search calculators, PDF tools, converters..."
          className="w-full bg-transparent border-none text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none placeholder-zinc-400"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-xs text-zinc-400 hover:text-zinc-600 px-1 font-semibold">
            Clear
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 shadow-lg rounded-2xl p-4 overflow-hidden space-y-4">
          {results.length > 0 ? (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block px-2">Matches</span>
              {results.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => selectTool(tool)}
                  className="w-full px-2 py-2 flex items-center justify-between text-left hover:bg-zinc-50 dark:hover:bg-zinc-950 rounded-xl transition-all"
                >
                  <div>
                    <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-250">{tool.title}</div>
                    <div className="text-xs text-zinc-400 truncate max-w-md">{tool.description}</div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-850 text-zinc-500 capitalize">
                    {tool.category}
                  </span>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="text-xs text-zinc-400 italic px-2">No matching tools found. Try searching by categories...</div>
          ) : null}

          {recentTools.length > 0 && !query.trim() && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block px-2">Recently Used</span>
              <div className="grid grid-cols-2 gap-2">
                {recentTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => selectTool(tool)}
                    className="p-2 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl hover:border-violet-500 dark:hover:border-violet-500 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/50 text-left truncate text-xs font-medium text-zinc-700 dark:text-zinc-350"
                  >
                    ⏱️ {tool.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(!query.trim() || results.length === 0) && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block px-2">Trending Tools</span>
              <div className="flex flex-wrap gap-2 px-1">
                {trending.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => selectTool(tool)}
                    className="text-xs px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850 rounded-lg hover:border-violet-500 text-zinc-650 dark:text-zinc-350 font-medium"
                  >
                    {tool.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
