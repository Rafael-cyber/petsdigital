import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBp_NMidgCgHLlrhMiEGmS6vRIS1qhNprA",
  authDomain: "cracha-digital-pets.firebaseapp.com",
  projectId: "cracha-digital-pets",
  storageBucket: "cracha-digital-pets.firebasestorage.app",
  messagingSenderId: "760275197610",
  appId: "1:760275197610:web:09c4f563261b7224adbad3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
