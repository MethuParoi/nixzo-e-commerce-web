import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  // value: number;
  user: string;
}

const initialState: AuthState = {
  // value: 0,
  user: "general",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    setAdmin: (state, action: PayloadAction<void>) => {
      state.user = "admin";
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setAdmin } = authSlice.actions;
export const { setAdmin } = authSlice.actions;

export default authSlice.reducer;
