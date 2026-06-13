import { motion } from 'framer-motion';
import { Radio, Users } from 'lucide-react';
import { LIVE_CHANNELS } from '../data/mockData';
import { Channel } from '../types';
import clsx from 'clsx';
import { useState } from 'react';

const CATEGORIES = ['all', 'news', 'sports', 'entertainment', 'movies', 'kids', 'music', 'international'] as const;
const CATEGORY_COLORS: Record<string, string> = {
  news: '#7AA2F7',
  sports: '#2ECC71',
  entertainment: '#FF9900',
  movies: '#4F6B95',
  kids: '#FFB020',
  music: '#E5534B',
  international: '#AAB2BF',
};

function ChannelCard({ channel }: { channel: Channel }) {
  const color = CATEGORY_COLORS[channel.category] || '#AAB2BF';
  const formatViewers = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}K` : `${n}`;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="rounded-lg overflow-hidden cursor-pointer group"
      style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Channel header */}
      <div className="h-24 flex items-center justify-center relative"
        style={{ backgroundColor: `${color}15`, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
          style={{ backgroundColor: `${color}25`, color }}>
          {channel.name.substring(0, 2).toUpperCase()}
        </div>
        {/* Live indicator */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded"
          style={{ backgroundColor: 'rgba(229,83,75,0.15)', color: '#E5534B' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5534B] animate-pulse" /> LIVE
        </div>
      </div>

      <div className="p-3">
        <div className="text-sm font-semibold text-white mb-1 truncate">{channel.name}</div>
        <div className="text-xs text-[#AAB2BF] mb-2 truncate">{channel.currentProgram}</div>
        <div className="flex items-center justify-between">
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded capitalize"
            style={{ backgroundColor: `${color}15`, color }}>
            {channel.category}
          </span>
          {channel.viewers && (
            <span className="flex items-center gap-1 text-[11px] text-[#5C6470]">
              <Users size={10} /> {formatViewers(channel.viewers)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function LivePage() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('all');

  const filtered = activeCategory === 'all'
    ? LIVE_CHANNELS
    : LIVE_CHANNELS.filter(c => c.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Radio size={20} style={{ color: '#E5534B' }} />
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Live Channels
          </h1>
          <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded ml-1"
            style={{ backgroundColor: 'rgba(229,83,75,0.15)', color: '#E5534B' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5534B] animate-pulse" />
            LIVE NOW
          </span>
        </div>
        <p className="text-sm text-[#AAB2BF]">{LIVE_CHANNELS.length} channels available</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              'px-3 py-1.5 rounded text-xs font-medium transition-colors capitalize',
              activeCategory === cat
                ? 'text-black'
                : 'text-[#AAB2BF] hover:text-white'
            )}
            style={activeCategory === cat
              ? { backgroundColor: '#FF9900' }
              : { backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            {cat === 'all' ? 'All Channels' : cat}
          </button>
        ))}
      </div>

      {/* Channels grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {filtered.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </motion.div>
  );
}
