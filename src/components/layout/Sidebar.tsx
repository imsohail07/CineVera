import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, TrendingUp, Film, Tv, Star, Baby, Radio, Play, BookmarkCheck,
  Award, Settings, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { NavSection } from '../../types';
import clsx from 'clsx';

const NAV_ITEMS: { id: NavSection; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'movies', label: 'Movies', icon: Film },
  { id: 'tvshows', label: 'TV Shows', icon: Tv },
  { id: 'anime', label: 'Anime', icon: Zap },
  { id: 'kids', label: 'Kids', icon: Baby },
  { id: 'live', label: 'Live Channels', icon: Radio },
  { id: 'continue', label: 'Continue Watching', icon: Play },
  { id: 'mylist', label: 'My List', icon: BookmarkCheck },
  { id: 'toprated', label: 'Top Rated', icon: Award },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { activeSection, sidebarCollapsed, toggleSidebar, setActiveSection } = useAppStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 60 : 220 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full z-40 flex flex-col overflow-hidden"
      style={{ backgroundColor: '#161B22', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className="flex items-center px-4 py-5 min-h-[64px]" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 min-w-0">
          <img src="/favicon.svg" alt="Cinevera Logo" className="w-8 h-8 rounded-md flex-shrink-0" />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="font-display font-bold text-[18px] tracking-tight whitespace-nowrap"
                style={{ color: '#FFFFFF' }}
              >
                Cine<span style={{ color: '#FF9900' }}>vera</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden hide-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 relative group',
                isActive
                  ? 'text-white'
                  : 'text-[#AAB2BF] hover:text-white hover:bg-white/5'
              )}
              style={isActive ? { backgroundColor: 'rgba(255,153,0,0.12)' } : {}}
              title={sidebarCollapsed ? item.label : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
                  style={{ backgroundColor: '#FF9900' }}
                />
              )}
              <Icon
                size={17}
                strokeWidth={isActive ? 2.2 : 1.8}
                style={{ color: isActive ? '#FF9900' : 'inherit', flexShrink: 0 }}
              />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="whitespace-nowrap font-medium"
                    style={{ fontSize: '13.5px' }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center py-2 rounded text-[#AAB2BF] hover:text-white hover:bg-white/5 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.aside>
  );
}
