import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {

  static get propTypes() {
    return {
      onClickAdd: PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <div>
        <input type="text" ref="input" placeholder="Todo name" />
        <button onClick={this.handleClickButton.bind(this)}>Add</button>
      </div>
    );
  }

  handleClickButton() {
    this.props.onClickAdd(this.refs.input.value);
  }

}
