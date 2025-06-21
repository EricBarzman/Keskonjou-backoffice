import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_URL,
  authDomain: "keskonjou-7ab1a.firebaseapp.com",
  projectId: "keskonjou-7ab1a",
  storageBucket: "keskonjou-7ab1a.firebasestorage.app",
  messagingSenderId: "458586443734",
  appId: "1:458586443734:web:9797a27797e0ef3a70de77",
  measurementId: "G-R1JE4SDGHE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);