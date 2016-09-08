import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todos from './todos';
import charts from './reducer';

export default combineReducers({
    charts,
    todos,
    routing: routerReducer
});
