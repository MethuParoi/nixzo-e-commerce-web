'use client';

import React, { useEffect, useState } from 'react';
import { FaGreaterThan, FaLessThan, FaShippingFast, FaHeadset } from 'react-icons/fa'; // Correcting import path
import { BsCashCoin } from "react-icons/bs";
import Image from 'next/image';
import CoreFeatureCard from '../ui/CoreFeatureCard';
import { useDispatch } from "react-redux";
import {
  setUser,
  setUserAvatar,
  setUserName,
} from "@/store/features/auth/userSlice";

// Define the data array with objects containing src, title, and description
const slides = [
  {
    src: "/images/hero/hero1.jpg",
    title: "Slide 1",
    description: "This is the description of slide 1",
  },
  {
    src: "/images/hero/hero2.jpg",
    title: "Slide 2",
    description: "This is the description of slide 2",
  },
  {
    src: "/images/hero/hero3.jpg",
    title: "Slide 3",
    description: "This is the description of slide 3",
  },
];

const features = [
  {
    icon: <FaShippingFast />, // Fastest Shipping icon
    title: "Fastest Shipping",
    description: "Get delivered in the shortest time.",
  },
  {
    icon: <BsCashCoin />, // Cash Return icon
    title: "Cash Return",
    description: "Easy and hassle-free returns.",
  },
  {
    icon: <FaHeadset />, // 24/7 Support icon
    title: "24/7 Support",
    description: "Our team is available 24/7 by you.",
  },
];

const Hero = () => {
  const [page, setPage] = useState(0);
  // api call to get user_id
  // Set user_id to redux store
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/supabase-client");
      const data = await response.json();
      // setUser(data.user);
      // console.log("User avatar:", data.user.user_metadata.avatar_url);
      if (data.user) {
        dispatch(setUser(data.user.id));
        dispatch(setUserName(data.user.user_metadata.full_name));
        dispatch(setUserAvatar(data.user.user_metadata.avatar_url));
      }
    };

    fetchUser();
  }, [dispatch]);

  //-------------------- Auto Slide --------------------

  useEffect(() => {
    const int = setInterval(() => {
      setPage((prev) => (prev + 1 >= slides.length ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(int);
  }, []);

  const handlePrevPage = () => {
    setPage((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => (prev + 1 >= slides.length ? 0 : prev + 1));
  };

  return (
    <section className="md:min-h-screen grid lg:grid-rows-5 ">
      <div className="lg:row-span-3">
        <div className="relative h-[30rem] md:h-[53rem] w-full">
          <Image
            src={slides[page].src}
            alt={slides[page].title}
            // layout='fill'
            fill={true}
            objectFit="contain"
            className=" absolute inset-0"
          />
          <div className="absolute bottom-8 left-12 py-3 px-6 bg-gray-800 bg-opacity-60 rounded-md">
            <h2 className="text-white text-4xl">{slides[page].title}</h2>
            <p className="text-white text-xl mt-4">
              {slides[page].description}
            </p>
          </div>
          {/* Left/Prev Button */}
          <div
            onClick={handlePrevPage}
            className="z-10 hidden md:block absolute bottom-1/2 -left-20 md:left-10"
          >
            <button className="bg-gray-800 bg-opacity-60 text-white p-4 rounded-full flex justify-center items-center">
              <FaLessThan />
            </button>
          </div>

          {/* Right/Next Button */}
          <div
            onClick={handleNextPage}
            className="z-10 hidden md:block absolute bottom-1/2 -right-20 md:right-10"
          >
            <button className="bg-gray-800 bg-opacity-60 text-white p-4 rounded-full flex justify-center items-center">
              <FaGreaterThan />
            </button>
          </div>
        </div>
      </div>
      <div className=" lg:row-span-2">
        <div className="container mx-auto py-24">
          {/* <div className='p-10 md:p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'> */}
          <div className="flex flex-wrap gap-5 py-5 md:py-10 justify-center items-center">
            {features.map((feature, index) => (
              <div key={index} className="h-full grid place-items-center">
                <CoreFeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
