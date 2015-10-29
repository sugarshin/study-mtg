export const ADD_TODO = 'ADD_TODO';
export function addTodo(text) {
  return { type: ADD_TODO, text };
}

export const DELETE_TODO = 'DELETE_TODO';
export function deleteTodo(id) {
  return { type: DELETE_TODO, id };
}

export const CHANGE_COMPLETE = 'CHANGE_COMPLETE';
export function changeComplete(id) {
  return { type: CHANGE_COMPLETE, id };
}
