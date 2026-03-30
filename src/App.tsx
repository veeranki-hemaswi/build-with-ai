import React, { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Gamepad2, Music, Zap, Trophy } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon-blue selection:text-black overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-neon-purple/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-md bg-black/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neon-blue rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.4)]">
              <Zap size={24} className="text-black fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-digital font-bold tracking-tighter neon-text-blue glitch" data-text="NEON SNAKE">NEON SNAKE</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">Arcade & Beats</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-zinc-400">
            <a href="#" className="hover:text-neon-blue transition-colors flex items-center gap-2">
              <Gamepad2 size={14} /> Play
            </a>
            <a href="#" className="hover:text-neon-pink transition-colors flex items-center gap-2">
              <Trophy size={14} /> Leaderboard
            </a>
            <a href="#" className="hover:text-neon-green transition-colors flex items-center gap-2">
              <Music size={14} /> Playlist
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Stats & Info */}
        <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
          <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
            <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6 font-bold">Current Session</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-zinc-400 mb-1">Score</p>
                <motion.p 
                  key={score}
                  initial={{ scale: 1.2, color: '#00ffff' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-4xl font-mono font-bold"
                >
                  {score.toString().padStart(4, '0')}
                </motion.p>
              </div>
              <div className="h-px bg-white/5" />
              <div>
                <p className="text-sm text-zinc-400 mb-1">Multiplier</p>
                <p className="text-2xl font-mono font-bold neon-text-pink">x1.5</p>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
            <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4 font-bold">Controls</h2>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex justify-between">
                <span>Move</span>
                <span className="text-white font-mono">ARROWS</span>
              </li>
              <li className="flex justify-between">
                <span>Pause</span>
                <span className="text-white font-mono">SPACE</span>
              </li>
              <li className="flex justify-between">
                <span>Reset</span>
                <span className="text-white font-mono">R</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Center Column: Game */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-neon-blue/20 blur-2xl rounded-full opacity-50" />
            <SnakeGame onScoreChange={setScore} />
          </motion.div>
        </div>

        {/* Right Column: Music Player */}
        <div className="lg:col-span-3 space-y-8 order-3">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4 font-bold px-2">Now Playing</h2>
          <MusicPlayer />
          
          <section className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
            <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4 font-bold">Up Next</h2>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden">
                    <img src={`https://picsum.photos/seed/next${i}/100/100`} alt="Next" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate group-hover:text-neon-blue transition-colors">Future Echoes</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Synth Bot</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="relative z-10 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold">
            &copy; 2026 NEON ARCADE SYSTEMS
          </p>
          <div className="flex gap-8">
            {['Twitter', 'Discord', 'GitHub'].map(social => (
              <a key={social} href="#" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors font-bold">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

