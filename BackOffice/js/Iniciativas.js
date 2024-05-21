/* document.addEventListener('DOMContentLoaded', function () {

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#iniciativas-table tbody');
  
        data.forEach(inciativa => {
     
          let row = document.createElement('tr');
          row.setAttribute('data-widget', 'expandable-table');
          row.setAttribute('aria-expanded', 'false');
  
          row.innerHTML = `
            <td>${inciativa.iniciativa}</td>
            <td>${inciativa.local}</td>
            <td>${inciativa.data}</td>
            <td>${inciativa.vagas}</td>
            <td>${inciativa.tipo}</td>
            <td>${inciativa.email}</td>
          `;
  
          tableBody.appendChild(row);
  
          let expandableRow = document.createElement('tr');
          expandableRow.classList.add('expandable-body');
          expandableRow.innerHTML = `
            <td colspan="6">
              <p>
                <strong>Descrição:</strong> ${inciativa.descricao}
                <button class="btn btn-sm btn-success ver-mais">Ver mais</button>
              </p>
            </td>
          `;
  
          tableBody.appendChild(expandableRow);
        });
      })
      .catch(error => console.error('Erro ao buscar os dados:', error));
  });
  
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('ver-mais')) {
      const expandableRow = e.target.closest('tr').nextElementSibling;
      expandableRow.classList.toggle('show');
    }
  }); */

  document.getElementById('form_criarIniciativa').addEventListener('submit', function (event) {
    event.preventDefault();
    criarIniciativa();
});

  function criarIniciativa(){

      var iniciativa = document.getElementById("iniciativa").value;
      var descricao = document.getElementById("descricao").value;
      var local = document.getElementById("local").value;
      var data = document.getElementById("data").value;
      var lider = document.getElementById("lider").value;
      var vagas = document.getElementById("vagas").value;
      var tipo = document.getElementById("tipo").value;

      var dadosIniciativa = {
          iniciativa: iniciativa,
          descricao: descricao,
          local: local,
          data: data,
          lider: lider,
          vagas: vagas,
          tipo: tipo
      };

      var storedIniciativas = localStorage.getinciativa("iniciativas");
      var iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];
      iniciativasArray.push(dadosIniciativa);

      localStorage.setinciativa("iniciativas", JSON.stringify(iniciativasArray));

      alert('Iniciativa criada com sucesso!');
      displayIniciativas();
  }

  document.addEventListener('DOMContentLoaded', function () {
    displayIniciativas();
});

function displayIniciativas() {
    var storedIniciativas = localStorage.getinciativa("iniciativas");
    var iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];

    var tableBody = document.querySelector('#iniciativas-table tbody');
    tableBody.innerHTML = ''; // Limpar a tabela antes de adicionar os dados

    iniciativasArray.forEach(function(iniciativa) {
        var row = document.createElement('tr');
        row.setAttribute('data-widget', 'expandable-table');
        row.setAttribute('aria-expanded', 'false');
        row.innerHTML = `
            <td>${inciativa.iniciativa}</td>
            <td>${inciativa.local}</td>
            <td>${inciativa.data}</td>
            <td>${inciativa.vagas}</td>
            <td>${inciativa.tipo}</td>
            <td>${inciativa.lider}</td>
        `;

        tableBody.appendChild(row);

        let expandableRow = document.createElement('tr');
        expandableRow.classList.add('expandable-body');
        expandableRow.innerHTML = `
            <td colspan="6">
                <p>
                    <strong>Descrição:</strong> ${inciativa.descricao}
                </p>
            </td>
        `;

        tableBody.appendChild(expandableRow);
    });
}