"use client";

import React from "react";
import Navbar from "../components/Navbar";
import StepProcess from "@/components/landingcomponent/step";
import KeyFeatures from "@/components/landingcomponent/features";
import SubscribeSection from "@/components/landingcomponent/newsletter";
import Footer from "@/components/footer";
import Image from "next/image";
import BackgroundImage from "../../public/Hero.svg";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen text-white">
      {/* Full-page background image */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src={BackgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          className="w-full h-full"
        />
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Navbar remains at the top */}
      <Navbar />

      {/* Header with centered content */}
      <section className="relative flex items-center justify-center min-h-screen px-4 py-16">
        <div className="max-w-8xl text-center  space-y-6">
          {/* Responsive Heading */}
          <h1
            className="text-3xl font-bold  text-white sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 
      leading-tight max-w-7xl mx-auto"
          >
            Decentralized Bug Bounty and Smart Contract Security
          </h1>
          {/* Responsive Paragraph */}
          <p className="mx-auto text-base text-white sm:text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed">
            Find, report, and fix smart contract vulnerabilities with complete
            transparency and trustlessness.
          </p>

          {/* Responsive Button */}
          <div>
            <button
              className="rounded-lg bg-[#0000FF] px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-300 
        sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl font-semibold"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </section>

      {/* Subsequent Sections */}
      <main>
        <StepProcess />
      </main>

      <main>
        <KeyFeatures />
      </main>

      <main>
        <SubscribeSection />
      </main>

      <main>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
