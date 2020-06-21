import { combineReducers } from 'redux';
import todos from './todos';
import session from './session';

export default combineReducers({
    todos, 
    session
});