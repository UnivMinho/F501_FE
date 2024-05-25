function showDataSugestoes(){
  let sugestoes;
  if(localStorage.getItem("sugestoes")==null){
    sugestoes = [];
  }
  else{
    sugestoes = JSON.parse(localStorage.getItem("sugestoes"));
  }

  let html = "";

    sugestoes.forEach(function(element, index) {
      html += "<tr>";
      html += "<td>" + element.tipo + "</td>";
      html += "<td>" + element.descInic + "</td>";
      html += "<td>" + element.local + "</td>";
      html += "<td>" + element.data + "</td>";
      html += "<td>" + element.email + "</td>";
      html += "<td>" + element.contacto + "</td>";
      html += 
      '<td><button onclick="acceptData(' +
      index + 
      ')" class="fa fa-check" style="margin-left:10px; background-color:lightgreen;"></button><button onclick="deleteData(' +
      index +
      ')" class="fa fa-trash" style="margin-left:10px; background-color:#FF9999;"></button>';
      html += "</tr>";

  });

  const tables = document.querySelectorAll("#sugestoes-table tbody, #sugestoes-table2 tbody");

  tables.forEach(table =>{
    table.innerHTML = html;
  });

}

  document.onload = showDataSugestoes();


function showDataSugestoesRec(){
  let sugestoesrec;
  if(localStorage.getItem("sugestoesrec")==null){
    sugestoesrec = [];
  }
  else{
    sugestoesrec = JSON.parse(localStorage.getItem("sugestoesrec"));
  }
  
  let html = "";
  
  sugestoesrec.forEach(function(element, index) {
    html += "<tr>";
    html += "<td>" + element.tipo + "</td>";
    html += "<td>" + element.local + "</td>";
    html += "<td>" + element.descInic + "</td>";
    html += "<td>" + element.data + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.contacto + "</td>";
    html += 
      '<td><button onclick="recoverData(' +
      index + 
      ')" class="fa fa-check" style="margin-left:10px; background-color:lightgreen;"></button>';
    html += "</td>";
  });
  
  document.querySelector("#sugestoesrec-table tbody").innerHTML = html;
  
  }
  
    document.onload = showDataSugestoesRec();

function AddDataSugestoes(){

    let tipo = document.getElementById("drop").value;
    let descInic = document.getElementById("Desiniciativa").value;
    let local = document.getElementById("local").value;
    let data = document.getElementById("dataEvento").value;
    let email = document.getElementById("emailResp").value;
    let contacto = document.getElementById("contactoResp").value;
    let estado = "Pendete";


    let sugestoes;
    if(localStorage.getItem("sugestoes")==null){
      sugestoes = [];
    }
    else{
      sugestoes = JSON.parse(localStorage.getItem("sugestoes"));
    }

    sugestoes.push({
      tipo : tipo,
      descInic : descInic,
      local : local,
      data : data,
      email : email,
      contacto : contacto,
    });

    localStorage.setItem("sugestoes", JSON.stringify(sugestoes));
    showDataSugestoes();
    document.getElementById("drop").value = "";
    document.getElementById("Desiniciativa").value = "";
    document.getElementById("local").value = "";
    document.getElementById("dataEvento").value = "";
    document.getElementById("emailResp").value = "";
    document.getElementById("contactoResp").value = "";
  
}

function acceptData(index){
  
  let sugestoes;
    if(localStorage.getItem("sugestoes")==null){
      sugestoes = [];
    }
    else{
      sugestoes = JSON.parse(localStorage.getItem("sugestoes"));
    }

  let sugestaoSelecionada = sugestoes[index];

  sugestoes.splice(index, 1);
  localStorage.setItem("sugestoes", JSON.stringify(sugestoes));


  // Armazene os dados no localStorage da página CriarIniciativa.html
  localStorage.setItem("sugestaoSelecionada", JSON.stringify(sugestaoSelecionada));

  // Redirecione para a página CriarIniciativa.html
  window.location.href = "CriarIniciativa.html";
}


function deleteData(index){
  let sugestoes;
    if(localStorage.getItem("sugestoes")==null){
      sugestoes = [];
    }
    else{
      sugestoes = JSON.parse(localStorage.getItem("sugestoes"));
    }

  let deletedSugestao = sugestoes[index];

  sugestoes.splice(index, 1);
  localStorage.setItem("sugestoes", JSON.stringify(sugestoes));
  
  let sugestoesrec;
  if (localStorage.getItem("sugestoesrec") == null) {
    sugestoesrec = [];
  } else {
    sugestoesrec = JSON.parse(localStorage.getItem("sugestoesrec"));
  }

  sugestoesrec.push(deletedSugestao);
  localStorage.setItem("sugestoesrec", JSON.stringify(sugestoesrec));

  showDataSugestoes();

}

function recoverData(index){
  let sugestoesrec;
    if(localStorage.getItem("sugestoesrec")==null){
      sugestoesrec = [];
    }
    else{
      sugestoesrec = JSON.parse(localStorage.getItem("sugestoesrec"));
    }

  let deletedSugestao = sugestoesrec[index];

  sugestoesrec.splice(index, 1);
  localStorage.setItem("sugestoesrec", JSON.stringify(sugestoesrec));
  
  let sugestoes;
  if (localStorage.getItem("sugestoes") == null) {
    sugestoes = [];
  } else {
    sugestoes = JSON.parse(localStorage.getItem("sugestoes"));
  }

  sugestoes.push(deletedSugestao);
  localStorage.setItem("sugestoes", JSON.stringify(sugestoes));

  showDataSugestoesRec();

}

