

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2BWwZWyS2MKul8iWb2LjijyFW1Pj9NJM",
  authDomain: "projetopw-e520a.firebaseapp.com",
  projectId: "projetopw-e520a",
  storageBucket: "projetopw-e520a.appspot.com",
  messagingSenderId: "18804285787",
  appId: "1:18804285787:web:ea920ba96661565250ba7e",
  measurementId: "G-ZQSG638Z9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);