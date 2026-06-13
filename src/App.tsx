import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Player } from './components/player/Player';
import { ProfileSelector } from './components/profiles/ProfileSelector';
import { HomePage } from './pages/HomePage';
import { GridPage } from './pages/GridPage';
import { LivePage } from './pages/LivePage';
import { MyListPage } from './pages/MyListPage';
import { SettingsPage } from './pages/SettingsPage';
import { useAppStore } from './store/appStore';
import { TRENDING, POPULAR_MOVIES, TOP_SHOWS, AWARD_WINNERS, CONTINUE_WATCHING, ALL_CONTENT } from './data/mockData';

function PageContent() {
  const { activeSection } = useAppStore();

  switch (activeSection) {
    case 'home':
      return <HomePage />;
    case 'trending':
      return <GridPage title="Trending" items={TRENDING} genres={['Sci-Fi', 'Drama', 'Action', 'Anime']} />;
    case 'movies':
      return <GridPage title="Movies" items={POPULAR_MOVIES} genres={['Action', 'Drama', 'Thriller', 'Horror', 'Adventure', 'Sci-Fi']} />;
    case 'tvshows':
      return <GridPage title="TV Shows" items={TOP_SHOWS} genres={['Drama', 'Sci-Fi', 'Crime', 'Fantasy', 'Political']} />;
    case 'anime':
      return <GridPage title="Anime Universe" items={TRENDING.filter(c => c.type === 'anime' || c.genre.includes('Anime'))} genres={['Action', 'Mecha', 'Psychological']} />;
    case 'kids':
      return (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="text-5xl mb-4">🎉</div>
          <div className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Kids Zone</div>
          <div className="text-sm text-[#AAB2BF]">Safe, curated content for young viewers.</div>
        </div>
      );
    case 'live':
      return <LivePage />;
    case 'continue':
      return <GridPage title="Continue Watching" items={CONTINUE_WATCHING} />;
    case 'mylist':
      return <MyListPage />;
    case 'toprated':
      return <GridPage title="Top Rated" items={[...ALL_CONTENT].sort((a, b) => b.rating - a.rating)} genres={['Drama', 'Sci-Fi', 'Action', 'History']} />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <HomePage />;
  }
}

export function App() {
  const { sidebarCollapsed } = useAppStore();
  const sidebarWidth = sidebarCollapsed ? 60 : 220;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0F1117' }}>
      <Sidebar />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all"
        style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.2s ease' }}
      >
        <Topbar />

        <main className="flex-1 pt-[60px]">
          <div className="p-6 max-w-[1600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={useAppStore.getState().activeSection}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <PageContent />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <Player />
      <ProfileSelector />
    </div>
  );
}
