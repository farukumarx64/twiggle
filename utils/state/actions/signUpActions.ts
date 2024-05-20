// actions/signUpActions.ts
import { SignUpActionTypes, SignUpState } from '../reducers/signup-reducer';

export const updateSignUpInfo = (payload: Partial<SignUpState>) => ({
  type: SignUpActionTypes.UPDATE_SIGNUP_INFO,
  payload,
});

export const addSignUpInfo = (payload: SignUpState) => ({
  type: SignUpActionTypes.ADD_SIGNUP_INFO,
  payload,
});
