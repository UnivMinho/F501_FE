function obterParametroDaURL(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

function showDataSaber(tipo) {
    let sugestoes;
    if (localStorage.getItem("sugestoes") == null) {
        sugestoes = [];
    } else {
        sugestoes = JSON.parse(localStorage.getItem("sugestoes"));
    }

    // Filtrar as sugestões com base no tipo
    const sugestoesFiltradas = sugestoes.filter(sugestao => sugestao.tipo === tipo);

    // Atualizar o título da iniciativa
    document.getElementById('titulo-iniciativa').textContent = tipo;

    // Cria a tabela HTML com as sugestões filtradas
    let html = "";

    sugestoesFiltradas.forEach(function(element) {
        html += "<tr>";
        html += "<td>" + element.tipo + "</td>";
        html += "<td>" + element.descInic + "</td>";
        html += "<td>" + element.local + "</td>";
        html += "<td>" + element.data + "</td>";
    });

    const tables = document.querySelectorAll("#sugestoes-table3 tbody");

    tables.forEach(table => {
        table.innerHTML = html;
    });
}

// Obter o tipo de iniciativa da URL e chamar a função para mostrar os dados
const tipoIniciativa = obterParametroDaURL('tipo');
document.addEventListener("DOMContentLoaded", () => showDataSaber(tipoIniciativa));
