import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  signInWithGooglePopup,
  signOutUser,
} from "../config/firebase/firebase.utils";

export const checkUserSessionAction = createAsyncThunk(
  "auth/session",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = await getCurrentUser();
      console.log(user);
      return user;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { user } = await signInWithGooglePopup();

      console.log(user);
      return user;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const logoutUserAction = createAsyncThunk(
  "auth/logout",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = await signOutUser();

      return user;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: null,
    isLoggedInGuest: false,
  },
  reducers: {
    loginGuest(state) {
      state.isLoggedInGuest = true;
    },
    logoutGuest(state) {
      state.isLoggedInGuest = false;
    },
  },

  extraReducers: (builder) => {
    // CHECK USER
    builder.addCase(checkUserSessionAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(checkUserSessionAction.fulfilled, (state, action) => {
      console.log(action.payload);

      state.userAuth = action.payload;
      state.loading = false;
    });
    builder.addCase(checkUserSessionAction.rejected, (state, action) => {
      state.loading = false;
    });

    // LOGIN USER
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userAuth = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
    });

    // LOGOUT USER
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const selectUser = (state) => state.auth.user;

export const authActions = authSlice.actions;

export default authSlice;

// state.appError = undefined;
// state.serverError = undefined;
