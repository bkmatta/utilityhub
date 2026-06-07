import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video';

export function Intro() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2800),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10"
      {...sceneTransitions.fadeBlur}
    >
      <div className="text-center px-[5vw]">
        <motion.div 
          className="overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[5vw] font-bold tracking-tight leading-tight text-zinc-400">
            Building a project?
          </h1>
        </motion.div>
        
        <motion.div 
          className="overflow-hidden mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[6vw] font-bold tracking-tight leading-tight text-zinc-50">
            You need <span className="text-[#7C3AED]">tools.</span>
          </h1>
        </motion.div>
      </div>
    </motion.div>
  );
}