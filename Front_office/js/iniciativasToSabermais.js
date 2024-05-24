function showDataSaberMais() {
    let sugestoes;
    if (localStorage.getItem("sugestoes") == null) {
        sugestoes = [];
    } else {
        sugestoes = JSON.parse(localStorage.getItem("sugestoes"));
    }

    let html = "";

    sugestoes.forEach(function(element, index) {
        html += `<div class="container my-5">
                    <div class="row">
                        <div class="col-md-8">
                            <h1 class="font-weight-bold">${element.tipo}</h1>
                            <h3 class="font-weight-bold">Descrição</h3>
                            <p>${element.descricao}</p>
                            <p class="font-weight-bold">${element.local}<br>${element.data}</p>
                        </div>
                    </div>
                </div>`;
    });

    const initiativesContainer = document.getElementById('initiatives-container');
    initiativesContainer.innerHTML = html;
}

document.onload = showDataSaberMais();

// Função para adicionar nova sugestão
function addSugestao(tipo, descricao, local, data, imagem) {
    let sugestoes;
    if (localStorage.getItem("sugestoes") == null) {
        sugestoes = [];
    } else {
        sugestoes = JSON.parse(localStorage.getItem("sugestoes"));
    }

    let novaSugestao = {
        tipo: tipo,
        descricao: descricao,
        local: local,
        data: data,
    };

    sugestoes.push(novaSugestao);
    localStorage.setItem("sugestoes", JSON.stringify(sugestoes));
    showDataSaberMais();
}

// Exemplo de chamada para adicionar uma nova sugestão
addSugestao(
    "Recolha de Alimentos",
    "A recolha de alimentos é um evento crucial para ajudar a combater a fome em comunidades carentes. Durante esse processo, voluntários se mobilizam para coletar doações de alimentos não perecíveis em supermercados, feiras ou outros locais públicos. Essas doações são essenciais para garantir que indivíduos e famílias em situação de vulnerabilidade tenham acesso a alimentos nutritivos. Ao longo da recolha, as pessoas são encorajadas a contribuir com alimentos básicos, como arroz, massas, enlatados e produtos de higiene.",
    "AVENIDA CENTRAL DE BRAGA",
    "30/03/2024",
    "images/causes-2.jpg"
);
