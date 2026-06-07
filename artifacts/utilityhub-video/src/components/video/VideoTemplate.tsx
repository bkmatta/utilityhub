import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Intro } from './video_scenes/Intro';
import { Problem } from './video_scenes/Problem';
import { Reveal } from './video_scenes/Reveal';
import { Categories } from './video_scenes/Categories';
import { Value } from './video_scenes/Value';
import { Outro } from './video_scenes/Outro';

export const SCENE_DURATIONS: Record<string, number> = { 
  intro: 4500, 
  problem: 5000, 
  reveal: 4500, 
  categories: 9000, 
  value: 4500, 
  outro: 6000 
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  intro: Intro,
  problem: Problem,
  reveal: Reveal,
  categories: Categories,
  value: Value,
  outro: Outro,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#09090B] text-zinc-50 font-sans">
      {/* Persistent Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute w-[80vw] h-[80vw] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }}
          animate={{ 
            x: ['-20%', '30%', '-10%'], 
            y: ['-20%', '40%', '10%'],
            scale: [1, 1.2, 0.9]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} 
        />
        <motion.div 
          className="absolute w-[60vw] h-[60vw] rounded-full opacity-10 blur-[80px] right-0 bottom-0"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }}
          animate={{ 
            x: ['20%', '-30%', '5%'], 
            y: ['20%', '-20%', '10%'] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} 
        />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)`,
            backgroundSize: '4vw 4vw'
          }}
        />
      </div>

      {/* Persistent Accent Lines */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#7C3AED] to-transparent z-0"
        animate={{
          left: ['10vw', '85vw', '50vw', '20vw', '70vw', '50vw'][sceneIndex] ?? '50vw',
          opacity: sceneIndex === 2 ? 0 : 0.4
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
      
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent z-0"
        animate={{
          top: ['20vh', '70vh', '30vh', '80vh', '40vh', '50vh'][sceneIndex] ?? '50vh',
          opacity: sceneIndex === 2 ? 0 : 0.4
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Scene Content */}
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
