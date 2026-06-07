import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video';

export function Problem() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const tools = [
    { name: "JSON Formatter", top: "20%", left: "15%", rot: -10 },
    { name: "EMI Calculator", top: "15%", left: "60%", rot: 5 },
    { name: "PDF Merger", top: "70%", left: "20%", rot: 8 },
    { name: "Image Compressor", top: "65%", left: "65%", rot: -5 },
    { name: "JWT Decoder", top: "40%", left: "75%", rot: 15 },
    { name: "Base64 Encoder", top: "45%", left: "10%", rot: -12 },
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10"
      {...sceneTransitions.zoomThrough}
    >
      {/* Floating tool cards */}
      {tools.map((tool, i) => (
        <motion.div
          key={i}
          className="absolute bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-6 shadow-2xl"
          style={{ top: tool.top, left: tool.left }}
          initial={{ opacity: 0, scale: 0.5, rotate: tool.rot }}
          animate={phase >= 1 + Math.floor(i/2) ? { 
            opacity: 0.8, 
            scale: 1,
            rotate: tool.rot,
            y: [0, -15, 0]
          } : { opacity: 0, scale: 0.5, rotate: tool.rot }}
          transition={{ 
            opacity: { duration: 0.5 },
            scale: { type: 'spring', stiffness: 300, damping: 20 },
            y: { duration: 4, repeat: Infinity, delay: i * 0.2 }
          }}
        >
          <span className="text-[1.5vw] font-medium text-zinc-300">{tool.name}</span>
        </motion.div>
      ))}

      <motion.div 
        className="text-center bg-zinc-950/80 backdrop-blur-md p-8 rounded-3xl border border-zinc-800 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <h2 className="text-[4vw] font-bold text-zinc-50">Too many tabs.</h2>
        <h2 className="text-[4vw] font-bold text-zinc-50 mt-2">Too much friction.</h2>
      </motion.div>
    </motion.div>
  );
}