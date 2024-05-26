










/*
function inscreverVoluntario(){
  let iniciativas;
  let inscricoes;
  if(localStorage.getItem("inscricoes") == null){
    inscricoes = [];
} else {
  inscricoes = JSON.parse(localStorage.getItem("inscricoes"));
}

  if(localStorage.getItem("iniciativas") == null){
      iniciativas = [];
  } else {
      iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
  }

  let html = "";

  iniciativas.forEach(function(element) {
      html += '<tr>';
      html += '<td>' + element.tipo + '</td>';
      html += '<td>' + element.local + '</td>';
      html += '<td>' + element.data + '</td>';
      html += '<td>';
      if (inscricoes.includes(element.id)) {
          html += '<span id="inscritoText' + element.id + '" class="inscrito-text">Inscrito</span>';
      } else {
          html += '<button id="inscreverBotao' + element.id + '" onclick="inscrever(' + element.id + ')" class="voluntarios-botao">Inscrever</button>';
          html += '<span id="inscritoIniciativa' + element.id + '" style="display: none;">Inscrito</span>';
      }
      html += '</td>';
      html += '</tr>';
  });

  const tables = document.querySelectorAll('#sugestoes-table-vol tbody');
  tables.forEach(table => {
      table.innerHTML = html;
  });
}

document.addEventListener("DOMContentLoaded", inscreverVoluntario);

function inscrever(index) {
  let sugestoes = JSON.parse(localStorage.getItem("sugestoes"));

  sugestoes[index].inscrito = true;

  localStorage.setItem("sugestoes", JSON.stringify(sugestoes));

  let button = document.getElementById('inscreverBotao' + index);
  let text = document.getElementById('inscritoIniciativa' + index);

  button.style.display = 'none'; 
  text.classList.add('inscrito-text'); 
  text.style.display = 'inline'; 
}

<<<<<<< HEAD
document.onload = inscreverVoluntario();

*/
=======
inscrever();
>>>>>>> 53f2b02f02ead27870737780cd1a32e9fa8e2c3a
