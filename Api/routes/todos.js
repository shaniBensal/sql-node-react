module.exports = (app) => {

var router = require("express").Router();
app.use("/api", router);
var controller = require("../controllers/todos");

const baseUrl = '/todos';

router.use((request,response,next)=>{
  console.log('middleware');
  next();
})

router.route(baseUrl).get((request, response) => {
  controller.getTodos().then((result) => {
    console.log(result)
    response.json(result);
  });
});

router.route(baseUrl + "/:todoId").get((request, response) => {
  controller.getTodo(request.params.todoId).then((result) => {
    response.json(result[0]);
  });
});

router.route(baseUrl).post((request, response) => {
  let todo = { ...request.body };

  controller.addTodo(todo).then((result) => {
    response.status(201).json(result);
  });
});
}