import CheckoutForm from "@/components/checkout/CheckoutForm";
import React from "react";

function page() {
  return (
    <div className="flex items-center justify-between gap-x-[4rem]">
      <div>
        <CheckoutForm />
      </div>
      <div>Checkout</div>
    </div>
  );
}

export default page;
