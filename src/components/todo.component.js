import React, { Component } from "react";
import TodoDataService from "../services/todo.service";
import { withRouter } from '../common/with-router';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTodo = this.getTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = {
      currentTodoList: {
        id: null,
        title: "",
        description: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTodo(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTodoList: {
          ...prevState.currentTodoList,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTodoList: {
        ...prevState.currentTodoList,
        description: description
      }
    }));
  }

  getTodo(id) {
    TodoDataService.get(id)
      .then(response => {
        this.setState({
          currentTodoList: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTodo() {
    TodoDataService.update(
      this.state.currentTodoList.id,
      this.state.currentTodoList
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The todo list was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTodo() {    
    TodoDataService.delete(this.state.currentTodoList.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/todos');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTodoList } = this.state;

    return (
      <div>
        {currentTodoList ? (
          <div className="edit-form">
            <h4>TodoList</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTodoList.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTodoList.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTodo}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTodo}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a TodoList...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(TodoList);