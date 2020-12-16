import './App.css';
import {useState} from 'react';
import TodoList from './components/todo-list/todo-list';
import NewTodo from './components/new-todo/new-todo';
import defaultContacts from './data/todoListDefault';

function App() {
  const [todoList, setTodoList] = useState(defaultContacts);
  const [showNewInput, setNewTodo] = useState(false);
  return (
    <div className="App pt-3">
      <h2>Todo App</h2>

      <TodoList todos={defaultContacts}/>
      {showNewInput ? <NewTodo/> : ''}
    </div>
  );
}

export default App;
