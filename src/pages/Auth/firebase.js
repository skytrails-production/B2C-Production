// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBhZPp-8n9EvPIwEQu6NFSyDgmw95ri4jk",
//     authDomain: "skytrailssociallogin.firebaseapp.com",
//     projectId: "skytrailssociallogin",
//     storageBucket: "skytrailssociallogin.appspot.com",
//     messagingSenderId: "173172419203",
//     appId: "1:173172419203:web:a7c69cf25517a1db7909b6",
// };

const firebaseConfig = {
    apiKey: "AIzaSyCekI6G6OFD2d0RAz_Q3hBtjPNMiiJPmYI",
    authDomain: "theskytrailscom.firebaseapp.com",
    projectId: "theskytrailscom",
    storageBucket: "theskytrailscom.appspot.com",
    messagingSenderId: "47420968118",
    appId: "1:47420968118:web:5f890ceba198482a1aea17",
    measurementId: "G-736VT0JQ7B"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;






