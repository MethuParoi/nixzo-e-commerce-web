"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import { placeOrder } from "../../../utils/placeOrder";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import { getCart } from "@/store/features/cart/cartSlice";
import Loader from "../ui/Loader/Loader";
import { toast } from "react-toastify";
import Image from "next/image";
import bkash from "../../../public/images/logo/bkash.png";
import nagad from "../../../public/images/logo/nagad.png";
import rocket from "../../../public/images/logo/rocket.png";

function CheckoutForm() {
  const [grandTotal, setGrandTotal] = useState(0);
  //select COD or OnlinePayment
  const [isSelected, setIsSelected] = useState("");
  //using redux store
  const without_discount_total = useSelector(
    (state) => state.checkout.subtotal
  );
  const total = useSelector((state) => state.checkout.total);
  // console.log("without_discount_total:", without_discount_total);
  // console.log("total:", total);
  const cart = useSelector(getCart);
  const formRef = useRef(null);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   watch,
  //   setValue,
  // } = useForm();

  const {
    register: registerCheckout,
    handleSubmit: handleSubmitCheckout,
    formState: { errors: errorsCheckout },
    watch: watchCheckout,
    setValue: setValueCheckout,
  } = useForm();

  const {
    register: registerTransaction,
    handleSubmit: handleSubmitTransaction,
    watch: watchTransaction,
    formState: { errors: errorsTransaction },
    setValue: setValueTransaction,
  } = useForm();

  //set shipping cost
  const [shippingCost, setShippingCost] = useState(0);
  const [total_price_with_shipping, setTotalPriceWithShipping] = useState(0);
  const districtValue = watchCheckout("District");

  useEffect(() => {
    if (districtValue && districtValue.toLowerCase().trim() === "dhaka") {
      setShippingCost(60);
      setTotalPriceWithShipping(total + 60);
    } else {
      setShippingCost(100);
      setTotalPriceWithShipping(total + 100);
    }
    console.log("price with shipping", total_price_with_shipping);
  }, [districtValue, total]);

  // Update the price_with_shipping field value
  useEffect(() => {
    setValueCheckout("total_price_with_shipping", total_price_with_shipping);
  }, [total_price_with_shipping, setValueCheckout]);

  // Update the shipping_cost field value
  useEffect(() => {
    setValueCheckout("shipping_cost", shippingCost);
  }, [shippingCost, setValueCheckout]);

  //set grand total
  useEffect(() => {
    setGrandTotal(total + shippingCost);
  }, [total, shippingCost]);

  //set paymentmethod
  useEffect(() => {
    setValueCheckout("payment_method", isSelected);
  }, [isSelected, setValueCheckout]);

  const onSubmitCheckout = (data) => {
    const filteredData = Object.keys(data)
      .filter(
        (key) =>
          key.includes("_") ||
          key == "District" ||
          key == "Email" ||
          key == "Total_price" ||
          key == "Without_discount_price" ||
          key == "total_price_with_shipping" ||
          key == "Cart_items" ||
          key == "zip_code" ||
          key == "shipping_cost" ||
          key == "payment_method"
      )
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
    return filteredData;
    // console.log(filteredData);
    // placeOrder(filteredData);
  };
  //transaction validation-------------------
  const [invalid, setInvalid] = useState(false);

  const accountNo = watchTransaction("account_number");
  const transId = watchTransaction("transaction_id");

  useEffect(() => {
    if (
      (accountNo && accountNo.length === 11) ||
      (transId && transId.length > 7)
    ) {
      setInvalid(false);
    }
    if (isSelected === "BkashPayment" || "NagadPayment" || "RocketPayment") {
      if (
        (accountNo && accountNo.length !== 11) ||
        (transId && transId.length < 7)
      ) {
        setInvalid(true);
      }
    }
  }, [accountNo, transId, isSelected]);

  const onSubmitTransaction = (data) => {
    const filteredData = Object.keys(data)
      .filter(
        (key) =>
          key.includes("_") ||
          key == "account_number" ||
          key == "transaction_id"
      )
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    return filteredData;
  };

  //submit all data
  const handleProceedToCheckout = async () => {
    try {
      let checkoutData;
      let transactionData;

      // Trigger the checkout form submission and get the data
      await handleSubmitCheckout((data) => {
        checkoutData = onSubmitCheckout(data); // get filtered data
      })();

      // Trigger the transaction form submission and get the data
      await handleSubmitTransaction((data) => {
        transactionData = onSubmitTransaction(data); // get filtered data
      })();

      console.log("checkout data", checkoutData);
      console.log("transaction data", transactionData);

      // Combine the data from both forms
      const combinedData = {
        ...checkoutData,
        ...transactionData,
      };

      console.log("combined data", combinedData);

      // Place the order with the combined data
      if (!transactionData && isSelected === "cashOnDelivery") {
        placeOrder(combinedData);
      }
      if (!transactionData && isSelected != "cashOnDelivery") {
        toast.error(" Enter payment details / Select a payment option", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      if (
        isSelected != "cashOnDelivery" &&
        isSelected != "" &&
        transactionData
      ) {
        placeOrder(combinedData);
      }
    } catch (error) {
      console.error("Error during form submission", error);
    }
  };

  //handel accordion
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  {
    /* unification of the payment data */
  }
  useEffect(() => {
    if (isSelected === "BkashPayment") {
      setValueTransaction(
        "account_number",
        watchTransaction("Bkash_account_number") || ""
      );
      setValueTransaction(
        "transaction_id",
        watchTransaction("Bkash_transaction_id") || ""
      );
    }
    console.log("selected", isSelected);
  }, [
    isSelected,
    watchTransaction("Bkash_account_number"),
    watchTransaction("Bkash_transaction_id"),
    watchTransaction,
    setValueTransaction,
  ]);

  useEffect(() => {
    if (isSelected === "NagadPayment") {
      setValueTransaction(
        "account_number",
        watchTransaction("Nagad_account_number") || ""
      );
      setValueTransaction(
        "transaction_id",
        watchTransaction("Nagad_transaction_id") || ""
      );
    }
    console.log("selected", isSelected);
  }, [
    isSelected,
    watchTransaction("Nagad_account_number"),
    watchTransaction("Nagad_transaction_id"),
    watchTransaction,
    setValueTransaction,
  ]);

  useEffect(() => {
    if (isSelected === "RocketPayment") {
      setValueTransaction(
        "account_number",
        watchTransaction("Rocket_account_number") || ""
      );
      setValueTransaction(
        "transaction_id",
        watchTransaction("Rocket_transaction_id") || ""
      );
    }
    console.log("selected", isSelected);
  }, [
    isSelected,

    watchTransaction("Rocket_account_number"),
    watchTransaction("Rocket_transaction_id"),
    watchTransaction,
    setValueTransaction,
  ]);

  return (
    <div className="flex items-start justify-between gap-x-[4rem] mr-[12rem]">
      <div>
        <h1 className="text-[2.5rem] font-semibold mb-[2rem]">CheckoutForm</h1>
        <div>
          <form ref={formRef} onSubmit={handleSubmitCheckout(onSubmitCheckout)}>
            <div className="flex items-center gap-x-[4rem]">
              <div className="mb-[3.5rem] relative">
                <p className="text-gray-600 font-medium">First Name*</p>
                <input
                  className="xl:w-[35rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] shadow-md mt-[1rem]"
                  type="text"
                  placeholder="First name"
                  {...registerCheckout("First_name", {
                    required: "First name is required",
                    minLength: { value: 3, message: "Minimum length is 3" },
                    maxLength: { value: 80, message: "Maximum length is 80" },
                  })}
                />
                {errorsCheckout.First_name && (
                  <p className="text-red-500 absolute">
                    {errorsCheckout.First_name.message}
                  </p>
                )}
              </div>
              <div className="mb-[3.5rem] relative">
                <p className="text-gray-600 font-medium">Last Name*</p>
                <input
                  className="w-[35rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                  type="text"
                  placeholder="Last name"
                  {...registerCheckout("Last_name", {
                    required: "Last name is required",
                    minLength: { value: 3, message: "Minimum length is 3" },
                    maxLength: { value: 100, message: "Maximum length is 100" },
                  })}
                />
                {errorsCheckout.Last_name && (
                  <p className="text-red-500 absolute">
                    {errorsCheckout.Last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-x-[4rem]">
              <div className="mb-[3.5rem] relative">
                <p className="text-gray-600 font-medium">Street address*</p>
                <input
                  className="w-[35rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                  type="text"
                  placeholder="Street address"
                  {...registerCheckout("Street_address", {
                    required: "Street address is required",
                    minLength: { value: 4, message: "Minimum length is 4" },
                  })}
                />
                {errorsCheckout.Street_address && (
                  <p className="text-red-500 absolute">
                    {errorsCheckout.Street_address.message}
                  </p>
                )}
              </div>

              <div className="mb-[3.5rem] relative">
                <p className="text-gray-600 font-medium">
                  Zip/Postal code (optional)
                </p>
                <input
                  className="w-[35rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                  type="text"
                  placeholder="Zip/Postal code"
                  {...registerCheckout("zip_code", {})}
                />
              </div>
            </div>

            <div className="mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">City/Upazila*</p>
              <input
                className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                type="text"
                placeholder="Town/City"
                {...registerCheckout("Town_City", {
                  required: "Town/City is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
              {errorsCheckout.Town_City && (
                <p className="text-red-500 absolute">
                  {errorsCheckout.Town_City.message}
                </p>
              )}
            </div>

            <div className="mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">District*</p>
              <input
                className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                type="text"
                placeholder="District"
                {...registerCheckout("District", {
                  required: "District is required",
                  minLength: { value: 2, message: "Minimum length is 2" },
                })}
              />
              {errorsCheckout.District && (
                <p className="text-red-500 absolute">
                  {errorsCheckout.District.message}
                </p>
              )}
            </div>

            <div className="mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">Mobile number*</p>
              <input
                className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                type="tel"
                placeholder="Mobile number"
                {...registerCheckout("Mobile_number", {
                  required: "Mobile number is required",
                  minLength: { value: 11, message: "Minimum length is 11" },
                  maxLength: { value: 11, message: "Maximum length is 11" },
                  pattern: {
                    value: /^01[0-9]{9}$/,
                    message: "Invalid mobile number",
                  },
                })}
              />
              {errorsCheckout.Mobile_number && (
                <p className="text-red-500 absolute">
                  {errorsCheckout.Mobile_number.message}
                </p>
              )}
            </div>

            <div className="mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">Email(optional)</p>
              <input
                className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                type="text"
                placeholder="Email"
                {...registerCheckout("Email", {
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errorsCheckout.Email && (
                <p className="text-red-500 absolute">
                  {errorsCheckout.Email.message}
                </p>
              )}
            </div>

            {/* hidden inputs */}
            <input
              className="hidden"
              type="text"
              {...registerCheckout("Total_price", {
                value: total,
              })}
            />

            <input
              className="hidden"
              type="text"
              {...registerCheckout("Without_discount_price", {
                value: without_discount_total,
              })}
            />

            <input
              className="hidden"
              type="text"
              {...registerCheckout("shipping_cost", {
                value: shippingCost,
              })}
            />

            <input
              className="hidden"
              type="text"
              {...registerCheckout("total_price_with_shipping", {
                value: total_price_with_shipping,
              })}
            />

            <input
              className="hidden"
              type="text"
              {...registerCheckout("Cart_items", {
                value: cart,
              })}
            />

            <input
              className="hidden"
              type="text"
              {...registerCheckout("payment_method", {
                value: isSelected,
              })}
            />

            <input type="submit" className="hidden" />
          </form>
        </div>
      </div>

      {/* checkout data */}
      <div className="mt-[8rem] relative">
        <div className="border-l-[.3rem] border-l-gray-400 pl-[4rem]">
          <div className="flex items-center justify-start">
            <h2 className="text-[2rem] font-medium">CART TOTALS</h2>
          </div>
          <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-400 mt-2" />
          <div className="flex items-center justify-between mt-[2rem]">
            <p className="text-[1.8rem] text-secondary-light font-medium">
              Subtotal
            </p>
            <p className="text-[1.8rem] font-bold">৳ {total}</p>
          </div>
          <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
          <div className="flex items-center justify-between mt-[2rem]">
            <p className="text-[1.8rem] text-secondary-light font-medium">
              {shippingCost === 60
                ? "Shipping (Inside Dhaka)"
                : "Shipping (Outside Dhaka)"}
            </p>
            {/* shipping cost to be updated */}
            <p className="text-[1.8rem] font-bold">৳ {shippingCost}</p>
          </div>

          <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
          <div className="flex items-center justify-between mt-[2rem] mb-[2rem]">
            <p className="text-[1.8rem] text-secondary-light font-medium">
              Total
            </p>
            <p className="text-[1.8rem] font-bold">৳ {grandTotal}</p>
          </div>

          <div className="">
            <Button
              // onClick={() => {
              //   if (formRef.current) {
              //     handleSubmit(onSubmit)();
              //   }
              // }}
              onClick={handleProceedToCheckout}
              disabled={invalid}
              type="auth"
              label="PROCEED TO CHECKOUT"
            />
          </div>

          {/* Payment Form */}
          <div className="mt-[4rem]">
            <form onSubmit={handleSubmitTransaction(onSubmitTransaction)}>
              <div className="mb-[3.5rem] relative">
                <p className="text-gray-600 font-medium mb-[1rem]">
                  Make Payment
                </p>
                {/* Cash on Delivery */}
                <div className="mb-[1rem]">
                  <div className="flex items-center mt-[1rem]">
                    <input
                      type="radio"
                      id="cashOnDelivery"
                      value="cashOnDelivery"
                      checked={isSelected === "cashOnDelivery"}
                      onChange={() => setIsSelected("cashOnDelivery")}
                    />
                    <label htmlFor="cashOnDelivery" className="ml-[1rem]">
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                {/* Accordion for Bkash */}
                <div
                  className="absolute"
                  id="accordion-collapse"
                  data-accordion="collapse"
                >
                  <h2 id="accordion-collapse-heading-1">
                    <button
                      type="button"
                      className="flex items-center justify-between w-[48rem] p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
                      data-accordion-target="#accordion-collapse-body-1"
                      aria-expanded={activeIndex === 1}
                      aria-controls="accordion-collapse-body-1"
                      onClick={() => {
                        toggleAccordion(1);
                        setIsSelected("BkashPayment");
                      }}
                    >
                      <div>
                        <input
                          type="radio"
                          id="BkashPayment"
                          value="BkashPayment"
                          checked={isSelected === "BkashPayment"}
                        />
                        <span className="ml-[1rem]">Pay with Bkash</span>
                      </div>
                      <div>
                        <Image
                          className="w-[3rem]"
                          src={bkash}
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                    </button>
                  </h2>
                  <div
                    id="accordion-collapse-body-1"
                    className={activeIndex === 1 ? "" : "hidden"}
                    aria-labelledby="accordion-collapse-heading-1"
                  >
                    <div className="p-5 border border-b-0 border-gray-400 bg-gray-200">
                      <div className="mb-[3.5rem] relative">
                        <p className="text-gray-600 font-medium">
                          Account number*
                        </p>
                        <input
                          className="w-[45rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                          type="tel"
                          placeholder="Account number"
                          {...registerTransaction(
                            "Bkash_account_number",
                            isSelected === "BkashPayment"
                              ? {
                                  required: "Mobile number is required",
                                  minLength: {
                                    value: 11,
                                    message: "Minimum length is 11",
                                  },
                                  maxLength: {
                                    value: 11,
                                    message: "Maximum length is 11",
                                  },
                                  pattern: {
                                    value: /^01[0-9]{9}$/,
                                    message: "Invalid account number",
                                  },
                                }
                              : {}
                          )}
                        />
                        {errorsTransaction.Bkash_account_number && (
                          <p className="text-red-500 absolute">
                            {errorsTransaction.Bkash_account_number.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-[3.5rem] relative">
                        <p className="text-gray-600 font-medium">
                          Transaction Id*
                        </p>
                        <input
                          className="w-[45rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                          type="tel"
                          placeholder="Transaction Id"
                          {...registerTransaction(
                            "Bkash_transaction_id",
                            isSelected === "BkashPayment"
                              ? {
                                  required: "Transaction Id is required",
                                  minLength: {
                                    value: 7,
                                    message: "Minimum length is 7",
                                  },
                                }
                              : {}
                          )}
                        />
                        {errorsTransaction.Bkash_transaction_id && (
                          <p className="text-red-500 absolute">
                            {errorsTransaction.Bkash_transaction_id.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Accordion for Nagad */}
                  <h2 id="accordion-collapse-heading-2">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
                      data-accordion-target="#accordion-collapse-body-2"
                      aria-expanded={activeIndex === 2}
                      aria-controls="accordion-collapse-body-2"
                      onClick={() => {
                        toggleAccordion(2);
                        setIsSelected("NagadPayment");
                      }}
                    >
                      <div>
                        <input
                          type="radio"
                          id="NagadPayment"
                          value="NagadPayment"
                          checked={isSelected === "NagadPayment"}
                        />
                        <span className="ml-[1rem]">Pay with Nagad</span>
                      </div>
                      <div>
                        <Image
                          className="w-[5rem]"
                          src={nagad}
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                    </button>
                  </h2>
                  <div
                    id="accordion-collapse-body-2"
                    className={activeIndex === 2 ? "" : "hidden"}
                    aria-labelledby="accordion-collapse-heading-2"
                  >
                    <div className="p-5 border border-b-0 border-gray-400 bg-gray-200">
                      <div className="mb-[3.5rem] relative">
                        <p className="text-gray-600 font-medium">
                          Account number*
                        </p>
                        <input
                          className="w-[45rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                          type="tel"
                          placeholder="Account number"
                          {...registerTransaction(
                            "Nagad_account_number",
                            isSelected === "NagadPayment"
                              ? {
                                  required: "Mobile number is required",
                                  minLength: {
                                    value: 11,
                                    message: "Minimum length is 11",
                                  },
                                  maxLength: {
                                    value: 11,
                                    message: "Maximum length is 11",
                                  },
                                  pattern: {
                                    value: /^01[0-9]{9}$/,
                                    message: "Invalid account number",
                                  },
                                }
                              : {}
                          )}
                        />
                        {errorsTransaction.Nagad_account_number && (
                          <p className="text-red-500 absolute">
                            {errorsTransaction.Nagad_account_number.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-[3.5rem] relative">
                        <p className="text-gray-600 font-medium">
                          Transaction Id*
                        </p>
                        <input
                          className="w-[45rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                          type="tel"
                          placeholder="Transaction Id"
                          {...registerTransaction(
                            "Nagad_transaction_id",
                            isSelected === "NagadPayment"
                              ? {
                                  required: "Transaction Id is required",
                                  minLength: {
                                    value: 7,
                                    message: "Minimum length is 7",
                                  },
                                }
                              : {}
                          )}
                        />
                        {errorsTransaction.Nagad_transaction_id && (
                          <p className="text-red-500 absolute">
                            {errorsTransaction.Nagad_transaction_id.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Accordion for Rocket */}
                  <h2 id="accordion-collapse-heading-3">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
                      data-accordion-target="#accordion-collapse-body-3"
                      aria-expanded={activeIndex === 3}
                      aria-controls="accordion-collapse-body-3"
                      onClick={() => {
                        toggleAccordion(3);
                        setIsSelected("RocketPayment");
                      }}
                    >
                      <div>
                        <input
                          type="radio"
                          id="RocketPayment"
                          value="RocketPayment"
                          checked={isSelected === "RocketPayment"}
                        />
                        <span className="ml-[1rem]">Pay with Rocket</span>
                      </div>
                      <div>
                        <Image
                          className="w-[5rem]"
                          src={rocket}
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                    </button>
                  </h2>
                  <div
                    id="accordion-collapse-body-3"
                    className={activeIndex === 3 ? "" : "hidden"}
                    aria-labelledby="accordion-collapse-heading-3"
                  >
                    <div className="p-5 border border-gray-400 bg-gray-200">
                      <div className="mb-[3.5rem] relative">
                        <p className="text-gray-600 font-medium">
                          Account number*
                        </p>
                        <input
                          className="w-[45rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                          type="tel"
                          placeholder="Account number"
                          {...registerTransaction(
                            "Rocket_account_number",
                            isSelected === "RocketPayment"
                              ? {
                                  required: "Mobile number is required",
                                  minLength: {
                                    value: 11,
                                    message: "Minimum length is 11",
                                  },
                                  maxLength: {
                                    value: 11,
                                    message: "Maximum length is 11",
                                  },
                                  pattern: {
                                    value: /^01[0-9]{9}$/,
                                    message: "Invalid account number",
                                  },
                                }
                              : {}
                          )}
                        />
                        {errorsTransaction.Rocket_account_number && (
                          <p className="text-red-500 absolute">
                            {errorsTransaction.Rocket_account_number.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-[3.5rem] relative">
                        <p className="text-gray-600 font-medium">
                          Transaction Id*
                        </p>
                        <input
                          className="w-[45rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                          type="tel"
                          placeholder="Transaction Id"
                          {...registerTransaction(
                            "Rocket_transaction_id",
                            isSelected === "RocketPayment"
                              ? {
                                  required: "Transaction Id is required",
                                  minLength: {
                                    value: 7,
                                    message: "Minimum length is 7",
                                  },
                                }
                              : {}
                          )}
                        />
                        {errorsTransaction.Rocket_transaction_id && (
                          <p className="text-red-500 absolute">
                            {errorsTransaction.Rocket_transaction_id.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden payment method */}
              {/* <input
                type="hidden"
                value={isSelected}
                {...registerTransaction("payment_method")}
              /> */}

              {/* Hidden Fields to Store Common Payment Data */}
              <input type="hidden" {...registerTransaction("account_number")} />
              <input type="hidden" {...registerTransaction("transaction_id")} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;

