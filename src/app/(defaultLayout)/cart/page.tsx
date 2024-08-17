"use client";

import Cart from "@/components/cart/Cart";
import { store } from "../../../store/store";
import React from "react";
import { Provider } from "react-redux";

function page() {
  return (
    <Provider store={store}>
      <div>
        <Cart />
      </div>
    </Provider>
  );
}

export default page;
