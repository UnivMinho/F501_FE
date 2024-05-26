document.addEventListener('DOMContentLoaded', function() {
  // Recupera os materiais da localStorage
  let materiais = JSON.parse(localStorage.getItem('material')) || [];
  
  // Seleciona o div onde os materiais serão inseridos
  let materialListDiv = document.getElementById('material-list');

  // Itera sobre os materiais e cria os elementos HTML
  materiais.forEach(function(material) {
      // Cria um container para cada material
      let materialContainer = document.createElement('div');
      materialContainer.classList.add('material-item');
      
      // Cria a checkbox para o material
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `material-${material.nome}`;
      checkbox.name = 'materiais';
      checkbox.value = material.nome;

      let label = document.createElement('label');
      label.htmlFor = `material-${material.nome}`;
      label.textContent = `${material.nome} (Disponível: ${material.quantidade})`;
      
      // Cria o input para a quantidade
      let quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.id = `quantidade-${material.nome}`;
      quantityInput.name = `quantidade-${material.nome}`;
      quantityInput.min = '0';
      quantityInput.placeholder = 'Quantidade';
      
      // Adiciona a checkbox, o label e o input ao container do material
      materialContainer.appendChild(checkbox);
      materialContainer.appendChild(label);
      materialContainer.appendChild(quantityInput);
      
      // Adiciona o container do material ao div principal
      materialListDiv.appendChild(materialContainer);
  });
});




function showDataIniciativas(){

  const iniciativas = filterIniciativas("Aceite");
  
  let html = "";

  iniciativas.forEach(function(element) {
    html += "<tr>";
    html += "<td>" + element.iniciativa + "</td>";
    html += "<td>" + element.local + "</td>";
    html += "<td>" + element.data + "</td>";
    html += "<td>" + element.vagas + "</td>";
    html += "<td>" + element.tipo + "</td>";
    html += "<td>" + element.estado + "</td>";
    html += 
      '<td></button><button onclick="updateData(' +
      element.id +
      ')" class="fa fa-edit" style="margin-left:10px; background-color:yellow;"></button></td>';
      html += "</tr>";
  });

  document.querySelector("#iniciativas-table tbody").innerHTML = html;
}

function showPopup(){
  document.getElementById('popup-background').style.display = 'flex';
}

function hidePopup(){
  document.getElementById('popup-background').style.display = 'none';
}

function updateData(id){
  // Recupera as iniciativas do localStorage
  let iniciativas = JSON.parse(localStorage.getItem("iniciativas")) || [];

  let index = iniciativas.findIndex(iniciativa => iniciativa.id === id);

  let form = document.getElementById("form-popup");

  if(index !== -1){
      let iniciativaSelecionada = iniciativas[index];

      // Preenche o formulário com os detalhes da iniciativa
      form.elements["iniciativa"].value = iniciativaSelecionada.iniciativa;
      form.elements["descricao"].value = iniciativaSelecionada.descricao;
      form.elements["local"].value = iniciativaSelecionada.local;
      form.elements["data"].value = iniciativaSelecionada.data;
      form.elements["vagas"].value = iniciativaSelecionada.vagas;
      form.elements["budget"].value = iniciativaSelecionada.budget;
      form.elements["tipo"].value = iniciativaSelecionada.tipo;

      showPopup();

      form.addEventListener("submit", function(event) {
          event.preventDefault();

          // Obtém os novos detalhes da iniciativa a partir do formulário
          let novosDetalhes = {
              id: id,
              iniciativa: form.elements["iniciativa"].value,
              descricao: form.elements["descricao"].value,
              local: form.elements["local"].value,
              data: form.elements["data"].value,
              vagas: form.elements["vagas"].value,
              budget: form.elements["budget"].value,
              tipo: form.elements["tipo"].value,
              estado: iniciativaSelecionada.estado,
              contactoResp: iniciativaSelecionada.contactoResp,
              emailResp: iniciativaSelecionada.emailResp,
              materiais: iniciativaSelecionada.materiais ? [...iniciativaSelecionada.materiais] : []
          };

          let checkboxes = document.querySelectorAll('input[name="materiais"]:checked');
            checkboxes.forEach(function(checkbox) {
                let nome = checkbox.value;
                let quantidadeUsada = parseInt(document.getElementById(`quantidade-${nome}`).value, 10);

                // Verifica se o material já existe nos materiais da iniciativa
                let materialExistente = novosDetalhes.materiais.find(material => material.nome === nome);

                if (materialExistente) {
                    // Adiciona a quantidade à existente
                    materialExistente.quantidade += quantidadeUsada;
                } else {
                    // Adiciona o novo material à lista
                    novosDetalhes.materiais.push({ nome: nome, quantidade: quantidadeUsada });
                }
            });
          // Atualiza a iniciativa no localStorage
          iniciativas = iniciativas.map(item => item.id === id ? novosDetalhes : item);

          // Atualiza o localStorage com as iniciativas atualizadas
          localStorage.setItem("iniciativas", JSON.stringify(iniciativas));

          showDataIniciativas();
          hidePopup();
          window.location.reload();

      }, { once: true }); // Adiciona o evento somente uma vez para evitar múltiplos handlers
  }
}

function filterIniciativas(estado){
  let iniciativas;
  if(localStorage.getItem("iniciativas")==null){
    iniciativas = [];
  }else{
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

function darID() {
  let id = localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id")) : 0;
  id += 1;
  localStorage.setItem("id", JSON.stringify(id));
  return id;
}

function AddDataBackOffice(event){
  event.preventDefault();

  let iniciativa = document.getElementById("iniciativa").value;
  let local = document.getElementById("local").value;
  let data = document.getElementById("data").value;
  let vagas = document.getElementById("vagas").value;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let contactoResp = "";
  let emailResp = "";
  let budget = document.getElementById("budget").value;
  let estado = "Aceite";
  let id = darID();

  let fundoManeio = parseFloat(localStorage.getItem("fundoManeio")) || 0;

  if(budget < 0 || budget > fundoManeio){
    alert("Orçamento selecionado inválido");
    return;
  }

  fundoManeio = fundoManeio - budget;

  localStorage.setItem("fundoManeio", fundoManeio);

  let iniciativas;
  if(localStorage.getItem("iniciativas")==null){
    iniciativas = [];
  }
  else{
    iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
  }

  let materiaisUsados = [];
    let checkboxes = document.querySelectorAll('input[name="materiais"]:checked');
    checkboxes.forEach(function(checkbox) {
        let nome = checkbox.value;
        let quantidadeUsada = parseInt(document.getElementById(`quantidade-${nome}`).value, 10);
        materiaisUsados.push({ nome: nome, quantidade: quantidadeUsada });
    });

  iniciativas.push({
    id : id,
    iniciativa : iniciativa,
    descricao: descricao,
    local : local,
    data : data,
    vagas : vagas,
    tipo : tipo,
    contactoResp : contactoResp,
    emailResp : emailResp,
    estado : estado,
    budget : budget,
    materiais: materiaisUsados
  });

  window.location.href = "../views/Iniciativas.html";

  localStorage.setItem("iniciativas", JSON.stringify(iniciativas));
  showDataIniciativas();
  document.getElementById("iniciativa").value = "";
  document.getElementById("local").value = "";
  document.getElementById("data").value = "";
  document.getElementById("vagas").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("lider").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("estado").value = "";
  document.getElementById("contactoResp").value = "";
  document.getElementById("emailResp").value = "";
  document.getElementById("budget").value = "";
  
}

function AddDataSugestoes(){

  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let local = document.getElementById("local").value;
  let data = document.getElementById("dataEvento").value;
  let email = document.getElementById("emailResp").value;
  let contacto = document.getElementById("contactoResp").value;
  let iniciativa = "";
  let vagas = "";
  let budget = "";
  let estado = "Pendente";
  let id = darID();


  let sugestoes;
  if(localStorage.getItem("iniciativas")==null){
    sugestoes = [];
  }
  else{
    sugestoes = JSON.parse(localStorage.getItem("iniciativas"));
  }

  sugestoes.push({
    id : id,
    iniciativa : iniciativa,
    descricao: descricao,
    local : local,
    data : data,
    vagas : vagas,
    tipo : tipo,
    contactoResp : contacto,
    emailResp : email,
    estado : estado,
    budget : budget
  });

  localStorage.setItem("iniciativas", JSON.stringify(sugestoes));
  showDataSugestoes();
  document.getElementById("tipo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("local").value = "";
  document.getElementById("dataEvento").value = "";
  document.getElementById("emailResp").value = "";
  document.getElementById("contactoResp").value = "";
  document.getElementById("estado").value = "";
  document.getElementById("budget").value = "";
  document.getElementById("iniciativa").value = "";
  document.getElementById("vagas").value = "";
}

function aceitarSugestao(id) {

  // Recupera as iniciativas do localStorage
  let iniciativas = JSON.parse(localStorage.getItem("iniciativas")) || [];

  let index = iniciativas.findIndex(iniciativa => iniciativa.id === id);

  let form = document.getElementById("form-popup-sugestoes");

  if(index !== -1){
      let iniciativaSelecionada = iniciativas[index];

      // Preenche o formulário com os detalhes da iniciativa
      form.elements["descricao"].value = iniciativaSelecionada.descricao;
      form.elements["local"].value = iniciativaSelecionada.local;
      form.elements["data"].value = iniciativaSelecionada.data;
      form.elements["tipo"].value = iniciativaSelecionada.tipo;

      showPopupSugestoes();

      form.addEventListener("submit", function(event) {
          event.preventDefault();

          // Obtém os novos detalhes da iniciativa a partir do formulário
          let novosDetalhes = {
              id: id,
              iniciativa: form.elements["iniciativa"].value,
              descricao: form.elements["descricao"].value,
              local: form.elements["local"].value,
              data: form.elements["data"].value,
              vagas: form.elements["vagas"].value,
              budget: form.elements["budget"].value,
              tipo: form.elements["tipo"].value,
              estado: "Aceite",
              contactoResp: iniciativaSelecionada.contactoResp,
              emailResp: iniciativaSelecionada.emailResp,
              materiais: iniciativaSelecionada.materiais ? [...iniciativaSelecionada.materiais] : []
          };

          let checkboxes = document.querySelectorAll('input[name="materiais"]:checked');
            checkboxes.forEach(function(checkbox) {
                let nome = checkbox.value;
                let quantidadeUsada = parseInt(document.getElementById(`quantidade-${nome}`).value, 10);

                // Verifica se o material já existe nos materiais da iniciativa
                let materialExistente = novosDetalhes.materiais.find(material => material.nome === nome);

                if (materialExistente) {
                    // Adiciona a quantidade à existente
                    materialExistente.quantidade += quantidadeUsada;
                } else {
                    // Adiciona o novo material à lista
                    novosDetalhes.materiais.push({ nome: nome, quantidade: quantidadeUsada });
                }
            });

          // Atualiza a iniciativa no localStorage
          iniciativas = iniciativas.map(item => item.id === id ? novosDetalhes : item);

          // Atualiza o localStorage com as iniciativas atualizadas
          localStorage.setItem("iniciativas", JSON.stringify(iniciativas));

          showDataSugestoes();
          hidePopupSugestoes();
          window.location.reload();

      }, { once: true }); // Adiciona o evento somente uma vez para evitar múltiplos handlers
  }
}

function showPopupSugestoes(){
  document.getElementById('popup-background-sugestoes').style.display = 'flex';
}

function hidePopupSugestoes(){
  document.getElementById('popup-background-sugestoes').style.display = 'none';
}

function recusarSugestao(id) {
  let iniciativas = JSON.parse(localStorage.getItem("iniciativas")) || [];

  let index = iniciativas.findIndex(iniciativa => iniciativa.id === id);
  if (index !== -1) {
    iniciativas[index].estado = "Recusado";
  
  localStorage.setItem("iniciativas", JSON.stringify(iniciativas));
  
  window.location.href = "../views/Iniciativas.html";
  showDataIniciativas();
  }
}

function showDataSugestoes(){

  const iniciativas = filterIniciativas("Pendente");~
  console.log(iniciativas);
    
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
      html += 
      '<td><button onclick="aceitarSugestao(' +
      element.id + 
      ')" class="fa fa-check" style="margin-left:10px; background-color:lightgreen;"></button><button onclick="recusarSugestao(' +
      element.id +
      ')" class="fa fa-trash" style="margin-left:10px; background-color:#FF9999;"></button></td>';
      html += "</tr>";
    });
  
  const tables = document.querySelectorAll("#sugestoes-table tbody, #sugestoes-table2 tbody");

  tables.forEach(table =>{
    table.innerHTML = html;
  });
}

function showDataSugestoesRec(){

  const iniciativas = filterIniciativas("Recusado");
    
  let html = "";
  
  iniciativas.forEach(function(element) {
    html += "<tr>";
    html += "<td>" + element.tipo + "</td>";
    html += "<td>" + element.local + "</td>";
    html += "<td>" + element.data + "</td>";
    html += "<td>" + element.descricao + "</td>";
    html += "<td>" + element.emailResp + "</td>";
    html += "<td>" + element.contactoResp + "</td>";
    html += 
      '<td><button onclick="recuperarSugestao(' +
      element.id + 
      ')" class="fa fa-check" style="margin-left:10px; background-color:lightgreen;"></button></td>';
      html += "</tr>";
  });
  
  document.querySelector("#sugestoesrec-table tbody").innerHTML = html;
}

function recuperarSugestao(id) {
  let iniciativas = JSON.parse(localStorage.getItem("iniciativas")) || [];

  let index = iniciativas.findIndex(iniciativa => iniciativa.id === id);
  if (index !== -1) {
    iniciativas[index].estado = "Pendente";
  
  localStorage.setItem("iniciativas", JSON.stringify(iniciativas));
  
  window.location.href = "../views/Iniciativas.html";
  showDataIniciativas();
  }
}


