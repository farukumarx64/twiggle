import { HeaderCardProps } from "+/application/links/links-card";
import { AddUserHeaderAction, AddUserLinkAction, UserActionTypes, UserState } from "@/state/reducers/user-reducer";

// actions/userActions.ts
export const updateUserInfo = (payload: Partial<UserState>) => ({
  type: UserActionTypes.UPDATE_USER_INFO,
  payload,
});

export const addUserHeader = (header: HeaderCardProps[]) => ({
  type: UserActionTypes.ADD_USER_HEADER,
  payload: header,
});

export const addUserLink = (link: HeaderCardProps[]) => ({
  type: UserActionTypes.ADD_USER_LINK,
  payload: link,
});