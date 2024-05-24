import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc33HYnvGVBzQJzDaMMiQr7KGn7nz_yp8",
  authDomain: "pwprojeto-d5b00.firebaseapp.com",
  projectId: "pwprojeto-d5b00",
  storageBucket: "pwprojeto-d5b00.appspot.com",
  messagingSenderId: "822825203574",
  appId: "1:822825203574:web:e5fa2c1ba721b4bebb2c57"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {

  if (document.getElementById("loginBtn")) {
    const submitLogin = document.getElementById("loginBtn");
    submitLogin.addEventListener("click", handleLogin);
  }

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

        const user = userCredential.user;
        localStorage.setItem("loggedIn", true);
        window.location.href = "../index.html";

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

        const user = userCredential.user;
        window.location.href = "../views/Login.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error: " + errorMessage);
      });
  }

  const logoutBtn = document.querySelector('#logout-btn');
    logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
    console.log('User signed out!');
    })

    function signOut(event) {
        event.preventDefault();
        auth.signOut().then(() => {
            alert("User signed out!");
            window.location.href = "../views/Login.html";
        }).catch((error) => {
           alert("Error: " + error.errorMessage);
        });
    }
});