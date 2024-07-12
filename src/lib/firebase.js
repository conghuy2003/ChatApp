// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-38b11.firebaseapp.com",
  projectId: "chatapp-38b11",
  storageBucket: "chatapp-38b11.appspot.com",
  messagingSenderId: "191514038099",
  appId: "1:191514038099:web:15735f5b88e870079edba6"
};

const app = initializeApp(firebaseConfig);



export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()

