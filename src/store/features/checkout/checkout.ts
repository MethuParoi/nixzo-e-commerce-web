import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subtotal: 0,
  shipping_cost: 0,
  total: 0,
  // size: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },
    setShippingCost: (state, action) => {
      state.shipping_cost = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    // setSize: (state, action) => {
    //   state.size = action.payload;
    // },
  },
});

export const { setSubtotal, setShippingCost, setTotal } = checkoutSlice.actions;
export default checkoutSlice.reducer;
