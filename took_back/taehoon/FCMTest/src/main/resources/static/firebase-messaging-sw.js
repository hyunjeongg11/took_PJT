// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQKQIjzY0TdZaIQ-6w2Ce-u6seEtAQ8AU",
    authDomain: "took-a85bc.firebaseapp.com",
    projectId: "took-a85bc",
    storageBucket: "took-a85bc.appspot.com",
    messagingSenderId: "433232049429",
    appId: "1:433232049429:web:79cdd7976503be8f68651c",
    measurementId: "G-MTZ9EY7LER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);