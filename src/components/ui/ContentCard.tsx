import { motion } from 'framer-motion';
import { Play, Plus, Check, Star } from 'lucide-react';
import { Content } from '../../types';
import { useAppStore } from '../../store/appStore';
import clsx from 'clsx';

interface ContentCardProps {
  content: Content;
  size?: 'sm' | 'md' | 'lg';
  rank?: number;
}

const BADGE_COLORS: Record<string, string> = {
  NEW: '#2ECC71',
  'TOP 10': '#FF9900',
  HD: '#4F6B95',
  LIVE: '#E5534B',
  '4K': '#7AA2F7',
};

export function ContentCard({ content, size = 'md', rank }: ContentCardProps) {
  const { myList, toggleMyList, openPlayer } = useAppStore();
  const inList = myList.some((c) => c.id === content.id);

  const widths = { sm: 'w-[140px]', md: 'w-[180px]', lg: 'w-[220px]' };
  const heights = { sm: 'h-[200px]', md: 'h-[255px]', lg: 'h-[310px]' };

  return (
    <motion.div
      className={clsx('flex-shrink-0 relative group cursor-pointer content-card', widths[size])}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.18 }}
    >
      <div className={clsx('relative rounded-md overflow-hidden', heights[size])}
        style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Poster */}
        <img
          src={content.posterUrl}
          alt={content.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Rank badge */}
        {rank && (
          <div className="absolute bottom-0 left-0 rank-badge text-[52px] leading-none text-white/20 font-black select-none"
            style={{ fontFamily: 'Outfit, sans-serif', textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
            {rank}
          </div>
        )}

        {/* Badge */}
        {content.badge && (
          <div
            className="absolute top-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded"
            style={{ backgroundColor: BADGE_COLORS[content.badge] || '#AAB2BF', color: '#000' }}
          >
            {content.badge}
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 flex flex-col justify-end p-3"
          style={{ background: 'linear-gradient(to top, rgba(15,17,23,0.98) 0%, rgba(15,17,23,0.6) 50%, transparent 100%)' }}
        >
          {/* Actions */}
          <div className="flex items-center gap-1.5 mb-2">
            <button
              onClick={(e) => { e.stopPropagation(); openPlayer(content); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-black transition-colors"
              style={{ backgroundColor: '#FF9900' }}
            >
              <Play size={11} fill="currentColor" /> Play
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleMyList(content); }}
              className="p-1.5 rounded transition-colors"
              style={{ backgroundColor: inList ? 'rgba(255,153,0,0.2)' : 'rgba(255,255,255,0.1)' }}
            >
              {inList
                ? <Check size={13} style={{ color: '#FF9900' }} />
                : <Plus size={13} className="text-white" />
              }
            </button>
          </div>

          {/* Meta */}
          <div className="text-white font-semibold text-xs leading-tight mb-1 line-clamp-2">{content.title}</div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-[#FF9900] text-xs font-medium">
              <Star size={10} fill="currentColor" /> {content.rating}
            </span>
            <span className="text-[#AAB2BF] text-[11px]">{content.genre[0]}</span>
            <span className="text-[#5C6470] text-[11px]">{content.year}</span>
          </div>
        </motion.div>
      </div>

      {/* Title below card (visible always on small) */}
      <div className="mt-1.5 px-0.5">
        <div className="text-xs font-medium text-[#AAB2BF] truncate group-hover:text-white transition-colors">{content.title}</div>
      </div>
    </motion.div>
  );
}
