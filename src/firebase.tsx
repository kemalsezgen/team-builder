import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAeYf-IMljz-IxlcvoUgWoLTWPekZ4nEA0",
  authDomain: "team-generator-8dc41.firebaseapp.com",
  projectId: "team-generator-8dc41",
  storageBucket: "team-generator-8dc41.appspot.com",
  messagingSenderId: "770895152861",
  appId: "1:770895152861:web:288f4616978fb755b1bd34",
  measurementId: "G-RQ9GSZ3QQB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);