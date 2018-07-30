var filesToCache = [
  '.',
  '/index.html',
  '/restaurant.html',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css',
  '/data/restaurants.json',
  '/css/styles.css',
  '/css/tablet.css',
  '/css/theme.css',
  '/css/desktop.css',
  '/js/main.js',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
];

var staticCacheName = 'app-cache-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
     caches.open(staticCacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', function(event) {

  if (event.request.method != 'GET') return;

  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});