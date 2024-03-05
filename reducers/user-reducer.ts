// reducer/user-reducer.ts
import { HeaderCardProps } from "+/application/links/links-card";
import { Reducer } from "redux";

// Define the interface for the user state
export interface UserState {
  username: string;
  profilePic: string;
  bio: string;
  profileTitle: string;
  header: HeaderCardProps[];
  links: HeaderCardProps[]; // Assuming links are represented as an array of strings
}

// Define action types
export enum UserActionTypes {
  UPDATE_USER_INFO = "UPDATE_USER_INFO",
}

// Define action interfaces
interface UpdateUserInfoAction {
  type: UserActionTypes.UPDATE_USER_INFO;
  payload: Partial<UserState>; // Partial type to allow updating only specific fields
}

// Define a union type for all possible actions
type UserAction = UpdateUserInfoAction | UnknownAction;

// Define the initial state for the user reducer
const initialState: UserState = {
  username: "",
  profilePic: "",
  bio: "",
  profileTitle: "",
  header: [],
  links: [],
};

// Define the user reducer function
const userReducer: Reducer<UserState, UserAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER_INFO:
      return {
        ...state,
        ...action.payload, // Update only the specified fields
      };
    default:
      return state;
  }
};

export default userReducer;

// Define UnknownAction
interface UnknownAction {
  type: string;
  [key: string]: any; // allow any other properties
}
