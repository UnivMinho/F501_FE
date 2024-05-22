/*document.addEventListener('DOMContentLoaded', function () {

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#VerSugestoes-table tbody');
  
        data.forEach(item => {

          let row = document.createElement('tr');
          row.setAttribute('data-widget', 'expandable-table');
          row.setAttribute('aria-expanded', 'false');
  
          row.innerHTML = `
            <td>${item.iniciativa}</td>
            <td>${item.local}</td>
            <td>${item.data}</td>
            <td>${item.vagas}</td>
            <td>${item.tipo}</td>
            <td>
              <div class="btn-group">
                  <button class="btn btn-success btn-circle" onclick="aprovarIniciativa('${item.iniciativa}')"><i class="fas fa-check"></i></button>
                  <button class="btn btn-danger btn-circle" onclick="rejeitarIniciativa('${item.iniciativa}')"><i class="fas fa-trash"></i></button>
              </div>
            </td>
          `;
  
          tableBody.appendChild(row);
  
          
          let expandableRow = document.createElement('tr');
          expandableRow.classList.add('expandable-body');
          expandableRow.innerHTML = `
            <td colspan="6">
              <p>
                <strong>Descrição:</strong> ${item.descricao}
                <button class="btn btn-sm btn-success ver-mais" onclick="toggleDescription(this)">Ver mais</button>
              </p>
            </td>
          `;
  
          tableBody.appendChild(expandableRow);
        });
      })
      .catch(error => console.error('Erro:', error));
  });
  
  function toggleDescription(button) {
    const expandableRow = button.closest('tr').nextElementSibling;
    expandableRow.classList.toggle('show');
  }
  
  function aprovarInitiata(id) {
    console.log(`Iniciativa ${id} aprovada.`);
    // Adicionar codigo de aprovação
  }
  
  function rejeitarIniciativa(id) {
    console.log(`Iniciativa ${id} removida.`);
    // Adicionar codigo de rejeição
  }
  
  */

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


document.onload = showDataSugestoes();


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
  });

  document.querySelector("#sugestoes-table tbody").innerHTML = html;
}