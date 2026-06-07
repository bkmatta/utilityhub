import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video';

export function Value() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2400),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const CheckItem = ({ text, delayPhase }: { text: string, delayPhase: number }) => (
    <motion.div 
      className="flex items-center gap-6 mb-8"
      initial={{ opacity: 0, x: -50 }}
      animate={phase >= delayPhase ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="w-[4vw] h-[4vw] rounded-full bg-[#7C3AED]/20 border border-[#7C3AED] flex items-center justify-center">
        <svg className="w-[2vw] h-[2vw] text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-[4vw] font-bold text-zinc-100">{text}</span>
    </motion.div>
  );

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      {...sceneTransitions.slideLeft}
    >
      <div className="max-w-[80%] w-full pl-[10vw]">
        <CheckItem text="100% Free." delayPhase={1} />
        <CheckItem text="Runs in your browser." delayPhase={2} />
        <CheckItem text="Zero data tracking." delayPhase={3} />
      </div>
    </motion.div>
  );
}