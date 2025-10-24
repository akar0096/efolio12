
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFezYOe3wrMKgAccx4n1Ud5V2EKG2iCEI",
  authDomain: "fit5032-week6-bf33b.firebaseapp.com",
  projectId: "fit5032-week6-bf33b",
  storageBucket: "fit5032-week6-bf33b.firebasestorage.app",
  messagingSenderId: "310683752749",
  appId: "1:310683752749:web:15f4e827aeefee2cbd9ba4",
  measurementId: "G-7LS0BMCDDD"
};

const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)

export const db = getFirestore(firebaseApp)
