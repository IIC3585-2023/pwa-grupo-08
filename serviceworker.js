const staticAssets = [
    "./",
    "./styles.css",
    "./app.js",
    "./manifest.webmanifest"

];
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getMessaging,
  onMessage,
  onBackgroundMessage,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-sw.js";

const firebaseConfig = {
  apiKey: "AIzaSyDm75biz5grREeEcu753VD-ror0QmRPJ5g",
  authDomain: "journal-98479.firebaseapp.com",
  projectId: "journal-98479",
  storageBucket: "journal-98479.appspot.com",
  messagingSenderId: "267326710923",
  appId: "1:267326710923:web:d798a11c7fd56188d9208e",
  measurementId: "G-DD0ZCQTVJK",
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("app-cache").then(function (cache) {
      return cache.addAll([
        "/index.html", // Ruta principal del archivo HTML
        "/styles.css", // Rutas de los archivos CSS
        "/app.js", // Rutas de los archivos JavaScript
        // Agrega aquí otras rutas de los archivos necesarios para tu aplicación
      ]);
    })
  );
});

// self.addEventListener("fetch", function (event) {
//   if (event.request.method === "GET") {
//     event.respondWith(
//       caches.match(event.request).then(function (response) {
//         return response || fetch(event.request);
//       })
//     );
//   } else {
//     // Realizar acciones específicas para las solicitudes POST
//     // como enviar la solicitud al servidor en línea sin almacenarla en caché
//     // o guardar los datos en IndexedDB en lugar de la caché.
//   }
// });
// ...

// self.addEventListener("fetch", function (event) {
//     if (event.request.method === "GET") {
//       if (event.request.url.endsWith("manifest.webmanifest")) {
//         // Si la solicitud es para el archivo del manifiesto,
//         // devuelve una respuesta vacía sin realizar la solicitud a la red
//         event.respondWith(new Response());
//       } else {
//         // Para otras solicitudes GET, busca en la caché o realiza la solicitud a la red
//         event.respondWith(
//           caches.match(event.request).then(function (response) {
//             if (response) {
//               // Si se encuentra una respuesta en la caché, se devuelve
//               return response;
//             } else {
//               // Si no se encuentra en la caché, se realiza la solicitud a la red
//               return fetch(event.request).catch(function () {
//                 // Si la solicitud falla, se muestra un mensaje de error o se realiza otra acción adecuada
//                 return new Response("Error: Failed to fetch", { status: 500 });
//               });
//             }
//           })
//         );
//       }
//     } else {
//       // Realizar acciones específicas para las solicitudes POST
//       // como enviar la solicitud al servidor en línea sin almacenarla en caché
//       // o guardar los datos en IndexedDB en lugar de la caché.
//     }
//   });
  
  // ...
  // ...

// Función para guardar los datos en IndexedDB
async function saveDataToIndexedDB(data) {
    try {
      const db = await idb.openDB("app-db", 1, {
        upgrade(db) {
          db.createObjectStore("data-store");
        },
      });
  
      const tx = db.transaction("data-store", "readwrite");
      const store = tx.objectStore("data-store");
      await store.put(data, "data");
  
      await tx.complete;
      db.close();
    } catch (error) {
      console.error("Error saving data to IndexedDB:", error);
    }
  }
  
  // Función para obtener los datos de IndexedDB
  async function getDataFromIndexedDB() {
    try {
      const db = await idb.openDB("app-db", 1);
      const tx = db.transaction("data-store", "readonly");
      const store = tx.objectStore("data-store");
      const data = await store.get("data");
  
      db.close();
      return data;
    } catch (error) {
      console.error("Error retrieving data from IndexedDB:", error);
      return null;
    }
  }
  
  // ...
  
  self.addEventListener("fetch", function (event) {
    if (event.request.method === "GET") {
 {
        // Para otras solicitudes GET, busca en la caché o realiza la solicitud a la red
        event.respondWith(
          caches.match(event.request).then(async function (response) {
            if (response) {
              // Si se encuentra una respuesta en la caché, se devuelve
              return response;
            } else {
              // Si no se encuentra en la caché, se intenta obtener los datos de IndexedDB
              const data = await getDataFromIndexedDB();
              if (data) {
                // Si se encuentran datos en IndexedDB, se crea una nueva respuesta con los datos
                return new Response(JSON.stringify(data));
              } else {
                // Si no se encuentran datos en IndexedDB, se realiza la solicitud a la red
                try {
                  const response = await fetch(event.request);
                  const responseData = await response.json();
                  // Guardar los datos en IndexedDB para futuras referencias
                  saveDataToIndexedDB(responseData);
                  return response;
                } catch (error) {
                  // Si la solicitud a la red falla, se muestra un mensaje de error o se realiza otra acción adecuada
                  return new Response("Error: Failed to fetch", { status: 500 });
                }
              }
            }
          })
        );
      }
    } else {
      // Realizar acciones específicas para las solicitudes POST
      // como enviar la solicitud al servidor en línea sin almacenarla en caché
      // o guardar los datos en IndexedDB en lugar de la caché.
    }
  });
  
  // ...
  


async function cacheData(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open("dynamic-meme");

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return await cache.match(request);
  }
}
self.addEventListener("activate", function (event) {
  var cacheWhitelist = ["pigment"];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
