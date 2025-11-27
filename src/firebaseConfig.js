// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/*
  Substitua pelos valores do seu projeto Firebase (App Web)
  Vá em Firebase Console -> Project Settings -> App Web (</>)
*/
const firebaseConfig = {
  apiKey: "SUA_API_KEY_FIREBASE",
  authDomain: "SEU_AUTHDOMAIN.firebaseapp.com",
  projectId: "cracha-digital-pets", // seu project id
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
