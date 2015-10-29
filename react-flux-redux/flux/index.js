import React, { Component } from 'react';
import { render } from 'react-dom';
import { EventEmitter } from 'events';

// Store
class Store extends EventEmitter {

  constructor(dispatcher) {
    super();

    // stateの初期化
    this.state = { count: 0 };

    // dispatcherを受け取って
    // それぞれのアクションの名前にリスナを登録
    dispatcher.on('countup', ::this.onCountUp);
    dispatcher.on('countdown', ::this.onCountDown);
  }

  // 外部からstateにアクセスできるようにしておく
  getState() {
    return this.state;
  }

  // 'countup'アクションが渡ってきたとき（'countup'イベントがemitされたとき）のコールバック
  // 同時に 'CHANGE' イベントをemitする
  // listenしてるView（React）にstateが更新されたことが通知される
  onCountUp(count) {
    this.state = { count: this.state.count + count };
    this.emit('CHANGE');
  }

  onCountDown(count) {
    this.state = { count: this.state.count - count };
    this.emit('CHANGE');
  }

}


// Action Creator
class ActionCreator {

  // Storeと同じdispatcherを受け取る
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  // 'countup'イベントをemit
  countUp(count) {
    this.dispatcher.emit('countup', count);
  }

  countDown(count) {
    this.dispatcher.emit('countdown', count);
  }

}

// Dispatcher
const dispatcher = new EventEmitter();

const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);


// View
class Counter extends Component {

  constructor() {
    super();

    const { count } = store.getState();
    this.state = { count };

    store.on('CHANGE', ::this.onChangeState);
  }

  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={::this.handleClickUp}>Count up</button>
        <button onClick={::this.handleClickDown}>Count down</button>
        <select defaultValue="1" ref="rate">
          <option value="1">1</option>
          <option value="10">10</option>
        </select>
      </div>
    );
  }

  onChangeState() {
    const { count } = store.getState();
    this.setState({ count });
  }

  handleClickUp() {
    action.countUp(+this.refs.rate.value);
  }

  handleClickDown() {
    action.countDown(+this.refs.rate.value);
  }

}


const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

render(<Counter />, rootEl);
