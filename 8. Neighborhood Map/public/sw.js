
const filesToCache = [
  '.',
  '/',
  '/static/js/bundle.js',
  '/index.html',
];

const staticCacheName = 'app-cache-v5';

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
