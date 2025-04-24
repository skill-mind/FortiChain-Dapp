"use client";

import Image from "next/image";
import BackgroundImage from "../../public/Hero.svg";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

const termsAndConditions = [
  {
    id: 1,
    title: "Fair Disclosure Policy",
    points: [
      {
        title: "Ethical Reporting",
        description:
          "All users must report vulnerabilities in good faith, following established ethical guidelines.",
      },
      {
        title: "Controlled Disclosure",
        description:
          "Users must agree to a controlled disclosure process that balances transparency with the responsible management of vulnerabilities.",
      },
    ],
  },
  {
    id: 2,
    title: "No Unauthorized Exploitation",
    points: [
      {
        title: "Strict Prohibition",
        description:
          " Any attempt to exploit vulnerabilities or use discovered information for unauthorized purposes will result in immediate account suspension or permanent ban.",
      },
      {
        title: "Legal Resource",
        description:
          "FortiChain reserves the right to take legal action against any malicious actor violating these terms.",
      },
    ],
  },
  {
    id: 3,
    title: "Bounty Dispute Resolution",
    points: [
      {
        title: "Smart Contract Arbitration",
        description:
          "Disputes regarding bounty payouts or vulnerability validity are resolved through an on-chain arbitration process.",
      },
      {
        title: "Finality of Decisions",
        description:
          "The outcome of the arbitration is final, with clear records maintained on the blockchain to ensure transparency.",
      },
    ],
  },
  {
    id: 4,
    title: "Token Economics Agreement",
    points: [
      {
        title: "Utility Token Use",
        description:
          "All participants agree to the rules governing token issuance, distribution, and burning.",
      },
      {
        title: "Incentive Mechanisms",
        description:
          "The platform’s token and reputation systems are designed to promote honest participation and may be updated to reflect evolving economic conditions.",
      },
    ],
  },
  {
    id: 5,
    title: "Compliance with Local Laws",
    points: [
      {
        title: "Legal Obligations",
        description:
          "Users are responsible for ensuring that their participation on FortiChain complies with all applicable local, national, and international cybersecurity and data protection laws.",
      },
      {
        title: "Jurisdictional Considerations",
        description:
          "In cases of conflict, local laws will take precedence, and users may be required to adhere to additional regulatory requirements.",
      },
    ],
  },
  {
    id: 6,
    title: "Amendments and Updates",
    points: [
      {
        title: "Regular Revisions",
        description:
          "The Terms & Conditions are subject to periodic updates. Users will be notified of any material changes and are responsible for reviewing the updated terms.",
      },
      {
        title: "Continued Use as Acceptance",
        description:
          "Continued use of the platform constitutes acceptance of any updated terms and conditions.",
      },
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10">
      <Image
        src={BackgroundImage}
        alt="Background"
        className="absolute object-cover inset-0 h-[200px] w-full -z-10"
      />
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="font-semibold text-4xl lg:text-6xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Terms and Conditions
        </motion.h1>
        <motion.p 
          className="font-light max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          The FortiChain Terms & Conditions outline the rights and
          responsibilities of all platform users. By using FortiChain, users
          agree to the following:
        </motion.p>
      </motion.div>
      <motion.div 
        className="bg-[#211A1D] rounded-[30px] border border-[#908C8E] space-y-4 py-5 px-7 mt-10 md:max-w-2xl lg:max-w-3xl divide-y divide-[#464043]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {termsAndConditions.map((data) => (
          <motion.div 
            className="space-y-3 py-5"
            key={data.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-bold text-xl lg:text-3xl">
              {data.id}. {data.title}
            </h2>
            {data.points.map((point, index) => (
              <motion.div 
                className="space-y-1"
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <p className="font-semibold text-lg lg:text-xl">
                  {point.title}
                </p>
                <p className="font-light">{point.description}</p>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}