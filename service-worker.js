const CACHE_NAME = 'meta-card-cache-v1';

// List of files to cache when the service worker is installed
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  // Dependencies (Tailwind, Font Awesome, html2canvas)
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  // Assets
  '/assets/logo.jpg',
  '/assets/logo.jpg', // PWA icons
  '/assets/logo.jpg',
  '/assets/maskable-icon.jpg'
];

// --- Installation Event ---
self.addEventListener('install', event => {
  // Perform install steps: cache the necessary assets
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and added all files');
        // Add all static files to the cache
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache files:', error);
      })
  );
  self.skipWaiting(); // Forces the waiting service worker to become the active service worker
});

// --- Fetch Event (Serving Content) ---
self.addEventListener('fetch', event => {
  // Respond with a cached resource, or fetch from the network
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the response
        if (response) {
          return response;
        }
        // No cache hit - fetch from the network
        return fetch(event.request);
      })
  );
});

// --- Activation Event (Cleaning up old caches) ---
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  // Remove all caches that aren't in the whitelist
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Ensures the service worker is active for all clients immediately
});
