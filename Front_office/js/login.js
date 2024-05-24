import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, deleteUser } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBc33HYnvGVBzQJzDaMMiQr7KGn7nz_yp8",
  authDomain: "pwprojeto-d5b00.firebaseapp.com",
  projectId: "pwprojeto-d5b00",
  storageBucket: "pwprojeto-d5b00.appspot.com",
  messagingSenderId: "822825203574",
  appId: "1:822825203574:web:e5fa2c1ba721b4bebb2c57"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'pt';
const provider = new GoogleAuthProvider();

// Função de login com Google
function googleLogin(event) {
  event.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userName", user.displayName);
      localStorage.setItem("userEmail", user.email);

      window.location.href = "/Front_office/index.html";
    })
    .catch((error) => {
      console.error('Erro no login:', error);
    });
}

// Função de logout
function googleLogout(event) {
  event.preventDefault();
  
  auth.signOut().then(() => {
    // Limpa os dados do usuário no localStorage
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    
    // Redireciona para a página de login
    window.location.href = "/Front_office/login.html";
  }).catch((error) => {
    console.error('Erro ao fazer logout', error);
  });
}

// Adiciona eventos aos botões de login e logout
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("button-google")) {
    document.getElementById("button-google").addEventListener("click", googleLogin);
  }
  if (document.getElementById("button-logout")) {
    document.getElementById("button-logout").addEventListener("click", googleLogout);
  }

  // Verifica se o usuário está logado e atualiza o perfil
  if (localStorage.getItem("loggedIn")) {
    document.getElementById('displayName').innerText = `Username: ${localStorage.getItem("userName")}`;
    document.getElementById('email').innerText = `E-mail: ${localStorage.getItem("userEmail")}`;
  }
  });




  // Guardar Dados sobre o Cargo
  
  document.addEventListener('DOMContentLoaded', function() {
    const cargoSelect = document.getElementById('cargo');
  
    // Restaurar o valor do cargo selecionado do localStorage, se existir
    const savedCargo = localStorage.getItem('cargo');
    if (savedCargo) {
      cargoSelect.value = savedCargo;
    }
  
    // Adicionar evento de change para o dropdown
    cargoSelect.addEventListener('change', function() {
      const selectedCargo = cargoSelect.value;
      localStorage.setItem('cargo', selectedCargo);
    });
  });
  