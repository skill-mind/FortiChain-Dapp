import { Lock, Lightbulb, Goal } from "lucide-react";
import { FaCube } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";
import { HiOutlineUserCircle } from "react-icons/hi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Image from "next/image";

function AboutUs() {
  return (
    <main className="min-h-screen">
      {/* Fixed background with overlay */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/about-hero.svg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0F0A0ADE]"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="flex-grow text-white w-full overflow-x-hidden">
          {/* Dark background container that spans full width - with overflow fix */}
          <div className="w-screen bg-[#0F0A0ADE] py-20 mt-60">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-0 space-y-12">
              {/* Header Section */}
              <div className="space-y-4 -mt-10">
                <h1 className="text-[128px] font-bold text-white leading-tight">
                  About Us
                </h1>
                <p className="text-gray-300 max-w-3xl">
                  FortiChain, built by the SkillMind team, is driven by
                  passionate innovators with expertise in blockchain security,
                  cybersecurity, and smart contracts. We are committed to making
                  blockchain technology safer and more secure.
                </p>
              </div>

              {/* Mission and Vision Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Mission Section */}
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-8 space-y-4 border border-[#464043]">
                  <div className="space-y-2">
                    <Goal className="w-8 h-8" />
                    <h2 className="text-2xl font-semibold text-white">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-gray-300">
                    At FortiChain, we are on a mission to revolutionize
                    blockchain security by creating a decentralized,
                    transparent, and automated platform for vulnerability
                    disclosure and bug bounties. We empower developers, security
                    researchers, and validators to collaborate in securing smart
                    contracts and decentralized applications.
                  </p>
                </div>

                {/* Vision Section */}
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-8 space-y-4 border border-[#464043]">
                  <div className="space-y-2">
                    <Goal className="w-8 h-8" />
                    <h2 className="text-2xl font-semibold text-white">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-gray-300">
                    We envision a blockchain ecosystem where security is
                    proactive, trustless, and community-driven. By
                    decentralizing the vulnerability reporting and auditing
                    process, FortiChain ensures that security flaws are
                    identified and resolved faster, reducing the risks of
                    exploits and hacks.
                  </p>
                </div>
              </div>

              {/* Core Values Section */}
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-bold text-white">
                    Our Core Values
                  </h2>
                  <p className="text-gray-300">
                    Guiding principles that shape our approach to blockchain
                    security
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Transparency */}
                  <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-[#464043]">
                    <div className="flex items-center gap-2">
                      <FaCube className="w-5 h-5 text-white" />
                      <h3 className="text-xl font-semibold text-white">
                        Transparency
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Open and verifiable security practices that foster trust
                      in the blockchain space, ensuring every action, report,
                      and decision is recorded on-chain for full accountability.
                    </p>
                  </div>

                  {/* Security */}
                  <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-[#464043]">
                    <div className="flex items-center gap-2">
                      <Lock className="w-6 h-6" />
                      <h3 className="text-xl font-semibold text-white">
                        Security
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      A proactive approach to identifying and resolving
                      vulnerabilities before they can be exploited, safeguarding
                      blockchain projects from potential threats while
                      maintaining trust in decentralized applications.
                    </p>
                  </div>

                  {/* Decentralization */}
                  <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-[#464043]">
                    <div className="flex items-center gap-2">
                      <SiBlockchaindotcom className="w-5 h-5" />
                      <h3 className="text-xl font-semibold text-white">
                        Decentralization
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      A trustless system where all assessments and bounty
                      payouts are governed by smart contracts, eliminating
                      intermediaries and ensuring fair, tamper-proof validation
                      of vulnerabilities.
                    </p>
                  </div>

                  {/* Innovation */}
                  <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-[#464043]">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-6 h-6" />
                      <h3 className="text-xl font-semibold text-white">
                        Innovation
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Pushing the boundaries of blockchain security through
                      incentives, innovation, and community-driven validation,
                      continuously evolving to adapt to emerging threats and
                      industry advancements.
                    </p>
                  </div>

                  {/* Collaboration */}
                  <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-[#464043]">
                    <div className="flex items-center gap-2">
                      <HiOutlineUserCircle className="w-6 h-6" />
                      <h3 className="text-xl font-semibold text-white">
                        Collaboration
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Bringing together developers, researchers, and validators
                      to create a safer blockchain ecosystem through shared
                      knowledge, incentivized participation, and collective
                      problem-solving.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}

export default AboutUs;
