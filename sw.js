const CACHE_NAME = 'sandia-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './img/Isotipo.png',
  './img/Logo1.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Usamos cache.add individual con try/catch para evitar caídas si un archivo falta o si se ejecuta en entorno de prueba
        return Promise.allSettled(
          urlsToCache.map(url => cache.add(url).catch(err => console.log('Sin caché local para:', url)))
        );
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request).catch(() => response);
      })
  );
});
