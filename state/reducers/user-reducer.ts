// reducer/user-reducer.ts
import { HeaderCardProps } from "+/application/links/links-card";
import { Reducer } from "redux";

// Define the interface for the user state
export interface UserState {
  username: string;
  profilePic: string;
  bio: string;
  profileTitle: string;
  header: HeaderCardProps[]; // Assuming links are represented as an array of header card
}

// Define action types
export enum UserActionTypes {
  UPDATE_USER_INFO = "UPDATE_USER_INFO",
  ADD_USER_HEADER = "ADD_USER_HEADER",
  ADD_USER_LINK = "ADD_USER_LINK",
}

// Define action interfaces
interface UpdateUserInfoAction {
  type: UserActionTypes.UPDATE_USER_INFO;
  payload: Partial<UserState>; // Partial type to allow updating only specific fields
}

export interface AddUserHeaderAction {
  type: UserActionTypes.ADD_USER_HEADER;
  payload: HeaderCardProps;
}

export interface AddUserLinkAction {
  type: UserActionTypes.ADD_USER_LINK;
  payload: HeaderCardProps;
}

// Define a union type for all possible actions
type UserAction = UpdateUserInfoAction | AddUserHeaderAction
| AddUserLinkAction | UnknownAction;

// Define the initial state for the user reducer
const initialState: UserState = {
  username: "",
  profilePic: "",
  bio: "",
  profileTitle: "",
  header: [],
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
