function ArmazenarDoacao() {

    let valor = parseFloat(document.getElementById("valor").value);
    let NomeCartao = document.getElementById("NomeCartao").value;
    let ApelidoCartao = document.getElementById("ApelidoCartao").value;
    let nrCartao = document.getElementById("nrCartao").value;
    let cvc = document.getElementById("cvc").value;
    let validade = document.getElementById("validade").value;
    let Nome = document.getElementById("Nome").value;
    let Apelido = document.getElementById("Apelido").value;
    let email = document.getElementById("email").value;

    // Obter doações existentes do localStorage ou inicializar um array vazio
    let doacoes = JSON.parse(localStorage.getItem("doacoes") || '[]');

    // Adicionar a nova doação ao array
    doacoes.push({ 
        valor: valor,
        NomeCartao: NomeCartao,
        ApelidoCartao: ApelidoCartao,
        nrCartao: nrCartao,
        cvc: cvc,
        validade: validade,
        Nome: Nome,
        Apelido: Apelido,
        email: email 
    });

    let fundoManeio = parseFloat(localStorage.getItem("fundoManeio") || 0);
    fundoManeio += valor;
    localStorage.setItem("fundoManeio", fundoManeio);

    // Armazenar o array atualizado de doações no localStorage
    localStorage.setItem("doacoes", JSON.stringify(doacoes));

    alert("Doação realizada com sucesso");
    window.location.reload();
    
    // Retornar false para impedir o envio do formulário
    return false;
}

function showDataDoacoes() {
    let doacoes = JSON.parse(localStorage.getItem("doacoes"));

    let html = "";

    doacoes.forEach(function(doacao) {
        html += "<tr>";
        html += "<td>" + doacao.valor + "</td>";
        html += "<td>" + doacao.NomeCartao + "</td>";
        html += "<td>" + doacao.ApelidoCartao + "</td>";
        html += "<td>" + doacao.nrCartao + "</td>";
        html += "<td>" + doacao.cvc + "</td>";
        html += "<td>" + doacao.validade + "</td>";
        html += "<td>" + doacao.Nome + "</td>";
        html += "<td>" + doacao.Apelido + "</td>";
        html += "<td>" + doacao.email + "</td>";
        html += "</tr>";
    });

    document.querySelector("#doacoes-table tbody").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function() {
    showDataDoacoes();
});









document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addInitiativeForm");
    
    const pendingTable = document.getElementById("pendingacceptedTable");
    const acceptedTable = document.getElementById("acceptedacceptedTable");
    const rejectedTable = document.getElementById("rejectedacceptedTable");
  
    const initiativesData = JSON.parse(localStorage.getItem("initiatives")) || [];
  
    // Função para renderizar as iniciativas na tabela correspondente
    function renderInitiatives() {
      pendingTable.innerHTML = "";
      acceptedTable.innerHTML = "";
      rejectedTable.innerHTML = "";
  
      initiativesData.forEach((initiative, index) => {
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
              <td>${index + 1}</td>
              <td>${initiative.nome}</td>
              <td>${initiative.email}</td>
              <td>${initiative.data}</td>
              <td>${initiative.hora_inicio}</td>
              <td>${initiative.hora_fim}</td>
              <td>${initiative.tipo}</td>
              <td><img src="${initiative.imagem}" alt="${initiative.nome}" style="width: 50px; height: auto;"></td>
              <td>${initiative.local}</td>
              <td>${initiative.descricao}</td>
              <td>
                  ${initiative.estado === 'pendente' ? `
                  <button class="btn btn-success btn-sm" onclick="acceptInitiative(${index})">Aceitar</button>
                  <button class="btn btn-danger btn-sm" onclick="rejectInitiative(${index})">Rejeitar</button>
                  ` : ''}
              </td>
          `;
  
          //Mostrar a lista de voluntarios/profissionais/materiais nas iniciativas que forem aceites 
          if(initiative.estado === 'aceite'){
  
            // Adiciona evento de clique para exibir informações adicionais
            newRow.addEventListener("click", function() {
  
            // Remove a linha expandida anteriormente exibida
            const acceptedExpandedRow = acceptedTable.querySelector(".expanded-row");
            if (acceptedExpandedRow) {
              acceptedExpandedRow.parentNode.removeChild(acceptedExpandedRow);
            } 
  
            // Cria uma nova linha expandida
            const expandedRow = document.createElement("tr");
            expandedRow.classList.add("expanded-row");
            expandedRow.innerHTML = `
              <td colspan="10">
                <h6>Voluntários:</h6>
                <ul>
                  
                </ul>
                <h6>Profissionais:</h6>
                <ul>
                  
                </ul>
                <h6>Materiais:</h6>
                <ul>
                  
                </ul>
              </td>
            `;
          
            /* <td colspan="10">
              <h4>Voluntários:</h4>
                  <ul>
                    ${initiative.volunteers.map(volunteer => `<li>${volunteer}</li>`).join("")}
                  </ul>
                  <h4>Profissionais:</h4>
                  <ul>
                    ${initiative.professionals.map(professional => `<li>${professional}</li>`).join("")}
                  </ul>
                  <h4>Materiais:</h4>
                  <ul>
                    ${initiative.materials.map(material => `<li>${material}</li>`).join("")}
                  </ul>
                </td>
            */
            // Insere a linha expandida após a linha clicada
            newRow.parentNode.insertBefore(expandedRow, newRow.nextSibling);
        });
        }
          //Load das tabelas
          if (initiative.estado === 'pendente') {
              pendingTable.appendChild(newRow);
          } else if (initiative.estado === 'aceite') {
              acceptedTable.appendChild(newRow);
          } else if (initiative.estado === 'rejeitado') {
              rejectedTable.appendChild(newRow);
          }
      });
    }
  
       // Função para aceitar iniciativa
       window.acceptInitiative = function(index) {
        initiativesData[index].estado = 'aceite';
        localStorage.setItem("initiatives", JSON.stringify(initiativesData));
        renderInitiatives();
      };
  
        // Função para rejeitar iniciativa
      window.rejectInitiative = function(index) {
        initiativesData[index].estado = 'rejeitado';
        localStorage.setItem("initiatives", JSON.stringify(initiativesData));
        renderInitiatives();
      };
  
      // Renderizar iniciativas ao carregar a página
      renderInitiatives();
  
      form.addEventListener("submit", function (event) {
          event.preventDefault();
  
          // Obter os valores dos campos do formulário
          const nome = form.nome.value;
          const email = form.email.value;
          const data = form.data.value;
          const hora_inicio = form.hora_inicio.value;
          const hora_fim = form.hora_fim.value;
          const tipo = form.tipo.value;
          const imagem = form.imagem.value;
          const local = form.local.value;
          const descricao = form.descricao.value;
  
          // Adicionar a nova iniciativa aos dados
          const newInitiative = { nome, email, data, hora_inicio, hora_fim, tipo, imagem, local, descricao, estado: 'pendente' };
          initiativesData.push(newInitiative);
  
          // Atualizar os dados no localStorage
          localStorage.setItem("initiatives", JSON.stringify(initiativesData));
  
          // Renderizar iniciativas na tabela
          renderInitiatives();
  
          // Limpar os campos do formulário após adicionar a iniciativa
          form.reset();
  
          // Fechar o modal após adicionar a iniciativa
          $('#addInitiativeModal').modal('hide');
      });
  });