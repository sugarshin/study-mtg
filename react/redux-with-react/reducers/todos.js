import { ADD_TODO, COMPLETE_TODO, DELETE_TODO } from '../actions';

const initialState = {
  todos: []
};

export default function todos(state = initialState, action) {
  switch (action.type) {

  case ADD_TODO:
    return Object.assign({}, state, {
      todos: [...state.todos, action.todo]
    });

  case DELETE_TODO:
    return Object.assign({}, state, {
      todos: state.todos.filter(todo => todo.id !== action.id)
    });

  case COMPLETE_TODO:
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
