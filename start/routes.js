"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");


Route.on("/").render("/cliente/home");

Route.get("/tasks", "cliente/TaskController.index");

Route.on("/add").render("/cliente/add");

Route.post('/add', 'cliente/TaskController.store')

Route.get('/task/:id', 'cliente/TaskController.detail')

Route.get('/remove/:id', 'cliente/TaskController.destroy')

Route.get('/update/:id', 'cliente/TaskController.getUpdate')

Route.post('/atualizar/:id', 'cliente/TaskController.atualizar')



Route.on("/welcome").render("welcome");

// Route.get("/task/:id", "cliente/TaskController.index");



//Rota coringa, caso não seja encontrada pagina exibe uma pagina not found
Route.any('*', ({ view }) => view.render('/shared/erro404'))
