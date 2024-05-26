function showDataIniciativas(){ 

    let iniciativas;
  if(localStorage.getItem("iniciativas")==null){
    iniciativas = [];
  }
  else{
    iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
  }

    let html = "";
  
    iniciativas.forEach(function(element, index) {
      html += "<tr>";
      html += "<td>" + element.tipo + "</td>";
      html += "<td>" + element.descricao + "</td>";
      html += "<td>" + element.local + "</td>";
      html += "<td>" + element.data + "</td>";
      html += "<td>" + element.emailResp + "</td>";
      html += "<td>" + element.contactoResp + "</td>";
      html += "<td>" + element.estado + "</td>";
      html += "</tr>"  
    });
  
    document.querySelector("#sugestoes-table2 tbody").innerHTML = html;
  }
  

  function showDataIniciativasVoluntarios(){ 

    let iniciativas = filterIniciativas("Aceite");

    let html = "";
  
    iniciativas.forEach(function(element) {
        html += '<tr>';
        html += '<td>' + element.tipo + '</td>';
        html += '<td>' + element.local + '</td>';
        html += '<td>' + element.data + '</td>';
        html += '<td>';
        if (element.inscrito) {
            html += '<span id="inscritoText' + element.id + '" class="inscrito-text">Inscrito</span>';
        } else {
            html += '<button id="inscreverBotao' + element.id + '" onclick="inscrever(' + element.id + ')" class="voluntarios-botao">Inscrever</button>';
            html += '<span id="inscritoIniciativa' + element.id + '" style="display: none;">Inscrito</span>';
        }
        html += '</td>';
        html += '</tr>';
    });
  
    document.querySelector("#sugestoes-table-vol tbody").innerHTML = html;
  }

  function filterIniciativas(estado){
    let iniciativas;
    if(localStorage.getItem("iniciativas")==null){
      iniciativas = [];
    }
    else{
      iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
    }
  
    let iniciativasFiltradas = [];
  
    for(let i = 0; i < iniciativas.length; i++){
      if(iniciativas[i].estado == estado){
        iniciativasFiltradas.push(iniciativas[i]);
      }
    }
  
    return iniciativasFiltradas;
  }



  
   /* DEIXAR ISTO PARA O FIM
  function inscrever(index) {
    let iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
  
    iniciativas[index].inscrito = true;
  
    localStorage.setItem("sugestoes", JSON.stringify(sugestoes));
  
    let button = document.getElementById('inscreverBotao' + index);
    let text = document.getElementById('inscritoIniciativa' + index);
  
    button.style.display = 'none'; 
    text.classList.add('inscrito-text'); // Adiciona a classe CSS
    text.style.display = 'inline'; 
  }
  
  document.onload = inscreverVoluntario();
  */