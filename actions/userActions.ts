import { UserActionTypes, UserState } from "@/reducers/user-reducer";

// actions/userActions.ts
export const updateUserInfo = (payload: Partial<UserState>) => ({
  type: UserActionTypes.UPDATE_USER_INFO,
  payload,
});
