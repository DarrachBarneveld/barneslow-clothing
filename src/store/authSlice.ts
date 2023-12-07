import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signOutUser,
} from "../config/firebase/firebase.utils";

export const checkUserSessionAction = createAsyncThunk(
  "auth/session",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  },
);

export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (_, { rejectWithValue }) => {
    try {
      const { user } = await signInWithGooglePopup();

      await createUserDocumentFromAuth(user);

      return user;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  },
);

export const logoutUserAction = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const user = await signOutUser();

      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export interface RootAuthState {
  auth: AuthState;
}

interface AuthState {
  userAuth: any;
  loading: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: null as any | null,
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    // CHECK USER
    builder.addCase(checkUserSessionAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkUserSessionAction.fulfilled, (state, action) => {
      state.userAuth = action.payload;
      state.loading = false;
    });
    builder.addCase(checkUserSessionAction.rejected, (state) => {
      state.loading = false;
    });

    // LOGIN USER
    builder.addCase(loginUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state) => {
      state.loading = false;
    });

    // LOGOUT USER
    builder.addCase(logoutUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUserAction.fulfilled, (state) => {
      state.userAuth = undefined;
      state.loading = false;
    });
    builder.addCase(logoutUserAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice;
