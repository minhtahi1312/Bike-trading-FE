
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtS0ER3Nk1l47YZurvj5nu3EgEjSB1uWY", 
  authDomain: "bikestore-9391a.firebaseapp.com",
  projectId: "bikestore-9391a",
  storageBucket: "bikestore-9391a.firebasestorage.app",
  messagingSenderId: "713685147921",
  appId: "1:713685147921:web:86e7c3ade713ab6f75ecb0",
  measurementId: "G-EPNLT1C798"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
}); 