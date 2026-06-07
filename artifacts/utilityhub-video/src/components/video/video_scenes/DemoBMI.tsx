import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video';

function AnimatedFloat({ target, decimals = 1, duration = 1 }: { target: number; decimals?: number; duration?: number }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState('0.0');

  useEffect(() => {
    const controls = animate(mv, target, { duration, ease: 'easeOut' });
    const unsub = mv.on('change', (v) => setDisplay(v.toFixed(decimals)));
    return () => { controls.stop(); unsub(); };
  }, [target, decimals, duration, mv]);

  return <>{display}</>;
}

const BMI = 23.5;
const BMI_CATEGORIES = [
  { label: 'Underweight', range: '<18.5', color: '#60A5FA', active: false },
  { label: 'Normal', range: '18.5–24.9', color: '#34D399', active: true },
  { label: 'Overweight', range: '25–29.9', color: '#FBBF24', active: false },
  { label: 'Obese', range: '≥30', color: '#F87171', active: false },
];

const NEEDLE_PERCENT = (BMI - 10) / 30; // scale 10–40

export function DemoBMI() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 2300),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const needleAngle = -90 + NEEDLE_PERCENT * 180;

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
        BMI Calculator
      </motion.div>

      <motion.div
        className="w-[40vw] bg-zinc-900 rounded-[2vw] border border-zinc-700 shadow-[0_0_60px_rgba(52,211,153,0.15)] overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-[0.4vw] px-[1.2vw] py-[0.8vw] border-b border-zinc-800 bg-zinc-950">
          <div className="w-[0.7vw] h-[0.7vw] rounded-full bg-red-500/70" />
          <div className="w-[0.7vw] h-[0.7vw] rounded-full bg-yellow-500/70" />
          <div className="w-[0.7vw] h-[0.7vw] rounded-full bg-green-500/70" />
          <span className="ml-auto text-[0.9vw] text-zinc-600 font-mono">utilityhub.app/bmi</span>
        </div>

        <div className="p-[1.6vw]">
          <div className="text-[1.6vw] font-bold text-zinc-100 mb-[1.2vw]">BMI Calculator</div>

          {/* Input fields */}
          <div className="grid grid-cols-2 gap-[1vw] mb-[1.2vw]">
            {[
              { label: 'Height', value: '175', unit: 'cm', delay: 1 },
              { label: 'Weight', value: '72', unit: 'kg', delay: 2 },
            ].map((field) => (
              <motion.div
                key={field.label}
                className="bg-zinc-800 rounded-[0.8vw] px-[0.9vw] py-[0.7vw]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={phase >= field.delay ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              >
                <div className="text-[0.75vw] text-zinc-500 mb-[0.2vw]">{field.label}</div>
                <div className="flex items-baseline gap-[0.3vw]">
                  <span className="text-[2vw] font-bold text-zinc-100">{field.value}</span>
                  <span className="text-[0.9vw] text-zinc-500">{field.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gauge + result */}
          <motion.div
            className="bg-zinc-950/60 rounded-[1.2vw] p-[1.2vw]"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          >
            {/* Semicircle gauge */}
            <div className="relative flex items-end justify-center h-[7vw] mb-[0.4vw]">
              <svg viewBox="0 0 200 110" className="w-[18vw]" style={{ overflow: 'visible' }}>
                {/* Background arc segments */}
                {[
                  { color: '#1D4ED8', d: 'M 20 100 A 80 80 0 0 1 60 27' },
                  { color: '#065F46', d: 'M 60 27 A 80 80 0 0 1 140 27' },
                  { color: '#92400E', d: 'M 140 27 A 80 80 0 0 1 178 55' },
                  { color: '#7F1D1D', d: 'M 178 55 A 80 80 0 0 1 180 100' },
                ].map((seg, i) => (
                  <motion.path
                    key={i}
                    d={seg.d}
                    stroke={seg.color}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={phase >= 3 ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeOut' }}
                  />
                ))}
                {/* Needle */}
                <motion.line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="28"
                  stroke="#7C3AED"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ rotate: -90, originX: '100px', originY: '100px' }}
                  animate={phase >= 4
                    ? { rotate: needleAngle, originX: '100px', originY: '100px' }
                    : { rotate: -90, originX: '100px', originY: '100px' }
                  }
                  transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.1 }}
                  style={{ transformOrigin: '100px 100px' }}
                />
                <circle cx="100" cy="100" r="5" fill="#7C3AED" />
              </svg>

              {/* Center BMI value */}
              <motion.div
                className="absolute bottom-0 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.3 }}
              >
                <div className="text-[2.8vw] font-black text-emerald-400 leading-none">
                  {phase >= 4 ? <AnimatedFloat target={BMI} /> : '0.0'}
                </div>
                <div className="text-[0.8vw] text-zinc-500">BMI</div>
              </motion.div>
            </div>

            {/* Category badges */}
            <div className="grid grid-cols-4 gap-[0.4vw] mt-[0.6vw]">
              {BMI_CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  className={`rounded-[0.5vw] px-[0.4vw] py-[0.4vw] text-center border ${cat.active ? 'border-current' : 'border-transparent'}`}
                  style={{
                    backgroundColor: cat.active ? `${cat.color}22` : 'transparent',
                    color: cat.active ? cat.color : '#52525B',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.4, ease: 'circOut' }}
                >
                  <div className="text-[0.65vw] font-semibold">{cat.label}</div>
                  <div className="text-[0.55vw] opacity-70">{cat.range}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
