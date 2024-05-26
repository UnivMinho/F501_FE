










/*
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
      html += '<tr>';
      html += '<td>' + element.tipo + '</td>';
      html += '<td>' + element.local + '</td>';
      html += '<td>' + element.data + '</td>';
      html += '<td>';
      if (element.inscrito) {
          html += '<span id="inscritoText' + index + '" class="inscrito-text">Inscrito</span>';
      } else {
          html += '<button id="inscreverBotao' + index + '" onclick="inscrever(' + index + ')" class="voluntarios-botao">Inscrever</button>';
          html += '<span id="inscritoIniciativa' + index + '" style="display: none;">Inscrito</span>';
      }
      html += '</td>';
      html += '</tr>';
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

  let button = document.getElementById('inscreverBotao' + index);
  let text = document.getElementById('inscritoIniciativa' + index);

  button.style.display = 'none'; 
  text.classList.add('inscrito-text'); // Adiciona a classe CSS
  text.style.display = 'inline'; 
}

document.onload = inscreverVoluntario();

*/