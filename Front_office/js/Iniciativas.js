
//funcao para ir buscar as iniciativas ao array em localStorage
function showDataIniciativas(){ 
  let iniciativas;
  if(localStorage.getItem("iniciativas") == null){
      iniciativas = [];
  } else {
      iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
  }

  let html = "";
  iniciativas.forEach(function(element) {
      html += "<tr>";
      html += "<td>" + element.tipo + "</td>";
      html += "<td>" + element.descricao + "</td>";
      html += "<td>" + element.local + "</td>";
      html += "<td>" + element.data + "</td>";
      html += "<td>" + element.emailResp + "</td>";
      html += "<td>" + element.contactoResp + "</td>";
      html += "<td>" + element.estado + "</td>";
      html += "</tr>";
  });

  document.querySelector("#sugestoes-table2 tbody").innerHTML = html;
}


//funcao para ir buscar os dados das iniciativas existentes
function showDataIniciativasVoluntarios(){ 
  let iniciativas = filterIniciativas("Aceite");//apenas mostra as aceites

  let html = "";
  iniciativas.forEach(function(element, index) {
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

  document.querySelector("#sugestoes-table-vol tbody").innerHTML = html;
}

//funcao para filtrar as iniciativas e mostrar o estado da mesma
function filterIniciativas(estado){
  let iniciativas;
  if(localStorage.getItem("iniciativas") == null){
      iniciativas = [];
  } else {
      iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
  }

  return iniciativas.filter(iniciativa => iniciativa.estado === estado);
}

//funcao para os voluntarios se inscreverem nas iniciativas
function inscrever(index) {
  let iniciativas = JSON.parse(localStorage.getItem("iniciativas"));

  iniciativas[index].inscrito = true;

  localStorage.setItem("iniciativas", JSON.stringify(iniciativas));

  let button = document.getElementById('inscreverBotao' + index);
  let text = document.getElementById('inscritoIniciativa' + index);

  button.style.display = 'none';
  text.classList.add('inscrito-text');
  text.style.display = 'inline';
  text.textContent = 'Inscrito';  
}

document.addEventListener("DOMContentLoaded", showDataIniciativas);
document.addEventListener("DOMContentLoaded", showDataIniciativasVoluntarios);