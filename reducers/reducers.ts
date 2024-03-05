// store/reducers.ts
import { combineReducers } from 'redux';
// import your reducers here
import userReducer from './user-reducer';

export const rootReducer = combineReducers({
  // add your reducers here
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;