// store/sortProductSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOptions: [],
};

const sortProductSlice = createSlice({
  name: "sortProduct",
  initialState,
  reducers: {
    setSelectedOptions: (state, action) => {
      state.selectedOptions = action.payload;
    },
  },
});

export const { setSelectedOptions } = sortProductSlice.actions;
export default sortProductSlice.reducer;
