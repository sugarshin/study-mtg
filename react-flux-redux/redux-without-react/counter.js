import { createStore } from 'redux';

const COUNT_UP = 'COUNT_UP';
const COUNT_DOWM = 'COUNT_DOWM';

function countUp() {
  return { type: COUNT_UP };
}

function countDown() {
  return { type: COUNT_DOWM };
}

function reducer(state = 0, action) {
  switch (action.type) {

  case COUNT_UP:
    return state + 1;

  case COUNT_DOWM:
    return state - 1;

  default:
    return state;

  }
}

const store = createStore(reducer);

function render() {
  document.querySelector('.count').textContent = store.getState();
}

store.subscribe(render);
document.querySelector('.count-up').addEventListener('click', () => store.dispatch(countUp()));
document.querySelector('.count-down').addEventListener('click', () => store.dispatch(countDown()));

render();
