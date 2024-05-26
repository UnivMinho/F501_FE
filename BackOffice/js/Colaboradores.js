function addDataColaboradores(event){
    event.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let role = document.getElementById("role").value;
  let id = darIDColab();

  let colaboradores;
  if(localStorage.getItem("colaboradores")==null){
    colaboradores = [];
  }
  else{
    colaboradores = JSON.parse(localStorage.getItem("colaboradores"));
  }

  colaboradores.push({
    id : id,
    nome : nome,
    email: email,
    role : role
  });

  window.location.href = "../views/Colaboradores.html";

  localStorage.setItem("colaboradores", JSON.stringify(colaboradores));
  showDataColaboradores();
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("role").value = "";
}

function showDataColaboradores(){
  
  let html = "";

  colaboradores.forEach(function(element) {
    html += "<tr>";
    html += "<td>" + element.nome + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.role + "</td>";
    html += 
      '<td></button><button onclick="updateColaborador(' +
      element.id +
      ')" class="fa fa-edit" style="margin-left:10px; background-color:yellow;"></button></td>';
      html += "</tr>";
  });

  document.querySelector("#colaboradores-table tbody").innerHTML = html;
}

function updateColaborador(id){
    // Recupera as colaboradores do localStorage
  let colaboradores = JSON.parse(localStorage.getItem("colaboradores")) || [];

  let index = colaboradores.findIndex(iniciativa => iniciativa.id === id);

  let form = document.getElementById("form-popup");

  if(index !== -1){
      let colaboradorSelecionado = colaboradores[index];

      form.elements["nome"].value = colaboradorSelecionado.nome;
      form.elements["email"].value = colaboradorSelecionado.email;
      form.elements["role"].value = colaboradorSelecionado.role;

      showPopupColaboradores();

      form.addEventListener("submit", function(event) {
          event.preventDefault();

          // Obtém os novos detalhes da iniciativa a partir do formulário
          let novosDetalhes = {
              id: id,
              nome: form.elements["nome"].value,
              email: form.elements["email"].value,
              role: form.elements["role"].value,
          };

          colaboradores = colaboradores.map(item => item.id === id ? novosDetalhes : item);

          // Atualiza o localStorage com as colaboradores atualizadas
          localStorage.setItem("colaboradores", JSON.stringify(colaboradores));

          showDataColaboradores();
          hidePopupColaboradores();
          window.location.reload();

      }, { once: true }); // Adiciona o evento somente uma vez para evitar múltiplos handlers
  }
}

function deleteColaboradores(id){
    
}


function showPopupColaboradores(){
    document.getElementById('popup-background-colaboradores-editar').style.display = 'flex';
}

function hidePopupColaboradores(){
    document.getElementById('popup-background-colaboradores-editar').style.display = 'none';
}


function darIDColab() {
    let id = localStorage.getItem("idcolab") ? JSON.parse(localStorage.getItem("idcolab")) : 0;
    id += 1;
    localStorage.setItem("idcolab", JSON.stringify(id));
    return id;
  }