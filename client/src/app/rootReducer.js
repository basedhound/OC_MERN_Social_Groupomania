// Redux
import { combineReducers } from 'redux';
// Reducers
import modalReducer from '../features/modalSlice';

export default combineReducers({
	modal: modalReducer,
});
