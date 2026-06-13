import { useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTINUE_WATCHING } from '../../data/mockData';
import { useAppStore } from '../../store/appStore';

export function ContinueWatchingRow() {
  const rowRef = useRef<HTMLDivElement>(null);
  const { openPlayer } = useAppStore();

  const scroll = (dir: 'left' | 'right') => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir === 'right' ? 600 : -600, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Continue Watching
        </h2>
        <button className="text-xs text-[#FF9900] font-medium hover:text-[#E68900] transition-colors">
          See all
        </button>
      </div>

      <div className="relative group/row">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-full opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
          style={{ background: 'linear-gradient(to right, rgba(15,17,23,0.95), transparent)' }}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <div ref={rowRef} className="flex gap-4 overflow-x-auto hide-scrollbar pb-1">
          {CONTINUE_WATCHING.map((item) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-[280px] rounded-md overflow-hidden cursor-pointer group/card"
              style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.06)' }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              onClick={() => openPlayer(item)}
            >
              {/* Thumbnail */}
              <div className="relative h-[155px] overflow-hidden">
                <img src={item.backdropUrl} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity"
                  style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF9900' }}>
                    <Play size={16} fill="black" color="black" />
                  </div>
                </div>
                {/* Remaining time badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium"
                  style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#AAB2BF' }}>
                  <Clock size={10} />
                  {item.remainingTime} left
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-0.5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <div
                  className="h-full progress-gradient"
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="text-sm font-semibold text-white mb-0.5 truncate">{item.title}</div>
                <div className="text-xs text-[#AAB2BF]">
                  {item.episode || item.lastWatched}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-full opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
          style={{ background: 'linear-gradient(to left, rgba(15,17,23,0.95), transparent)' }}
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>
    </section>
  );
}
