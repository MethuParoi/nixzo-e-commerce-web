import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: string;
}

let user = "general";

if (typeof window !== "undefined") {
  const userData = localStorage.getItem("auth");
  user = userData ? JSON.parse(userData) : "general";
}
// console.log(user);

const initialState: UserState = {
  user,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<void>) => {
      state.user_id = action.payload;
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
export const { setUser, setGeneral } = userSlice.actions;

export default userSlice.reducer;
