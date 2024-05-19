document.addEventListener('DOMContentLoaded', function () {

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#VerSugestoes-table tbody');
  
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
            <td>
              <div class="btn-group">
                  <button class="btn btn-success btn-circle" onclick="aprovarIniciativa('${item.iniciativa}')"><i class="fas fa-check"></i></button>
                  <button class="btn btn-danger btn-circle" onclick="rejeitarIniciativa('${item.iniciativa}')"><i class="fas fa-trash"></i></button>
              </div>
            </td>
          `;
  
          tableBody.appendChild(row);
  
          
          let expandableRow = document.createElement('tr');
          expandableRow.classList.add('expandable-body');
          expandableRow.innerHTML = `
            <td colspan="6">
              <p>
                <strong>Descrição:</strong> ${item.descricao}
                <button class="btn btn-sm btn-success ver-mais" onclick="toggleDescription(this)">Ver mais</button>
              </p>
            </td>
          `;
  
          tableBody.appendChild(expandableRow);
        });
      })
      .catch(error => console.error('Erro:', error));
  });
  
  function toggleDescription(button) {
    const expandableRow = button.closest('tr').nextElementSibling;
    expandableRow.classList.toggle('show');
  }
  
  function aprovarInitiata(id) {
    console.log(`Iniciativa ${id} aprovada.`);
    // Adicionar codigo de aprovação
  }
  
  function rejeitarIniciativa(id) {
    console.log(`Iniciativa ${id} removida.`);
    // Adicionar codigo de rejeição
  }
  