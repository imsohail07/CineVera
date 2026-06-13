import { motion } from 'framer-motion';
import { HeroBanner } from '../components/sections/HeroBanner';
import { ContinueWatchingRow } from '../components/sections/ContinueWatching';
import { ContentRow } from '../components/ui/ContentRow';
import {
  TRENDING, POPULAR_MOVIES, TOP_SHOWS, AWARD_WINNERS
} from '../data/mockData';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const LiveBadge = () => (
  <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded"
    style={{ backgroundColor: 'rgba(229,83,75,0.15)', color: '#E5534B', border: '1px solid rgba(229,83,75,0.2)' }}>
    <span className="w-1.5 h-1.5 rounded-full bg-[#E5534B] animate-pulse" />
    LIVE
  </span>
);

const NewBadge = () => (
  <span className="text-[10px] font-semibold px-2 py-0.5 rounded"
    style={{ backgroundColor: 'rgba(46,204,113,0.15)', color: '#2ECC71', border: '1px solid rgba(46,204,113,0.2)' }}>
    NEW
  </span>
);

export function HomePage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-2"
    >
      {/* Hero */}
      <motion.div variants={item}>
        <HeroBanner />
      </motion.div>

      {/* Sections */}
      <div className="pt-4 space-y-2">
        <motion.div variants={item}>
          <ContinueWatchingRow />
        </motion.div>

        <motion.div variants={item}>
          <ContentRow
            title="Trending Now"
            items={TRENDING}
            badge={<LiveBadge />}
          />
        </motion.div>

        <motion.div variants={item}>
          <ContentRow title="Popular Movies" items={POPULAR_MOVIES} />
        </motion.div>

        <motion.div variants={item}>
          <ContentRow title="Top TV Shows" items={TOP_SHOWS} />
        </motion.div>

        <motion.div variants={item}>
          <ContentRow
            title="Top 10 This Week"
            items={[...TRENDING].sort((a, b) => b.rating - a.rating)}
            showRank
          />
        </motion.div>

        <motion.div variants={item}>
          <ContentRow
            title="Award Winners"
            items={AWARD_WINNERS}
            badge={<NewBadge />}
          />
        </motion.div>

        <motion.div variants={item}>
          <ContentRow title="Recommended For You" items={[...POPULAR_MOVIES].reverse()} />
        </motion.div>
      </div>
    </motion.div>
  );
}
