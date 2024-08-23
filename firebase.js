// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "@firebase/storage";

const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };