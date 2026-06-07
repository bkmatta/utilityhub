import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video';

const RAW_LINES = [
  `{"name":"Alice","age":28,"city":"Mumbai","active":true}`,
];

const FORMATTED_TOKENS: { text: string; color: string }[][] = [
  [{ text: '{', color: '#E4E4E7' }],
  [
    { text: '  "name"', color: '#7DD3FC' },
    { text: ': ', color: '#E4E4E7' },
    { text: '"Alice"', color: '#86EFAC' },
    { text: ',', color: '#E4E4E7' },
  ],
  [
    { text: '  "age"', color: '#7DD3FC' },
    { text: ': ', color: '#E4E4E7' },
    { text: '28', color: '#FCA5A5' },
    { text: ',', color: '#E4E4E7' },
  ],
  [
    { text: '  "city"', color: '#7DD3FC' },
    { text: ': ', color: '#E4E4E7' },
    { text: '"Mumbai"', color: '#86EFAC' },
    { text: ',', color: '#E4E4E7' },
  ],
  [
    { text: '  "active"', color: '#7DD3FC' },
    { text: ': ', color: '#E4E4E7' },
    { text: 'true', color: '#C4B5FD' },
  ],
  [{ text: '}', color: '#E4E4E7' }],
];

export function DemoJSON() {
  const [phase, setPhase] = useState(0);
  const [typedLen, setTypedLen] = useState(0);

  const rawStr = RAW_LINES[0];

  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 400);
    return () => clearTimeout(t0);
  }, []);

  // Typing animation for the raw input
  useEffect(() => {
    if (phase < 1) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedLen(i);
      if (i >= rawStr.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [phase, rawStr.length]);

  // After typing is done (~1.8s), move to formatted phase
  const typingDone = typedLen >= rawStr.length;
  const [showFormatted, setShowFormatted] = useState(false);
  useEffect(() => {
    if (!typingDone) return;
    const t = setTimeout(() => setShowFormatted(true), 600);
    return () => clearTimeout(t);
  }, [typingDone]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10"
      {...sceneTransitions.slideRight}
    >
      {/* Scene label */}
      <motion.div
        className="absolute top-[7vh] left-1/2 -translate-x-1/2 text-[1.4vw] font-semibold tracking-[0.2em] uppercase text-zinc-500"
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        JSON Formatter
      </motion.div>

      <div className="flex gap-[2vw] items-stretch">
        {/* INPUT panel */}
        <motion.div
          className="w-[28vw] bg-zinc-900 rounded-[1.5vw] border border-zinc-700 shadow-[0_0_40px_rgba(124,58,237,0.15)] overflow-hidden flex flex-col"
          initial={{ opacity: 0, x: -40 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        >
          <div className="flex items-center gap-[0.4vw] px-[1vw] py-[0.7vw] border-b border-zinc-800 bg-zinc-950">
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-red-500/70" />
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-yellow-500/70" />
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-green-500/70" />
            <span className="ml-[0.5vw] text-[0.85vw] text-zinc-500 font-mono">Input</span>
          </div>
          <div className="p-[1.2vw] flex-1 font-mono text-[0.9vw] text-zinc-300 leading-relaxed">
            <span>{rawStr.slice(0, typedLen)}</span>
            {phase >= 1 && typedLen < rawStr.length && (
              <motion.span
                className="inline-block w-[0.5vw] h-[1.1em] bg-violet-400 ml-[1px]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            )}
          </div>
          {/* Format button */}
          <motion.div
            className="mx-[1.2vw] mb-[1.2vw] py-[0.6vw] rounded-[0.6vw] bg-violet-600 text-center text-[0.9vw] font-semibold text-white cursor-pointer"
            animate={typingDone ? { opacity: 1, scale: [1, 0.96, 1] } : { opacity: 0.4 }}
            transition={{ scale: { duration: 0.15, times: [0, 0.5, 1] } }}
          >
            Format JSON
          </motion.div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="flex items-center self-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={typingDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <svg className="w-[2.5vw] h-[2.5vw] text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.div>

        {/* OUTPUT panel */}
        <motion.div
          className="w-[28vw] bg-zinc-900 rounded-[1.5vw] border border-violet-500/40 shadow-[0_0_40px_rgba(124,58,237,0.3)] overflow-hidden flex flex-col"
          initial={{ opacity: 0, x: 40 }}
          animate={showFormatted ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        >
          <div className="flex items-center gap-[0.4vw] px-[1vw] py-[0.7vw] border-b border-violet-800/50 bg-zinc-950">
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-red-500/70" />
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-yellow-500/70" />
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-green-500/70" />
            <span className="ml-[0.5vw] text-[0.85vw] text-violet-400 font-mono">Formatted ✓</span>
          </div>
          <div className="p-[1.2vw] flex-1 font-mono text-[0.9vw] leading-[1.8]">
            {FORMATTED_TOKENS.map((line, li) => (
              <motion.div
                key={li}
                initial={{ opacity: 0, x: -10 }}
                animate={showFormatted ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: li * 0.08, duration: 0.35, ease: 'circOut' }}
              >
                {line.map((tok, ti) => (
                  <span key={ti} style={{ color: tok.color }}>{tok.text}</span>
                ))}
              </motion.div>
            ))}
          </div>
          <div className="mx-[1.2vw] mb-[1.2vw] flex gap-[0.6vw]">
            <motion.div
              className="flex-1 py-[0.5vw] rounded-[0.6vw] border border-violet-500/50 text-center text-[0.85vw] text-violet-400"
              initial={{ opacity: 0 }}
              animate={showFormatted ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              Copy
            </motion.div>
            <motion.div
              className="flex-1 py-[0.5vw] rounded-[0.6vw] border border-zinc-600 text-center text-[0.85vw] text-zinc-400"
              initial={{ opacity: 0 }}
              animate={showFormatted ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.7 }}
            >
              Minify
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
