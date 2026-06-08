import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video';

function AnimatedNumber({ target, duration = 1.2 }: { target: number; duration?: number }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    Math.round(v).toLocaleString('en-IN')
  );
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const controls = animate(mv, target, { duration, ease: 'easeOut' });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [target, duration, mv, rounded]);

  return <>{display}</>;
}

const STAGES = [
  { label: 'Loan Amount', value: '₹ 25,00,000', progress: 0.5 },
  { label: 'Interest Rate', value: '8.5%', progress: 0.34 },
  { label: 'Tenure', value: '20 yrs', progress: 0.67 },
];

export function DemoEMI() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => setPhase(4), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10"
      {...sceneTransitions.slideLeft}
    >
      {/* Scene label */}
      <motion.div
        className="absolute top-[7vh] left-1/2 -translate-x-1/2 text-[1.4vw] font-semibold tracking-[0.2em] uppercase text-zinc-500"
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        EMI Calculator
      </motion.div>

      {/* Phone-style mockup */}
      <motion.div
        className="relative w-[38vw] bg-zinc-900 rounded-[2vw] border border-zinc-700 shadow-[0_0_60px_rgba(124,58,237,0.25)] overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-[0.4vw] px-[1.2vw] py-[0.8vw] border-b border-zinc-800 bg-zinc-950">
          <div className="w-[0.7vw] h-[0.7vw] rounded-full bg-red-500/70" />
          <div className="w-[0.7vw] h-[0.7vw] rounded-full bg-yellow-500/70" />
          <div className="w-[0.7vw] h-[0.7vw] rounded-full bg-green-500/70" />
          <span className="ml-auto text-[0.9vw] text-zinc-600 font-mono">utilityhub.app/emi</span>
        </div>

        <div className="p-[1.6vw] space-y-[1.2vw]">
          {/* Title */}
          <div className="text-[1.6vw] font-bold text-zinc-100">EMI Calculator</div>

          {/* Sliders */}
          {STAGES.map((s, i) => (
            <motion.div
              key={s.label}
              className="space-y-[0.3vw]"
              initial={{ opacity: 0, x: -20 }}
              animate={phase >= i + 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            >
              <div className="flex justify-between items-center">
                <span className="text-[0.95vw] text-zinc-400">{s.label}</span>
                <motion.span
                  className="text-[0.95vw] font-semibold text-violet-400"
                  initial={{ opacity: 0 }}
                  animate={phase >= i + 1 ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {s.value}
                </motion.span>
              </div>
              {/* Track */}
              <div className="h-[0.5vw] rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
                  initial={{ width: 0 }}
                  animate={phase >= i + 1 ? { width: `${s.progress * 100}%` } : { width: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                />
              </div>
            </motion.div>
          ))}

          {/* Result card */}
          <motion.div
            className="mt-[0.8vw] rounded-[1vw] border border-violet-500/40 bg-violet-950/30 p-[1.2vw]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <div className="text-[0.95vw] text-zinc-400 mb-[0.3vw]">Monthly EMI</div>
            <div className="text-[3vw] font-black text-violet-300">
              ₹ {phase >= 4 ? <AnimatedNumber target={21593} /> : '0'}
            </div>
            <div className="flex gap-[2vw] mt-[0.6vw]">
              <div>
                <div className="text-[0.75vw] text-zinc-500">Total Interest</div>
                <div className="text-[1vw] font-semibold text-zinc-300">₹ 26,82,320</div>
              </div>
              <div>
                <div className="text-[0.75vw] text-zinc-500">Total Payment</div>
                <div className="text-[1vw] font-semibold text-zinc-300">₹ 51,82,320</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Side label */}
      <motion.div
        className="absolute right-[8vw] top-1/2 -translate-y-1/2 flex flex-col gap-[0.8vw]"
        initial={{ opacity: 0, x: 30 }}
        animate={phase >= 4 ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {['Finance Tools', 'Instant Results', 'Zero Sign-up'].map((t) => (
          <div key={t} className="flex items-center gap-[0.6vw]">
            <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-violet-500" />
            <span className="text-[1.1vw] text-zinc-400">{t}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
