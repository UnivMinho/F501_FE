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
    let storedSugestoesRec = localStorage.getItem("sugestoesrec");
    let iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];
    let sugestoesRecArray = storedSugestoesRec ? JSON.parse(storedSugestoesRec) : [];
    
    // Função para contar iniciativas por mês
    function contarPorMes(array) {
        let contagem = {};
        array.forEach(function(item) {
            let mes = new Date(item.data).getMonth(); // Assume que a data está no formato correto
            if (!contagem[mes]) {
                contagem[mes] = 0;
            }
            contagem[mes]++;
        });
        return contagem;
    }

    let iniciativasPorMes = contarPorMes(iniciativasArray);
    let sugestoesRecPorMes = contarPorMes(sugestoesRecArray);

    let labels = [...new Set([...Object.keys(iniciativasPorMes), ...Object.keys(sugestoesRecPorMes)])];
    labels.sort((a, b) => a - b);

    let dataAgendadas = labels.map(label => iniciativasPorMes[label] || 0);
    let dataRecusadas = labels.map(label => sugestoesRecPorMes[label] || 0);

    let ctx = document.getElementById('barGraph').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.map(mes => new Date(0, mes).toLocaleString('default', { month: 'long' })),
            datasets: [
                {
                    label: 'Iniciativas Agendadas',
                    data: dataAgendadas,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                },
                {
                    label: 'Iniciativas Recusadas',
                    data: dataRecusadas,
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
