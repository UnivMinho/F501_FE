/*document.addEventListener('DOMContentLoaded', function() {
    // Recuperar os dados do localStorage
    const storedIniciativas = localStorage.getItem("iniciativas");
    const iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];

    // Selecionar a tabela onde os dados serão inseridos
    const table = document.querySelector('.table-custom tbody');

    // Limpar qualquer conteúdo existente na tabela
    table.innerHTML = '';

    // Iterar sobre os dados e inseri-los na tabela
    iniciativasArray.forEach(function(iniciativa) {
        let novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${iniciativa.drop}</td>
            <td>${iniciativa.local}</td>
            <td>${iniciativa.dataEvento}</td>
            <td><span class="botao pendente">PENDENTE</span></td>
        `;
        table.appendChild(novaLinha);
    });

    // Adicionar event listener ao botão de envio do formulário
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault(); // Impedir o envio do formulário
            ArmazenarIniciativa();
        });
    }
});

*/
    


/*function atualizarTabela() {
    // Recuperar os dados do localStorage
    let storedIniciativas = localStorage.getItem("Iniciativas");
    let iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];

    // Selecionar a tabela onde os dados serão inseridos
    let table = document.querySelector('.table-custom tbody');

    // Limpar qualquer conteúdo existente na tabela
    table.innerHTML = '';

    // Iterar sobre os dados e inseri-los na tabela
    iniciativasArray.forEach(function(iniciativa) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${iniciativa.drop}</td>
            <td>${iniciativa.local}</td>
            <td>${iniciativa.dataEvento}</td>
            <td><span class="botao pendente">PENDENTE</span></td>
        `;
        table.appendChild(newRow);
    });
}*/




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
    const doacoesExistentes = localStorage.getItem("doacoes");
    const arrayDoacoes = doacoesExistentes ? JSON.parse(doacoesExistentes) : [];

    // Adicionar a nova doação ao array
    arrayDoacoes.push(dadosDoacao);

    // Converter o array atualizado para JSON
    const dadosFormularioJSON = JSON.stringify(arrayDoacoes);

    // Armazenar o array atualizado no localStorage
    localStorage.setItem("doacoes", dadosFormularioJSON);

    alert("Formulário Enviado com Sucesso");
    window.location.href = "../index.html";

    return false;
}
