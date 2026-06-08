import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video';

export function Reveal() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      {...sceneTransitions.clipCircle}
    >
      <motion.div
        className="w-[12vw] h-[12vw] rounded-3xl bg-[#7C3AED] flex items-center justify-center shadow-[0_0_80px_rgba(124,58,237,0.6)]"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <svg className="w-[6vw] h-[6vw] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </motion.div>

      <motion.div className="mt-8 text-center overflow-hidden">
        <motion.h1 
          className="text-[7vw] font-black tracking-tighter"
          initial={{ y: 100, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          UtilityHub
        </motion.h1>
      </motion.div>

      <motion.div className="mt-4 overflow-hidden">
        <motion.p 
          className="text-[2vw] text-zinc-400 font-medium"
          initial={{ y: 50, opacity: 0 }}
          animate={phase >= 2 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          The ultimate digital utility workspace.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}