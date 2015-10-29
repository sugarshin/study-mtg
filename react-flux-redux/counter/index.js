import React, { Component } from 'react';
import { render } from 'react-dom';

class Counter extends Component {

  constructor() {
    super();

    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={::this.handleClickUp}>Count up</button>
        <button onClick={::this.handleClickDown}>Count down</button>
      </div>
    );
  }

  handleClickUp() {
    this.setState({ count: this.state.count + 1 });
  }

  handleClickDown() {
    this.setState({ count: this.state.count - 1 });
  }

}

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

render(<Counter />, rootEl);
