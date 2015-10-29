import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TodoList from '../../todo/TodoList';
import AddTodo from '../../todo/AddTodo';
import * as actions from '../actions';

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  render() {
    const { todos, actions } = this.props;

    return (
      <div className="app">
        <AddTodo onClickAdd={actions.addTodo} />
        <TodoList todos={todos}
                  onClickDelete={actions.deleteTodo}
                  onClickCheckbox={actions.changeComplete} />
      </div>
    );
  }

}
