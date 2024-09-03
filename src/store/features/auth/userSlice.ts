import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: string;
  user_name: string;
  user_avatar: string;
}

let user = "general";
let user_name = "";
let user_avatar = "";

// if (typeof window !== "undefined") {
//   const userData = localStorage.getItem("auth");
//   user = userData ? JSON.parse(userData) : "general";
// }
// console.log(user);

if (typeof window !== "undefined") {
  const userData = localStorage.getItem("auth");
  if (userData) {
    const parsedData = JSON.parse(userData);
    user = parsedData.user || "general";
    user_name = parsedData.user_name || "";
    user_avatar = parsedData.user_avatar || "";
  }
}

const initialState: UserState = {
  user,
  user_name,
  user_avatar,
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
    setUserName: (state, action: PayloadAction<void>) => {
      state.user_name = action.payload;
      // Save to localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
    setUserAvatar: (state, action: PayloadAction<void>) => {
      state.user_avatar = action.payload;
      // Save to localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
    //logout function
    setGeneral: (state, action: PayloadAction<void>) => {
      state.user = "general";
      // remove localStorage
      localStorage.removeItem("auth");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setGeneral, setUserName, setUserAvatar } =
  userSlice.actions;

export default userSlice.reducer;
