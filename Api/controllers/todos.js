var config = require("../config/db");
const sql = require("mssql");
var connect = new sql.connect(config);

function getTodos() {
  // create Request object
  let request = new sql.Request(connect);

  // query to the database and get the records
  request.query("SELECT * from TodosTable", function (err, recordset) {
    if (err) console.log(err);
    console.log(recordset);
    // send records as a response
    res.send(recordset);
  });
}

async function getTodo(todoId) {
  try {
    let pool = await sql.connect(config);
    let todo = await pool
      .request()
      .input("input_parameter", sql.Int, todoId)
      .query("SELECT * from TodosTable where todoId = @input_parameter");
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
