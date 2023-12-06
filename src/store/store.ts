import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import categorySlice from "./categorySlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  category: categorySlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
