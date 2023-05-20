import { getMessaging, getToken } from "firebase/messaging/sw";
import { initializeApp } from "firebase/app";
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
