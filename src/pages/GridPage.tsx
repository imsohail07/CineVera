import { motion } from 'framer-motion';
import { ContentCard } from '../components/ui/ContentCard';
import { Content } from '../types';
import { useState } from 'react';
import clsx from 'clsx';

interface GridPageProps {
  title: string;
  items: Content[];
  genres?: string[];
}

const SORT_OPTIONS = ['Popular', 'Rating', 'Newest', 'A-Z'];

export function GridPage({ title, items, genres = [] }: GridPageProps) {
  const [activeGenre, setActiveGenre] = useState('All');
  const [sort, setSort] = useState('Popular');

  const allGenres = ['All', ...genres];

  const filtered = activeGenre === 'All' ? items : items.filter(c => c.genre.includes(activeGenre));

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'Rating') return b.rating - a.rating;
    if (sort === 'Newest') return b.year - a.year;
    if (sort === 'A-Z') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h1>
          <p className="text-sm text-[#AAB2BF] mt-0.5">{sorted.length} titles</p>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-sm text-[#AAB2BF] rounded px-3 py-1.5 outline-none"
          style={{ backgroundColor: '#1B2028', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      {/* Genre filters */}
      {genres.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          {allGenres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={clsx(
                'px-3 py-1.5 rounded text-xs font-medium transition-colors',
                activeGenre === g ? 'text-black' : 'text-[#AAB2BF] hover:text-white'
              )}
              style={activeGenre === g
                ? { backgroundColor: '#FF9900' }
                : { backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {sorted.map((item) => (
          <ContentCard key={item.id} content={item} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-16">
          <div className="text-[#5C6470] text-sm">No titles found for this filter.</div>
        </div>
      )}
    </motion.div>
  );
}
