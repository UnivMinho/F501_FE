import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
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
auth.languageCode = 'pt';
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", function () {

  if (document.getElementById("loginBtn")) {
    const submitLogin = document.getElementById("loginBtn");
    const submitLoginGoogle = document.getElementById("googleBtn");
    submitLogin.addEventListener("click", handleLogin);
    submitLoginGoogle.addEventListener("click", googleLogin);
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

  onAuthStateChanged(auth, (user) => {
    const authLink = document.getElementById("auth-link");
    if (user) {
      // Usuário está logado
      authLink.innerHTML =
        '<a class="nav-link btn-login" role="button" id="auth-link">Sair</a>';
      document
        .getElementById("auth-link")
        .addEventListener("click", logout);
    } else {
      // Usuário não está logado
      authLink.innerHTML =
        '<a class="nav-link btn-login" href="../views/Login.html" role="button" id="auth-link">Login</a>';
    }
  });

  function logout() {
    signOut(auth)
      .then(() => {
        localStorage.setItem("loggedIn", false);
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  function googleLogin(event) {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        localStorage.setItem("loggedIn", true);
        window.location.href = "../index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
});