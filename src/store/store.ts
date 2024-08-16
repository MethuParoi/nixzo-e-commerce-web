import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import sortProductReducer from "./features/sort-products/sortProductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sortProduct: sortProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
