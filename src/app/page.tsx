"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import StepProcess from "@/components/landingcomponent/step";
import KeyFeatures from "@/components/landingcomponent/features";
import SubscribeSection from "@/components/landingcomponent/newsletter";
import Footer from "@/components/footer";
import Image from "next/image";
import BackgroundImage from "../../public/Hero.svg";
import ConnectWallet from "@/components/landingcomponent/connectwallet";

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen text-white bg-cover bg-center ">
      <Navbar setOpen={setOpen} />
      {/* Home Section */}
      <header className="relative w-full h-screen">
        {/* Background Image */}
        <Image
          src={BackgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          className="absolute inset-0 w-full h-full"
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center bg-black/50">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Decentralized Bug Bounty and Smart Contract Security
          </h1>
          <p className="mb-8 text-lg text-white md:text-xl">
            Find, report, and fix smart contract vulnerabilities with complete
            transparency and trustlessness.
          </p>
          <button className="rounded bg-[#0000FF] px-6 py-3 text-white hover:bg-blue-700" onClick={() => setOpen(true)}>
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Step by Step Process */}
      <main id="how-it-works">
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

      <ConnectWallet open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Home;
