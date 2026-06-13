import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Content } from '../../types';
import { ContentCard } from './ContentCard';
import clsx from 'clsx';

interface ContentRowProps {
  title: string;
  items: Content[];
  size?: 'sm' | 'md' | 'lg';
  showRank?: boolean;
  badge?: React.ReactNode;
}

export function ContentRow({ title, items, size = 'md', showRank, badge }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (rowRef.current) {
      const amount = rowRef.current.clientWidth * 0.7;
      rowRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {title}
          </h2>
          {badge}
        </div>
        <button className="text-xs text-[#FF9900] font-medium hover:text-[#E68900] transition-colors">
          See all
        </button>
      </div>

      <div className="relative group/row">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className={clsx(
            'absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-full',
            'flex items-center justify-center',
            'opacity-0 group-hover/row:opacity-100 transition-opacity duration-200',
          )}
          style={{ background: 'linear-gradient(to right, rgba(15,17,23,0.95), transparent)' }}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        {/* Scroll container */}
        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar pb-1"
        >
          {items.map((item, i) => (
            <ContentCard
              key={item.id}
              content={item}
              size={size}
              rank={showRank ? i + 1 : undefined}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className={clsx(
            'absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-full',
            'flex items-center justify-center',
            'opacity-0 group-hover/row:opacity-100 transition-opacity duration-200',
          )}
          style={{ background: 'linear-gradient(to left, rgba(15,17,23,0.95), transparent)' }}
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>
    </section>
  );
}
