// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnoixfene8VElbC2M74UBmFrBtXyNIV-E",
  authDomain: "ftp-internship-tracker.firebaseapp.com",
  projectId: "ftp-internship-tracker",
  storageBucket: "ftp-internship-tracker.firebasestorage.app",
  messagingSenderId: "475614388483",
  appId: "1:475614388483:web:8d5c7f971bd3c1da924936",
  measurementId: "G-VTZXLBMETW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db};

