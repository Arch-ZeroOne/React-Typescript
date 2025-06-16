// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb6kSnr8H2kyfhWaMLtecb14TdYlSPGbQ",
  authDomain: "task-manager-57ba1.firebaseapp.com",
  projectId: "task-manager-57ba1",
  storageBucket: "task-manager-57ba1.firebasestorage.app",
  messagingSenderId: "1093098837033",
  appId: "1:1093098837033:web:5d32bce2d7cfad1341b838",
  measurementId: "G-C6DYWZ9T3N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db: any = getFirestore(app);
