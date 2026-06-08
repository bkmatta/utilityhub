import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video';

export function Categories() {
  const [phase, setPhase] = useState(0);

  // 8000ms duration total
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Dev
      setTimeout(() => setPhase(2), 1800),  // PDF
      setTimeout(() => setPhase(3), 3100),  // Finance
      setTimeout(() => setPhase(4), 4400),  // Image
      setTimeout(() => setPhase(5), 5700),  // All Together
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const CategoryBox = ({ 
    active, title, items, color, x, y 
  }: { 
    active: boolean, title: string, items: string[], color: string, x: string, y: string 
  }) => (
    <motion.div 
      className="absolute bg-zinc-900 border rounded-2xl p-6 shadow-2xl"
      style={{ borderColor: color, x, y }}
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      animate={active ? { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)',
        zIndex: 20
      } : { 
        opacity: 0.3, 
        scale: 0.9, 
        filter: 'blur(4px)',
        zIndex: 10
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="text-[2.5vw] font-bold mb-4" style={{ color }}>{title}</h3>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="bg-zinc-950 px-4 py-3 rounded-lg text-[1.5vw] font-mono text-zinc-300">
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10"
      {...sceneTransitions.splitHorizontal}
    >
      <h2 className="absolute top-[10vh] text-[3vw] font-bold text-zinc-500 tracking-widest uppercase">
        EVERYTHING YOU NEED
      </h2>

      {/* Dev Tools */}
      <CategoryBox 
        active={phase === 1 || phase >= 5}
        title="Developer"
        color="#3B82F6"
        items={["JSON Formatter", "JWT Decoder", "Base64", "UUID Gen"]}
        x="-25vw"
        y="-10vh"
      />

      {/* PDF */}
      <CategoryBox 
        active={phase === 2 || phase >= 5}
        title="PDF Utilities"
        color="#EF4444"
        items={["Merge PDFs", "Split Pages", "Compress", "Sign"]}
        x="25vw"
        y="-15vh"
      />

      {/* Finance */}
      <CategoryBox 
        active={phase === 3 || phase >= 5}
        title="Finance"
        color="#10B981"
        items={["EMI Calculator", "SIP Calculator", "Mortgage"]}
        x="-15vw"
        y="20vh"
      />

      {/* Image */}
      <CategoryBox 
        active={phase === 4 || phase >= 5}
        title="Image Tools"
        color="#F59E0B"
        items={["Compressor", "BG Remover", "HEIC to JPG"]}
        x="20vw"
        y="25vh"
      />

      {/* Center lockup when all active */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={phase >= 5 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="bg-[#7C3AED] text-white px-8 py-4 rounded-full text-[2.5vw] font-bold shadow-[0_0_60px_rgba(124,58,237,0.5)] z-30">
          50+ Micro-Tools
        </div>
      </motion.div>

    </motion.div>
  );
}