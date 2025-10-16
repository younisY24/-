const CACHE_NAME = 'fitness-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
cache.addAll(['/', '/ar/index.html', '/ar/manifest.json', '/ar/compounding_calculator.html', ']);    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key =>
        key !== CACHE_NAME ? caches.delete(key) : null
      ))
    )
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request).then(res => res || caches.match('/'))
    )
  );
});
