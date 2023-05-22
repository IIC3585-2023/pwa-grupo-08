import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js"

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

const messaging = getMessaging();

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: REPLACE_WITH_YOUR_VAPID_KEY })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }