const staticAssets = [
    './',
    './styles.css',
    './app.js'
];

    self.addEventListener('install', function(event) {
        event.waitUntil(
            caches.open('app-cache')
                .then(function(cache) {
                    return cache.addAll([
                        '/index.html', // Ruta principal del archivo HTML
                        '/styles.css', // Rutas de los archivos CSS
                        '/app.js', // Rutas de los archivos JavaScript
                        // Agrega aquí otras rutas de los archivos necesarios para tu aplicación
                    ]);
                }).catch(e=>console.log(e.message))
        );
    });
    
    //  self.addEventListener('fetch', function(event) {
    //      event.respondWith(
    //          caches.match(event.request)
    //              .then(function(response) {
    //                  return response || fetch(event.request);
    //              })
    //      );
    //  });
    //  self.addEventListener('fetch', function(event) {
    //     if (event.request.method === 'GET') {
    //         event.respondWith(
    //             caches.match(event.request)
    //                 .then(function(response) {
    //                     return response || fetch(event.request);
    //                 })
    //         );
    //     } else {
    //         // Realizar acciones específicas para las solicitudes POST
    //         // como enviar la solicitud al servidor en línea sin almacenarla en caché
    //         // o guardar los datos en IndexedDB en lugar de la caché.
    //     }
    // });


// // if (navigator.serviceWorker.controller) {
// //     console.log("Active service worker found");
// //     } 
// // else {
// //     console.log("xdxdxd")
// //     navigator.serviceWorker
// //     .register("/home/tconcha/ingenieria/AvWeb/pwa-grupo-08/serviceworker.js")
// //     .then(function (reg) {
// //     console.log("Service worker  registered");
// //     });
// // }


// self.addEventListener('install', async event => {
//     const cache = await caches.open('static-meme');
//     cache.addAll(staticAssets);
// });

self.addEventListener('fetch', event => {
    const {request} = event;
    const url = new URL(request.url);
    if(url.origin === location.origin) {
        event.respondWith(cacheData(request));
    } 
   //  else {
   //      event.respondWith(networkFirst(request));
   //  }
});


//Chat GPT 
// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         fetch(event.request)
//             .catch(function(error) {
//                 console.log(error);
//                 // Se produjo un error al recuperar el recurso
//                 // Puedes crear un objeto de respuesta personalizado para enviar el mensaje de error
//                 return new Response('Error al recuperar el recurso: ' + error, {
//                     status: 500, // Código de estado HTTP para indicar un error
//                     statusText: 'Failed to fetch', // Texto descriptivo del error
//                     headers: {
//                         'Content-Type': 'text/plain'
//                     }
//                 });
//             })
//     );
// });

 async function cacheData(request) {
     const cachedResponse = await caches.match(request);
     return cachedResponse || fetch(request);
 }

 async function networkFirst(request) {
     const cache = await caches.open('dynamic-meme');

     try {
         const response = await fetch(request);
         cache.put(request, response.clone());
         return response;
     } catch (error){
         return await cache.match(request);
     }

 }
  self.addEventListener('activate', function(event) {
      var cacheWhitelist = ['pigment'];
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    })
