import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { openDB } from 'https://unpkg.com/idb?module';


async function openIndexedDB() {
  const db = await openDB('my-database', 1, {
    upgrade(db) {
      db.createObjectStore('my-data');
    },
  });
  return db;
}

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



async function writeNewEntry(title, content, signed, highlight) {
  try {
    const docRef = await addDoc(collection(db, "entry-test-v2"), {
      title: title,
      date: getTodayDate(),
      content: content,
      signed: signed,
      highlight: highlight,
    });

    // Guardar los datos en IndexedDB
    const entry = {
      id: docRef.id,
      title: title,
      date: getTodayDate(),
      content: content,
      signed: signed,
      highlight: highlight,
    };

    await saveEntryToIndexedDB(entry);

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function saveEntryToIndexedDB(entry) {
  try {
    const dbPromise = openDB("journal", 1, {
      upgrade(db) {
        db.createObjectStore("entries", { keyPath: "id" });
      },
    });

    const db = await dbPromise;
    const tx = db.transaction("entries", "readwrite");
    const store = tx.objectStore("entries");
    await store.put(entry);
    await tx.complete;
    db.close();
  } catch (e) {
    console.error("Error saving entry to IndexedDB: ", e);
  }
}



async function getEntries() {
  try {
    console.log("Today's Entries");

    let entries;

    if (navigator.onLine) {
      const q = query(
        collection(db, "entry-test-v2"),
        where("date", "==", getTodayDate())
      );
      const querySnapshot = await getDocs(q);
      entries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Guardar los datos en IndexedDB
      await saveEntriesToIndexedDB(entries);
    } else {
      entries = await getEntriesFromIndexedDB();
    }

    entries.forEach((entry) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(entry.id, " => ", entry);
    });

    return entries;
  } catch (e) {
    console.error("Error reading highlights: ", e);
  }
}

async function saveEntriesToIndexedDB(entries) {
  try {
    const dbPromise = openDB("journal", 1, {
      upgrade(db) {
        db.createObjectStore("entries", { keyPath: "id" });
      },
    });

    const db = await dbPromise;
    const tx = db.transaction("entries", "readwrite");
    const store = tx.objectStore("entries");

    entries.forEach((entry) => {
      store.put(entry);
    });

    await tx.complete;
    db.close();
  } catch (e) {
    console.error("Error saving entries to IndexedDB: ", e);
  }
}

async function getEntriesFromIndexedDB() {
  try {
    const db = await openDB("journal", 1);
    const tx = db.transaction("entries", "readonly");
    const store = tx.objectStore("entries");
    const entries = await store.getAll();
    db.close();
    return entries;
  } catch (e) {
    console.error("Error getting entries from IndexedDB: ", e);
    return [];
  }
}


// Obtener elementos del DOM
const noteOutput = document.getElementById("note-output");
const highlightsOutput = document.getElementById("highlightsBox");
let noteHighlight = false;

export function toggleDivVisibility(divId) {
  var div = document.getElementById(divId);
  if (div.style.display === "none") {
    div.style.display = "block"; // Mostrar el div
  } else {
    div.style.display = "none"; // Ocultar el div
  }
}
document.getElementById("boton1").onclick = () => {
  JustShowThis("note-viewer");
};
document.getElementById("boton2").onclick = () => {
  JustShowThis("note-editor");
};
document.getElementById("boton3").onclick = () => {
  JustShowThis("highlights");
};
function JustShowThis(name) {
  document.getElementById(name).style.display = "block";
  var lista = ["highlights", "note-editor", "note-viewer"];
  lista.forEach((element) => {
    if (element != name) {
      document.getElementById(element).style.display = "none";
    }
  });
}

document.getElementById("submit").onclick = () => {
  console.log("SUBMIT");
  var input = document.getElementById("note-input").value;
  var title = document.getElementById("note-title").value;
  var firma = document.getElementById("note-signature").value;
  if (input == "" || title == "") {
    alert("Debe incluir Titulo y contenido");
  } else {
    writeNewEntry(title, input, firma, noteHighlight);
    document.getElementById("note-input").value = "";
    document.getElementById("note-title").value = "";
    document.getElementById("note-signature").value = "";
    fill_viewer();
    console.log("enviado");
  }
};

export function onHighlightChange() {
  noteHighlight = !noteHighlight;
  console.log(noteHighlight);
}
document.getElementById("note-highlight").onchange = () => {
  noteHighlight = !noteHighlight;
  console.log(noteHighlight);
};
async function fill_viewer() {
  noteOutput.innerHTML = "[" + getTodayDate() + "]\n";

  try {
    const entries = await getEntries();

    entries.forEach((entry) => {
      let author = entry.signed;
      if (author == "") {
        author = "Anon";
      }
      console.log(
        "[" + entry.date + "]",
        entry.content,
        "~",
        author
      );
      if (entry.highlight) {
        noteOutput.innerHTML += "★ ";
      }
      noteOutput.innerHTML += entry.title + ": ";
      noteOutput.innerHTML += entry.content;
      noteOutput.innerHTML += " ~ ";
      noteOutput.innerHTML += author;
      noteOutput.innerHTML += " <br />";
    });
  } catch (e) {
    console.error('Error filling viewer: ', e);
  }
}

async function fill_highlights() {
  highlightsOutput.innerHTML = "[" + getTodayDate() + "]\n";

  try {
    const entries = await getEntries();

    entries.forEach((entry) => {
      if (entry.highlight) {
        let author = entry.signed;
        if (author == "") {
          author = "Anon";
        }
        console.log(
          "[" + entry.date + "]",
          entry.content,
          "~",
          author
        );
        highlightsOutput.innerHTML += "★ ";
        highlightsOutput.innerHTML += entry.title + ": ";
        highlightsOutput.innerHTML += entry.content;
        highlightsOutput.innerHTML += " ~ ";
        highlightsOutput.innerHTML += author;
        highlightsOutput.innerHTML += " <br />";
      }
    });
  } catch (e) {
    console.error('Error filling highlights: ', e);
  }
}

fill_viewer();
fill_highlights();

if ('Notification' in window && 'serviceWorker' in navigator) {
  Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
      // Permiso concedido, obtén la token de registro
      navigator.serviceWorker.ready.then(function(registration) {
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'tu_clave_publica_vapid',
        }).then(function(subscription) {
          // Envía la suscripción al servidor para almacenarla y enviar notificaciones
          console.log('Suscripción:', subscription);
        }).catch(function(error) {
          console.log('Error al suscribirse a las notificaciones push:', error);
        });
      });
    }
  });
}
