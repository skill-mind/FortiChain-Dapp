"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import ValidatorProfileModal from "./components/validatorProfileModal";
import ValidatorSuccessModal from "./components/validatorSuccessModal";
import RejectProfileModal from "./components/RejectProfileModal";
import ValidatorRejectionSuccessModal from "./components/ValidatorRejectionSuccessModal";
import SuspendUserModal from "./components/SuspendUserModal";
import SuspensionSuccessModal from "./components/SuspensionSuccessModal";
import PendingValidatorProfileModal from "./components/viewValidatorProfileModal";
import Image from "next/image";
import { motion } from "framer-motion";

interface Validator {
  id: string;
  name: string;
  walletAddress: string;
  reviewedProjects: number;
  proficiency: string[];
  status: "Approved" | "Pending" | "Rejected" | "Suspended";
  dateOfBirth: string;
  nationality: string;
  phoneNumber: string;
  technicalExpertise: string[];
  yearsOfExperience: number;
  linkedInUrl: string;
  githubUrl: string;
  websiteUrl: string;
  resumeUrl: string;
  certifications: string[];
  identityDocumentType: string;
  identityDocumentBack: string;
  identityDocumentFront: string;
}

const ValidatorsDashboard: React.FC = () => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRejectionSuccessModalOpen, setIsRejectionSuccessModalOpen] =
    useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(
    null
  );
  const [isSuspensionSuccessModalOpen, setIsSuspensionSuccessModalOpen] =
    useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPendingProfileModalOpen, setIsPendingProfileModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [validators, setValidators] = useState<Validator[]>([
    {
      id: "0x4D123",
      name: "Daniel Ochoja",
      walletAddress: "0x1234...abcd",
      reviewedProjects: 4,
      proficiency: ["Python", "Rust", "C#"],
      status: "Approved",
      dateOfBirth: "1990/05/25",
      nationality: "Nigerian",
      phoneNumber: "+234 811 234 5678",
      technicalExpertise: [
        "Blockchain Security",
        "Smart Contract Audit",
        "Decentralized Apps",
      ],
      yearsOfExperience: 5,
      linkedInUrl: "https://linkedin.com/in/danielochoja",
      githubUrl: "https://github.com/danielochoja",
      websiteUrl: "https://danielochoja.dev",
      resumeUrl: "https://example.com/resume.pdf",
      certifications: [
        "AWS Certified Developer",
        "Certified Blockchain Expert",
      ],
      identityDocumentType: "Driver's License",
      identityDocumentBack: "/images/id-back.jpg",
      identityDocumentFront: "/images/id-front.jpg",
    },
    {
      id: "0x5E234",
      name: "Aisha Murtala",
      walletAddress: "0x1234...abcd",
      reviewedProjects: 0,
      proficiency: ["Typescript", "Solidity"],
      status: "Pending",
      dateOfBirth: "1992/08/15",
      nationality: "Nigerian",
      phoneNumber: "+234 811 987 6543",
      technicalExpertise: ["Frontend Development", "DeFi Applications"],
      yearsOfExperience: 3,
      linkedInUrl: "https://linkedin.com/in/aishamurtala",
      githubUrl: "https://github.com/aishamurtala",
      websiteUrl: "https://aishamurtala.dev",
      resumeUrl: "https://example.com/resume.pdf",
      certifications: [
        "Google Professional Developer",
        "Meta Frontend Certification",
      ],
      identityDocumentType: "National ID",
      identityDocumentBack: "/images/id-back.jpg",
      identityDocumentFront: "/images/id-front.jpg",
    },
    {
      id: "0x6F345",
      name: "Favour Stephen",
      walletAddress: "0x1234...abcd",
      reviewedProjects: 0,
      proficiency: ["Cairo", "Go", "Python"],
      status: "Pending",
      dateOfBirth: "1994/02/10",
      nationality: "Nigerian",
      phoneNumber: "+234 812 345 6789",
      technicalExpertise: ["Backend Development", "StarkNet"],
      yearsOfExperience: 2,
      linkedInUrl: "https://linkedin.com/in/favourstephen",
      githubUrl: "https://github.com/favourstephen",
      websiteUrl: "https://favourstephen.dev",
      resumeUrl: "https://example.com/resume.pdf",
      certifications: ["Cairo Developer Certification"],
      identityDocumentType: "Passport",
      identityDocumentBack: "/images/id-back.jpg",
      identityDocumentFront: "/images/id-front.jpg",
    },
    {
      id: "0x7G456",
      name: "Favour Stephen",
      walletAddress: "0x1234...abcd",
      reviewedProjects: 0,
      proficiency: ["Cairo", "Go", "Python"],
      status: "Rejected",
      dateOfBirth: "1994/02/10",
      nationality: "Nigerian",
      phoneNumber: "+234 812 345 6789",
      technicalExpertise: ["Backend Development", "StarkNet"],
      yearsOfExperience: 2,
      linkedInUrl: "https://linkedin.com/in/favourstephen",
      githubUrl: "https://github.com/favourstephen",
      websiteUrl: "https://favourstephen.dev",
      resumeUrl: "https://example.com/resume.pdf",
      certifications: ["Cairo Developer Certification"],
      identityDocumentType: "Passport",
      identityDocumentBack: "/images/id-back.jpg",
      identityDocumentFront: "/images/id-front.jpg",
    },
    {
      id: "0x8H567",
      name: "Favour Stephen",
      walletAddress: "0x1234...abcd",
      reviewedProjects: 4,
      proficiency: ["Cairo", "Go", "Python"],
      status: "Approved",
      dateOfBirth: "1994/02/10",
      nationality: "Nigerian",
      phoneNumber: "+234 812 345 6789",
      technicalExpertise: ["Backend Development", "StarkNet"],
      yearsOfExperience: 2,
      linkedInUrl: "https://linkedin.com/in/favourstephen",
      githubUrl: "https://github.com/favourstephen",
      websiteUrl: "https://favourstephen.dev",
      resumeUrl: "https://example.com/resume.pdf",
      certifications: ["Cairo Developer Certification"],
      identityDocumentType: "Passport",
      identityDocumentBack: "/images/id-back.jpg",
      identityDocumentFront: "/images/id-front.jpg",
    },
  ]);

  const totalValidators = validators.length;
  const pendingKYCValidators = validators.filter(
    (v) => v.status === "Pending"
  ).length;

  const handleViewProfile = (validator: Validator) => {
    setSelectedValidator(validator);
    if (validator.status === "Pending") {
      setIsPendingProfileModalOpen(true);
    } else {
      setIsProfileModalOpen(true);
    }
  };

  const handleApproveProfile = () => {
    if (selectedValidator) {
      setValidators((prevValidators) =>
        prevValidators.map((v) =>
          v.id === selectedValidator.id ? { ...v, status: "Approved" } : v
        )
      );
      setIsProfileModalOpen(false);
      setIsPendingProfileModalOpen(false);
      setIsSuccessModalOpen(true);
    }
  };

  const handleRejectProfile = () => {
    if (selectedValidator) {
      setIsRejectModalOpen(true);
      setIsProfileModalOpen(false);
      setIsPendingProfileModalOpen(false);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleConfirmReject = (reason: string) => {
    if (selectedValidator) {
      setValidators((prevValidators) =>
        prevValidators.map((v) =>
          v.id === selectedValidator.id ? { ...v, status: "Rejected" } : v
        )
      );
      setIsRejectModalOpen(false);
      setIsRejectionSuccessModalOpen(true);

      console.log(
        `Validator ${selectedValidator.id} rejected with reason: ${reason}`
      );
    }
  };

  const handleRejectionSuccessModalClose = () => {
    setIsRejectionSuccessModalOpen(false);
  };

  const handleSuspendUser = () => {
    setIsSuspendModalOpen(true);
  };

  const handleConfirmSuspend = (reason: string) => {
    if (selectedValidator) {
      setValidators((prevValidators) =>
        prevValidators.map((v) =>
          v.id === selectedValidator.id ? { ...v, status: "Suspended" } : v
        )
      );

      setIsSuspendModalOpen(false);
      setIsProfileModalOpen(false);
      setIsPendingProfileModalOpen(false);
      setIsSuspensionSuccessModalOpen(true);

      console.log(
        `Validator ${selectedValidator.id} suspended with reason: ${reason}`
      );
    }
  };

  const handleSuspensionSuccessModalClose = () => {
    setIsSuspensionSuccessModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6">
<div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.div 
            className="bg-[#110D0F] border border-[#464043] rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="flex items-center mb-2">
              <div className="">
                <Image
                  src="/grommet-user-admin.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white">{totalValidators}</h1>
            <p className="text-neutral-400 mt-1">Total Number of Validators</p>
          </motion.div>
          <motion.div 
            className="bg-[#110D0F] border border-[#464043] rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center mb-2">
              <div className="">
                <Image
                  src="/user-clock.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white">
              {pendingKYCValidators}
            </h1>
            <p className="text-neutral-400 mt-1">
              Validators Pending KYC Review
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="bg-[#161113] border border-[#464043] rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Validators</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-[#464043] rounded-lg text-white flex items-center gap-2">
                Status <ChevronDown size={16} />
              </button>
              <button className="px-4 py-2 border border-[#464043] rounded-lg text-white flex items-center gap-2">
                Select Languages <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full rounded-tl-xl rounded-tr-xl overflow-hidden">
              <thead>
                <tr className="text-left text-[16px] bg-[#211A1D]">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Wallet Address</th>
                  <th className="px-6 py-3">Reviewed Projects</th>
                  <th className="px-6 py-3">Proficiency</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {validators.map((validator, index) => (
                  <motion.tr
                    key={validator.id}
                    className="border-t border-[#464043] text-[14px] text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <td className="px-6 py-4">{validator.name}</td>
                    <td className="px-6 py-4">{validator.walletAddress}</td>
                    <td className="px-6 py-4">{validator.reviewedProjects}</td>
                    <td className="px-6 py-4">
                      {validator.proficiency.join(", ")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          validator.status === "Approved"
                            ? "bg-[#01A901] text-white"
                            : validator.status === "Pending"
                            ? "bg-[#000055] text-white"
                            : validator.status === "Suspended"
                            ? "bg-[#FF9900] text-white"
                            : "bg-[#FF3737] text-white"
                        }`}
                      >
                        {validator.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-[#0000FF] hover:text-blue-400"
                        onClick={() => handleViewProfile(validator)}
                      >
                        View Profile
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      {selectedValidator && selectedValidator.status !== "Pending" && (
        <ValidatorProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onApprove={handleApproveProfile}
          onReject={handleRejectProfile}
          validator={selectedValidator}
        />
      )}

      {selectedValidator && selectedValidator.status === "Pending" && (
        <PendingValidatorProfileModal
          isOpen={isPendingProfileModalOpen}
          onClose={() => setIsPendingProfileModalOpen(false)}
          onApprove={handleApproveProfile}
          onSuspend={handleSuspendUser}
          validator={selectedValidator}
        />
      )}

      {selectedValidator && (
        <ValidatorSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleSuccessModalClose}
          validatorId={selectedValidator.id}
        />
      )}

      <RejectProfileModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirmReject={handleConfirmReject}
      />

      {selectedValidator && (
        <ValidatorRejectionSuccessModal
          isOpen={isRejectionSuccessModalOpen}
          onClose={handleRejectionSuccessModalClose}
          validatorId={selectedValidator.id}
        />
      )}

      <SuspendUserModal
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        onConfirmSuspend={handleConfirmSuspend}
      />

      {selectedValidator && (
        <SuspensionSuccessModal
          isOpen={isSuspensionSuccessModalOpen}
          onClose={handleSuspensionSuccessModalClose}
          validatorId={selectedValidator.id}
        />
      )}
    </div>
  );
};

export default ValidatorsDashboard;
