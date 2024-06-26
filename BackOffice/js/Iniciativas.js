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
  
 /* let colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];

  let colaboradoresListDiv = document.getElementById('colaboradores-list');


  colaboradores.forEach(function(colab) {

      let colaboradoresContainer = document.createElement('div');
      colaboradoresContainer.classList.add('colaboradores-item');
      
      let checkboxcolab = document.createElement('input');
      checkboxcolab.type = 'checkbox';
      checkboxcolab.id = `colaboradores-${colab.nome}`;
      checkboxcolab.name = 'colaboradores';
      checkboxcolab.value = colab.nome;

      let labelcolab = document.createElement('label');
      labelcolab.htmlFor = `colaboradores-${colab.nome}`;
      labelcolab.textContent = colab.nome;

      let labelrole = document.createElement('label');
      labelrole.htmlFor = `colaboradores-${colab.role}`;
      labelrole.textContent = colab.role;
      
      colaboradoresContainer.appendChild(checkboxcolab);
      colaboradoresContainer.appendChild(document.createTextNode(' '));
      colaboradoresContainer.appendChild(labelcolab);
      colaboradoresContainer.appendChild(document.createTextNode(' - '));
      colaboradoresContainer.appendChild(labelrole);
      
      colaboradoresListDiv.appendChild(colaboradoresContainer);
  });*/

});




//mostrar as iniciativas aceites
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


//editar iniciativa
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
              budget: iniciativaSelecionada.budget,
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

//atribuir id as iniciativas no array
function darID() {
  let id = localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id")) : 0;
  id += 1;
  localStorage.setItem("id", JSON.stringify(id));
  return id;
}


//criar iniciativas
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

    /*let colaboradoresUsados = [];
    let checkboxescolab = document.querySelectorAll('input[name="colaboradores"]:checked');
    checkboxescolab.forEach(function(checkbox) {
      let nome = checkbox.value;
      // Aqui você usa o ID exclusivo definido para cada papel
      let roleUsado = parseInt(document.getElementById(`role-${nome}`).value); 
      colaboradoresUsados.push({ nome: nome, role: roleUsado });
  });*/

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
    materiais: materiaisUsados/*,
    colaboradores: colaboradoresUsados*/
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

  if (index !== -1) {
    let iniciativaSelecionada = iniciativas[index];

    // Preenche o formulário com os detalhes da iniciativa
    form.elements["descricao"].value = iniciativaSelecionada.descricao;
    form.elements["local"].value = iniciativaSelecionada.local;
    form.elements["data"].value = iniciativaSelecionada.data;
    form.elements["tipo"].value = iniciativaSelecionada.tipo;
    form.elements["budget"].value = iniciativaSelecionada.budget;

    showPopupSugestoes();

    form.addEventListener("submit", function(event) {
      event.preventDefault();

      let fundoManeio = parseFloat(localStorage.getItem("fundoManeio")) || 0;
      let budgetInput = form.elements["budget"];
      let budget = parseFloat(budgetInput.value);

      // Loop para validação do orçamento
      while (isNaN(budget) || budget < 0 || budget > fundoManeio) {
        alert("Orçamento valor invalido!");
        hidePopupSugestoes();
        return;
      }

      // Atualiza o fundoManeio
      fundoManeio -= budget;
      localStorage.setItem("fundoManeio", fundoManeio);

      // Atualize os detalhes da iniciativa com o novo orçamento
      let novosDetalhes = {
        id: id,
        iniciativa: form.elements["iniciativa"].value,
        descricao: form.elements["descricao"].value,
        local: form.elements["local"].value,
        data: form.elements["data"].value,
        vagas: form.elements["vagas"].value,
        budget: budget,
        tipo: form.elements["tipo"].value,
        estado: "Aceite",
        contactoResp: iniciativaSelecionada.contactoResp,
        emailResp: iniciativaSelecionada.emailResp,
        materiais: iniciativaSelecionada.materiais ? [...iniciativaSelecionada.materiais] : []
      };

      // Atualiza a iniciativa no localStorage
      iniciativas = iniciativas.map(item => (item.id === id ? novosDetalhes : item));

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

function showDataSugestoes() {
  const iniciativas = filterIniciativas("Pendente");

  const tables = document.querySelectorAll("#sugestoes-table tbody, #sugestoes-table2 tbody");

  // Limpa o conteúdo das tabelas antes de adicionar novas linhas
  tables.forEach(table => {
    table.innerHTML = "";
  });

  iniciativas.forEach(function(element) {
    // Cria uma nova linha para a iniciativa
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${element.tipo}</td>
      <td>${element.local}</td>
      <td>${element.data}</td>
      <td>${element.emailResp}</td>
      <td>${element.contactoResp}</td>
      <td>${element.estado}</td>
      <td>
        <button onclick="aceitarSugestao(${element.id})" class="fa fa-check" style="margin-left:10px; background-color:lightgreen;"></button>
        <button onclick="recusarSugestao(${element.id})" class="fa fa-trash" style="margin-left:10px; background-color:#FF9999;"></button>
      </td>
    `;

    // Adiciona uma classe para identificar a linha expandível
    row.classList.add('expandable-row');

    // Adiciona a linha à tabela
    tables.forEach(table => {
      table.appendChild(row);
    });

    // Cria a linha expansível
    let expandableRow = document.createElement("tr");
    expandableRow.classList.add('expandable-body');
    expandableRow.style.display = 'none';
    expandableRow.innerHTML = `
      <td colspan="7">
        <p><strong>Descrição:</strong> ${element.descricao}</p>
      </td>
    `;

    // Adiciona a linha expansível à tabela
    tables.forEach(table => {
      table.appendChild(expandableRow);
    });
  });
}


function showDataSugestoesRec() {
  const iniciativas = filterIniciativas("Recusado");
  
  const table = document.querySelector("#sugestoesrec-table tbody");

  // Limpa o conteúdo da tabela antes de adicionar novas linhas
  table.innerHTML = "";

  iniciativas.forEach(function(element) {
    // Cria uma nova linha para a iniciativa
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${element.tipo}</td>
      <td>${element.local}</td>
      <td>${element.data}</td>
      <td>${element.emailResp}</td>
      <td>${element.contactoResp}</td>
      <td>
        <button onclick="recuperarSugestao(${element.id})" class="fa fa-check" style="margin-left:10px; background-color:lightgreen;"></button>
      </td>
    `;

    // Adiciona uma classe para identificar a linha expandível
    row.classList.add('expandable-row');

    // Adiciona a linha à tabela
    table.appendChild(row);

    // Cria a linha expansível
    let expandableRow = document.createElement("tr");
    expandableRow.classList.add('expandable-body');
    expandableRow.style.display = 'none';
    expandableRow.innerHTML = `
      <td colspan="6">
        <p><strong>Descrição:</strong> ${element.descricao}</p>
      </td>
    `;

    // Adiciona a linha expansível à tabela
    table.appendChild(expandableRow);
  });
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
