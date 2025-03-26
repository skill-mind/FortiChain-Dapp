import React from "react";

const KeyFeatures = () => {
  const features = [
    {
      title: "On-Chain Project Registration & Verification",
      description:
        "Register and verify smart contracts on a tamper-proof blockchain ledger, ensuring full transparency, security, and ownership authentication.",
      icon: "/fluent-mdl2_open-enrollment.png", 
    },
    {
      title: "Decentralized Review & Voting System",
      description:
        "Security researchers can report vulnerabilities confidentially with encrypted submissions, ensuring data integrity and protection.",
      icon: "/fluent-mdl2_open-enrollment (1).png", 
    },
    {
      title: "Automated Smart Contract Bounty Escrow",
      description:
        "Smart contracts manage bounty funds, securely holding and releasing payouts only when validated vulnerabilities meet pre-set resolution criteria.",
      icon: "/fluent-mdl2_open-enrollment (2).png", 
    },
    {
      title: "Secure Vulnerability Reporting with Encrypted Submissions",
      description:
        "Security researchers can report vulnerabilities confidentially with encrypted submissions, ensuring data integrity and protection.",
      icon: "/fluent-mdl2_open-enrollment (3).png", 
    },
    {
      title: "Reputation-Based Incentives & Governance",
      description:
        "Earn reputation points and token rewards for accurate reporting, validation, and governance participation within the ecosystem.",
      icon: "/fluent-mdl2_open-enrollment (4).png", 
    },
  ];

  return (
    <section className="text-white py-16 px-4 sm:px-6">
      <div className="mx-auto text-center md:px-10">
        {/* Title */}
        <h2 className="text-3xl font-semibold mb-8 sm:text-4xl md:text-5xl">
          Key Features
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-start space-y-4"
            >
              {/* Icon */}
              <img
                src={feature.icon} 
                alt={feature.title} 
                className="w-12 h-12" 
              />

              {/* Title */}
              <h3 className="text-xl font-semibold sm:text-2xl">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 sm:text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;