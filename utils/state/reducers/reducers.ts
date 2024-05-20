// store/reducers.ts
import { combineReducers } from 'redux';
// import your reducers here
import userReducer from './user-reducer';
import signUpReducer from './signup-reducer';
import loginReducer from './login-reducer';

export const rootReducer = combineReducers({
  // add your reducers here
  user: userReducer,
  signup: signUpReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;