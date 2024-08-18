import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import sortProductReducer from "./features/sort-products/sortProductSlice";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sortProduct: sortProductReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
