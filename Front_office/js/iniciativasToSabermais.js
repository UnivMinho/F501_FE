function obterParametroDaURL(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

function showDataSaber(tipo) {
    let iniciativas;
    if (localStorage.getItem("iniciativas") == null) {
        iniciativas = [];
    } else {
        iniciativas = JSON.parse(localStorage.getItem("iniciativas"));
    }

    // Filtrar as sugestões com base no tipo
    const iniciativasFiltradas = iniciativas.filter(iniciativas => iniciativas.tipo === tipo);

    // Atualizar o título da iniciativa
    document.getElementById('titulo-iniciativa').textContent = tipo;

    // Cria a tabela HTML com as sugestões filtradas
    let html = "";

    iniciativasFiltradas.forEach(function(element) {
        html += "<tr>";
        html += "<td>" + element.tipo + "</td>";
        html += "<td>" + element.local + "</td>";
        html += "<td>" + element.data + "</td>";
        html += "<td>" + element.vagas + "</td>";
    });

    const tables = document.querySelectorAll("#sugestoes-table3 tbody");

    tables.forEach(table => {
        table.innerHTML = html;
    });
}

// Obter o tipo de iniciativa da URL e chamar a função para mostrar os dados
const tipoIniciativa = obterParametroDaURL('tipo');
document.addEventListener("DOMContentLoaded", () => showDataSaber(tipoIniciativa));
