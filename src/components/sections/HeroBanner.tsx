import { motion } from 'framer-motion';
import { Play, Plus, Check, Info, Star, Clock, Calendar } from 'lucide-react';
import { HERO_CONTENT } from '../../data/mockData';
import { useAppStore } from '../../store/appStore';

export function HeroBanner() {
  const { myList, toggleMyList, openPlayer } = useAppStore();
  const content = HERO_CONTENT;
  const inList = myList.some((c) => c.id === content.id);

  return (
    <div className="relative w-full" style={{ height: '520px' }}>
      {/* Backdrop */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <img
          src={content.backdropUrl}
          alt={content.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 hero-gradient rounded-lg" />
      <div className="absolute inset-x-0 bottom-0 hero-bottom-gradient h-40 rounded-b-lg" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute inset-0 flex flex-col justify-end p-8 pb-10"
      >
        {/* Badge row */}
        <div className="flex items-center gap-2 mb-3">
          {content.badge && (
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded"
              style={{ backgroundColor: '#7AA2F7', color: '#000' }}
            >
              {content.badge}
            </span>
          )}
          <span className="text-[11px] text-[#AAB2BF] border border-[rgba(255,255,255,0.15)] px-2 py-0.5 rounded">
            {content.maturityRating}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl font-bold mb-3 max-w-lg leading-tight"
          style={{ fontFamily: 'Outfit, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
        >
          {content.title}
        </h1>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-3 text-sm text-[#AAB2BF]">
          <span className="flex items-center gap-1 text-[#FF9900] font-semibold">
            <Star size={13} fill="currentColor" /> {content.rating}/10
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={13} /> {content.year}
          </span>
          {content.duration && (
            <span className="flex items-center gap-1">
              <Clock size={13} /> {content.duration}
            </span>
          )}
          <span>{content.genre.join(' · ')}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-[#AAB2BF] max-w-md mb-5 line-clamp-2 leading-relaxed">
          {content.description}
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => openPlayer(content)}
            className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-semibold text-black transition-colors"
            style={{ backgroundColor: '#FF9900' }}
          >
            <Play size={15} fill="currentColor" />
            Watch Now
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => toggleMyList(content)}
            className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium text-white transition-colors btn-secondary"
          >
            {inList ? <Check size={15} style={{ color: '#FF9900' }} /> : <Plus size={15} />}
            {inList ? 'In Watchlist' : 'Add to Watchlist'}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium text-[#AAB2BF] hover:text-white transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Info size={15} />
            More Info
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
