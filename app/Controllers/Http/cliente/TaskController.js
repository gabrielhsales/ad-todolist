"use strict";

const TaskModel = use("App/Models/Task");
const { validateAll } = use("Validator");
class TaskController {
  /*
   *
   * Action do get
   */

  async index({ view, request, response }) {
    // let paramentro = request.params.id;
    try {
      let tasks = await TaskModel.all();

      return view.render("cliente.tasks", {
        tittle: "Latest tasks",
        tasks: tasks.toJSON(),
      });
    } catch (error) {
      return response.json({
        name: error.name,
        message: error.message,
      });
    }
  }

  /*
   *
   * Action cadastro de task
   */

  async store({ request, response, session, view }) {
    let msgCustom = {
      "tittle.required": "campos obrigátorio",
      "tittle.min": "Minimo 5 palavras",
      "body.required": "campos obrigátorio",
      "body.min": "Minimo 10 palavras",
    };

    let validation = await validateAll(
      request.all(),
      {
        tittle: "required|min:5|max:410",
        body: "required|min:10",
      },
      msgCustom
    );

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }

    try {
      let task = new TaskModel();

      task.tittle = request.input("tittle");
      task.body = request.input("body");

      await task.save();

      session.flash({ notification: "Task added" });

      return response.redirect("/tasks");
    } catch (error) {
      return response.json({
        name: error.name,
        message: error.message,
      });
    }
  }

  /*
   *
   * Action detalhes de task
   */

  async detail({ params, view, response }) {
    try {
      let task = await TaskModel.find(params.id);
      return view.render("cliente.detail", { task });
    } catch (error) {
      return response.json({
        name: error.name,
        message: error.message,
      });
    }
  }

  /**
   * Action delete de task
   */
  async destroy({ params, request, response, session }) {
    let task = await TaskModel.find(params.id);
    await task.delete();
    session.flash({ notification: "Task removed!" });

    return response.redirect("/tasks");
  }

  /**
   * Show the form for editing the specified resource.
   */
  async getUpdate({ params, request, response, session, view }) {
    let task = await TaskModel.find(params.id);

    if (!task) {
      session.flash({ notification: "Task not found!" });

      return response.redirect("/tasks");
    }

    return view.render("cliente.update", { task });
    // task.tittle = request.input("tittle");
    // task.body = request.input("body");

    // await task.save();

    // session.flash({ notification: "Task added" });
  }

  /**
   * Show the form for editing the specified resource.
   */
  async atualizar({ params, request, response, session, view }) {
    let task = await TaskModel.find(params.id);

    if (!task) {
      session.flash({ notification: "Task not found!" });

      return response.redirect("/tasks");
    }

    task.tittle = request.input("tittle");
    task.body = request.input("body");

    await task.save();

    session.flash({ notification: "Task updated" });

    return response.redirect("/tasks");
  }
}

module.exports = TaskController;
