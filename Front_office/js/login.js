
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

  
  import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

  

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
    // Verifica se a página atual é a página de login
    if (document.getElementById("button-google")) {
      const submitLoginGoogle = document.getElementById("button-google");
      submitLoginGoogle.addEventListener("click", googleLogin);
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
        window.location.href = "../views/login.html";
      }).catch((error) => {
        alert("Error: " + error.errorMessage);
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
          window.location.href = "/Front_office/index.html"
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
});