const CACHE_NAME = 'icel-control-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/productos.html',
  '/style.css',
  '/script.js',
  '/productos.js',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
