import React, { Component } from "react";
import TodoDataService from "../services/todo.service";
import { Link } from "react-router-dom";

export default class ListTodos extends Component {
  constructor(props) {
    super(props);
    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTodo = this.setActiveTodo.bind(this);

    this.state = {
      listOfTodoList: [],
      currentTodoList: null,
    };
  }

  componentDidMount() {
    this.retrieveTodos();
  }

  retrieveTodos() {
    TodoDataService.getAll()
      .then(response => {
        this.setState({
          listOfTodoList: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTodos();
    this.setState({
      currentTodoList: null,
      currentIndex: -1
    });
  }

  setActiveTodo(todo, index) {
    this.setState({
      currentTodoList: todo,
      currentIndex: index
    });
  }

  render() {
    const { listOfTodoList, currentTodoList, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Todos List</h4>

          <ul className="list-group">
            {listOfTodoList &&
              listOfTodoList.map((todo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTodo(todo, index)}
                  key={index}
                >
                  {todo.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentTodoList ? (
            <div>
              <h4>TodoList</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTodoList.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTodoList.description}
              </div>
              <Link
                  to={"/todos/" + currentTodoList.id + "/items"}
                  className="badge badge-secondary"
              >
                View List Items
              </Link>
              <Link
                to={"/todos/" + currentTodoList.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a TodoList...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
