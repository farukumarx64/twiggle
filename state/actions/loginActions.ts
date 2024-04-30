// actions/signUpActions.ts
import { LoginActionTypes, LoginState } from '../reducers/login-reducer';

export const updateLoginInfo = (payload: Partial<LoginState>) => ({
  type: LoginActionTypes.UPDATE_LOGIN_INFO,
  payload,
});

export const addLoginInfo = (payload: LoginState) => ({
  type: LoginActionTypes.ADD_LOGIN_INFO,
  payload,
});
