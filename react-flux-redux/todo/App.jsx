import React, { Component } from 'react';

import TodoList from './TodoList';
import AddTodo from './AddTodo';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }

  render() {
    return (
      <div>
        <AddTodo onClickAdd={::this.addTodo} />
        <TodoList todos={this.state.todos}
                  onClickDelete={::this.deleteTodo}
                  onClickCheckbox={::this.changeComplete} />
      </div>
    );
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
