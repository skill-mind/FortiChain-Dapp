"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import notFound from "../../public/notFound.svg";
import Image from "next/image";
import { motion } from "framer-motion";

const Custom404 = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <motion.div 
          className="text-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={notFound}
              alt={"404 page not found"}
              className="cursor-pointer"
            />
          </motion.div>

          <motion.h1 
            className="mt-4 mb-8 text-[22px] font-bold my-5 md:text-[32px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Page Not Found
          </motion.h1>

          <motion.p 
            className="mb-10 text-[18px] font-thin"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Sorry, we can't find the page you are looking for.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/"
              className="bg-[#0000FF] font-thin text-white text-[16px] px-6 py-3 rounded-lg hover:bg-blue-900 transition w-[154px] h-[56px]"
            >
              Go To Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Custom404;