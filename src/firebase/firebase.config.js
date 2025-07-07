// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ9ULn2i2R1Qx3aosQojGbkC8kPClyNXU",
  authDomain: "zap-shift-c0d66.firebaseapp.com",
  projectId: "zap-shift-c0d66",
  storageBucket: "zap-shift-c0d66.firebasestorage.app",
  messagingSenderId: "189684259843",
  appId: "1:189684259843:web:a4503ddad8257a56b04236",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);