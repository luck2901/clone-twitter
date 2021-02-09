import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg0hPYEK6DM7roObrG-N9raHQTi-yHktU",
  authDomain: "twitter-18cc6.firebaseapp.com",
  projectId: "twitter-18cc6",
  storageBucket: "twitter-18cc6.appspot.com",
  messagingSenderId: "715865745869",
  appId: "1:715865745869:web:293bca02cdc5c3eec33c84"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();