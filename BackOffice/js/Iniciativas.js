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

function preencherTabela() {
  // Recupere os dados da sugestão selecionada do localStorage
  let sugestaoSelecionada = JSON.parse(localStorage.getItem("sugestaoSelecionada"));

  // Se houver dados da sugestão selecionada, preencha os campos
  if (sugestaoSelecionada) {
    document.getElementById("descricao").value = sugestaoSelecionada.descInic;
    document.getElementById("local").value = sugestaoSelecionada.local;
    document.getElementById("data").value = sugestaoSelecionada.data;
    document.getElementById("tipo").value = sugestaoSelecionada.tipo;

    // Limpe os dados da sugestão selecionada do localStorage
    localStorage.removeItem("sugestaoSelecionada");
  }
}

function validateForm(){
  let iniciativa = document.getElementById("iniciativa").value;
  let local = document.getElementById("local").value;
  let data = document.getElementById("data").value;
  let vagas = document.getElementById("vagas").value;
  let tipo = document.getElementById("tipo").value;
  let lider = document.getElementById("lider").value;

  if(iniciativa == ""){
    alert("Nome iniciativa em falta!");
    return false;
  }

  if(local == ""){
    alert("Local iniciativa em falta!");
    return false;
  }

  if(data == ""){
    alert("Data iniciativa em falta!");
    return false;
  }

  if(vagas == ""){
    alert("Vagas iniciativa em falta!");
    return false;
  }
  else if(vagas<1){
    alert("Não pode colocar um número negativo nas vagas");
    return false;
  }

  if(lider == ""){
    alert("Lider iniciativa em falta!");
    return false;
  }
  else if(lider<1){
    alert("Selecione o id correto");
    return false;
  }

  return true;
}

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
   
    
  });

  document.querySelector("#iniciativas-table tbody").innerHTML = html;
}

document.onload = showDataIniciativas();


function AddData(event){
  event.preventDefault();
  if(validateForm() == true){
    let iniciativa = document.getElementById("iniciativa").value;
    let local = document.getElementById("local").value;
    let data = document.getElementById("data").value;
    let vagas = document.getElementById("vagas").value;
    let tipo = document.getElementById("tipo").value;
    let lider = document.getElementById("lider").value;
        
    
    
  let iniciativas;
  if(localStorage.getItem("iniciativas")==null){
    iniciativas = [];
  }
  else{
    iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
  }

  iniciativas.push({
    iniciativa : iniciativa,
    local : local,
    data : data,
    vagas : vagas,
    tipo : tipo,
    lider : lider
  });

  window.location.href = "Iniciativas.html";

  localStorage.setItem("iniciativas", JSON.stringify(iniciativas));
  showDataIniciativas();
  document.getElementById("iniciativa").value = "";
  document.getElementById("local").value = "";
  document.getElementById("data").value = "";
  document.getElementById("vagas").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("lider").value = "";
  }
}




