import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADRTOzEQWpjRYFXlB7CEfGk3nHmwufryQ",
  authDomain: "pwproject-73b77.firebaseapp.com",
  projectId: "pwproject-73b77",
  storageBucket: "pwproject-73b77.appspot.com",
  messagingSenderId: "949138957763",
  appId: "1:949138957763:web:fc4aae2b3deceed6ca8976"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
  // Verifica se a página atual é a página de login
  if (document.getElementById("loginBtn")) {
    const submitLogin = document.getElementById("loginBtn");
    submitLogin.addEventListener("click", handleLogin);
  }

  // Verifica se a página atual é a página de registro
  if (document.getElementById("registerBtn")) {
    const submitRegister = document.getElementById("registerBtn");
    submitRegister.addEventListener("click", handleRegister);
  }

  function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("loggedIn", true);
        window.location.href = "../index.html";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error: " + errorMessage);
      });
  }

  function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
// 
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        window.location.href = "../views/Login.html";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
});