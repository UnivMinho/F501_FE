
//comeca aqui
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar os dados do localStorage
    let storedMateriais = localStorage.getItem("material");
    let materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];
    

    // Selecionar a tabela onde os dados serão inseridos
    let table = document.querySelector('.materialTable tbody');

   

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
    let quantidade = parseInt(document.getElementById("quantidade_material_adicionar").value, 10);

    let dadosMaterial = {
        nome: nome,
        tipo: tipo,
        descricao: descricao,
        quantidade: quantidade
    };

    let storedMateriais = localStorage.getItem("material");
    let materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];

    let materialExistente = materiaisArray.find(material => material.nome === nome);
    if (materialExistente) {
        // Atualiza a quantidade do material existente
        materialExistente.quantidade += quantidade;
    } else {
        // Adiciona o novo material ao array
        materiaisArray.push(dadosMaterial);
    }

    localStorage.setItem("material", JSON.stringify(materiaisArray));

    // Atualizar a tabela após armazenar a iniciativa

    alert("Material adicionado com sucesso");

    window.location.href = "../views/GestaoInventario.html";
    atualizarTabela();

    return false;
}

function UsarMateriais() {
    // Seleciona todos os checkboxes marcados
    let checkboxes = document.querySelectorAll('input[name="materiais"]:checked');

    // Recupera os materiais da localStorage
    let storedMateriais = localStorage.getItem("material");
    let materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];

    checkboxes.forEach(function(checkbox) {
        let nome = checkbox.value;
        let quantidadeUsada = parseInt(document.getElementById(`quantidade-${nome}`).value, 10);

        let materialExistente = materiaisArray.find(material => material.nome === nome);
        if (materialExistente) {
            // Subtrai a quantidade usada do material existente
            materialExistente.quantidade -= quantidadeUsada;

            // Garante que a quantidade não seja negativa
            if (materialExistente.quantidade < 0) {
                materialExistente.quantidade = 0;
            }
        }
    });

    localStorage.setItem("material", JSON.stringify(materiaisArray));

    atualizarTabela();
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
