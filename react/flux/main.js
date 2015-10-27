import { EventEmitter } from 'events';

class Store extends EventEmitter {
  // dispatcherを受け取る
  constructor(dispatcher) {
    super();
    this.state = { count: 0 };
    dispatcher.on('countup', this.onCountUp.bind(this));
    dispatcher.on('countdown', this.onCountDown.bind(this));
  }

  // stateを取り出すメソッド
  getState() {
    return this.state;
  }

  onCountUp() {
    this.state = { count: this.state.count + 1 };
    this.emit('CHANGE');
  }

  onCountDown() {
    this.state = { count: this.state.count - 1 };
    this.emit('CHANGE');
  }

}

class ActionCreator {

  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  countUp() {
    this.dispatcher.emit('countup');
  }

  countDown() {
    this.dispatcher.emit('countdown');
  }

}
