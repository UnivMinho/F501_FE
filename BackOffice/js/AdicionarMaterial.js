
//comeca aqui
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar os dados do localStorage
    var storedMateriais = localStorage.getItem("material");
    var materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];
    

    // Selecionar a tabela onde os dados serão inseridos
    var table = document.querySelector('.materialTable tbody');

    // Limpar qualquer conteúdo existente na tabela

    // Iterar sobre os dados e inseri-los na tabela
    materiaisArray.forEach(function(material) {
        var novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>1</td>
            <td>${material.nome}</td>
            <td class="quantidade">${material.quantidade}</td>
            <td>
                <div class="progress progress-xs">
                    <div class="progress-bar bg-primary" style="width: ${material.quantidade}"></div>
                </div>
            </td>
            <td><span class="badge bg-primary">${material.quantidade}</span></td>
        `;
        table.appendChild(novaLinha);
    });
});


function ArmazenarMaterial() {
    var nome = document.getElementById("nome_material_adicionar").value;
    var tipo = document.getElementById("tipo_material_adicionar").value;
    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade_material_adicionar").value;

    var dadosMaterial = {
        nome: nome,
        tipo: tipo,
        descricao: descricao,
        quantidade: quantidade
    };

    var storedMateriais = localStorage.getItem("material");
    var materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];
    materiaisArray.push(dadosMaterial);

    localStorage.setItem("material", JSON.stringify(materiaisArray));

    // Atualizar a tabela após armazenar a iniciativa

    atualizarTabela();

    alert("Material adicionado com sucesso");

    return false;
}

function atualizarTabela() {
    // Recuperar os dados do localStorage
    var storedMateriais = localStorage.getItem("material");
    var materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];

    // Selecionar a tabela onde os dados serão inseridos
    var table = document.querySelector('.materialTable tbody');

    // Limpar qualquer conteúdo existente na tabela
    table.innerHTML = '';

    // Iterar sobre os dados e inseri-los na tabela
    materiaisArray.forEach(function(material) {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>1</td>
            <td>${material.nome}</td>
            <td class="quantidade">${material.quantidade}</td>
            <td>
                <div class="progress progress-xs">
                    <div class="progress-bar bg-primary" style="width: ${material.quantidade}"></div>
                </div>
            </td>
            <td><span class="badge bg-primary">${material.quantidade}</span></td>
        `;
        table.appendChild(newRow);
    });
}