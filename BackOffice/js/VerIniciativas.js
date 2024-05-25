function mostrarEstadoSugestao(){
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
        html += "<td>" + element.estado + "</td>";
        html += "</tr>";
  
    });
  
    const tables = document.querySelectorAll("#sugestoes-table2 tbody");
  
    tables.forEach(table =>{
      table.innerHTML = html;
    });
  
  }

  document.onload = mostrarEstadoSugestao();

  