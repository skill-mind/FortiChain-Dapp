import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import React from "react";

// Custom CSS for bold list numbers
const customStyles = `
  ol.bold-numbers li::marker {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isLast: boolean;
}

const Section: React.FC<SectionProps> = ({ title, children, isLast }) => (
  <li
    className={`border-b ${
      isLast ? "border-transparent" : "border-gray-500"
    } pb-5`}
  >
    <h3 className="font-bold text-2xl md:text-3xl lg:text-[28px]">{title}</h3>
    {children}
  </li>
);

interface SubSectionProps {
  title: string;
  content: string;
}

const SubSection: React.FC<SubSectionProps> = ({ title, content }) => (
  <div>
    <h4 className="font-semibold text-lg md:text-xl lg:text-[20px]">{title}</h4>
    <p className="font-normal text-sm md:text-base leading-[150%]">{content}</p>
  </div>
);

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Data Protection and Privacy Principles",
      subsections: [
        {
          title: "End-to-End Encryption",
          content:
            "All vulnerability submissions, communications, and transactions are protected by end-to-end encryption.",
        },
        {
          title: "Zero-Knowledge Proofs",
          content:
            "Utilize cryptographic techniques to verify data authenticity without revealing sensitive details.",
        },
      ],
    },
    {
      title: "Data Collection and Usage",
      subsections: [
        {
          title: "Minimal Data Collection",
          content:
            "Only essential information is collected to facilitate secure registration, reporting, and verification.",
        },
        {
          title: "Purpose-Driven Usage",
          content:
            "Collected data is strictly used for system operations, bounty management, and enhancing platform security.",
        },
      ],
    },
    {
      title: "Data Storage and Retention",
      subsections: [
        {
          title: "Immutable Records",
          content:
            "All vulnerability reports and associated data are recorded on-chain, ensuring a tamper-proof audit trail.",
        },
        {
          title: "Retention Policy",
          content:
            "Data is stored for the period necessary to fulfill legal and operational requirements, with options for secure deletion upon user request where applicable.",
        },
      ],
    },
    {
      title: "Data Access and Control",
      subsections: [
        {
          title: "Role-Based Permissions",
          content:
            "Access to sensitive data is strictly controlled through role-based permissions, ensuring that only authorized parties can view or modify information.",
        },
        {
          title: "User Anonymity Options",
          content:
            "Researchers can choose to submit reports anonymously, protecting their identity while maintaining accountability through pseudonymous reputation systems.",
        },
      ],
    },
    {
      title: "Security Measures and Compliance",
      subsections: [
        {
          title: "Two-Factor Authentication (2FA)",
          content:
            "Optional enhanced security for users to safeguard account access.",
        },
        {
          title: "Regular Audits",
          content:
            "Periodic security audits and penetration tests are conducted to identify and remediate potential vulnerabilities.",
        },
        {
          title: "Compliance",
          content:
            "FortiChain adheres to relevant data protection regulations and cybersecurity standards to ensure robust protection of user information.",
        },
      ],
    },
  ];

  return (
    <div className='bg-[url("/Hero.svg")] bg-no-repeat'>
      {/* Add custom styles for bold numbers */}
      <style>{customStyles}</style>

      <Navbar />
      <div className="py-5 md:py-10 md:px-5">
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-none tracking-normal text-center pb-5 md:pb-10 pt-12 md:pt-24">
          Privacy Policy
        </h1>
        <p className="font-light text-sm sm:text-base leading-none tracking-normal text-center max-w-[90%] sm:max-w-[593px] m-auto mb-8 md:mb-12">
          FortiChain prioritizes user privacy and data security. The following
          policies outline our commitments and practices:
        </p>
        <div className="bg-[#211A1D] rounded-2xl md:rounded-[40px] p-7 md:p-10 border border-gray-500 max-w-[90%] sm:max-w-[80%] md:max-w-[969px] m-auto">
          <ol className="flex flex-col gap-3 md:gap-5 list-decimal bold-numbers">
            {sections.map((section, index) => (
              <Section
                key={index}
                title={section.title}
                isLast={index === sections.length - 1}
              >
                <div className="flex flex-col gap-2 md:gap-3">
                  {section.subsections.map((subsection, subIndex) => (
                    <SubSection
                      key={subIndex}
                      title={subsection.title}
                      content={subsection.content}
                    />
                  ))}
                </div>
              </Section>
            ))}
          </ol>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;