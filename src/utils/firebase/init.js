// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFW53XswLqX3ASdY7-lA8Mm4ai7YVV6mk",
  authDomain: "straitter-ec081.firebaseapp.com",
  projectId: "straitter-ec081",
  storageBucket: "straitter-ec081.appspot.com",
  messagingSenderId: "120790459872",
  appId: "1:120790459872:web:15baeb746c15604f807785",
  measurementId: "G-E3XN4CXWTH",
  databaseURL: "https://straitter-ec081-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);