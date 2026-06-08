

import React, { useState, useEffect } from 'react';
import { Tool, ToolField } from '@/types/tool';

import { getToolBySlug } from '@/lib/registry';

interface ToolRunnerProps {
  slug: string;
}

export default function ToolRunner({ slug }: ToolRunnerProps) {
  const tool = getToolBySlug(slug);

  // Initialize state based on input specifications
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    if (!tool) return {};
    const initial: Record<string, any> = {};
    tool.inputs.forEach((field) => {
      initial[field.name] = field.defaultValue;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, any> | null>(null);
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);
  const [savedStatus, setSavedStatus] = useState<string>('');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Monitor parameter edits to toggle dirty state flag
  useEffect(() => {
    if (!tool) return;
    let dirty = false;
    tool.inputs.forEach((field) => {
      if (inputs[field.name] !== field.defaultValue) {
        dirty = true;
      }
    });
    setIsDirty(dirty);
    setIsSaved(false); // Re-enable save button on parameter changes
  }, [inputs, tool]);

  // Intercept window refresh / tab closes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Intercept client-side route transitions in DOM capture phase
  useEffect(() => {
    if (!isDirty) return;

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        // Do not intercept if it is a download link, blob URL, or data URL
        if (anchor.hasAttribute('download') || (href && (href.startsWith('blob:') || href.startsWith('data:')))) {
          return;
        }
        if (href && !href.startsWith('#') && href !== window.location.pathname) {
          const confirmLeave = window.confirm('You have unsaved calculation parameter modifications. Are you sure you want to leave this page?');
          if (!confirmLeave) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, [isDirty]);

  // Re-run calculations reactively on input changes
  useEffect(() => {
    if (!tool) return;
    try {
      const output = tool.calculate(inputs);
      if (output instanceof Promise) {
        output.then((res) => setResults(res)).catch(() => setResults(null));
      } else {
        setResults(output);
      }
    } catch {
      setResults(null);
    }
  }, [inputs, tool]);

  if (!tool) return null;

  const handleInputChange = (name: string, value: any) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatResult = (val: any, type: string, unit?: string) => {
    if (val === undefined || val === null || isNaN(val) && typeof val === 'number') {
      return '--';
    }

    if (type === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(val));
    }

    if (type === 'percentage') {
      return `${val}%`;
    }

    if (type === 'json') {
      return (
        <pre className="p-4 bg-zinc-950 text-zinc-100 rounded-xl overflow-x-auto text-xs text-left font-mono">
          <code>{val}</code>
        </pre>
      );
    }

    if (type === 'html') {
      return (
        <div dangerouslySetInnerHTML={{ __html: val }} className="w-full overflow-x-auto text-left printable-document" />
      );
    }

    return `${val}${unit ? ` ${unit}` : ''}`;
  };

  const handleSaveCalculation = () => {
    if (!results) return;
    const historyItem = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
      inputs: { ...inputs },
      outputs: { ...results },
    };
    setCalculationHistory((prev) => [historyItem, ...prev.slice(0, 4)]);
    setSavedStatus('Calculation saved locally');
    setIsSaved(true); // Disable save button until changes occur
    setTimeout(() => setSavedStatus(''), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">
      {/* Inputs Form Board */}
      <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Parameters</h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">Configure values below for instant calculations</p>
          </div>
          <button
            onClick={() => {
              const reset: Record<string, any> = {};
              tool.inputs.forEach((f) => { reset[f.name] = f.defaultValue; });
              setInputs(reset);
            }}
            disabled={!isDirty}
            className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-zinc-500 dark:disabled:hover:text-zinc-500"
          >
            Reset
          </button>
        </div>

        <div className="space-y-4">
          {tool.inputs.map((field) => {
            const val = inputs[field.name];

            return (
              <div key={field.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-zinc-700 dark:text-zinc-305">
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === 'number' && (
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-50 dark:bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-205 dark:border-zinc-850">
                      {val} {field.unit && field.unit !== 'Currency' ? field.unit : ''}
                    </span>
                  )}
                </div>

                {field.type === 'number' && field.slider ? (
                  <div className="space-y-2">
                    <input
                      id={field.name}
                      type="range"
                      min={field.slider.min}
                      max={field.slider.max}
                      step={field.slider.step}
                      value={val}
                      onChange={(e) => handleInputChange(field.name, Number(e.target.value))}
                      className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-650 focus:outline-none"
                    />
                    <input
                      type="number"
                      value={val}
                      placeholder={field.placeholder}
                      onChange={(e) => handleInputChange(field.name, e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none font-mono"
                    />
                  </div>
                ) : field.type === 'number' ? (
                  <input
                    id={field.name}
                    type="number"
                    value={val}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.name, e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none font-mono"
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    value={val}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none cursor-pointer"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'boolean' ? (
                  <label className="flex items-center gap-2.5 cursor-pointer py-0.5">
                    <input
                      id={field.name}
                      type="checkbox"
                      checked={!!val}
                      onChange={(e) => handleInputChange(field.name, e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">{field.helpText || 'Activate standard flag'}</span>
                  </label>
                ) : (
                  <textarea
                    id={field.name}
                    rows={3}
                    value={val}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none font-mono"
                  />
                )}

                {field.helpText && field.type !== 'boolean' && (
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-light leading-normal">{field.helpText}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Outputs Display Board */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-zinc-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-zinc-800 flex flex-col justify-between min-h-[260px]">
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-400 text-xs mb-4">Calculation Result</h2>
            <div className="space-y-4">
              {results ? (
                tool.outputs.map((out) => {
                  const val = results[out.name];
                  const valStr = val !== undefined && val !== null ? String(val) : '';
                  const isLongText = out.type === 'text' && valStr.length > 20;

                  return (
                    <div key={out.name} className="space-y-1">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-medium">{out.label}</span>
                      <div className={
                        isLongText
                          ? "text-xs font-mono bg-zinc-950 p-4 border border-zinc-800 rounded-xl text-zinc-200 break-all whitespace-pre-wrap max-h-40 overflow-y-auto text-left"
                          : "text-2xl sm:text-3xl font-extrabold text-zinc-150 tracking-tight font-sans break-all"
                      }>
                        {formatResult(val, out.type, out.unit)}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-zinc-500 italic py-6">Enter valid inputs to compile results</div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 mt-4 flex justify-between items-center">
            <button
              onClick={handleSaveCalculation}
              disabled={!isDirty || isSaved}
              className="text-xs font-semibold px-4 py-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-350 hover:text-white rounded-xl transition-all border border-zinc-800 hover:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaved ? '✓ Saved' : 'Save Record'}
            </button>
            {savedStatus && <span className="text-xs text-emerald-500 font-light">{savedStatus}</span>}
          </div>
        </div>

        {/* Local History Sidebar Card */}
        {calculationHistory.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-4">Saved Calculations</h3>
            <div className="space-y-3">
              {calculationHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setInputs(item.inputs)}
                  className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 hover:border-violet-500 dark:hover:border-violet-500 rounded-xl cursor-pointer transition-all space-y-1 text-left"
                >
                  <div className="flex justify-between items-center text-[10px] text-zinc-400">
                    <span>{item.timestamp}</span>
                    <span className="underline">Restore</span>
                  </div>
                  <div className="text-xs font-bold text-zinc-700 dark:text-zinc-350 truncate">
                    {Object.entries(item.outputs)
                      .slice(0, 1)
                      .map(([k, v]) => {
                        const outField = tool.outputs.find((o) => o.name === k);
                        return `${outField?.label || k}: ${v}`;
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
