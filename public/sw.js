const CACHE_NAME = 'cinevera-tv-v1';

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install event triggered.');
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activate event triggered.');
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Simple pass-through fetch logic, allows fallback proxies and direct TMDB fetches
  e.respondWith(fetch(e.request).catch(() => {
    return new Response('Network error occurred.', { status: 408 });
  }));
});
