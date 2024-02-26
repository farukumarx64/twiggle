// store/reducers.ts
import { combineReducers } from 'redux';
// import your reducers here
import userReducer from './userReducer';

const rootReducer = combineReducers({
  // add your reducers here
  users: userReducer,
});

export default rootReducer;
