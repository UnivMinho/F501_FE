
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

  
  import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

  

  const firebaseConfig = {
    apiKey: "AIzaSyBc33HYnvGVBzQJzDaMMiQr7KGn7nz_yp8",
    authDomain: "pwprojeto-d5b00.firebaseapp.com",
    projectId: "pwprojeto-d5b00",
    storageBucket: "pwprojeto-d5b00.appspot.com",
    messagingSenderId: "822825203574",
    appId: "1:822825203574:web:e5fa2c1ba721b4bebb2c57"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const signInButton = document.getElementById('button-google');

  const userSignIn = async () => { 

    signInWithPopup (auth, provider)
    .then ((result) => {

      const user = result.user;
      console.log(user);

    }).catch ((error) => {
      
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }

  const userSignOut  = async () => {
    signOut(auth).then(() => {
      alert("Desconectado com sucesso!");
    }).catch ((error) => {})
  }

  onAuthStateChanged(auth, (user) => {
    if (user){
        alert("Já está logado!")
    } else {
    }
  })

  signInButton.addEventListener('click', userSignIn);