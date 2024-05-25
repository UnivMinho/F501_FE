
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


function googleLogin(event) {
  event.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;


      const dadosUser = {
        loggedIn: true,
        userName: user.displayName,
        userEmail: user.email,
        cargo: user.cargo
      };

      localStorage.setItem("dadosUser", JSON.stringify(dadosUser));


      window.location.href = "/Front_office/index.html";
    })
    .catch((error) => {
      console.error('Erro no login:', error);
    });
}



//

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("button-google")) {
    document.getElementById("button-google").addEventListener("click", googleLogin);
  }
  if (document.getElementById("button-logout")) {
    document.getElementById("button-logout").addEventListener("click", googleLogout);
  }

 
  const dadosUser = JSON.parse(localStorage.getItem("dadosUser"));
  if (dadosUser && dadosUser.loggedIn) {

    document.getElementById('displayName').innerText = `Username: ${dadosUser.userName}`;
    document.getElementById('email').innerText = `E-mail: ${dadosUser.userEmail}`;
    document.getElementById('cargo').innerText = `Cargo: ${dadosUser.cargo}`;
  }
});




function showDataColaboradores() {

  const dadosUser = JSON.parse(localStorage.getItem("dadosUser"));


  if (dadosUser && dadosUser.loggedIn && dadosUser.colaboradores) {
    const colaboradores = dadosUser.colaboradores;

    let html = "";


    colaboradores.forEach(function(colaborador) {
      html += "<tr>";
      html += "<td>" + colaborador.displayName + "</td>"; 
      html += "<td>" + colaborador.email + "</td>";
      html += "<td>" + colaborador.cargo + "</td>"; 
      html += "</tr>";
    });


    const tableBody = document.querySelector("#colaboradores-table tbody");
    tableBody.innerHTML = html;
  } else {
    console.log("Não há dados de colaboradores disponíveis.");
  }
}


document.addEventListener("DOMContentLoaded", function() {
  showDataColaboradores();
});




//Logout Function

function googleLogout(event) {
  event.preventDefault();
  
  auth.signOut().then(() => {

    localStorage.removeItem("dadosUser");
    window.location.href = "/Front_office/login.html";
  }).catch((error) => {
    console.error('Erro ao fazer logout', error);
  });
}
