"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/brandlogo.svg";

interface NavbarProps {
  setOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Check if the current path matches the given path
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="bg-transparent text-white mt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src={Logo} alt="Brand Logo" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link href="/">
                  <span
                    className={`cursor-pointer hover:text-gray-300 ${
                      isActive("/") ? "text-[#0000FF] font-semibold" : ""
                    }`}
                  >
                    Home
                  </span>
                </Link>
                <Link href="#how-it-works" scroll={true}>
                  <span className="cursor-pointer hover:text-gray-300">
                    How It Works
                  </span>
                </Link>

                <Link href="/about-us">
                  <span
                    className={`cursor-pointer hover:text-gray-300 ${
                      isActive("/about") ? "text-[#0000FF] font-semibold" : ""
                    }`}
                  >
                    About
                  </span>
                </Link>
                <Link href="/contact-us">
                  <span
                    className={`cursor-pointer hover:text-gray-300 ${
                      isActive("/contact") ? "text-[#0000FF] font-semibold" : ""
                    }`}
                  >
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>

            {/* Connect Wallet Button (Desktop) */}
            <div className="hidden md:block">
              <button 
                className="rounded bg-[#0000FF] px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => setOpen(true)}
              >
                Connect Wallet
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
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
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link href="/">
                <span className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white">
                  Home
                </span>
              </Link>

              <Link href="#how-it-works" scroll={true}>
                <span
                  className={`
        cursor-pointer hover:text-gray-300
        ${pathname === "/" ? "text-[#0000FF] font-semibold" : ""}
      `}
                >
                  How It Works
                </span>
              </Link>

              <Link href="/about-us">
                <span className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white">
                  About
                </span>
              </Link>
              <Link href="/contact-us">
                <span className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white">
                  Contact Us
                </span>
              </Link>
              <button 
                className="w-full rounded bg-[#0000FF] px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => setOpen(true)}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>

    </>
  );
};

export default Navbar;
