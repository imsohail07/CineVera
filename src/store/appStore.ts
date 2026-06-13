import { create } from 'zustand';
import { NavSection, Content, Profile } from '../types';
import { PROFILES } from '../data/mockData';

interface AppState {
  activeSection: NavSection;
  sidebarCollapsed: boolean;
  currentProfile: Profile;
  myList: Content[];
  searchQuery: string;
  searchOpen: boolean;
  activeContent: Content | null;
  playerOpen: boolean;
  setActiveSection: (section: NavSection) => void;
  toggleSidebar: () => void;
  setProfile: (profile: Profile) => void;
  toggleMyList: (content: Content) => void;
  setSearchQuery: (q: string) => void;
  setSearchOpen: (open: boolean) => void;
  openPlayer: (content: Content) => void;
  closePlayer: () => void;
  showProfileSelector: boolean;
  setShowProfileSelector: (show: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: 'home',
  sidebarCollapsed: false,
  currentProfile: PROFILES[0],
  myList: [],
  searchQuery: '',
  searchOpen: false,
  activeContent: null,
  playerOpen: false,
  showProfileSelector: false,

  setActiveSection: (section) => set({ activeSection: section }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setProfile: (profile) => set({ currentProfile: profile, showProfileSelector: false }),
  toggleMyList: (content) =>
    set((s) => {
      const exists = s.myList.some((c) => c.id === content.id);
      return { myList: exists ? s.myList.filter((c) => c.id !== content.id) : [...s.myList, content] };
    }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  openPlayer: (content) => set({ activeContent: content, playerOpen: true }),
  closePlayer: () => set({ playerOpen: false, activeContent: null }),
  setShowProfileSelector: (showProfileSelector) => set({ showProfileSelector }),
}));
