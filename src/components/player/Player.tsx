import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipForward, Settings, Subtitles, ChevronLeft, FastForward, Rewind
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../store/appStore';

export function Player() {
  const { playerOpen, activeContent, closePlayer } = useAppStore();
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [progress, setProgress] = useState(42);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('1080p');
  const [speed, setSpeed] = useState('1x');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const formatTime = (pct: number) => {
    const total = 169; // minutes
    const elapsed = Math.round((pct / 100) * total);
    const h = Math.floor(elapsed / 60);
    const m = elapsed % 60;
    return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:00` : `${m}:00`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    if (!playerOpen) return;
    let interval: ReturnType<typeof setInterval>;
    if (playing) {
      interval = setInterval(() => setProgress((p) => Math.min(p + 0.1, 100)), 300);
    }
    return () => clearInterval(interval);
  }, [playing, playerOpen]);

  useEffect(() => {
    if (playerOpen) {
      setPlaying(true);
      setProgress(42);
    }
  }, [playerOpen]);

  return (
    <AnimatePresence>
      {playerOpen && activeContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black"
          onMouseMove={handleMouseMove}
          onClick={() => setPlaying((p) => !p)}
        >
          {/* Video backdrop */}
          <img
            src={activeContent.backdropUrl}
            alt={activeContent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Play/Pause center indicator */}
          <AnimatePresence>
            {!playing && (
              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)', border: '2px solid rgba(255,255,255,0.3)' }}>
                  <Play size={28} fill="white" color="white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-4"
                  style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)' }}>
                  <div className="flex items-center gap-3">
                    <button onClick={closePlayer} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                      <ChevronLeft size={20} className="text-white" />
                    </button>
                    <div>
                      <div className="text-white font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {activeContent.title}
                      </div>
                      {activeContent.type === 'series' && (
                        <div className="text-xs text-[#AAB2BF]">Season 2, Episode 4</div>
                      )}
                    </div>
                  </div>
                  <button onClick={closePlayer} className="p-2 rounded hover:bg-white/10 transition-colors">
                    <X size={18} className="text-white" />
                  </button>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom controls */}
                <div className="px-5 pb-5"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                  {/* Progress bar */}
                  <div className="mb-3">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="w-full h-1 rounded-full cursor-pointer"
                      style={{ accentColor: '#FF9900' }}
                    />
                    <div className="flex justify-between text-xs text-[#AAB2BF] mt-1">
                      <span>{formatTime(progress)}</span>
                      <span>{activeContent.duration || '2:49:00'}</span>
                    </div>
                  </div>

                  {/* Controls row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setProgress(p => Math.max(0, p - 5))}
                        className="p-2 hover:bg-white/10 rounded transition-colors">
                        <Rewind size={18} className="text-white" />
                      </button>
                      <button onClick={() => setPlaying(p => !p)}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        style={{ backgroundColor: '#FF9900' }}>
                        {playing
                          ? <Pause size={18} fill="black" color="black" />
                          : <Play size={18} fill="black" color="black" />
                        }
                      </button>
                      <button onClick={() => setProgress(p => Math.min(100, p + 5))}
                        className="p-2 hover:bg-white/10 rounded transition-colors">
                        <FastForward size={18} className="text-white" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded transition-colors">
                        <SkipForward size={18} className="text-white" />
                      </button>
                      <button onClick={() => setMuted(m => !m)}
                        className="p-2 hover:bg-white/10 rounded transition-colors">
                        {muted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Quality */}
                      <div className="relative">
                        <button
                          onClick={() => setShowQualityMenu(q => !q)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors"
                          style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#AAB2BF' }}>
                          {quality}
                        </button>
                        <AnimatePresence>
                          {showQualityMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              className="absolute bottom-full right-0 mb-2 rounded-md overflow-hidden z-10"
                              style={{ backgroundColor: '#1C2128', border: '1px solid rgba(255,255,255,0.1)', minWidth: 80 }}>
                              {['4K', '1080p', '720p', '480p'].map(q => (
                                <button key={q} onClick={() => { setQuality(q); setShowQualityMenu(false); }}
                                  className="w-full px-3 py-1.5 text-xs text-left hover:bg-white/5 transition-colors"
                                  style={{ color: quality === q ? '#FF9900' : '#AAB2BF' }}>
                                  {q}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Speed */}
                      <button
                        className="px-2.5 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#AAB2BF' }}>
                        {speed}
                      </button>

                      <button className="p-2 hover:bg-white/10 rounded transition-colors">
                        <Subtitles size={18} className="text-white" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded transition-colors">
                        <Settings size={18} className="text-white" />
                      </button>
                      <button onClick={() => setFullscreen(f => !f)} className="p-2 hover:bg-white/10 rounded transition-colors">
                        {fullscreen ? <Minimize size={18} className="text-white" /> : <Maximize size={18} className="text-white" />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
