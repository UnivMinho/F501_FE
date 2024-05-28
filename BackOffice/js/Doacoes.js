function ArmazenarDoacao() {

    let valor = parseFloat(document.getElementById("valor").value);
    let NomeCartao = document.getElementById("NomeCartao").value;
    let ApelidoCartao = document.getElementById("ApelidoCartao").value;
    let nrCartao = document.getElementById("nrCartao").value;
    let cvc = document.getElementById("cvc").value;
    let validade = document.getElementById("validade").value;
    let Nome = document.getElementById("Nome").value;
    let Apelido = document.getElementById("Apelido").value;
    let email = document.getElementById("email").value;

    // Obter doações existentes do localStorage ou inicializar um array vazio
    let doacoes = JSON.parse(localStorage.getItem("doacoes") || '[]');

    // Adicionar a nova doação ao array
    doacoes.push({ 
        valor: valor,
        NomeCartao: NomeCartao,
        ApelidoCartao: ApelidoCartao,
        nrCartao: nrCartao,
        cvc: cvc,
        validade: validade,
        Nome: Nome,
        Apelido: Apelido,
        email: email 
    });

    let fundoManeio = parseFloat(localStorage.getItem("fundoManeio") || 0);
    fundoManeio += valor;
    localStorage.setItem("fundoManeio", fundoManeio);

    // Armazenar o array atualizado de doações no localStorage
    localStorage.setItem("doacoes", JSON.stringify(doacoes));

    alert("Doação realizada com sucesso");
    window.location.reload();
    
    // Retornar false para impedir o envio do formulário
    return false;
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

document.addEventListener("DOMContentLoaded", function() {
    showDataDoacoes();
});

