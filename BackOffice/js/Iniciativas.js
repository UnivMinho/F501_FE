document.addEventListener('DOMContentLoaded', function () {

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#iniciativas-table tbody');
  
        data.forEach(item => {
     
          let row = document.createElement('tr');
          row.setAttribute('data-widget', 'expandable-table');
          row.setAttribute('aria-expanded', 'false');
  
          row.innerHTML = `
            <td>${item.iniciativa}</td>
            <td>${item.local}</td>
            <td>${item.data}</td>
            <td>${item.vagas}</td>
            <td>${item.tipo}</td>
            <td>${item.email}</td>
          `;
  
          tableBody.appendChild(row);
  
          let expandableRow = document.createElement('tr');
          expandableRow.classList.add('expandable-body');
          expandableRow.innerHTML = `
            <td colspan="6">
              <p>
                <strong>Descrição:</strong> ${item.descricao}
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

      var storedIniciativas = localStorage.getItem("iniciativas");
      var iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];
      iniciativasArray.push(dadosIniciativa);

      localStorage.setItem("iniciativas", JSON.stringify(iniciativasArray));
  }
