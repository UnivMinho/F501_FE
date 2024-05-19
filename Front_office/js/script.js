function ArmazenarIniciativa() {
    

    var drop = document.getElementById("drop").value;
    var Desiniciativa = document.getElementById("Desiniciativa").value;
    var local = document.getElementById("local").value;
    var dataEvento = document.getElementById("dataEvento").value;
    var emailResp = document.getElementById("emailResp").value;
    var contactoResp = document.getElementById("contactoResp").value;
    var imagemIniciativa = document.getElementById("imagemIniciativa").files[0];
    

    
    var dadosIniciativa = {
        drop: drop,
        Desiniciativa: Desiniciativa,
        local: local,
        dataEvento: dataEvento,
        emailResp: emailResp,
        contactoResp: contactoResp,
        imagemIniciativa: imagemIniciativa
    };

    
    var dadosFormularioJSON = JSON.stringify(dadosIniciativa);

    
    localStorage.setItem("iniciativa", dadosFormularioJSON);

    
    alert("Formulário Enviado com Sucesso");

    
    return false;
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