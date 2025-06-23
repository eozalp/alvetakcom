
const CACHE_NAME = 'ring-size-converter-v3'; // Incremented cache version
const urlsToCache = [
  './', // Cache the root directory, often equivalent to index.html for PWAs
  './index.html',
  './manifest.json'
  // Removed: App.css (inlined in index.html)
  // Removed: locales/en.json, locales/tr.json (embedded in i18n.ts)
  // Removed: icons/*.png (embedded as Base64 in manifest.json and index.html)
  // Note: JS modules (index.js, App.js etc.) are implicitly handled by the browser's module loader
  // and will be fetched. The service worker's fetch handler will cache them on first load.
  // Tailwind CDN is cached by the browser according to its own headers.
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force the waiting service worker to become the active service worker.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching initial assets');
        // Add all URLs, but don't fail install if some individual assets are missing.
        const promises = urlsToCache.map(urlToCache => {
          return cache.add(urlToCache).catch(reason => {
            console.warn(`Failed to cache ${urlToCache}:`, reason);
          });
        });
        return Promise.all(promises);
      })
      .catch(error => {
        console.error('Failed to open cache or perform initial caching:', error);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    }).then(() => self.clients.claim()) // Take control of all open clients once activated.
  );
});

self.addEventListener('fetch', event => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  // For navigation requests, try network first, then cache (NetworkFirst strategy for HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If fetch is successful, clone and cache it
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request).then(cachedResponse => {
            return cachedResponse || caches.match('./index.html'); // Fallback to root index.html
          });
        })
    );
    return;
  }

  // For other requests (assets, JS modules), use CacheFirst strategy
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
          // Check if the response is valid and cacheable.
          if (networkResponse && networkResponse.ok) { 
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
  );
});