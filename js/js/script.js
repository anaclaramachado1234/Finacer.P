document.getElementById("formcadastro").addEventListener("submit",function(event){
    //submete dados sem que outra pagina seja carregada
    event.preventDefault();
    //declara as variaveis e pega os valores das caixas de texto
    var nome=document.getElementById("nome").value
    var idade=document.getElementById("idade").value
    //declara o objeto com os atributos nome e idade e atribui os dados que estão nas variaveis acima: nome e idade.
    var aluno={nome:nome, idade:idade}//nome daqui é diferente do dali, por isso declara assim.
    //Criar lista de alunos, carregar os alunos preexistentes ou carregar uma lista vazia.
    var lista_alunos= JSON.parse(localStorage.getItem('listagem')) || [] //|| [] =ou cria lista vazia
    //inserir o aluno na lista
    lista_alunos.push(aluno)
    //adicionar o aluno no arquivo do local storage
    localStorage.setItem('listagem',JSON.stringify(lista_alunos))
    //limpar os campos do formulário
    document.getElementById('formcadastro').reset()
    exibir_alunos()
}) 
function exibir_alunos(){
    var lista_alunos=JSON.parse(localStorage.getItem('listagem')) || []
    var output=document.getElementById('output')
    output.innerHTML=''
    for(let i=0;i<lista_alunos.length;i++)
    {
        let li=document.createElement('li')
        li.textContent='Nome:'+lista_alunos[i].nome+'idade:'+lista_alunos[i].idade
        output.appendChild(li)
    }
}