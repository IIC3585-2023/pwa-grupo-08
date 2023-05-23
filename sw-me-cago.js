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
