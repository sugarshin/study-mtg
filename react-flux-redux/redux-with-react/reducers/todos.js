import { ADD_TODO, CHANGE_COMPLETE, DELETE_TODO } from '../actions';

const initialState = {
  todos: []
};

export default function todos(state = initialState, action) {
  switch (action.type) {

  case ADD_TODO:
    return Object.assign({}, state, {
      todos: [...state.todos, {
        id: Date.now(),
        complete: false,
        text: action.text
      }]
    });

  case DELETE_TODO:
    return Object.assign({}, state, {
      todos: state.todos.filter(todo => todo.id !== action.id)
    });

  case CHANGE_COMPLETE:
    return Object.assign({}, state, {
      todos: state.todos.map(todo => {
        if (todo.id === action.id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    });

  default:
    return state;

  }
}
