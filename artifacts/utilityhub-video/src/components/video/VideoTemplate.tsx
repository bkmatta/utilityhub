import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Intro } from './video_scenes/Intro';
import { Problem } from './video_scenes/Problem';
import { Reveal } from './video_scenes/Reveal';
import { Categories } from './video_scenes/Categories';
import { DemoEMI } from './video_scenes/DemoEMI';
import { DemoJSON } from './video_scenes/DemoJSON';
import { DemoBMI } from './video_scenes/DemoBMI';
import { Value } from './video_scenes/Value';
import { Outro } from './video_scenes/Outro';

export const SCENE_DURATIONS: Record<string, number> = { 
  intro: 6500, 
  problem: 5000, 
  reveal: 5000, 
  categories: 9500,
  demo_emi: 6500,
  demo_json: 6500,
  demo_bmi: 6500,
  value: 6000, 
  outro: 6000 
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  intro: Intro,
  problem: Problem,
  reveal: Reveal,
  categories: Categories,
  demo_emi: DemoEMI,
  demo_json: DemoJSON,
  demo_bmi: DemoBMI,
  value: Value,
  outro: Outro,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

// Audio cue positions match the composite track, which is rebuilt so each
// narration clip is delayed to its scene's visual start (and each narrated scene
// is long enough to contain its line). Every scene now has its own narration,
// including the three demo scenes. These values must stay in sync with the
// cumulative SCENE_DURATIONS offsets and the ffmpeg composite build.
const AUDIO_CUE_SEC: Partial<Record<string, number>> = {
  intro: 0,
  problem: 6.5,
  reveal: 11.5,
  categories: 16.5,
  demo_emi: 26,
  demo_json: 32.5,
  demo_bmi: 39,
  value: 45.5,
  outro: 51.5,
};

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.9;
    // Every scene has an explicit cue; seek to it when we're off by more than the
    // epsilon. (A missing cue would just let audio play forward from its current spot.)
    const targetTime = AUDIO_CUE_SEC[baseSceneKey];
    if (targetTime !== undefined && Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    // Safety net: the composite (~56.6s) is slightly shorter than the visual
    // timeline (57.5s), so it can be `ended` in the brief tail of the outro.
    // Calling play() on an ended <audio> with no cue would restart it FROM ZERO
    // (the "repeating from start" bug). Cued scenes seek first, which clears `ended`.
    if (audio.ended && targetTime === undefined) return;
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

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
          left: ['10vw', '85vw', '50vw', '20vw', '15vw', '80vw', '30vw', '70vw', '50vw'][sceneIndex] ?? '50vw',
          opacity: sceneIndex === 2 ? 0 : 0.4
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
      
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent z-0"
        animate={{
          top: ['20vh', '70vh', '30vh', '80vh', '25vh', '75vh', '45vh', '40vh', '50vh'][sceneIndex] ?? '50vh',
          opacity: sceneIndex === 2 ? 0 : 0.4
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Scene Content */}
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>

      {/* Voiceover audio — scene-synced composite track */}
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/composite_audio.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />
    </div>
  );
}
