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




