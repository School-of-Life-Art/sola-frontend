import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    // reducers
});

export default rootReducer;
