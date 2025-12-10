//RESGATA OS DADOS AO ABRIR O SITE
window.onload = function () {
    // mostra salário salvo
    var salario = localStorage.getItem("salario");
    if (salario) {
        document.getElementById("resumoSalario").textContent = "R$ " + Number(salario).toFixed(2);//relembrando toFixed(2) = com duas casas
    }


    // mostra despesas salvas
    var despesas = JSON.parse(localStorage.getItem("despesas")) || [];
    var corpo = document.querySelector("#tabeladespesas tbody");//Selecionar o corpo da tabela
    corpo.innerHTML = "";
    var total = 0;


    for (var i = 0; i < despesas.length; i++) { //enquanto o i for menor que despesas.length(o array despesas inteiro)
        var linha = document.createElement("tr");
        linha.innerHTML = 
        '<td>' + despesas[i].data + '</td>' +
        '<td>' + despesas[i].nome + '</td>' +
        '<td style="background-color: yellow;">R$ ' + despesas[i].valor.toFixed(2) + '</td>';
        corpo.appendChild(linha);

        
        //insere linha no corpo da #tabeladespesas
        total = total + despesas[i].valor;
    }
    //resumo
    document.getElementById("resumoDespesas").textContent = "R$ " + total.toFixed(2);
    var saldo = (Number(salario) || 0) - total;
    document.getElementById("resumoSaldo").textContent = "R$ " + saldo.toFixed(2);
    // mostra ou esconde resumo
    if (salario || despesas.length > 0) {
        document.getElementById("resumo").style.display = "block";//tornar resumo visivel
    }
}; //FIM do carregamento de dados anteriores


//Salvar salário
document.getElementById("cadsalario").addEventListener("click", function () {
    var salario = Number(document.getElementById("salario").value);

    if (salario <= 0 || isNaN(salario)) {
        alert("Digite um salário válido!");
        return;
    }
    // salva
    localStorage.setItem("salario", salario);
    // mostra na tela
    document.getElementById("resumoSalario").textContent = "R$ " + salario.toFixed(2);
    // limpa o campo input
    document.getElementById("salario").value = "";

    // exibe resumo
    document.getElementById("resumo").style.display = "block";
});

//Cadastro de despesas
document.getElementById("btnCadastrar").addEventListener("click", function () {


    var nome = document.getElementById("nome").value;
    var data = document.getElementById("data").value;
    var valor = Number(document.getElementById("valor").value);


    if (nome === "" || data === "" || valor <= 0 || isNaN(valor)) { //is not a number = alert
        alert("Preencha tudo corretamente!");
        return;
    }


    //Pega lista salva
    var despesas = JSON.parse(localStorage.getItem("despesas")) || [];


    //Coloca nova despesa
    despesas.push({ nome: nome, data: data, valor: valor });

    // salva
    localStorage.setItem("despesas", JSON.stringify(despesas)); //transformar algo em string stringify

    // atualiza tabela
    var corpo = document.querySelector("#tabeladespesas tbody");
    corpo.innerHTML = ""; //limpar a tabla, para não ficar linhas fantasmas
    var total = 0;


    for (var i = 0; i < despesas.length; i++) {
        var linha = document.createElement("tr");
        linha.innerHTML =
            "<td>" + despesas[i].data + "</td>" +
            "<td>" + despesas[i].nome + "</td>" +
            '<td style="background-color: yellow;">R$ ' + despesas[i].valor.toFixed(2) + "</td>";
        corpo.appendChild(linha);
        total += despesas[i].valor;
    }


    // calcula resumo
    var salario = Number(localStorage.getItem("salario")) || 0;
    document.getElementById("resumoDespesas").textContent = "R$ " + total.toFixed(2);
    document.getElementById("resumoSaldo").textContent = "R$ " + (salario - total).toFixed(2);


    // torna resumo visível
    document.getElementById("resumo").style.display = "block";


    // limpar campos
    document.getElementById("nome").value = "";
    document.getElementById("data").value = "";
    document.getElementById("valor").value = "";
});




//Botão apagar tudo
document.getElementById("apagar").addEventListener("click", function () {


    if (!confirm("Tem certeza que deseja apagar tudo?")) {
        return;
    }

    // exclui
    localStorage.removeItem("salario");
    localStorage.removeItem("despesas");

    // limpa tabela
    document.querySelector("#tabeladespesas tbody").innerHTML = "";

    // limpa textos
    document.getElementById("resumoSalario").textContent = "";
    document.getElementById("resumoDespesas").textContent = "";
    document.getElementById("resumoSaldo").textContent = "";


    // esconde
    document.getElementById("resumo").style.display = "none";


    alert("Dados apagados!");
});
