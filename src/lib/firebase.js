// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVtvlK_NPIp3_UlHtBm-L1pjYe4krjOMw",
  authDomain: "sveltefire-auction-de294.firebaseapp.com",
  projectId: "sveltefire-auction-de294",
  storageBucket: "sveltefire-auction-de294.appspot.com",
  messagingSenderId: "987237458144",
  appId: "1:987237458144:web:d6506051d15598eb68f085"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }