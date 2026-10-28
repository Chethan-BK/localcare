/* ==========================================================================
   LocalCare Infinity - Service Worker (sw.js)
   Provides offline shell caching, fast asset loading, and graceful offline fallback.
   ========================================================================== */

const CACHE_NAME = 'localcare-infinity-v1';
const STATIC_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/variables.css',
  '/css/style.css',
  '/js/data.js',
  '/js/app.js',
  '/icons/icon.svg'
];

// Install: Cache critical application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_SHELL).catch((err) => {
        console.warn('Non-fatal SW cache.addAll warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Purge stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strategy depending on request type
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Bypass non-GET requests (POST, PUT, DELETE, PATCH must always hit network)
  if (event.request.method !== 'GET') {
    return;
  }

  // 2. API calls: Network-first, fallback to cache for public discovery, no private caching
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful public read endpoints
          if (response.ok && (url.pathname === '/api/categories' || url.pathname === '/api/businesses')) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // If offline, attempt cache return for categories/businesses
          return caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return new Response(JSON.stringify({ offline: true, error: 'Offline mode: reconnect to fetch fresh updates' }), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
    return;
  }

  // 3. Static assets & HTML navigation: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback for navigation to HTML pages
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return null;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
