import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: string;
}

const initialState: AuthState = {
  user: "general",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<void>) => {
      state.user = "admin";
    },
    setGeneral: (state, action: PayloadAction<void>) => {
      state.user = "general";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdmin, setGeneral } = authSlice.actions;

export default authSlice.reducer;
