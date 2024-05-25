document.addEventListener('DOMContentLoaded', function() {
  // Recupera os materiais da localStorage
  let materiais = JSON.parse(localStorage.getItem('material')) || [];
  
  // Seleciona o div onde os materiais serão inseridos
  let materialListDiv = document.getElementById('material-list');

  // Itera sobre os materiais e cria os elementos HTML
  materiais.forEach(function(material) {
      // Cria um container para cada material
      let materialContainer = document.createElement('div');
      materialContainer.classList.add('material-item');
      
      // Cria a checkbox para o material
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `material-${material.nome}`;
      checkbox.name = 'materiais';
      checkbox.value = material.nome;

      let label = document.createElement('label');
      label.htmlFor = `material-${material.nome}`;
      label.textContent = `${material.nome} (Disponível: ${material.quantidade})`;
      
      // Cria o input para a quantidade
      let quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.id = `quantidade-${material.nome}`;
      quantityInput.name = `quantidade-${material.nome}`;
      quantityInput.min = '0';
      quantityInput.placeholder = 'Quantidade';
      
      // Adiciona a checkbox, o label e o input ao container do material
      materialContainer.appendChild(checkbox);
      materialContainer.appendChild(label);
      materialContainer.appendChild(quantityInput);
      
      // Adiciona o container do material ao div principal
      materialListDiv.appendChild(materialContainer);
  });
});


function showDataIniciativas(){
  let iniciativas;
  if(localStorage.getItem("iniciativas")==null){
    iniciativas = [];
  }
  else{
    iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
  }

  let html = "";

  iniciativas.forEach(function(element, index) {
    html += "<tr>";
    html += "<td>" + element.iniciativa + "</td>";
    html += "<td>" + element.local + "</td>";
    html += "<td>" + element.data + "</td>";
    html += "<td>" + element.vagas + "</td>";
    html += "<td>" + element.tipo + "</td>";
    html += "<td>" + element.lider + "</td>";
    html += "<td>" + element.estado + "</td>";
    html += 
      '</button><button onclick="updateData(' +
      index +
      ')" class="fa fa-edit" style="margin-left:10px; background-color:yellow;"></button>';
      html += "</tr>";
  });

  document.querySelector("#iniciativas-table tbody").innerHTML = html;
}

document.onload = showDataIniciativas();

function updateData(index){

  let iniciativas;
    if(localStorage.getItem("iniciativas")==null){
      iniciativas = [];
    }
    else{
      iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
    }

  let iniciativaSelecionada = iniciativas[index];

  iniciativas.splice(index, 1);
  localStorage.setItem("iniciativas", JSON.stringify(iniciativas));


  localStorage.setItem("iniciativaSelecionada", JSON.stringify(iniciativaSelecionada));

  window.location.href = "../views/CriarIniciativa.html";
}




function AddDataBackOffice(event){
  event.preventDefault();

  let iniciativa = document.getElementById("iniciativa").value;
  let local = document.getElementById("local").value;
  let data = document.getElementById("data").value;
  let vagas = document.getElementById("vagas").value;
  let tipo = document.getElementById("tipo").value;
  let lider = document.getElementById("lider").value;
  let descricao = document.getElementById("descricao").value;
  let contactoResp = "";
  let emailResp = "";
  let budget = document.getElementById("budget").value;
  let estado = "Aceite";
    
    
    
  let iniciativas;
  if(localStorage.getItem("iniciativas")==null){
    iniciativas = [];
  }
  else{
    iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
  }

  iniciativas.push({
    iniciativa : iniciativa,
    descricao: descricao,
    local : local,
    data : data,
    vagas : vagas,
    tipo : tipo,
    lider : lider,
    contactoResp : contactoResp,
    emailResp : emailResp,
    estado : estado,
    budget : budget
  });

  window.location.href = "../views/Iniciativas.html";

  localStorage.setItem("iniciativas", JSON.stringify(iniciativas));
  showDataIniciativas();
  document.getElementById("iniciativa").value = "";
  document.getElementById("local").value = "";
  document.getElementById("data").value = "";
  document.getElementById("vagas").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("lider").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("estado").value = "";
  document.getElementById("contactoResp").value = "";
  document.getElementById("emailResp").value = "";
  document.getElementById("budget").value = "";
  }





