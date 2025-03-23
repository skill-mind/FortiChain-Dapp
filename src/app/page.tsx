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
    <div className="min-h-screen text-white bg-cover bg-center">
      <Navbar />
      <header className="relative w-full h-screen">
        <Image
          src={BackgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center bg-black/50">
          {/* Responsive Heading */}
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-8xl">
            Decentralized Bug Bounty and Smart Contract Security
          </h1>

          {/* Responsive Paragraph */}
          <p className="mb-8 text-base md:w-[50rem] text-white sm:text-lg md:text-xl lg:text-2xl">
            Find, report, and fix smart contract vulnerabilities with complete
            transparency and trustlessness.
          </p>

          {/* Responsive Button */}
          <button className="rounded bg-[#0000FF] px-4 py-2 text-white hover:bg-blue-700 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Step by Step Process */}
      <main >
        <StepProcess />
      </main>

      {/* Key Features */}
      <main>
        <KeyFeatures />
      </main>

      {/* Newsletter */}
      <main>
        <SubscribeSection />
      </main>

      {/* Footer */}
      <main>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
