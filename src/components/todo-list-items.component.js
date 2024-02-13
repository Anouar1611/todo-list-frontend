import React, { Component } from "react";
import TodoDataService from "../services/todo.service";
import { Link } from "react-router-dom";
import { withRouter } from '../common/with-router';

class TodoListItems extends Component {
    constructor(props) {
        super(props);
        this.retrieveItems = this.retrieveItems.bind(this);

        this.state = {
            listOfItems: [],
            todoListId: null,
            itemId: null,
        };
    }

    componentDidMount() {
        this.retrieveItems(this.props.router.params.id);
        this.setState({
            ...this.state,
            todoListId: this.props.router.params.id,
        })
    }

    retrieveItems(id) {
        TodoDataService.getAllItems(id)
            .then(response => {
                this.setState({
                    listOfItems: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteItem(id, itemId) {
        TodoDataService.deleteItem(id, itemId)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/todos');
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        const { listOfItems } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Todo List Items</h4>
                    <ul className="list-group">
                        {listOfItems &&
                            listOfItems.map((item, index) => (
                                <li
                                    key={index}
                                >
                                    <div className="col-md-10">
                                            <div>
                                                <div>
                                                    <label>
                                                        <strong>Name:</strong>
                                                    </label>{" "}
                                                    {item.name}
                                                </div>
                                                <div>
                                                    <label>
                                                        <strong>State:</strong>
                                                    </label>{" "}
                                                    {item.state}
                                                </div>
                                                <button
                                                    className="badge badge-danger mr-2"
                                                    onClick={() => { this.deleteItem(this.state.todoListId, item.id) }
                                                    }
                                                >
                                                    Delete
                                                </button>
                                                <Link
                                                    to={"/todos/" + this.state.todoListId + "/items/" + item.id}
                                                    className="badge badge-warning"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    }
}
export default withRouter(TodoListItems);
