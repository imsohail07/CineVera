import { Search, Bell, User, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { useState, useRef, useEffect } from 'react';
import { ALL_CONTENT, SEARCH_SUGGESTIONS } from '../../data/mockData';
import clsx from 'clsx';

export function Topbar() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, sidebarCollapsed, currentProfile, setShowProfileSelector } = useAppStore();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = searchQuery.length > 1
    ? ALL_CONTENT.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];
  const suggestions = searchQuery.length === 0 ? SEARCH_SUGGESTIONS.slice(0, 5) : [];

  const showDropdown = focused && (filtered.length > 0 || suggestions.length > 0);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  const sidebarWidth = sidebarCollapsed ? 60 : 220;

  return (
    <header
      className="fixed top-0 right-0 z-30 h-[60px] flex items-center px-5 gap-4"
      style={{
        left: sidebarWidth,
        transition: 'left 0.2s ease',
        backgroundColor: 'rgba(15,17,23,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <div
          className={clsx(
            'flex items-center gap-2 rounded px-3 h-9 transition-all duration-200',
            focused ? 'ring-1 ring-[#FF9900]' : ''
          )}
          style={{ backgroundColor: '#1B2028', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Search size={15} className="text-[#AAB2BF] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search titles, genres, actors..."
            className="bg-transparent text-sm text-white placeholder-[#5C6470] outline-none flex-1 min-w-0"
            style={{ fontSize: '13.5px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            onClick={() => setSearchOpen(true)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#AAB2BF] hover:text-white text-xs px-1">✕</button>
          )}
          <button className="text-[#AAB2BF] hover:text-[#FF9900] transition-colors">
            <Mic size={14} />
          </button>
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1 rounded-md overflow-hidden shadow-modal z-50"
              style={{ backgroundColor: '#1C2128', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {suggestions.length > 0 && (
                <div className="p-2">
                  <div className="text-xs text-[#5C6470] px-2 pb-1 uppercase tracking-wider font-medium">Popular</div>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-[#AAB2BF] hover:text-white hover:bg-white/5 rounded text-left"
                      onMouseDown={() => setSearchQuery(s)}
                    >
                      <Search size={12} />
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {filtered.length > 0 && (
                <div className="p-2">
                  {filtered.map((c) => (
                    <button
                      key={c.id}
                      className="w-full flex items-center gap-3 px-2 py-1.5 rounded hover:bg-white/5 text-left"
                      onMouseDown={() => setSearchQuery(c.title)}
                    >
                      <img src={c.posterUrl} alt={c.title} className="w-8 h-11 object-cover rounded flex-shrink-0" />
                      <div>
                        <div className="text-sm text-white font-medium">{c.title}</div>
                        <div className="text-xs text-[#AAB2BF]">{c.genre[0]} · {c.year}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded text-[#AAB2BF] hover:text-white hover:bg-white/5 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
        </button>

        {/* Profile */}
        <button
          onClick={() => setShowProfileSelector(true)}
          className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-white/5 transition-colors"
        >
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-black flex-shrink-0"
            style={{ backgroundColor: '#FF9900' }}
          >
            {currentProfile.avatar}
          </div>
          <span className="text-sm text-[#AAB2BF] font-medium hidden sm:block">{currentProfile.name}</span>
        </button>
      </div>
    </header>
  );
}
