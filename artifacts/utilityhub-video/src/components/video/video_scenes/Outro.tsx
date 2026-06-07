import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video';

export function Outro() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      {...sceneTransitions.perspectiveFlip}
    >
      <motion.div
        className="w-[10vw] h-[10vw] rounded-3xl bg-[#7C3AED] flex items-center justify-center mb-8 shadow-[0_0_100px_rgba(124,58,237,0.8)]"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <svg className="w-[5vw] h-[5vw] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </motion.div>

      <motion.h1 
        className="text-[6vw] font-black tracking-tighter"
        initial={{ opacity: 0, y: 30 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        UtilityHub
      </motion.h1>

      <motion.p 
        className="text-[2.5vw] text-zinc-400 font-medium mt-4"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        Your digital utility workspace.
      </motion.p>

      <motion.div
        className="mt-12 px-8 py-4 rounded-full bg-white text-black font-bold text-[2vw]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        utilityhub.app
      </motion.div>
    </motion.div>
  );
}