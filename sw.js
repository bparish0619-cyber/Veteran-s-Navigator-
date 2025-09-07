const CACHE_NAME = 'va-benefits-navigator-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/icon-192.svg',
  '/icon-512.svg'
];

// Install the service worker and cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Fetch resources from the cache or network
self.addEventListener('fetch', event => {
  // We only want to handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // If the resource is in the cache, return it.
        // Otherwise, fetch it from the network.
        return cachedResponse || fetch(event.request).then(
          (networkResponse) => {
            // Do not cache API responses
            if (event.request.url.includes('googleapis.com')) {
              return networkResponse;
            }

            // Clone the response to cache it for future use
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        ).catch(error => {
            console.error('Fetching failed:', error);
            // You could return a fallback offline page here if you had one.
            throw error;
        });
      })
  );
});

// Delete old caches on activation
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
