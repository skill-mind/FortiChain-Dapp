import React from "react";
import Image from "next/image";
import BackgroundImage from "../../../public/Newsletter.svg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SubscribeSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      className="relative mt-20 mb-36 py-24 mx-auto max-w-[1170px] px-6"
      ref={ref}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={BackgroundImage}
          alt="Newsletter Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div className="absolute inset-0  bg-opacity-70 z-10"></div>

      <motion.div
        className="relative z-20 max-w-4xl mx-auto flex flex-col items-center text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
      >
        <motion.button
          className="mb-6 px-4 py-2 text-sm font-semibold bg-[#1F1E1E] rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Updates
        </motion.button>

        <motion.h2
          className="text-3xl font-bold mb-4 sm:text-4xl md:text-5xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Ready to Join the Web3 Evolution?
        </motion.h2>

        <motion.p
          className="text-lg mb-8 text-gray-300 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Get regular updates directly in your mailbox by subscribing.
        </motion.p>

        <motion.div
          className="w-full max-w-md flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <motion.input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-20 text-white placeholder-gray-300"
            whileFocus={{
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.25)",
            }}
          />
          <motion.button
            className="px-6 py-3 bg-[#0000FF] text-white rounded-md font-medium hover:bg-blue-700 transition sm:text-lg whitespace-nowrap"
            whileHover={{ scale: 1.05, backgroundColor: "#0000AA" }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SubscribeSection;
