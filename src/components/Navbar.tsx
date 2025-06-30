"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/brandlogo.svg";
import { ConnectButton } from "./connect-button";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Check if the current path matches the given path
  const isActive = (path: string) => pathname === path;

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`${
        scrolled ? "backdrop-blur-md bg-black/50" : "bg-transparent"
      } text-white sticky top-0 z-50 transition-all duration-300 mt-4`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-6 px-6 flex-row justify-between h-20">
          {/* Logo */}
          <motion.div
            variants={navItemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Image src={Logo} alt="Brand Logo" />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <motion.div variants={navItemVariants}>
                <Link href="/">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={`cursor-pointer hover:text-gray-300 transition-all duration-200 ${
                      isActive("/") ? "text-[#0000FF] font-semibold" : ""
                    }`}
                  >
                    Home
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div variants={navItemVariants}>
                <Link href="#how-it-works" scroll={true}>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="cursor-pointer hover:text-gray-300 transition-all duration-200"
                  >
                    How It Works
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div variants={navItemVariants}>
                <Link href="/about-us">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={`cursor-pointer hover:text-gray-300 transition-all duration-200 ${
                      isActive("/about-us")
                        ? "text-[#0000FF] font-semibold"
                        : ""
                    }`}
                  >
                    About
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div variants={navItemVariants}>
                <Link href="/contact-us">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={`cursor-pointer hover:text-gray-300 transition-all duration-200 ${
                      isActive("/contact-us")
                        ? "text-[#0000FF] font-semibold"
                        : ""
                    }`}
                  >
                    Contact Us
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Connect Wallet Button (Desktop) */}
          <motion.div variants={navItemVariants} className="hidden md:block">
            <ConnectButton
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              variant="navbar"
            />
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div variants={navItemVariants} className="flex md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={mobileMenuVariants}
          className="md:hidden backdrop-blur-md bg-black/90"
          id="mobile-menu"
        >
          <div className="space-y-1 px-4 pt-2 pb-3">
            <motion.div variants={mobileItemVariants}>
              <Link href="/">
                <span className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white transition-all duration-200">
                  Home
                </span>
              </Link>
            </motion.div>

            <motion.div variants={mobileItemVariants}>
              <Link href="#how-it-works" scroll={true}>
                <span className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white transition-all duration-200">
                  How It Works
                </span>
              </Link>
            </motion.div>

            <motion.div variants={mobileItemVariants}>
              <Link href="/about-us">
                <span className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white transition-all duration-200">
                  About
                </span>
              </Link>
            </motion.div>

            <motion.div variants={mobileItemVariants}>
              <Link href="/contact-us">
                <span className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white transition-all duration-200">
                  Contact Us
                </span>
              </Link>
            </motion.div>

            <motion.div variants={mobileItemVariants} className="px-3 py-2">
              <ConnectButton
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                variant="navbar"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
