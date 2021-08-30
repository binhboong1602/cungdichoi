import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCBZ2K3BdmfCw41az9shRSYiJV6atOjyVw",
  authDomain: "chat-app-e7f44.firebaseapp.com",
  projectId: "chat-app-e7f44",
  storageBucket: "chat-app-e7f44.appspot.com",
  messagingSenderId: "260404544437",
  appId: "1:260404544437:web:15dce4159cf57d42c0cffc",
  measurementId: "G-S2B5DT669E",
});

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

export default app;
