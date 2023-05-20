// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm75biz5grREeEcu753VD-ror0QmRPJ5g",
  authDomain: "journal-98479.firebaseapp.com",
  projectId: "journal-98479",
  storageBucket: "journal-98479.appspot.com",
  messagingSenderId: "267326710923",
  appId: "1:267326710923:web:d798a11c7fd56188d9208e",
  measurementId: "G-DD0ZCQTVJK",
};

const getTodayDate = () => new Date().toLocaleDateString("en-GB");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const messaging = getMessaging(app);

async function whriteNewEntry(title, content, signed, highlight) {
  try {
    const docRef = await addDoc(collection(db, "entry-test-v2"), {
      title: title,
      date: getTodayDate(),
      content: content,
      signed: signed,
      highlight: highlight,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getHighlights() {
  try {
    const q = query(
      collection(db, "entry-testv2"),
      where("highlight", "==", true)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  } catch (e) {
    console.error("Error reading highlights: ", e);
  }
}
getHighlights();

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      getToken(messaging, {
        vapidKey:
          "BGo4_4bSV_kdlNn3JXvUuQ9RP_ig3G1WgTc9xf2xbWp568NNQ-u0lyZzyLxErahSVH7izynrZ86NA2eoubUgFaU",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
          messaging
            .subscribeToTopic(currentToken, "/entries")
            .then((response) => {
              console.log("Successfully subscribed to topic:", response);
            })
            .catch((error) => {
              console.log("Error subscribing to topic:", error);
            });
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

exports.sendNotification = functions.firestore
  .ref('"entry-testv2')
  .onWrite((change, context) => {
    const newDocument = change.after.data();

    // Get the device token for the device that created the new document.
    const deviceToken = newDocument.deviceToken;

    // When there is multiple subscribers
    // const tokens = admin.messaging().getTopicTokens('/entries');

    // Create a notification payload.
    const payload = {
      notification: {
        title: "New Post!",
        body: `${newDocument.title}`,
      },
    };

    // Send the notification to the device.
    return admin.messaging().sendToDevice(deviceToken, payload);
    // admin.messaging().sendToTopic('/entries', payload);
  });

// const form = document.querySelector('#add-cafe-form');
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   whriteNewEntry(
//     form.title.value,
//     form.content.value,
//     form.signed.value,
//     form.highlight.value
//   );
//   form.title.value = "";
//   form.content.value = "";
//   form.signed.value = "";
// });
