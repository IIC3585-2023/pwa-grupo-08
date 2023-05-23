// Importa y configura Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
workbox.setConfig({ debug: false });

// Precaching de archivos estáticos
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/app.js', revision: '1' },
  { url: '/styles.css', revision: '1' },
  // Agrega aquí los demás archivos estáticos que deseas almacenar en caché
]);

// Estrategia de recuperación de la red para solicitudes HTTP
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new workbox.strategies.NetworkFirst()
);
self.addEventListener('push', function(event) {
    var data = event.data.json();
    var notificationOptions = {
      body: data.body,
      // Agrega aquí otras opciones para personalizar la notificación (icono, título, etc.)
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, notificationOptions)
    );
  });
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-app-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/app.js',
          '/styles.css',
          // Agrega aquí los recursos que deseas cachear
        ]);
      })
    );
  });
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response; // Retorna la respuesta desde la caché si está disponible
        }
  
        // Si no está en la caché, realiza la solicitud a Firebase
        return fetch(event.request).then((networkResponse) => {
          // Clona la respuesta antes de consumir o leer su cuerpo
          const clonedResponse = networkResponse.clone();
  
          // Almacena la respuesta en la caché para futuros usos
          caches.open('my-app-cache').then((cache) => {
            cache.put(event.request, clonedResponse);
          });
  
          return networkResponse; // Retorna la respuesta recibida desde Firebase
        });
      })
    );
  });
  
  