
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-thealgorithmicjudge.firebaseapp.com",
  projectId: "mern-thealgorithmicjudge",
  storageBucket: "mern-thealgorithmicjudge.appspot.com",
  messagingSenderId: "917326387454",
  appId: "1:917326387454:web:a3ec5c30c7bb80afa2edaf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);