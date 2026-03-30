import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const DUMMY_TRACKS: Track[] = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "AI Synthwave",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/neon1/300/300"
  },
  {
    id: 2,
    title: "Cyber Pulse",
    artist: "Neural Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/neon2/300/300"
  },
  {
    id: 3,
    title: "Digital Horizon",
    artist: "Bot Composer",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/neon3/300/300"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <div className="w-full max-w-md bg-black p-6 rounded-[40px] neon-border-thick">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipForward}
      />
      
      <div className="flex items-center gap-4">
        <motion.div 
          key={currentTrack.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-20 h-20 flex-shrink-0"
        >
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className="w-full h-full object-cover rounded-xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-digital font-bold truncate neon-text-blue">{currentTrack.title}</h3>
          <p className="text-xs text-zinc-400 truncate font-mono uppercase tracking-widest">{currentTrack.artist}</p>
          
          <div className="mt-3 flex items-center gap-3">
            <button onClick={skipBackward} className="text-zinc-400 hover:text-neon-blue transition-colors">
              <SkipBack size={18} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center bg-neon-blue text-black rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,255,255,0.6)]"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={skipForward} className="text-zinc-400 hover:text-neon-blue transition-colors">
              <SkipForward size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-0.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-neon-blue shadow-[0_0_10px_rgba(0,255,255,0.6)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] uppercase tracking-widest text-zinc-500 font-mono">
          <span>0:00</span>
          <span>3:45</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-500">
          <Music2 size={12} />
          <span className="text-[9px] uppercase tracking-widest font-bold">AI GENERATED BEATS</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-500">
          <Volume2 size={12} />
          <div className="w-12 h-1 bg-zinc-800 rounded-full">
            <div className="w-3/4 h-full bg-zinc-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
