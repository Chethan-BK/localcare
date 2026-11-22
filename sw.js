/* ==========================================================================
   LocalCare Infinity - Service Worker (sw.js)
   Production Network-First strategy with offline shell fallback.
   Ensures instantaneous delivery of new features without stale cache trapping.
   ========================================================================== */

const CACHE_NAME = 'localcare-infinity-v4.1.0';
const STATIC_SHELL = [
  '/',
  '/index.html',
  '/admin-crm.html',
  '/manifest.json',
  '/css/variables.css',
  '/css/style.css',
  '/css/ultra.css',
  '/js/data.js',
  '/js/indiaLocations.js',
  '/js/modules/icons.js',
  '/js/ultra.js',
  '/js/app.js',
  '/icons/icon.svg',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

// Install: Cache critical application shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_SHELL).catch((err) => {
        console.warn('Non-fatal SW cache.addAll warning:', err);
      });
    })
  );
});

// Activate: Aggressively purge all old stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => {
          console.log('[SW] Purging stale cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First strategy for instant updates & offline fallback
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Bypass non-GET requests (POST, PUT, DELETE, PATCH must always hit network)
  if (event.request.method !== 'GET') {
    return;
  }

  // 2. API calls: Network-first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok && (url.pathname === '/api/categories' || url.pathname === '/api/businesses')) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
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

  // 3. Static assets & HTML navigation: NETWORK-FIRST (Always fetch fresh, fallback to cache if offline)
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return null;
        });
      })
  );
});
