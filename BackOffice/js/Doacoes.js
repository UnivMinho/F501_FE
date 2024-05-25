function ArmazenarDoacao() {
    let valor = document.getElementById("valor").value;
    let NomeCartao = document.getElementById("NomeCartao").value;
    let ApelidoCartao = document.getElementById("ApelidoCartao").value;
    let nrCartao = document.getElementById("nrCartao").value;
    let cvc = document.getElementById("cvc").value;
    let validade = document.getElementById("validade").value;
    let Nome = document.getElementById("Nome").value;
    let Apelido = document.getElementById("Apelido").value;
    let email = document.getElementById("email").value;


    let dadosDoacao = {
        valor: valor,
        NomeCartao: NomeCartao,
        ApelidoCartao: ApelidoCartao,
        nrCartao: nrCartao,
        cvc: cvc,
        validade: validade,
        Nome: Nome,
        Apelido: Apelido,
        email: email
    };

    let doacoes = localStorage.getItem("dadosDoacao");
    let arrayDoacoes = doacoes ? JSON.parse(doacoes) : [];

    // Adicionar a nova doação ao array
    arrayDoacoes.push(dadosDoacao);

    // Armazenar o array atualizado no localStorage
    localStorage.setItem("doacoes", JSON.stringify(arrayDoacoes));

    alert("Doação armazenada com sucesso!");
}

function showDataDoacoes() {
    let doacoes = JSON.parse(localStorage.getItem("doacoes"));

    let html = "";

    doacoes.forEach(function(doacao) {
        html += "<tr>";
        html += "<td>" + doacao.valor + "</td>";
        html += "<td>" + doacao.NomeCartao + "</td>";
        html += "<td>" + doacao.ApelidoCartao + "</td>";
        html += "<td>" + doacao.nrCartao + "</td>";
        html += "<td>" + doacao.cvc + "</td>";
        html += "<td>" + doacao.validade + "</td>";
        html += "<td>" + doacao.Nome + "</td>";
        html += "<td>" + doacao.Apelido + "</td>";
        html += "<td>" + doacao.email + "</td>";
        html += "</tr>";
    });

    document.querySelector("#doacoes-table tbody").innerHTML = html;
}

// Chamar a função para exibir as doações quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
    showDataDoacoes();
});
