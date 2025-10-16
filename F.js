const CACHE_NAME = 'Market-v2';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
cache.addAll(['/', '/ar/index.html', '/ar/manifest.json', '/ar/compounding_calculator.html', '/ar/contract.html', '/ar/index.css', '/ar/index.js', '/ar/app.js', '/ar/lot.js', '/ar/calcr.js', '/images/0x.png', '/images/0x1.png', '/images/0x3.png', '/images/0x4.png', '/images/0x5.png', '/images/0x6.png', '/images/0x7.png', '/images/0x8.png', '/images/0x9.png', '/images/0x10.png', '/images/0x11.png', '/images/0xbtc.png', '/images/btc.png', '/images/btc21.png', '/images/ltc.png', '/images/paxg.png']);    )
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
