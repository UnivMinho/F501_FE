//funcao para apenas mostrar os botoes permitidos de cada cargo
function displayBotao() {
    document.addEventListener("DOMContentLoaded", function() {
        let cargoopt = localStorage.getItem("dadosUser");
        if (cargoopt) {
            let dadosUser = JSON.parse(cargoopt); 
            if (dadosUser.cargo === "Proponente") {
                document.getElementById("sugerirIniciativa").style.display = "block";
                document.getElementById("consultarIniciativa").style.display = "block";
            } else {
                document.getElementById("sugerirIniciativa").style.display = "none";
                document.getElementById("consultarIniciativa").style.display = "none";
            }
        } else {
            document.getElementById("sugerirIniciativa").style.display = "none";
            document.getElementById("consultarIniciativa").style.display = "none";
        }
    });
}
displayBotao();
