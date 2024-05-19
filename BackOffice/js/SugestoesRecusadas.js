document.addEventListener('DOMContentLoaded', function () {

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#SugestoesRecusadas-table tbody');
  
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
            <td>
              <div class="btn-group">
                <button class="btn btn-success btn-circle ver-mais"><i class="fa-solid fa-plus"></i></button>
              </div>
            </td>
          `;
  
          tableBody.appendChild(row);
  
          // Criação das linhas expansíveis
          let expandableRow = document.createElement('tr');
          expandableRow.classList.add('expandable-body');
          expandableRow.innerHTML = `
            <td colspan="7">
              <p>
                <strong>Motivo:</strong> ${item.motivo}
              </p>
            </td>
          `;
  
          tableBody.appendChild(expandableRow);
        });
      })
      .catch(error => console.error('Erro:', error));
  });
  
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('ver-mais')) {
      const expandableRow = e.target.closest('tr').nextElementSibling;
      expandableRow.classList.toggle('show');
    }
  });