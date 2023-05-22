// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
// import { getMessaging, getToken } from "firebase/messaging";
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
// const messaging = getMessaging(app);

async function writeNewEntry(title, content, signed, highlight) {
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

async function getEntries() {
  try {
    console.log("Today's Entries");
    const q = query(
      collection(db, "entry-test-v2"),
      where("date", "==", getTodayDate())
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    return querySnapshot;
  } catch (e) {
    console.error("Error reading highlights: ", e);
  }
}

async function getHighlights() {
  try {
    console.log("Highlights");
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
//getHighlights();



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

// function requestPermission() {
//   console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//       getToken(messaging, {
//         vapidKey:
//           "BGo4_4bSV_kdlNn3JXvUuQ9RP_ig3G1WgTc9xf2xbWp568NNQ-u0lyZzyLxErahSVH7izynrZ86NA2eoubUgFaU",
//       }).then((currentToken) => {
//         if (currentToken) {
//           console.log("currentToken: ", currentToken);
//           messaging
//             .subscribeToTopic(currentToken, "/entries")
//             .then((response) => {
//               console.log("Successfully subscribed to topic:", response);
//             })
//             .catch((error) => {
//               console.log("Error subscribing to topic:", error);
//             });
//         } else {
//           console.log("Can not get token");
//         }
//       });
//     } else {
//       console.log("Do not have permission!");
//     }
//   });
// }

// export const sendNotification = functions.firestore
//   .ref('"entry-testv2')
//   .onWrite((change, context) => {
//     const newDocument = change.after.data();

//     // Get the device token for the device that created the new document.
//     const deviceToken = newDocument.deviceToken;

//     // When there is multiple subscribers
//     // const tokens = admin.messaging().getTopicTokens('/entries');

//     // Create a notification payload.
//     const payload = {
//       notification: {
//         title: "New Post!",
//         body: `${newDocument.title}`,
//       },
//     };

//     // Send the notification to the device.
//     return admin.messaging().sendToDevice(deviceToken, payload);
//     // admin.messaging().sendToTopic('/entries', payload);
//   });

// Obtener elementos del DOM
const noteOutput = document.getElementById('note-output');
const highlightsOutput = document.getElementById('highlightsBox');
let noteHighlight = false


export function toggleDivVisibility(divId) {
    var div = document.getElementById(divId);
    if (div.style.display === 'none') {
        div.style.display = 'block'; // Mostrar el div
    } else {
        div.style.display = 'none'; // Ocultar el div
    }
}
document.getElementById("boton1").onclick = ()=> {
  JustShowThis("note-viewer")
}
document.getElementById("boton2").onclick = ()=> {
  JustShowThis("note-editor")
}
document.getElementById("boton3").onclick = ()=> {
  JustShowThis("highlights")
}
function JustShowThis(name){
  document.getElementById(name).style.display = 'block';
  var lista = ["highlights",'note-editor',"note-viewer"]
  lista.forEach(element => {
    if(element!=name){
      document.getElementById(element).style.display = 'none'
    }
  });
}

document.getElementById("submit").onclick = ()=> {
  console.log("SUBMIT");
  var input = document.getElementById("note-input").value;
  var title = document.getElementById("note-title").value;
  var firma = document.getElementById("note-signature").value;
  if (input == '' || title == '') {
    alert('Debe incluir Titulo y contenido');
  } else {
    writeNewEntry(title,input,firma,noteHighlight);
    document.getElementById("note-input").value = ''
    document.getElementById("note-title").value = ''
    document.getElementById("note-signature").value = ''
    fill_viewer();
    console.log('enviado');
  }
}

export function onHighlightChange(){
    noteHighlight = !noteHighlight;
    console.log(noteHighlight);
}
document.getElementById("note-highlight").onchange = () => {
  noteHighlight = !noteHighlight;
  console.log(noteHighlight);
}

async function fill_viewer() {
  noteOutput.innerHTML = '[' + getTodayDate() + ']\n';
  const entries = await getEntries();
  entries.forEach((entry) => {
    let author = entry.data().signed;
    if (author== '') {
      author= 'Anon';
    }
    console.log('['+ entry.data().date + ']', entry.data().content, '~', author);
    if (entry.data().highlight) {
      noteOutput.innerHTML += '★ '
    }
    noteOutput.innerHTML += entry.data().title + ': '
    noteOutput.innerHTML += entry.data().content;
    noteOutput.innerHTML += ' ~ ';
    noteOutput.innerHTML += author;
    noteOutput.innerHTML += " <br />";
  })
}
async function fill_highlights() {
  highlightsOutput.innerHTML = '[' + getTodayDate() + ']\n';
  const entries = await getEntries();
  entries.forEach((entry) => {
    if (entry.data().highlight) {
    let author = entry.data().signed;
    if (author== '') {
      author= 'Anon';
    }
    console.log('['+ entry.data().date + ']', entry.data().content, '~', author);
    highlightsOutput.innerHTML += '★ '
    highlightsOutput.innerHTML += entry.data().title + ': '
    highlightsOutput.innerHTML += entry.data().content;
    highlightsOutput.innerHTML += ' ~ ';
    highlightsOutput.innerHTML += author;
    highlightsOutput.innerHTML += " <br />";
  }
  })
}
fill_viewer();
fill_highlights();