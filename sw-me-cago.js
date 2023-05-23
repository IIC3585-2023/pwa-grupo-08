// importScripts(
//   "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js"
// );

// const firebaseConfig = {
//   apiKey: "AIzaSyDm75biz5grREeEcu753VD-ror0QmRPJ5g",
//   authDomain: "journal-98479.firebaseapp.com",
//   projectId: "journal-98479",
//   storageBucket: "journal-98479.appspot.com",
//   messagingSenderId: "267326710923",
//   appId: "1:267326710923:web:d798a11c7fd56188d9208e",
//   measurementId: "G-DD0ZCQTVJK",
// };
// const app = firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/icons/icon-128.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);

//   //   const notification = JSON.parse(payload.data.notification);
//   //   const notificationTitle = notification.title;
//   //   const notificationOptions = {
//   //     body: notification.body,
//   //   };
//   //   return self.registration.showNotification(
//   //     notificationTitle,
//   //     notificationOptions
//   //   );
//   // });
//   // messaging.onMessage(messaging, (payload) => {
//   //   console.log("Message received. ", payload);
//   //   // ...
// });

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll([
        "/",
        "/styles.css",
        "/script.js",
        "/imgs/heart.png",
        // "/imgs/journal.png",
        // "/imgs/travel-journal.png",
        // "/imgs/Pangui.png",
        // "/imgs/quill-drawing-a-line.png",
        // "icons/icon-128.png",
        // Add more resources to cache here
      ]);
    })
  );
});

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // If the requested resource is in cache, return it
//       if (response) {
//         return response;
//       }

//       // Otherwise, fetch the resource from the network
//       return fetch(event.request).then(function (networkResponse) {
//         // Cache the fetched response for future use
//         caches.open("my-cache").then(function (cache) {
//           cache.put(event.request, networkResponse.clone());
//         });

//         return networkResponse;
//       });
//     })
//   );
// });
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