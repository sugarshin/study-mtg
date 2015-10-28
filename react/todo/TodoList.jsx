import React, { Component } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';

export default class TodoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }

  render() {
    return (
      <div>
        <AddTodo onClickAdd={this.addTodo.bind(this)} />
        <ul>{this.renderTodos()}</ul>
      </div>
    );
  }

  renderTodos() {
    return this.state.todos.map(todo => (
      <Todo key={todo.id}
            onClickDelete={this.deleteTodo.bind(this)}
            onClickCheckbox={this.changeComplete.bind(this)}
            {...todo} />
    ));
  }

  addTodo(text) {
    this.setState({
      todos: [...this.state.todos, {
        id: Date.now(),
        complete: false,
        text
      }]
    });
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  changeComplete(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    });
  }

}
