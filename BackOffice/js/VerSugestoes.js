function showDataSugestoes(){
    var sugestoes;
    if(localStorage.getItem("sugestoes")==null){
      sugestoes = [];
    }
    else{
      sugestoes = JSON.parse(localStorage.getItem("sugestoes"));
    }
  
    var html = "";
  
    sugestoes.forEach(function(element, index) {
      html += "<tr>";
      html += "<td>" + element.tipo + "</td>";
      html += "<td>" + element.local + "</td>";
      html += "<td>" + element.data + "</td>";
      html += "<td>" + element.email + "</td>";
      html += "<td>" + element.contacto + "</td>";
      html += 
      '<td><button onclick="acceptData(' +
      index + 
      ')" class="fa fa-check"></button><button onclick="updateData(' +
      index +
      ')"class="fa fa-pencil"></button><button onclick="deleteData(' +
      index + 
      ')" class="fa fa-trash"></button>';
      html += "</tr>";

    });
  
    const tables = document.querySelectorAll("#sugestoes-table tbody, #sugestoes-table2");

    tables.forEach(table =>{
      table.innerHTML = html;
    });

  }

  document.onload = showDataSugestoes();

  function AddDataSugestoes(){
    
    var tipo = document.getElementById("drop").value;
    var local = document.getElementById("local").value;
    var data = document.getElementById("dataEvento").value;
    var email = document.getElementById("emailResp").value;
    var contacto = document.getElementById("contactoResp").value;


    var sugestoes;
    if(localStorage.getItem("sugestoes")==null){
      sugestoes = [];
    }
    else{
      sugestoes = JSON.parse(localStorage.getItem("sugestoes"));
    }

    sugestoes.push({
      tipo : tipo,
      local : local,
      data : data,
      email : email,
      contacto : contacto
    });

    localStorage.setItem("sugestoes", JSON.stringify(sugestoes));
    showDataSugestoes();
    document.getElementById("drop").value = "";
    document.getElementById("local").value = "";
    document.getElementById("dataEvento").value = "";
    document.getElementById("emailResp").value = "";
    document.getElementById("contactoResp").value = "";
  
  }

function acceptData(){

}

function updateData(){

}

function deleteData(){
  
}




