"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/brandlogo.svg";
import FooterBg from "../../public/Footer.svg";

import { FaXTwitter } from "react-icons/fa6";
import { RiTelegramLine } from "react-icons/ri";

const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="relative w-full h-[300px] flex flex-col  text-white overflow-hidden p-6">
      {/* Background Image */}
      <Image
        src={FooterBg}
        alt="Footer Background"
        fill
        className="object-cover absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Footer Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-6 flex flex-col  md:flex-row justify-between gap-4">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-bold flex items-center">
            <Image
              src={Logo}
              alt="FortiChain"
              className="mr-2 flex-shrink-0 mb-2"
            />
          </h2>
          <p className="text-sm text-gray-200 mt-1">
            Decentralized Bug Bounty and Smart Contract Security
          </p>
          <div className="flex mt-2 gap-3">
            <a href="#" className="text-gray-200 hover:text-white">
              <FaXTwitter />
            </a>
            <a href="#" className="text-gray-200 hover:text-white">
              <RiTelegramLine />
            </a>
          </div>
        </div>

        <nav className="flex gap-6 text-sm">
          {[
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy-policy" },
            { name: "Contact Us", path: "/contact-us" },
            { name: "Terms and Conditions", path: "/terms-and-condition" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`hover:text-white transition ${
                pathname === item.path ? "text-[#0000FF]" : "text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Copyright */}
      <p className="relative z-10 text-xs text-gray-400 mt-20 block mx-auto items-center">
        © FortiChain {currentYear}, All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
