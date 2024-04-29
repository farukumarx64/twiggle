// reducer/user-reducer.ts
import { Reducer } from "redux";

// Define the interface for the user state
export interface SignUpState {
  username: string;
  email: string;
  password: string;
  fullname: string;
  category: string; // Assuming links are represented as an array of header card
  subcategory: string;
}

// Define action types
export enum SignUpActionTypes {
  UPDATE_SIGNUP_INFO = "UPDATE_SIGNUP_INFO",
  ADD_SIGNUP_INFO = "ADD_SIGNUP_INFO",
}

// Define action interfaces
interface UpdateSignUpInfoAction {
  type: SignUpActionTypes.UPDATE_SIGNUP_INFO;
  payload: Partial<SignUpState>; // Partial type to allow updating only specific fields
}

export interface AddSignUpInfoAction {
  type: SignUpActionTypes.ADD_SIGNUP_INFO;
  payload: SignUpState;
}


// Define a union type for all possible actions
type SignUpAction = UpdateSignUpInfoAction | AddSignUpInfoAction
 | UnknownAction;

// Define the initial state for the user reducer
const initialState: SignUpState = {
  username: "",
  email: "",
  password: "",
  fullname: "",
  category: "", 
  subcategory: "",
};

// Define the user reducer function
const signUpReducer: Reducer<SignUpState, SignUpAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SignUpActionTypes.UPDATE_SIGNUP_INFO:
      return {
        ...state,
        ...action.payload, // Update only the specified fields
      };
    default:
      return state;
  }
};

export default signUpReducer;

// Define UnknownAction
interface UnknownAction {
  type: string;
  [key: string]: any; // allow any other properties
}
