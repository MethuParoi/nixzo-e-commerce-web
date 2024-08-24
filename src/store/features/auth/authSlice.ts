import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: string;
}

let user = "general";

if (typeof window !== "undefined") {
  const userData = localStorage.getItem("auth");
  user = userData ? JSON.parse(userData) : "general";
}
// console.log(user);

const initialState: AuthState = {
  user,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<void>) => {
      state.user = "admin";
      // Save to localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
    setGeneral: (state, action: PayloadAction<void>) => {
      state.user = "general";
      // Save to localStorage
      localStorage.removeItem("auth");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdmin, setGeneral } = authSlice.actions;

export default authSlice.reducer;
