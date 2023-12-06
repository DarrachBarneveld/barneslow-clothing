import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import cartSlice from "./cartSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  category: categorySlice.reducer,
  cart: cartSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
