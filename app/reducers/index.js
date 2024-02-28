import { combineReducers } from 'redux';
import authReducer from './authReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    // reducers
});

export default rootReducer;
