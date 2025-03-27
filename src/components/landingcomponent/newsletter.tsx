
import React from "react";
import Image from "next/image";
import BackgroundImage from "../../../public/Newsletter.svg";

const SubscribeSection = () => {
  return (
    <div className="mb-20 md:px-10 px-4 mx-auto w-full"> {/* Remove flex here */}
    <section className="relative w-full h-[435px] flex justify-center items-center text-white">
      <Image
        src={BackgroundImage}
        alt="Subscribe Background"
        layout="fill"
        objectFit="cover"
        className="absolute object-cover inset-0"
      />
  
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>
  
      {/* Content Box */}
      <div className="relative max-w-3xl w-full px-4 text-center">
        {/* Floating Button */}
        <button className="mb-5 left-1/2 transform bg-gray-700 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600 transition">
          Get Updates
        </button>
  
        {/* Text Content */}
        <h2 className="text-2xl font-bold mb-3 sm:text-3xl md:text-4xl">
          Ready to Join the Web3 Evolution?
        </h2>
        <p className="text-gray-400 mb-6 sm:text-lg">
          Get regular updates directly in your mailbox by subscribing.
        </p>
  
        {/* Input and Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full sm:w-auto flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
          />
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition sm:text-base">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
  );
};

export default SubscribeSection;
