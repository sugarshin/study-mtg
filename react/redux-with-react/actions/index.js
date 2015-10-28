export const START_TIMER = 'START_TIMER';
export function startTimer() {
  return (dispatch, getState) => {
    if (shouldStartTimer(getState())) {
      return { type: START_TIMER };
    }
  };
}

function shouldStartTimer(state) {
  return state.timer.isRun ? false : true;
}

export const STOP_TIMER = 'STOP_TIMER';
export function stopTimer() {
  return { type: STOP_TIMER };
}

export const RESET_TIMER = 'RESET_TIMER';
export function resetTimer() {
  return { type: RESET_TIMER };
}

function shouldStartTimer(state) {
  return state.timer.isRun ? false : true;
}

export const TICK = 'TICK';
export function tick(tick) {
  return { type: TICK, tick };
}

export const ADD_RECORD = 'ADD_RECORD';
export function addRecord(time) {
  return { type: ADD_RECORD, time };
}

export const DELETE_RECORD = 'DELETE_RECORD';
export function deleteRecord(time) {
  return { type: DELETE_RECORD, time };
}
