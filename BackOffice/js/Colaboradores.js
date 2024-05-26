function addDataColaboradores(event) {
  event.preventDefault();
  
  showPopupCriar();

  let colaboradores = JSON.parse(localStorage.getItem("colaboradores")) || [];

  let nome = document.getElementById("nome-criar").value;
  let email = document.getElementById("email-criar").value;
  let role = document.getElementById("role-criar").value;
  let id = darIDColab();

  colaboradores.push({
    id: id,
    nome: nome,
    email: email,
    role: role
  });

  console.log(colaboradores);

  localStorage.setItem("colaboradores", JSON.stringify(colaboradores));
  showDataColaboradores();
  hidePopupCriar();
  
}




function showPopupCriar(){
  document.getElementById('popup-background-criar').style.display = 'flex';
}

function showPopupEditar(){
  document.getElementById('popup-background-editar').style.display = 'flex';
}

function hidePopupCriar(){
  document.getElementById('popup-background-criar').style.display = 'none';
}

function hidePopupEditar(){
  document.getElementById('popup-background-editar').style.display = 'none';
}




function showDataColaboradores(){
  
  let colaboradores = JSON.parse(localStorage.getItem("colaboradores")) || [];

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

  showPopupEditar();

  let colaboradores = JSON.parse(localStorage.getItem("colaboradores")) || [];

  let index = colaboradores.findIndex(colaborador => colaborador.id === id);

  let form = document.getElementById("form-popup-editar");

  if(index !== -1){
      let colaboradorSelecionado = colaboradores[index];

      form.elements["nome"].value = colaboradorSelecionado.nome;
      form.elements["email"].value = colaboradorSelecionado.email;
      form.elements["role"].value = colaboradorSelecionado.role;

      

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

          hidePopupEditar();
          window.location.reload();

      }, { once: true }); // Adiciona o evento somente uma vez para evitar múltiplos handlers
  }
}

function deleteColaboradores(id){
    
}

function darIDColab() {
    let id = localStorage.getItem("idcolab") ? JSON.parse(localStorage.getItem("idcolab")) : 0;
    id += 1;
    localStorage.setItem("idcolab", JSON.stringify(id));
    return id;
}

document.getElementById("criarColaborador").addEventListener("click", showPopupCriar);
document.getElementById("close-popup-criar").addEventListener("click", hidePopupCriar);
document.getElementById("form-popup-criar").addEventListener("submit", addDataColaboradores);