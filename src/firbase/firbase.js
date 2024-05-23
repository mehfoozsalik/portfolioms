// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBE5nw-6KH1ddid2prjVjWM402zL67U6SU",
  authDomain: "my-profile-46b6e.firebaseapp.com",
  projectId: "my-profile-46b6e",
  storageBucket: "my-profile-46b6e.appspot.com",
  messagingSenderId: "670287037511",
  appId: "1:670287037511:web:8c05eec8abec38ef679d62",
  measurementId: "G-CG7RDF5V57",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
