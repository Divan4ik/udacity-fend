
const filesToCache = [
  '.',
  '/',
  '/index.html',
  '/sw.js',
  '/static/js/bundle.js',
];

const staticCacheName = 'app-cache-v3';

self.addEventListener('install', function(event) {
  event.waitUntil(
     caches.open(staticCacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', function(e) {

  if (e.request.method != 'GET') return;

  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    }).catch(error => {
      console.log('Fetch failed: ', error);
    })
  );

});
