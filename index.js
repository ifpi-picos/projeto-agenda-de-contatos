let input = require('fs');
if(!input.readFileSync('contatos.txt', 'utf8')){
  try {
      input.writeFileSync('contatos.txt', JSON.stringify([]), 'utf8');
    } catch (err) {
        console.error('Ocorreu um erro ao gravar o arquivo:', err);
    }
}

let contatos = JSON.parse(input.readFileSync('contatos.txt', 'utf8'));
let arrayContatos = Object.values(contatos);


while(true){
  console.log(`-----------------------------------`); 
  console.log("1 = Listar contatos"); 
  console.log("2 = Adicionar contato"); 
  console.log("3 = Editar contato"); 
  console.log("4 = Remover contato"); 
  console.log(`-----------------------------------`); 
  let opcao = prompt("O que você deseja fazer?");

  if(opcao == 1){
    console.clear();
    exibirContatos();
  }else if(opcao == 2){
    console.clear();
    adicionarContato();
  }else if(opcao == 3){
    console.clear();
    editarContato();
  }else if(opcao == 4){
    console.clear();
    removerContato();
  }else{
    console.clear();
    console.log("Opção Inválida"); 
  }
}

function adicionarContato() {

  let nome = prompt("Digite o nome do contato a ser adicionado");
  let telefone = parseInt(prompt("Digite o telefone (somente números)"));
  
  if(telefone){
   
    let dados = {
      id:arrayContatos.length,
      nome:nome,
      telefone:telefone
    }
    
    arrayContatos.push(dados);

    gravar();
    console.clear();
    console.log("Contato adicionado com sucesso!!!");
    
  }else{
    console.clear();
    console.log("Telefone Inválido");
    adicionarContato();
  }

}

function editarContato() {
  exibirContatos();
  let id = parseInt(prompt("Digite o ID do contato que você quer editar"));

  console.clear();
  
  let contato = arrayContatos.filter(cont =>{return cont.id==id});
  
    if(contato[0]){
      console.log(`-----------------------------------`);
      console.log(`Selecionado`);
      console.log(`nome: ${contato[0].nome}`);
      console.log(`telefone: ${contato[0].telefone}`);
      console.log(`-----------------------------------`);
      console.log("1 = Nome do contato");
      console.log("2 = Telefone do contato");
      let item = parseInt(prompt("O que você quer editar?"));
      console.clear();
      
        if(item == 1){
          let nome = prompt("Digite o novo nome do contato");

          for(let i = 0; i < arrayContatos.length;i++){
            if(arrayContatos[i].id == id){
              arrayContatos[i].nome = nome;
            }
          }
          
          gravar();
          console.clear();
          console.log("Contato editado com sucesso!!!");
        }else if(item == 2){
          let telefone = parseInt(prompt("Digite o novo telefone do contato (somente números)"));
          if(telefone){
            for(let i = 0; i < arrayContatos.length;i++){
            if(arrayContatos[i].id == id){
              arrayContatos[i].telefone = telefone;
            }
          }
            gravar();
            console.clear();
            console.log("Contato editado com sucesso!!!");
          }else{
            console.clear();
            console.log("Telefone Inválido");
            editarContato();
          }
  
        }else{
          console.log("Opção Inválida");
        }
    }else{
     console.log("Opção Inválida"); 
  }

}

function gravar() {
    try {
      input.writeFileSync('contatos.txt', JSON.stringify(arrayContatos), 'utf8');
    } catch (err) {
        console.error('Ocorreu um erro ao gravar o arquivo:', err);
    }
}

function removerContato() {

  exibirContatos();
  let id = parseInt(prompt("Digite o ID do contato que você quer remover"));
  
   arrayContatos = arrayContatos.filter(cont =>{return cont.id!=id});
  gravar();
  console.clear();
  console.log("Contato removido com sucesso!!!");
}

function organizarPorNome() {
  arrayContatos.sort((a, b) => {
  const nomeA = a.nome.toUpperCase(); // Convertendo para letras maiúsculas
  const nomeB = b.nome.toUpperCase();
  if (nomeA < nomeB) {
    return -1;
  }
  if (nomeA > nomeB) {
    return 1;
  }
  return 0;
});
}


function exibirContatos(){
  
  organizarPorNome();
  
  let existeContato = true;
  console.log(`CONTATOS`);
  for(let i = 0; i<arrayContatos.length; i++){
    console.log(`-----------------------------------`); 
    console.log(`ID : ${arrayContatos[i].id}`); 
    console.log(`NOME : ${arrayContatos[i].nome}`); 
    console.log(`TELEFONE : ${arrayContatos[i].telefone}`);
  }
     console.log(`-----------------------------------`); 
}