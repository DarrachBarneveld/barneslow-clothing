import { AnyAction } from "redux";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInFailure,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  signInSuccess,
} from "./user.action";

import { UserData } from "../../utils/firebase/firebase.utils";
import { act } from "react-dom/test-utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }

  if (
    signInFailure.match(
      action || signUpFailed.match(action) || signOutFailed.match(action)
    )
  ) {
    return { ...state, error: action.payload };
  }

  return state;
};
