import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcOyZjlBwhspg-llHkcAGNLxEjlNxNUqk",
    authDomain: "journal-app-41c42.firebaseapp.com",
    projectId: "journal-app-41c42",
    storageBucket: "journal-app-41c42.appspot.com",
    messagingSenderId: "722738511734",
    appId: "1:722738511734:web:f4c7020ac7a9d5d524c457"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

const db = getFirestore( app );

const auth = getAuth( app );

const googleAuthProvider = new GoogleAuthProvider( app );

export {
    app,
    db,
    auth,
    googleAuthProvider
}
