import { combineReducers } from 'redux';

import timer from './timer';
import record from './record';

export default combineReducers({ timer, record });
