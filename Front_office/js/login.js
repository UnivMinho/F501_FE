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

      // Criar objeto com os dados do usuário
      const dadosUser = {
        loggedIn: true,
        userName: user.displayName,
        userEmail: user.email
      };

      // Armazenar dados do usuário no localStorage
      localStorage.setItem("dadosUser", JSON.stringify(dadosUser));

      // Redirecionar para a página inicial
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
    // Limpar dados do usuário no localStorage ao fazer logout
    localStorage.removeItem("dadosUser");

    // Redirecionar para a página de login
    window.location.href = "/Front_office/login.html";
  }).catch((error) => {
    console.error('Erro ao fazer logout', error);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("button-google")) {
    document.getElementById("button-google").addEventListener("click", googleLogin);
  }
  if (document.getElementById("button-logout")) {
    document.getElementById("button-logout").addEventListener("click", googleLogout);
  }

  // Exibir os dados do usuário se estiver logado
  const dadosUser = JSON.parse(localStorage.getItem("dadosUser"));
  if (dadosUser && dadosUser.loggedIn) {
    // Atualizar os elementos da card com os dados do usuário
    document.getElementById('displayName').innerText = `Username: ${dadosUser.userName}`;
    document.getElementById('email').innerText = `E-mail: ${dadosUser.userEmail}`;
  }
});

function showColaboradores() {
  let colaboradores = [];

  // Verifica se há dados no localStorage para nome e email
  if (localStorage.getItem("userName") !== null && localStorage.getItem("userEmail") !== null) {
    // Parse dos dados do localStorage
    const displayName = JSON.parse(localStorage.getItem("userName"));
    const email = JSON.parse(localStorage.getItem("userEmail"));

    // Verifica se os arrays têm o mesmo comprimento
    if (displayName.length === email.length) {
      // Constrói a matriz de colaboradores
      for (let i = 0; i < displayName.length; i++) {
        colaboradores.push({ displayName: displayName[i], email: email[i] });
      }
    }
  }

  // Gera a tabela HTML
  let html = "";
  colaboradores.forEach(function(element) {
    html += "<tr>";
    html += "<td>" + element.displayName + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "</tr>";
  });

  // Atualiza o conteúdo da tabela com os dados gerados
  const table = document.querySelector("#colaboradores-table tbody");
  table.innerHTML = html;
}

// Chama a função para exibir os colaboradores quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
  showColaboradores();
});

  