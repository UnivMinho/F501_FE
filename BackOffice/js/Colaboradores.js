function addDataColaboradores(event){
    event.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let role = document.getElementById("role").value;
  let id = darID();

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

}

function deleteColaboradores(id){

}


function showPopupColaboradores(){}

function hidePopupColaboradores(){}