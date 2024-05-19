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

