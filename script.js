let bancoDeTarefas = [];

const criarTarefaHtml = (descricao, status, indice) => {
  const tarefa = document.createElement("li");
  tarefa.innerHTML = `
    <input type="checkbox" ${status} onclick="marcaCheckbox(${indice})" data-indice=${indice}>
    <label>${descricao}</label>
    <button onclick="removeItem(${indice})" data-indice=${indice}>
      <span class="material-icons lixeira">
        delete_forever
      </span>
    </button>
  `
  document.getElementById("listaTarefas").appendChild(tarefa);
}

const atualizarLista = () => {
  document.getElementById("listaTarefas").innerHTML = "";

  bancoDeTarefas.forEach((item, indice) => criarTarefaHtml(item.descricao, item.status, indice));

  localStorage.setItem("bancoDeTarefas", JSON.stringify(bancoDeTarefas));
}

const adicionarTarefa = () => {
  const inputAdicionar = document.querySelector('input[type="text"]');

  if (inputAdicionar.value === "") {
    alert("Por favor: digite uma tarefa no campo abaixo!");

  } else {
    const novaTarefa = {
      descricao: inputAdicionar.value,
      status: ""
    }

    bancoDeTarefas.push(novaTarefa);
    inputAdicionar.value = "";
    atualizarLista();
  }
}

const removeItem = (indice) => {
  bancoDeTarefas.splice(indice, 1);
  atualizarLista();
}

const marcaCheckbox = (indice) => {
  bancoDeTarefas[indice].status = (bancoDeTarefas[indice].status === "") ? "checked" : "";
  atualizarLista();
}

const carregaListaTaferas = () => {
  let bancoExistente = localStorage.getItem("bancoDeTarefas");

  if (bancoExistente) {
    bancoExistente = JSON.parse(bancoExistente);
    bancoDeTarefas = bancoExistente;
  }

  atualizarLista();
}

carregaListaTaferas();
