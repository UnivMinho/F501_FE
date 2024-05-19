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

function ArmazenarIniciativa() {
    var drop = document.getElementById("drop").value;
    var Desiniciativa = document.getElementById("Desiniciativa").value;
    var local = document.getElementById("local").value;
    var dataEvento = document.getElementById("dataEvento").value;
    var emailResp = document.getElementById("emailResp").value;
    var contactoResp = document.getElementById("contactoResp").value;
    var imagemIniciativa = document.getElementById("imagemIniciativa").files[0];

    function getBase64(file, callback) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            callback(reader.result);
        };
        reader.onerror = function(error) {
            console.log('Error: ', error);
        };
    }

    function saveIniciativa(base64Image) {
        var dadosIniciativa = {
            drop: drop,
            Desiniciativa: Desiniciativa,
            local: local,
            dataEvento: dataEvento,
            emailResp: emailResp,
            contactoResp: contactoResp,
            imagemIniciativa: base64Image
        };

        var storedIniciativas = localStorage.getItem("iniciativas");
        var iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];
        iniciativasArray.push(dadosIniciativa);

        localStorage.setItem("iniciativas", JSON.stringify(iniciativasArray));

        // Atualizar a tabela após armazenar a iniciativa
        atualizarTabela();

        alert("Formulário Enviado com Sucesso");
    }

    if (imagemIniciativa) {
        getBase64(imagemIniciativa, function(base64Image) {
            saveIniciativa(base64Image);
        });
    } else {
        saveIniciativa(null);
    }

    return false;
}

function atualizarTabela() {
    // Recuperar os dados do localStorage
    var storedIniciativas = localStorage.getItem("iniciativas");
    var iniciativasArray = storedIniciativas ? JSON.parse(storedIniciativas) : [];

    // Selecionar a tabela onde os dados serão inseridos
    var table = document.querySelector('.table-custom tbody');

    // Limpar qualquer conteúdo existente na tabela
    table.innerHTML = '';

    // Iterar sobre os dados e inseri-los na tabela
    iniciativasArray.forEach(function(iniciativa) {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${iniciativa.Desiniciativa}</td>
            <td>${iniciativa.local}</td>
            <td>${iniciativa.dataEvento}</td>
            <td><span class="botao pendente">PENDENTE</span></td>
        `;
        table.appendChild(newRow);
    });
}








function ArmazenarDoacao() {
    

    var primeiroNome = document.getElementById("primeiroNome").value;
    var Apelido = document.getElementById("Apelido").value;
    var nrCartao = document.getElementById("nrCartao").value;
    var cvc = document.getElementById("cvc").value;
    var validade = document.getElementById("validade").value;
    var Nome = document.getElementById("Nome").value;
    var Apelido2= document.getElementById("Apelido2").value;
    var email= document.getElementById("email").value;
    

    
    var dadosDoacao = {
        primeiroNome: primeiroNome,
        Apelido: Apelido,
        nrCartao: nrCartao,
        cvc: cvc,
        validade: validade,
        Nome: Nome,
        Apelido2: Apelido2,
        email: email
    };

    
    var dadosFormularioJSON = JSON.stringify(dadosDoacao);

    
    localStorage.setItem("Doacao", dadosFormularioJSON);

    
    alert("Formulário Enviado com Sucesso");

    
    return false;
}