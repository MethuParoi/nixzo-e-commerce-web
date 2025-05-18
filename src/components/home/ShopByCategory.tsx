"use client";

import React, { useContext, useEffect, useState } from "react";
import commodImg from "../../../public/shop-by-category/Toilet-Carusel1.jpg";
import kitchenImg from "../../../public/products/Sink-Carusel3.jpg";
import bassinImg from "../../../public/shop-by-category/bassin.jpg";
import faucet from "../../../public/shop-by-category/shower.jpg";
import sink from "../../../public/shop-by-category/sink.jpg";
import hood from "../../../public/shop-by-category/hood.jpg";
// import logo from "../../../public/logo/logo-black.png";

import { motion } from "framer-motion"; // Import Framer Motion
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShopByCategoryData } from "@/data/home/ShopByCategoryData";
// import { AuthContext } from "../../provider/AuthProvider";

const ShopByCategory = () => {
  //   const { setCategory } = useContext(AuthContext);
  const router = useRouter();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Function to check screen width
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-11/12 lg:w-10/12 mx-auto mt-20">
      {/* Title with animation (from bottom) */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col align-center justify-center text-center pb-10"
      >
        {/* <Image
          className="w-[16rem] lg:w-[25rem] justify-center mx-auto mb-10"
          src={logo}
          alt=""
        /> */}
        <h1 className="text-5xl font-bold text-center text-accent mb-4">
          {ShopByCategoryData.sectionTitle}
        </h1>
        <hr className="w-[28rem] h-1 bg-accent mx-auto mb-6" />
        <p className="text-[1.6rem] text-secondary text-center md:w-11/12 lg:w-10/12 mx-auto">
          {ShopByCategoryData.sectionDescription}
        </p>
      </motion.div>

      {/* Bathware section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 justify-items-center my-10">
        {/* Commod Image (Comes from left) */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative flex justify-center "
        >
          {/* Image */}
          <Image
            src={commodImg}
            alt="Premium Commod"
            className="rounded-lg shadow-xl"
          />

          {/* Button (Top of Image) */}
          <button
            onClick={() => {
              //   setCategory("bathware");
              router.push("/products/bathware");
            }}
            className="absolute top-40 left-1/2 transform -translate-x-1/2 bg-white shadow-[0_2px_15px_rgba(0,0,0,0.4)] px-10 py-2 rounded-full text-black  cursor-pointer transition-transform duration-300 text-xl hover:scale-105"
          >
            {ShopByCategoryData.button1.text}
          </button>

          {/* Text Below Image (Left-Aligned) */}
          <div className="absolute bottom-8 left-5 sm:left-12  text-white">
            <h1 className="text-3xl font-bold">
              {ShopByCategoryData.card1.title}
            </h1>
            <p className="text-[12px] sm:text-[16px] text-left w-[250px] sm:w-[300px]">
              {ShopByCategoryData.card1.description}
            </p>
          </div>
        </motion.div>

        {/* Bassin & Faucet Grid (Comes from right) */}
        <motion.div
          initial={{ x: 250, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="grid grid-cols-2 gap-x-4 mt-8 lg:mt-0"
        >
          {/* Bassin Image */}
          <motion.div
            initial={{ x: 250, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
            className="relative flex justify-center"
          >
            <div
              onClick={() => {
                // setCategory("bathware");
                router.push("/products/bathware");
              }}
              className="group relative rounded-lg overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              {/* Image */}
              <Image
                src={bassinImg}
                alt="Basin"
                className="transform scale-110 transition-transform duration-500 ease-out group-hover:scale-125" // Fixed scale and hover effect
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gray-800 bg-opacity-20 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                <h1 className="text-white text-3xl font-semibold">Basin</h1>
                <p className="text-white text-md tracking-[6px]">CATEGORY</p>
              </div>
            </div>
          </motion.div>

          {/* Shower Image */}
          {window.innerWidth >= 768 && (
            <motion.div
              initial={{ x: 250, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
              className="relative flex justify-center"
            >
              <div
                onClick={() => {
                  //   setCategory("bathware");
                  router.push("/products/bathware");
                }}
                className="group relative rounded-lg overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.3)] cursor-pointer"
              >
                {/* Image */}
                <Image
                  src={faucet}
                  alt="Faucet"
                  className="transform scale-110 transition-transform duration-500 ease-out group-hover:scale-125"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gray-800 bg-opacity-20 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                  <h1 className="text-white text-3xl font-semibold">Shower</h1>
                  <p className="text-white text-md tracking-[6px]">CATEGORY</p>
                </div>
              </div>
            </motion.div>
          )}

          {window.innerWidth < 768 && (
            <div className="relative flex justify-center">
              <div
                onClick={() => {
                  //   setCategory("bathware");
                  router.push("/products/bathware");
                }}
                className="group relative rounded-lg overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.3)] cursor-pointer"
              >
                {/* Image */}
                <Image
                  src={faucet}
                  alt="Faucet"
                  className="scale-110 transition-transform duration-500 ease-out group-hover:scale-120 "
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gray-800 bg-opacity-20 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-40">
                  <h1 className="text-white text-3xl font-semibold">Shower</h1>
                  <p className="text-white text-md tracking-[6px]">CATEGORY</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Kitchenware section */}
      <div className="grid lg:grid-cols-2 gap-x-4 justify-items-center my-10">
        {/* Bassin & Faucet Grid (Comes from right) */}
        <motion.div
          initial={{ x: -250, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="grid grid-cols-2 gap-x-4 mb-8 lg:mb-0"
        >
          {/* bassine small card-2 */}
          {window.innerWidth >= 768 && (
            <motion.div
              initial={{ x: -250, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
              className="relative flex justify-center"
            >
              <div
                onClick={() => {
                  //   setCategory("bathware");
                  router.push("/products/bathware");
                }}
                className="group relative rounded-lg overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.3)] cursor-pointer"
              >
                {/* Image */}
                <Image
                  src={hood}
                  alt="Basin"
                  className="transform scale-110 transition-transform duration-500 ease-out group-hover:scale-125"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gray-800 bg-opacity-20 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                  <h1 className="text-white text-3xl font-semibold">Hood</h1>
                  <p className="text-white text-md tracking-[6px]">CATEGORY</p>
                </div>
              </div>
            </motion.div>
          )}

          {window.innerWidth < 768 && (
            <div className="relative flex justify-center">
              <div
                onClick={() => {
                  //   setCategory("bathware");
                  router.push("/products/bathware");
                }}
                className="group relative rounded-lg overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.3)] cursor-pointer"
              >
                {/* Image */}
                <Image
                  src={hood}
                  alt="Hood"
                  className="transform scale-110 transition-transform duration-500 ease-out group-hover:scale-125"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gray-800 bg-opacity-20 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                  <h1 className="text-white text-3xl font-semibold">Hood</h1>
                  <p className="text-white text-md tracking-[6px]">CATEGORY</p>
                </div>
              </div>
            </div>
          )}
          {/* small card-2 */}
          <motion.div
            initial={{ x: -250, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
            className="relative flex justify-center"
          >
            <div
              onClick={() => {
                // setCategory("bathware");
                router.push("/products/bathware");
              }}
              className="group relative rounded-lg overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              {/* Image */}
              <Image
                src={sink}
                alt="sink"
                className="transform scale-110 transition-transform duration-500 ease-out group-hover:scale-125 "
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gray-800 bg-opacity-20 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                <h1 className="text-white text-3xl font-semibold">Sink</h1>
                <p className="text-white text-md tracking-[6px]">CATEGORY</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* big card-2 */}
        {/* Commod Image (Comes from left) */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          {/* Image */}
          <Image
            src={kitchenImg}
            alt="Premium Commod"
            className="rounded-lg shadow-xl"
          />

          {/* Button (Top of Image) */}
          <button
            onClick={() => {
              //   setCategory("kitchenware");
              router.push("/products/kitchenware");
            }}
            className="absolute top-40 left-1/2 transform -translate-x-1/2 bg-white shadow-[0_2px_15px_rgba(0,0,0,0.4)] px-10 py-2 rounded-full text-black 
    cursor-pointer transition-transform duration-300 text-xl hover:scale-105"
          >
            {ShopByCategoryData.button2.text}
          </button>

          {/* Text Below Image (Left-Aligned) */}
          <div className="absolute bottom-8 right-5 sm:right-12  text-white">
            <h1 className="text-3xl text-right font-bold">
              {ShopByCategoryData.card2.title}
            </h1>
            <p className="text-[12px] sm:text-[16px] text-right w-[250px] sm:w-[300px]">
              {ShopByCategoryData.card2.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopByCategory;
