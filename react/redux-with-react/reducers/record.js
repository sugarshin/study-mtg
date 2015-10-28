import { ADD_RECORD, DELETE_RECORD } from '../actions';

const initialState = {
  records: []
};

export default function record(state = initialState, action) {
  switch (action.type) {

  case ADD_RECORD:
    return Object.assign({}, state, {
      records: [...state.records, action.record]
    });

  case DELETE_RECORD:
    return Object.assign({}, state, {
      records: state.records.filter(r => r !== action.record)
    });

  default:
    return state;

  }
}
