import { motion } from 'framer-motion';
import { BookmarkCheck, BookmarkX } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { ContentCard } from '../components/ui/ContentCard';

export function MyListPage() {
  const { myList } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center gap-2 mb-5">
        <BookmarkCheck size={22} style={{ color: '#FF9900' }} />
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>My List</h1>
        <span className="text-sm text-[#AAB2BF] ml-1">({myList.length} titles)</span>
      </div>

      {myList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <BookmarkX size={48} className="text-[#2C3340] mb-4" />
          <div className="text-white font-semibold mb-1">Your watchlist is empty</div>
          <div className="text-sm text-[#AAB2BF]">Add movies and shows you want to watch later.</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {myList.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
