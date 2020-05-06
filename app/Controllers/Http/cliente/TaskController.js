"use strict";

class TaskController {
  index({ view, request }) {
    // let paramentro = request.params.id;
    // // return `aqui chegou e paramentros forma ${paramentro}`;

    // let dados = {
    //   nome: "Gabriel",
    //   id: paramentro,
    // };

    let tasks = [
      { tittle: "agende", body: "comprar agenda" },
      { tittle: "escola", body: "fazer atividades" },
    ];
    return view.render("cliente.tasks", {
      tittle: "Latest tasks",
      tasks,
    });
  }
}

module.exports = TaskController;
