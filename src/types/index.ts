export interface Content {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'anime' | 'live';
  genre: string[];
  rating: number;
  year: number;
  duration?: string;
  seasons?: number;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl?: string;
  language: string;
  badge?: 'NEW' | 'TOP 10' | 'HD' | 'LIVE' | '4K';
  maturityRating: string;
  cast?: string[];
  director?: string;
}

export interface ContinueWatching extends Content {
  progress: number;
  remainingTime: string;
  lastWatched: string;
  episode?: string;
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  type: 'admin' | 'family' | 'kids' | 'guest';
  maturityLevel: 'all' | 'teen' | 'kids';
}

export interface Channel {
  id: string;
  name: string;
  category: 'news' | 'sports' | 'entertainment' | 'movies' | 'kids' | 'music' | 'international';
  logoUrl: string;
  isLive: boolean;
  currentProgram: string;
  viewers?: number;
}

export type NavSection =
  | 'home'
  | 'trending'
  | 'movies'
  | 'tvshows'
  | 'anime'
  | 'kids'
  | 'live'
  | 'continue'
  | 'mylist'
  | 'toprated'
  | 'settings'
  | 'search'
  | 'profiles'
  | 'player';
