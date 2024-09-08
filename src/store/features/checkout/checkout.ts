// import { createSlice } from "@reduxjs/toolkit";

// let subtotal: any = 0;
// let shipping_cost: any = 0;
// let total: any = 0;

// if (typeof window !== "undefined") {
//   const checkoutData = localStorage.getItem("checkout");
//   if (checkoutData) {
//     const parsedData = JSON.parse(checkoutData);
//     subtotal = parsedData.subtotal || 0;
//     shipping_cost = parsedData.shipping_cost || 0;
//     total = parsedData.total || 0;
//   }
// }

// const initialState = {
//   subtotal,
//   shipping_cost,
//   total,
//   // size: "",
// };

// const checkoutSlice = createSlice({
//   name: "checkout",
//   initialState,
//   reducers: {
//     setSubtotal: (state, action) => {
//       state.subtotal = action.payload;
//       localStorage.setItem("checkout", JSON.stringify(state.subtotal));
//     },
//     setShippingCost: (state, action) => {
//       state.shipping_cost = action.payload;
//       localStorage.setItem("checkout", JSON.stringify(state.shipping_cost));
//     },
//     setTotal: (state, action) => {
//       state.total = action.payload;
//       localStorage.setItem("checkout", JSON.stringify(state.total));
//     },
//     // setSize: (state, action) => {
//     //   state.size = action.payload;
//     // },
//   },
// });

// export const { setSubtotal, setShippingCost, setTotal } = checkoutSlice.actions;
// export default checkoutSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

let subtotal: number = 0;
let shipping_cost: number = 0;
let total: number = 0;

if (typeof window !== "undefined") {
  const checkoutData = localStorage.getItem("checkout");
  if (checkoutData) {
    const parsedData = JSON.parse(checkoutData);
    subtotal = parsedData.subtotal || 0;
    shipping_cost = parsedData.shipping_cost || 0;
    total = parsedData.total || 0;
  }
}

const initialState = {
  subtotal,
  shipping_cost,
  total,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
      localStorage.setItem(
        "checkout",
        JSON.stringify({ ...state, subtotal: action.payload })
      );
    },
    setShippingCost: (state, action) => {
      state.shipping_cost = action.payload;
      localStorage.setItem(
        "checkout",
        JSON.stringify({ ...state, shipping_cost: action.payload })
      );
    },
    setTotal: (state, action) => {
      state.total = action.payload;
      localStorage.setItem(
        "checkout",
        JSON.stringify({ ...state, total: action.payload })
      );
    },
  },
});

export const { setSubtotal, setShippingCost, setTotal } = checkoutSlice.actions;
export default checkoutSlice.reducer;
