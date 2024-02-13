import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTodoList from "./components/add-todo.component";
import TodoList from "./components/todo.component";
import ListTodos from "./components/todo-list.component";
import TodoListItems from "./components/todo-list-items.component";
import TodoListItem from "./components/todo-list-item.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/todos"} className="navbar-brand">
            Anouar
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/todos"} className="nav-link">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addTodo"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ListTodos/>} />
            <Route path="/todos" element={<ListTodos/>} />
            <Route path="/addTodo" element={<AddTodoList/>} />
            <Route path="/todos/:id" element={<TodoList/>} />
            <Route path="/todos/:id/items" element={<TodoListItems/>} />
            <Route path="/todos/:id/items/:itemId" element={<TodoListItem/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
