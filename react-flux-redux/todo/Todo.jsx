import React, { Component, PropTypes } from 'react';

export default class Todo extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    onClickCheckbox: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
  };

  render() {
    const { complete, text } = this.props;

    return (
      <div style={{
        opacity: complete ? .5 : 1,
        textDecoration: complete ? 'line-through' : 'none'
      }}>
        <input type="checkbox" checked={complete} onChange={::this.handleClickCheckbox} />
        <span>{text}</span>
        <button onClick={::this.handleClickDelete}>Delete</button>
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
