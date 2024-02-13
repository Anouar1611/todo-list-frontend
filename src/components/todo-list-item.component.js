import React, { Component } from "react";
import TodoDataService from "../services/todo.service";
import { Link } from "react-router-dom";
import { withRouter } from '../common/with-router';

class TodoListItem extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeState= this.onChangeState.bind(this)
        this.updateItem= this.updateItem.bind(this)
        this.state = {
            todoListId: null,
            currentItem: {
                id: null,
                name: '',
                state: 'COMPLETED',
            },
        };
    }

    componentDidMount() {
        this.setState({
            currentItem: {
                id: this.props.router.params.itemId,
                name: '',
                state: 'COMPLETED',
            },
            todoListId: this.props.router.params.id,
        })
    }

    updateItem() {
        TodoDataService.updateItem(this.state.todoListId, this.state.currentItem.id, this.state.currentItem)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/todos');
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentItem: {
                    ...prevState.currentItem,
                    name: name
                }
            };
        });
    }

    onChangeState(e) {
        const state = e.target.value ? 'COMPLETED' : 'TODO';
        console.log(state)
        this.setState(prevState => ({
            currentItem: {
                ...prevState.currentItem,
                state: state
            }
        }));
    }
    render() {
        const { currentItem } = this.state;

        return (
            <div>
                {currentItem ? (
                    <div className="edit-form">
                        <h4>TodoListItem</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentItem.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <input
                                    type="checkbox"
                                    className="form-control"
                                    id="state"
                                    defaultChecked={currentItem.state}
                                    onChange={this.onChangeState}
                                />
                            </div>
                        </form>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateItem}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : 'Loading'}

            </div>
        );
    }
}
export default withRouter(TodoListItem);
