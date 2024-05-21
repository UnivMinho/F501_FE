/*
// Função para adicionar um novo material à tabela

function adicionarMaterial(nome, quantidade) {
    // Verifica se o material já existe na tabela
    var existente = document.querySelector('#materialTable tbody tr[data-nome="' + nome + '"]');
    if (existente) {
        // Atualiza a quantidade se o material já existir
        var quantidadeAtual = parseInt(existente.querySelector('.quantidade').innerText);
        existente.querySelector('.quantidade').innerText = quantidadeAtual + quantidade;
    } else {
        // Adiciona uma nova linha na tabela
        var tbody = document.querySelector('#materialTable tbody');
        var newRow = document.createElement('tr');
        newRow.setAttribute('data-nome', nome);
        newRow.innerHTML = `
            <td>${tbody.children.length + 1}.</td>
            <td>${nome}</td>
            <td class="quantidade">${quantidade}</td>
            <td>
                <div class="progress progress-xs">
                    <div class="progress-bar bg-primary" style="width: ${quantidade}"></div>
                </div>
            </td>
            <td><span class="badge bg-primary">${quantidade}%</span></td>
        `;
        tbody.appendChild(newRow);
    }
}

async function fetchMateriais() {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro a devolver materiais');
        }
        let materiais = await response.json();
        materiais.forEach(material => {
            adicionarMaterial(material.nome, material.quantidade);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

document.getElementById('adicionarMaterial').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    var nome = document.getElementById('nome_material_adicionar').value;
    var quantidade = parseInt(document.getElementById('quantidade_material_adicionar').value);
    
    // Adiciona o material à tabela e atualiza a barra de progresso
    adicionarMaterial(nome, quantidade);
});

// Chama a função para buscar materiais quando a página carrega
document.addEventListener('DOMContentLoaded', fetchMateriais);
*/


//comeca aqui
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar os dados do localStorage
    var storedMateriais = localStorage.getItem("material");
    var materiaisArray = storedMateriais ? JSON.parse(storedMateriais) : [];
    

    // Selecionar a tabela onde os dados serão inseridos
    var table = document.querySelector('.materialTable tbody');

    // Limpar qualquer conteúdo existente na tabela
    table.innerHTML = '';

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