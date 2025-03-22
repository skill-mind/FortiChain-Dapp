import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { FaCheck, FaX } from "react-icons/fa6";
import { useState } from "react";

interface SelectRoleProps {
  open: boolean;
  onClose: () => void;
  onGoBack?: () => void;
}

export default function SelectRole({ open, onClose, onGoBack }: SelectRoleProps) {
  if (!open) return null;

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      name: "Project Owner",
      description:
        "Secure your smart contract by setting bounties, managing reports, and resolving vulnerabilities",
      icon: "/project-owner.png",
    },
    {
      name: "Security Researcher",
      description:
        "Identify vulnerabilities, submit findings, and earn rewards for strengthening blockchain security",
      icon: "/security-researcher.png",
    },
    {
      name: "Validator",
      description:
        "Review reported vulnerabilities, vote on legitimacy, and ensure fair assessments in the ecosystem.",
      icon: "/validator.png",
    },
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    // Handle role selection completion
    onClose();
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-black/50 py-10 min-h-screen"
      >
        <div className="fixed inset-0 z-40" onClick={onClose}></div>

        <motion.section
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative z-50 max-w-2xl w-full mx-4 my-auto p-4 md:p-6 bg-black rounded-2xl border border-white"
        >
          <section className="flex items-center justify-between mb-6 md:mb-10">
            <button 
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              onClick={handleGoBack}
            >
              <FaArrowLeft /> Go Back
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaX />
            </button>
          </section>
          <section className="py-2 md:py-4 px-4 md:px-20">
            <section className="flex justify-between items-center mb-6 md:mb-10">
              <section>
                <h1 className="text-white text-2xl md:text-4xl font-bold">
                  Select Account Type
                </h1>
              </section>
            </section>

            <section className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-10">
              {roles.map((role) => (
                <motion.button
                  key={role.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex justify-between items-center gap-4 w-full ${
                    role.name === selectedRole
                      ? "bg-[#000033] border-2"
                      : "bg-black border"
                  } border-white rounded-lg p-3 md:p-4 h-full`}
                  onClick={() => handleRoleSelect(role.name)}
                >
                  <section className="flex flex-col gap-1 md:gap-2 items-start flex-1">
                    <p className="text-white font-medium text-base md:text-lg">
                      {role.name}
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm text-left">
                      {role.description}
                    </p>
                  </section>
                  <span className={`w-5 h-5 ${role.name === selectedRole ? "bg-[#0000FF]" : "bg-white"} rounded-full flex justify-center items-center`}>
                    {
                      role.name === selectedRole && (
                        <FaCheck className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      )
                    }
                  </span>
                </motion.button>
              ))}
            </section>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`bg-[#000080] text-white font-medium text-base md:text-lg rounded-lg p-3 md:p-4 w-full flex justify-center items-center gap-2 ${
                !selectedRole ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Create Account
            </motion.button>
          </section>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
}
