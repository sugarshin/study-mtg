import { createStore } from 'redux';

import todosReducer from '../reducers/todos';

export default function configureStore(initialState) {
  return createStore(todosReducer, initialState);
}
