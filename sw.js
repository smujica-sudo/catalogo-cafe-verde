const CACHE_NAME = 'kawas-catalogo-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instalar el Service Worker y guardar en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para responder con la caché si es posible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el dato de la caché o hace la petición a la red
        return response || fetch(event.request);
      })
  );
});