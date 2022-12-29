import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyALqCiK1bAd9LZVegqTpz2EpWYXnUym6NY",
  authDomain: "fir-chatapp-667ab.firebaseapp.com",
  projectId: "fir-chatapp-667ab",
  storageBucket: "fir-chatapp-667ab.appspot.com",
  messagingSenderId: "560004822602",
  appId: "1:560004822602:web:0b2ca5ed8633688fe318b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
