"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/brandlogo.svg";
import FooterBg from "../../public/Footer.svg";
import { motion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";
import { RiTelegramLine } from "react-icons/ri";

const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="relative text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={FooterBg}
          alt="Footer Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto pt-16 pb-8 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
        >
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={Logo}
                alt="FortiChain Logo"
                width={180}
                height={40}
                className="mx-auto md:mx-0"
              />
            </motion.div>

            <motion.p
              className="text-center md:text-left text-gray-300 mt-4 max-w-md"
              variants={itemVariants}
            >
              Decentralized Bug Bounty and Smart Contract Security
            </motion.p>

            <motion.div
              className="flex justify-center md:justify-start gap-4 mt-4"
              variants={itemVariants}
            >
              <motion.a
                href="https://x.com/Fortichain3"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <FaXTwitter size={20} />
              </motion.a>
              <motion.a
                href="https://t.me/+4xRZ99AALDQ3MjQ0"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <RiTelegramLine size={20} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.nav
            className="md:col-span-2 flex flex-wrap justify-center md:justify-end gap-6 md:gap-10"
            variants={containerVariants}
          >
            {[
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Contact Us", path: "/contact-us" },
              { name: "Terms and Conditions", path: "/terms-and-condition" },
              { name: "Docs and API", path: "/doc-api" },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link
                  href={item.path}
                  className={`text-lg hover:text-blue-400 transition ${
                    pathname === item.path
                      ? "text-blue-400 font-medium"
                      : "text-gray-300"
                  }`}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        className="relative z-10 text-center py-4 border-t border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        viewport={{ once: true }}
      >
        © FortiChain {currentYear}, All Rights Reserved
      </motion.div>
    </footer>
  );
};

export default Footer;
