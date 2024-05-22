
//comeca aqui
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar os dados do localStorage
    var storedMateriais = localStorage.getItem("material");
    var materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];
    

    // Selecionar a tabela onde os dados serão inseridos
    var table = document.querySelector('.materialTable tbody');

    // Limpar qualquer conteúdo existente na tabela

    // Iterar sobre os dados e inseri-los na tabela
    materiaisArray.forEach(function(material, index) {
        var novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${index + 1}</td>
            <td>${material.nome}</td>
            <td class="descricao">${material.descricao}</td>
            <td><span class="badge bg-success">${material.quantidade}</span></td>
        `;
        table.appendChild(novaLinha);
    });
});


function ArmazenarMaterial(event) {

    event.preventDefault();
    var nome = document.getElementById("nome_material_adicionar").value;
    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade_material_adicionar").value;

    var dadosMaterial = {
        nome: nome,
        descricao: descricao,
        quantidade: quantidade
    };

    var storedMateriais = localStorage.getItem("material");
    var materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];
    materiaisArray.push(dadosMaterial);

    localStorage.setItem("material", JSON.stringify(materiaisArray));

    // Atualizar a tabela após armazenar a iniciativa

    alert("Material adicionado com sucesso");

    window.location.href = "../views/GestaoInventario.html";
    atualizarTabela();

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
    materiaisArray.forEach(function(material, index) {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${material.nome}</td>
            <td class="descricao">${material.descricao}</td>
            <td><span class="badge bg-success">${material.quantidade}</span></td>
        `;
        table.appendChild(newRow);
    });
}