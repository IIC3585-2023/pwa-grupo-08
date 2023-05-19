// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
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
      collection(db, "entry-test-v2"),
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

try {
  const q = query(
    collection(db, "entry-test-v2"),
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
getHighlights();
// exports.sendNotification = functions.database
//   .ref("/followers/{userUID}/{followerUID}")
//   .onWrite((change, context) => {
//     const userUID = context.params.userUID;
//     const followerUID = context.params.followerUID;

//     const tokens = getUserDeviceTokens(userUID);
//     const name = getUserDisplayName(followerUID);

//     // Notification details.
//     const payload = {
//       notification: {
//         title: "You have a new entry!",
//         body: `${name} is now following you.`,
//       },
//     };
//     return admin.messaging().sendToDevice(tokens, payload);
//   });

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
