document.addEventListener('DOMContentLoaded', function() {
    pieGraph();
    barGraph();
});

function pieGraph() {
    let storedMateriais = localStorage.getItem("material");
    let materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];
    
    // Calcular a soma das quantidades para cada tipo de material
    let tipos = {};
    materiaisArray.forEach(function(material) {
        let quantidade = parseInt(material.quantidade, 10); // Certificar que quantidade é um número
        if (!tipos[material.tipo]) {
            tipos[material.tipo] = 0;
        }
        tipos[material.tipo] += quantidade;
    });

    // Preparar os dados para o gráfico de pizza
    let labels = Object.keys(tipos);
    let data = Object.values(tipos);

    // Criar o gráfico de pizza
    let ctx = document.getElementById('pieGraph').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade de Materiais por Tipo',
                data: data,
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                    'rgba(153, 209, 64, 1)',
                    'rgba(255, 112, 235, 1)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                    'rgba(153, 209, 64, 1)',
                    'rgba(255, 112, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}


function barGraph() {
    let storedIniciativas = localStorage.getItem("iniciativas");
    let iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];
    
    // Função para contar iniciativas por estado
    function contarPorEstado(array, estado) {
        return array.filter(item => item.estado === estado).length;
    }

    let iniciativasAceites = contarPorEstado(iniciativasArray, "Aceite");
    let iniciativasRecusadas = contarPorEstado(iniciativasArray, "Recusado");

    let ctx = document.getElementById('barGraph').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Iniciativas Aceites', 'Iniciativas Recusadas'],
            labels: ['Iniciativas'], // Apenas um rótulo principal
            datasets: [
                {
                    label: 'Iniciativas Aceites',
                    data: [iniciativasAceites],
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                },
                {
                    label: 'Iniciativas Recusadas',
                    data: [iniciativasRecusadas],
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1, // Força os ticks a serem incrementos de 1
                        callback: function(value) { return Number.isInteger(value) ? value : ''; } // Filtra para mostrar apenas inteiros
                    }
                }
            }
        }
    });
}

