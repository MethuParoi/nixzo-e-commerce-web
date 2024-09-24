"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoMdArrowDropright } from "react-icons/io";
import Link from 'next/link';


const CategoryCard = ({ title, images, btnLink, className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let styles =
    "relative w-[30rem] min-w-[30rem] h-[40rem] overflow-hidden group ";
  if (className) {
    styles += className;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles}>
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            } `}
          >
            <div className="w-full h-full overflow-hidden transition-transform duration-300 group-hover:scale-110">
              <Image
                src={image}
                alt={`Slide ${index}`}
                layout="fill"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                className=""
              />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center absolute inset-0 bg-black bg-opacity-20 lg:bg-opacity-40 flex flex-col justify-center items-center text-white p-4 transition-colors duration-300 group-hover:bg-opacity-15 ">
        <h3 className="text-primary text-4xl lg:text-4xl font-semibold mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:text-2xl group-hover:font-bold">
          {title}
        </h3>
        {btnLink && (
          <Link
            href={btnLink}
            className="mt-4 px-4 py-1 bg-accent bg-opacity-50 text-primary rounded-xl group-hover:text-lg hover:bg-accent-dark active:bg-accent transition-colors duration-300 inline-flex items-center gap-1"
          >
            See More <IoMdArrowDropright />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;