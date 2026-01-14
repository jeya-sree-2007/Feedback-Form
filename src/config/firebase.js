import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "feedback-form-410f2.firebaseapp.com",
  projectId: "feedback-form-410f2",
  storageBucket: "feedback-form-410f2.firebasestorage.app",
  messagingSenderId: "484461176890",
  appId: "1:484461176890:web:9ace43da72f24ccba7ad03"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };