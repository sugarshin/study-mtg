import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      complete: PropTypes.bool
    })).isRequired,
    onClickDelete: PropTypes.func.isRequired,
    onClickCheckbox: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>{this.renderTodos()}</div>
    );
  }

  renderTodos() {
    const { onClickDelete, onClickCheckbox, todos } = this.props;
    return todos.map(todo => (
      <Todo key={todo.id}
            onClickDelete={onClickDelete}
            onClickCheckbox={onClickCheckbox}
            { ...todo } />
    ));
  }

}
