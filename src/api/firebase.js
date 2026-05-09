// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB03HRDQjCJmgo3JwNXsiwqctl4BV7RWEk",
  authDomain: "task-manager-90dce.firebaseapp.com",
  projectId: "task-manager-90dce",
  storageBucket: "task-manager-90dce.firebasestorage.app",
  messagingSenderId: "1030108532425",
  appId: "1:1030108532425:web:e36c3181fa9b86a29a4718",
  measurementId: "G-ENPBHVKH70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
