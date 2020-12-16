import React from "react";
import TodoItem from "../todo-item/todo-item";
// import { Button } from "react-bootstrap";

export default function TodoList({ todos }) {
  const removeTodo = (todoId) => {
    todos = todos.filter((todo) => (todo.id = todoId));
  };

  const list = todos.map((todo) => {
    return (
      <li key={todo.id}>
        <TodoItem item={todo} onRemoveTodo={()=>removeTodo(todo.id)} />
      </li>
    );
  });
  return (
    <div>
      {todos ? <ul variant="flush">{list}</ul> : <p>No items yet</p>}
      {/* <Button variant="info">Add New</Button> */}
    </div>
  );
}
