function showDataSugestoesVoluntarios(){
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
        html += "<td>" + element.local + "</td>";
        html += "<td>" + element.data + "</td>";
        html += 
        '<td><button id="inscreverButton' + index + 
        '" onclick="inscrever(' + index + 
        ')" style="background: #eec857 border: 2px solid #eec857 color: #fff; ">Inscrever</button><span id="inscritoText' + index + 
        '" style="display:none;">Inscrito</span></td>';
        html += "</tr>";
    });
  
    const tables = document.querySelectorAll('#sugestoes-table-vol tbody');
  
    tables.forEach(table =>{
      table.innerHTML = html;
    });
}

  function inscrever(index) {
    let button = document.getElementById('inscreverButton' + index);
    let text = document.getElementById('inscritoText' + index);

    button.style.display = 'none'; // Esconde o botão
    text.style.display = 'inline'; // Mostra o texto
}

  document.onload = showDataSugestoesVoluntarios();