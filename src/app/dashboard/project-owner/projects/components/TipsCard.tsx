"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import project3 from "../../../../../../public/project3.svg";

const tips = [
  {
    title: "Tip",
    content:
      "All funds in escrow are refundable if no valid reports are submitted before the deadline.",
  },
  {
    title: "Tip",
    content:
      "Never share your private key or seed phrase with anyone, not even team members.",
  },
  {
    title: "Tip",
    content:
      "Make sure to verify smart contract addresses before interacting with them.",
  },
];

const cardVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const TipsCard = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (i: number) => {
    setIndex(i);
  };

  return (
    <div className="relative overflow-hidden min-h-[160px] rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="bg-white rounded-lg p-4 w-full h-full"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Image src={project3} alt="Projects" width={24} height={24} />
            <h3 className="text-black text-xl font-bold">
              {tips[index].title}
            </h3>
          </div>
          <p className="text-black text-sm">{tips[index].content}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-4 gap-1">
        {tips.map((_, i) => (
          <div
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
              i === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TipsCard;
