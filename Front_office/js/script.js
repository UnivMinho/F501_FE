document.addEventListener('DOMContentLoaded', function() {
    // Recuperar os dados do localStorage
    var storedIniciativas = localStorage.getItem("iniciativas");
    var iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];
    

    // Selecionar a tabela onde os dados serão inseridos
    var table = document.querySelector('.table-custom tbody');

    // Limpar qualquer conteúdo existente na tabela
    table.innerHTML = '';

    // Iterar sobre os dados e inseri-los na tabela
    iniciativasArray.forEach(function(iniciativa) {
        var novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${iniciativa.drop}</td>
            <td>${iniciativa.local}</td>
            <td>${iniciativa.dataEvento}</td>
            <td><span class="botao pendente">PENDENTE</span></td>
        `;
        table.appendChild(novaLinha);
    });
});


    


function atualizarTabela() {
    // Recuperar os dados do localStorage
    var storedIniciativas = localStorage.getItem("Iniciativas");
    var iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];

    // Selecionar a tabela onde os dados serão inseridos
    var table = document.querySelector('.table-custom tbody');

    // Limpar qualquer conteúdo existente na tabela
    table.innerHTML = '';

    // Iterar sobre os dados e inseri-los na tabela
    iniciativasArray.forEach(function(iniciativa) {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${iniciativa.drop}</td>
            <td>${iniciativa.local}</td>
            <td>${iniciativa.dataEvento}</td>
            <td><span class="botao pendente">PENDENTE</span></td>
        `;
        table.appendChild(newRow);
    });
}





function ArmazenarDoacao() {
    var valor = document.getElementById("valor").value;
    var NomeCartao = document.getElementById("NomeCartao").value;
    var ApelidoCartao = document.getElementById("ApelidoCartao").value;
    var nrCartao = document.getElementById("nrCartao").value;
    var cvc = document.getElementById("cvc").value;
    var validade = document.getElementById("validade").value;
    var Nome = document.getElementById("Nome").value;
    var Apelido = document.getElementById("Apelido").value;
    var email = document.getElementById("email").value;

    var dadosDoacao = {
        valor:valor,
        NomeCartao: NomeCartao,
        ApelidoCartao: ApelidoCartao,
        nrCartao: nrCartao,
        cvc: cvc,
        validade: validade,
        Nome: Nome,
        Apelido: Apelido,
        email: email
    };

    // Recuperar as doações existentes do localStorage
    var doacoesExistentes = localStorage.getItem("Doacoes");
    var arrayDoacoes = doacoesExistentes ? JSON.parse(doacoesExistentes) : [];

    // Adicionar a nova doação ao array
    arrayDoacoes.push(dadosDoacao);

    // Converter o array atualizado para JSON
    var dadosFormularioJSON = JSON.stringify(arrayDoacoes);

    // Armazenar o array atualizado no localStorage
    localStorage.setItem("Doacoes", dadosFormularioJSON);

    alert("Formulário Enviado com Sucesso");

    return false;
}
