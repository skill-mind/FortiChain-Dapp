"use client";

import { motion } from "framer-motion";
import type { ReactNode, FC } from "react";

type AnimationProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  animationType?:
    | "fade-in"
    | "slide-up"
    | "slide-down"
    | "scale-up"
    | "scale-down";
};

const motionVariants = {
  "fade-in": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  "slide-down": {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  },
  "scale-up": {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
  "scale-down": {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1 },
  },
};

export const Animation: FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.4,
  animationType = "fade-in",
}) => {
  const variant = motionVariants[animationType];

  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.animate}
      transition={{ delay, duration, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
