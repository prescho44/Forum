import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyABha3JbCcc29EcxgLNbZs0EcFWXm7Mn7M",
  authDomain: "forum-53cfe.firebaseapp.com",
  databaseURL:
    "https://forum-53cfe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "forum-53cfe",
  storageBucket: "forum-53cfe.firebasestorage.app",
  messagingSenderId: "877609387828",
  appId: "1:877609387828:web:04d5edd7344095001c8761",
  measurementId: "G-4HG2478YYG",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);
