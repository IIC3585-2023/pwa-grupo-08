var admin = require("firebase-admin");
var serviceAccount = require("./journal-98479-firebase-adminsdk-ikujg-e8b0d91c5b.json");

const firebaseConfig = {
  apiKey: "AIzaSyDm75biz5grREeEcu753VD-ror0QmRPJ5g",
  authDomain: "journal-98479.firebaseapp.com",
  projectId: "journal-98479",
  storageBucket: "journal-98479.appspot.com",
  messagingSenderId: "267326710923",
  appId: "1:267326710923:web:d798a11c7fd56188d9208e",
  measurementId: "G-DD0ZCQTVJK",
};
const topic = "test";

admin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

app.post("/subscribe-to-topic", (req, res) => {
  const { token, topic } = req.body;

  admin
    .messaging()
    .subscribeToTopic(token, topic)
    .then(() => {
      console.log("Successfully subscribed to the topic.");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Failed to subscribe to the topic:", error);
      res.sendStatus(500);
    });
});
// function subscribeTopic(tokens) {
//   admin.messaging().subscribeToTopic(topic, tokens);
// }

// async function sendNotificationd() {
//   const topicName = "test";
//   admin.messaging().sendToTopic(topicName, {
//     notification: {
//       title: "New entry just Dropped!",
//       text: "Check out the latest entry in Colelctive Journal!",
//     },
//   });
// }
