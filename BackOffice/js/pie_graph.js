document.addEventListener('DOMContentLoaded', function() {
    pieGraph();
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
