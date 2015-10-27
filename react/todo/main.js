import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Todo extends Component {
  render() {
    return (
      <div style={{
        opacity: this.props.complete ? .5 : 1,
        textDecoration: this.props.complete ? 'line-through' : 'none'
      }}>
        <input type="checkbox" checked={this.props.complete} onChange={this.handleClickCheckbox.bind(this)} />
        <span>{this.props.text}</span>
        <button onClick={this.handleClickDelete.bind(this)}>Delete</button>
      </div>
    );
  }

  handleClickCheckbox() {
    this.props.onClickCheckbox(this.props.id);
  }

  handleClickDelete() {
    this.props.onClickDelete(this.props.id);
  }
}

class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type="text" ref="inputtext" placeholder="task name" />
        <button onClick={this.handleClickButtonAdd.bind(this)}>Add</button>
      </div>
    );
  }

  handleClickButtonAdd() {
    this.props.onClickAdd(this.refs.inputtext.value);
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }

  render() {
    const todos = this.state.todos.map(todo => (
      <Todo key={todo.id} onClickDelete={this.deleteTodo.bind(this)} onClickCheckbox={this.changeComplete.bind(this)} {...todo} />
    ));

    return (
      <div>
        <AddTodo onClickAdd={this.addTodo.bind(this)} />
        <ul>{todos}</ul>
      </div>
    );
  }

  addTodo(text) {
    this.setState({
      todos: [...this.state.todos, {
        id: Date.now(),
        text,
        complete: false
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

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

ReactDOM.render(<TodoList />, rootEl);
