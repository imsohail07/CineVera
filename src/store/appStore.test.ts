import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './appStore';
import { PROFILES } from '../data/mockData';
import { Content } from '../types';

const mockMovie: Content = {
  id: 'test-1',
  title: 'Test Movie',
  type: 'movie',
  genre: ['Action'],
  rating: 4.5,
  year: 2024,
  duration: '2h 10m',
  posterUrl: '/test.jpg',
  backdropUrl: '/backdrop.jpg',
  description: 'Test Description',
  language: 'English',
  maturityRating: 'PG-13',
};

describe('appStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    const store = useAppStore.getState();
    useAppStore.setState({
      activeSection: 'home',
      sidebarCollapsed: false,
      currentProfile: PROFILES[0],
      myList: [],
      searchQuery: '',
      searchOpen: false,
      activeContent: null,
      playerOpen: false,
      showProfileSelector: false,
    });
  });

  it('should have correct initial state', () => {
    const state = useAppStore.getState();
    expect(state.activeSection).toBe('home');
    expect(state.sidebarCollapsed).toBe(false);
    expect(state.currentProfile).toEqual(PROFILES[0]);
    expect(state.myList).toEqual([]);
    expect(state.searchQuery).toBe('');
    expect(state.searchOpen).toBe(false);
    expect(state.activeContent).toBeNull();
    expect(state.playerOpen).toBe(false);
    expect(state.showProfileSelector).toBe(false);
  });

  it('should update active section', () => {
    useAppStore.getState().setActiveSection('movies');
    expect(useAppStore.getState().activeSection).toBe('movies');
  });

  it('should toggle sidebar collapsed state', () => {
    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarCollapsed).toBe(true);

    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarCollapsed).toBe(false);
  });

  it('should set current profile and hide profile selector', () => {
    useAppStore.setState({ showProfileSelector: true });
    const newProfile = PROFILES[1];
    useAppStore.getState().setProfile(newProfile);

    expect(useAppStore.getState().currentProfile).toEqual(newProfile);
    expect(useAppStore.getState().showProfileSelector).toBe(false);
  });

  it('should add and remove items from watchlist (myList)', () => {
    // Add item
    useAppStore.getState().toggleMyList(mockMovie);
    expect(useAppStore.getState().myList).toContainEqual(mockMovie);
    expect(useAppStore.getState().myList.length).toBe(1);

    // Remove item
    useAppStore.getState().toggleMyList(mockMovie);
    expect(useAppStore.getState().myList).not.toContainEqual(mockMovie);
    expect(useAppStore.getState().myList.length).toBe(0);
  });

  it('should open and close the custom player', () => {
    useAppStore.getState().openPlayer(mockMovie);
    expect(useAppStore.getState().activeContent).toEqual(mockMovie);
    expect(useAppStore.getState().playerOpen).toBe(true);

    useAppStore.getState().closePlayer();
    expect(useAppStore.getState().activeContent).toBeNull();
    expect(useAppStore.getState().playerOpen).toBe(false);
  });
});
