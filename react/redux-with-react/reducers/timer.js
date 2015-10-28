import { START_TIMER, STOP_TIMER, RESET_TIMER, TICK } from '../actions';

const initialState = {
  time: 0,
  isRun: false
};

export default function timer(state = initialState, action) {
  switch (action.type) {

  case START_TIMER:
    return Object.assign({}, state, { isRun: true });

  case STOP_TIMER:
    return Object.assign({}, state, { isRun: false });

  case RESET_TIMER:
    return Object.assign({}, state, { time: 0 });

  case TICK:
    return Object.assign({}, state, {
      time: state.time + action.tick
    });

  default:
    return state;

  }
}
