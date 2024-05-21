function validateForm(){
  var iniciativa = document.getElementById("iniciativa").value;
  var local = document.getElementById("local").value;
  var data = document.getElementById("data").value;
  var vagas = document.getElementById("vagas").value;
  var tipo = document.getElementById("tipo").value;
  var lider = document.getElementById("lider").value;

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
  var iniciativas;
  if(localStorage.getItem("iniciativas")==null){
    iniciativas = [];
  }
  else{
    iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
  }

  var html = "";

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

function AddData(){
  if(validateForm() == true){
    var iniciativa = document.getElementById("iniciativa").value;
    var local = document.getElementById("local").value;
    var data = document.getElementById("data").value;
    var vagas = document.getElementById("vagas").value;
    var tipo = document.getElementById("tipo").value;
    var lider = document.getElementById("lider").value;


  var iniciativas;
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



