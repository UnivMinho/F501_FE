
//comeca aqui
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar os dados do localStorage
    let storedMateriais = localStorage.getItem("material");
    let materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];
    

    // Selecionar a tabela onde os dados serão inseridos
    let table = document.querySelector('.materialTable tbody');

    // Limpar qualquer conteúdo existente na tabela

    // Iterar sobre os dados e inseri-los na tabela
    materiaisArray.forEach(function(material, index) {
        let novaLinha = document.createElement('tr');
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
    let nome = document.getElementById("nome_material_adicionar").value;
    let tipo = document.getElementById("tipo_material").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade_material_adicionar").value;

    let dadosMaterial = {
        nome: nome,
        tipo: tipo,
        descricao: descricao,
        quantidade: quantidade
    };

    let storedMateriais = localStorage.getItem("material");
    let materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];
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
    let storedMateriais = localStorage.getItem("material");
    let materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];

    // Selecionar a tabela onde os dados serão inseridos
    let table = document.querySelector('.materialTable tbody');

    // Limpar qualquer conteúdo existente na tabela
    table.innerHTML = '';

    // Iterar sobre os dados e inseri-los na tabela
    materiaisArray.forEach(function(material, index) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${material.nome}</td>
            <td class="descricao">${material.descricao}</td>
            <td><span class="badge bg-success">${material.quantidade}</span></td>
        `;
        table.appendChild(newRow);
    });
}
