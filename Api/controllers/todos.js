var config = require("../config/db");
const sql = require("mssql");

function getTodos(req, res) {
  
}

async function getTodo(todoId) {
  try {
    let pool = await sql.connect(config);
    let todo = await pool
      .request()
      .input("input_parameter", sql.Int, todoId)
      .query("SELECT * from ContactsTable where todoId = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addTodo(order) {
  try {
    let pool = await sql.connect(config);
    let insertTodo = await pool
      .request()
      .input("todoId", sql.Int, order.todoId)
      .input("title", sql.NVarChar, order.Title)
      .input("isMarked", sql.Bit, order.isMarked)
      .execute("InsertTodo");
    return insertTodo.recordsets;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getTodos: getTodos,
  getTodo: getTodo,
  addTodo: addTodo,
};
