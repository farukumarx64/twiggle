// reducer/user-reducer.ts
import { Reducer } from "redux";

// Define the interface for the user state
export interface LoginState {
  username: string;
  email: boolean;
  password: string;
}

// Define action types
export enum LoginActionTypes {
  UPDATE_LOGIN_INFO = "UPDATE_LOGIN_INFO",
  ADD_LOGIN_INFO = "ADD_LOGIN_INFO",
}

// Define action interfaces
interface UpdateLoginInfoAction {
  type: LoginActionTypes.UPDATE_LOGIN_INFO;
  payload: Partial<LoginState>; // Partial type to allow updating only specific fields
}

export interface AddLoginInfoAction {
  type: LoginActionTypes.ADD_LOGIN_INFO;
  payload: LoginState;
}


// Define a union type for all possible actions
type LoginAction = UpdateLoginInfoAction | AddLoginInfoAction
 | UnknownAction;

// Define the initial state for the user reducer
const initialState: LoginState = {
  username: "",
  email: false,
  password: "",
};

// Define the user reducer function
const loginReducer: Reducer<LoginState, LoginAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LoginActionTypes.UPDATE_LOGIN_INFO:
      return {
        ...state,
        ...action.payload, // Update only the specified fields
      };
    default:
      return state;
  }
};

export default loginReducer;

// Define UnknownAction
interface UnknownAction {
  type: string;
  [key: string]: any; // allow any other properties
}
