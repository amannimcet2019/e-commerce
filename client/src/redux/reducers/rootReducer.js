import * as loginReducer from './loginReducer';
import  { combineReducers } from 'redux';

const rootReducer = combineReducers({
    [loginReducer.featureKey]:loginReducer.loginReducer
})

export default rootReducer;