// carregar dados logo ao abrir o site
window.onload = function () {
    // mostra salário salvo
    var salario = localStorage.getItem("salario");
    if (salario) {
        document.getElementById("resumoSalario").textContent = "R$ " + Number(salario).toFixed(2);
    }

    // mostra despesas salvas
    var despesas = JSON.parse(localStorage.getItem("despesas")) || []; 
    var corpo = document.querySelector("#tabeladespesas tbody");
    corpo.innerHTML = "";
    var total = 0;

    for (var i = 0; i < despesas.length; i++) {
        var linha = document.createElement("tr");
        linha.innerHTML =
            "<td>" + despesas[i].data + "</td>" +
            "<td>" + despesas[i].nome + "</td>" +
            "<td>R$ " + despesas[i].valor.toFixed(2) + "</td>";
        corpo.appendChild(linha);
        total += despesas[i].valor;
    }

    // coloca resumo
    document.getElementById("resumoDespesas").textContent = "R$ " + total.toFixed(2);
    var saldo = (Number(salario) || 0) - total;
    document.getElementById("resumoSaldo").textContent = "R$ " + saldo.toFixed(2);

    // mostra ou esconde resumo
    if (salario || despesas.length > 0) {
        document.getElementById("resumo").style.display = "block";
    }
};


// -----------------------------------------
// SALÁRIO
// -----------------------------------------
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

    // limpa
    document.getElementById("salario").value = "";

    // exibe resumo
    document.getElementById("resumo").style.display = "block";
});


// -----------------------------------------
// CADASTRAR DESPESA
// -----------------------------------------
document.getElementById("btnCadastrar").addEventListener("click", function () {

    var nome = document.getElementById("nome").value;
    var data = document.getElementById("data").value;
    var valor = Number(document.getElementById("valor").value);

    if (nome === "" || data === "" || valor <= 0 || salario<=0 || isNaN(valor)) {
        alert("Preencha tudo corretamente!");
        return;
    }

    // pega lista salva
    var despesas = JSON.parse(localStorage.getItem("despesas")) || [];

    // coloca nova despesa
    despesas.push({ nome: nome, data: data, valor: valor });

    // salva
    localStorage.setItem("despesas", JSON.stringify(despesas));

    // atualiza tabela
    var corpo = document.querySelector("#tabeladespesas tbody");
    corpo.innerHTML = "";
    var total = 0;

    for (var i = 0; i < despesas.length; i++) {
        var linha = document.createElement("tr");
        linha.innerHTML =
            "<td>" + despesas[i].data + "</td>" +
            "<td>" + despesas[i].nome + "</td>" +
            "<td>R$ " + despesas[i].valor.toFixed(2) + "</td>";
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


// -----------------------------------------
// APAGAR TUDO
// -----------------------------------------
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

    alert("Os dados foram apagados!");
});








// // ----------------------------------------
// // CARREGAR DADOS AO ABRIR O SITE
// // ----------------------------------------
// window.onload = function () {
//     mostrarSalario();
//     mostrarDespesas();
// };

// // ----------------------------------------
// // SALVAR SALÁRIO
// // ----------------------------------------
// document.getElementById("cadsalario").onclick = function () {
//     let salario = Number(document.getElementById("salario").value);

//     if (salario <= 0 || isNaN(salario)) {
//         alert("Digite um salário válido!");
//         return;
//     }

//     // Salva no LocalStorage
//     localStorage.setItem("salario", salario);

//     mostrarSalario();
//     document.getElementById("salario").value = "";
// };

// // Mostra o salário no resumo (quando solicitado)
// function mostrarSalario() {
//     let salario = localStorage.getItem("salario");

//     if (salario) {
//         document.getElementById("resumoSalario").textContent = "R$ " + Number(salario).toFixed(2);
//     }
// }

// // ----------------------------------------
// // CADASTRAR DESPESA
// // ----------------------------------------
// document.getElementById("btnCadastrar").onclick = function () {
//     let nome = document.getElementById("nome").value;
//     let data = document.getElementById("data").value;
//     let valor = Number(document.getElementById("valor").value);

//     if (nome === "" || data === "" || valor <= 0 || isNaN(valor)) {
//         alert("Preencha todos os campos corretamente!");
//         return;
//     }

//     // Busca despesas já salvas ou cria uma lista vazia
//     let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

//     // Adiciona a nova despesa
//     despesas.push({ nome: nome, data: data, valor: valor });

//     // Salva novamente no LocalStorage
//     localStorage.setItem("despesas", JSON.stringify(despesas));

//     mostrarDespesas();

//     let salario = Number(localStorage.getItem("salario")) || 0;
//     let despesastot = JSON.parse(localStorage.getItem("despesas")) || [];

//     // Soma os valores das despesas
//     let total = 0;
//     despesastot.forEach(function (item) {
//         total += item.valor;
//     });

//     let saldo = salario - total;

//     // Coloca os valores na tela
//     document.getElementById("resumoDespesas").textContent = "R$ " + total.toFixed(2);
//     document.getElementById("resumoSaldo").textContent = "R$ " + saldo.toFixed(2);

//     // Torna o resumo visível
//     document.getElementById("resumo").style.display = "block";

//     // Atualiza o salário no resumo
//     mostrarSalario();

//     // Limpar os campos
//     document.getElementById("salario").value = "";
//     document.getElementById("nome").value = "";
//     document.getElementById("data").value = "";
//     document.getElementById("valor").value = "";
// };

// // Mostra a lista de despesas na tabela
// function mostrarDespesas() {
//     let corpoTabela = document.querySelector("#tabeladespesas tbody");
//     corpoTabela.innerHTML = ""; // limpa a tabela

//     let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

//     // Cria uma linha para cada despesa
//     despesas.forEach(function (item) {
//         let linha = document.createElement("tr");

//         linha.innerHTML = `
//             <td>${item.data}</td>
//             <td>${item.nome}</td>
//             <td>R$ ${item.valor.toFixed(2)}</td>
//         `;

//         corpoTabela.appendChild(linha);
//     });
// }

// // ----------------------------------------
// // APAGAR TUDO (salário + despesas)
// // ----------------------------------------
// document.getElementById("apagar").onclick = function () {

//     if (!confirm("Tem certeza que deseja apagar tudo?")) {
//         return;
//     }

//     // Apaga tudo do LocalStorage
//     localStorage.removeItem("salario");
//     localStorage.removeItem("despesas");

//     // Limpa todas as áreas visíveis da tela
//     document.querySelector("#tabeladespesas tbody").innerHTML = "";
//     document.getElementById("resumoSalario").textContent = "";
//     document.getElementById("resumoDespesas").textContent = "";
//     document.getElementById("resumoSaldo").textContent = "";

//     // Esconde o resumo para não ficar vazio
//     document.getElementById("resumo").style.display = "none";

//     alert("Todos os dados foram apagados.");
// };

    
