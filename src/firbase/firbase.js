// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIRE_KEY || "AIzaSyBE5nw-6KH1ddid2prjVjWM402zL67U6SU",
  authDomain:
    process.env.REACT_APP_AUTH_DOMAIN || "my-profile-46b6e.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID || "my-profile-46b6e",
  storageBucket:
    process.env.REACT_APP_STORAGE_BUCKET || "my-profile-46b6e.appspot.com",
  messagingSenderId:
    process.env.REACT_APP_MESSAGING_SENDER_ID || "670287037511",
  appId:
    process.env.REACT_APP_APP_ID || "1:670287037511:web:8c05eec8abec38ef679d62",
  measurementId: process.env.REACT_APP_MEASUREMENT_ID || "G-CG7RDF5V57",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
