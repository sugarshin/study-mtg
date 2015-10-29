import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {

  static propTypes = {
    onClickAdd: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <input type="text" ref="input" placeholder="Todo name" />
        <button onClick={::this.handleClickButton}>Add</button>
      </div>
    );
  }

  handleClickButton() {
    this.props.onClickAdd(this.refs.input.value);
  }

}
