
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

      if (loggedIn) {
        const username = localStorage.getItem("userName");
        const email = localStorage.getItem("userEmail");
    
        // Atualiza os elementos HTML com os dados do usuário
        document.querySelector(".card-text.username").textContent =  userName;
        document.querySelector(".card-text.email").textContent =  userEmail;
      }
    }

  
    function googleLogin(event) {
      event.preventDefault();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;

          console.log(user);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("userName", user.displayName);
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userPhoto", user.photoURL);
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

document.addEventListener("DOMContentLoaded", function () {
  // Verifica se a página atual é a página de login
  if (document.getElementById("button-logout")) {
    const submitLogoutGoogle = document.getElementById("button-logout");
    submitLogoutGoogle.addEventListener("click", googleLogout);
  }
});



function googleLogout(event) {
  event.preventDefault();
  
  auth.signOut().then(() => {
    // Limpa os dados do usuário no localStorage
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhoto");
    
    // Redireciona para a página de login ou para onde desejar
    window.location.href = "/Front_office/login.html";
  }).catch((error) => {
    // Trata erros, se houver
    console.error('Erro ao fazer logout:', error);
  });
}