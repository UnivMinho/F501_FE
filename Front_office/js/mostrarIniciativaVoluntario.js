function inscreverVoluntario(){
    let iniciativaTab;
    if(localStorage.getItem("sugestoes") == null){
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
        html += '<td>';

        // Verifica se o item está inscrito e exibe o botão ou o texto "Inscrito" correspondente
        if (element.inscrito) {
            html += '<span>Inscrito</span>';
        } else {
            html += '<button id="inscreverButton' + index + '" onclick="inscrever(' + index + ')" style="background: #eec857; border: 2px solid #eec857; color: #fff;">Inscrever</button>';
        }
        
        html += '</td>';
        html += "</tr>";
    });
  
    const tables = document.querySelectorAll('#sugestoes-table-vol tbody');
  
    tables.forEach(table =>{
      table.innerHTML = html;
    });
}


function inscrever(index) {
    
    let sugestoes = JSON.parse(localStorage.getItem("sugestoes"));

    sugestoes[index].inscrito = true;

    localStorage.setItem("sugestoes", JSON.stringify(sugestoes));

    let button = document.getElementById('inscreverButton' + index);
    let text = document.getElementById('inscritoText' + index);

    button.style.display = 'none'; 
    text.style.display = 'inline'; 
}


document.onload = inscreverVoluntario();