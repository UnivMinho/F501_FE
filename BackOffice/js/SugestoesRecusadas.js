function showDataSugestoesRec(){
  var sugestoesrec;
  if(localStorage.getItem("sugestoesrec")==null){
    sugestoesrec = [];
  }
  else{
    sugestoesrec = JSON.parse(localStorage.getItem("sugestoesrec"));
  }

  var html = "";

  sugestoes.forEach(function(element, index) {
    html += "<tr>";
    html += "<td>" + element.tipo + "</td>";
    html += "<td>" + element.local + "</td>";
    html += "<td>" + element.data + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.contacto + "</td>";
  });

  document.querySelector("#sugestoesrec-table tbody").innerHTML = html;
}

document.onload = showDataSugestoesRec();

function AddDataSugestoesRec(){
  
  var tipo = document.getElementById("drop").value;
  var local = document.getElementById("local").value;
  var data = document.getElementById("dataEvento").value;
  var email = document.getElementById("emailResp").value;
  var contacto = document.getElementById("contactoResp").value;


  var sugestoesrec;
  if(localStorage.getItem("sugestoesrec")==null){
    sugestoesrec = [];
  }
  else{
    sugestoesrec = JSON.parse(localStorage.getItem("sugestoesrec"));
  }

  sugestoesrec.push({
    tipo : tipo,
    local : local,
    data : data,
    email : email,
    contacto : contacto
  });

  localStorage.setItem("sugestoes", JSON.stringify(sugestoesrec));
  showDataSugestoesRec();
  document.getElementById("drop").value = "";
  document.getElementById("local").value = "";
  document.getElementById("dataEvento").value = "";
  document.getElementById("emailResp").value = "";
  document.getElementById("contactoResp").value = "";

}