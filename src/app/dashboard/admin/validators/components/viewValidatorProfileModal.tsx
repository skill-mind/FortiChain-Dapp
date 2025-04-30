import React from "react";
import { X } from "lucide-react";

interface ValidatorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onSuspend: () => void;
  validator: {
    id: string;
    name: string;
    dateOfBirth: string;
    nationality: string;
    phoneNumber: string;
    proficiency: string[];
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
  };
}

const ValidatorProfileModal: React.FC<ValidatorProfileModalProps> = ({
  isOpen,
  onClose,
  onSuspend,
  validator,
}) => {
  if (!isOpen) return null;

   return (
    <div className="fixed inset-0 backdrop-blur-md bg-[#504F4F0F] bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1C1618] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="flex justify-between items-center p-6">
          <h2 className="text-xl font-semibold text-white">
            View Validator Profile
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="bg-[#1C1618] p-6 space-y-8">
          <div className="bg-[#161113] rounded-md p-5">
            <div className="border-b border-[#211A1D]">
              <h3 className="text-lg font-medium text-white mb-4">
                Basic Information
              </h3>
            </div>
            <div>
              <table className="w-full">
                <tbody>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm w-1/3">
                      Full Name
                    </td>
                    <td className="py-3 text-white text-end">
                      {validator.name}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm">
                      Date of Birth
                    </td>
                    <td className="py-3 text-white text-end">
                      {validator.dateOfBirth}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm">
                      Nationality
                    </td>
                    <td className="py-3 text-white text-end">
                      {validator.nationality}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-neutral-400 text-sm">
                      Phone Number
                    </td>
                    <td className="py-3 text-white text-end">
                      {validator.phoneNumber}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#161113] rounded-md p-5">
            <div className="border-b border-[#211A1D]">
              <h3 className="text-lg font-medium text-white mb-4">
                Professional Background
              </h3>
            </div>
            <div className="">
              <table className="w-full">
                <tbody>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm w-1/3">
                      Programming Language Proficiency
                    </td>
                    <td className="py-3 text-white text-end">
                      {validator.proficiency.join(", ")}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm">
                      Technical Expertise
                    </td>
                    <td className="py-3 text-white text-end">
                      {validator.technicalExpertise.join(", ")}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm">
                      Years of Experience
                    </td>
                    <td className="py-3 text-white text-end">
                      {validator.yearsOfExperience} Years
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm">
                      LinkedIn Profile
                    </td>
                    <td className="py-3 text-end">
                      <a
                        href={validator.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View LinkedIn Profile
                      </a>
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm">
                      GitHub Profile
                    </td>
                    <td className="py-3 text-end">
                      <a
                        href={validator.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View GitHub Profile
                      </a>
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm">
                      Website/Portfolio
                    </td>
                    <td className="py-3 text-end">
                      <a
                        href={validator.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Portfolio
                      </a>
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm">Resume/CV</td>
                    <td className="py-3 text-end">
                      <a
                        href={validator.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Resume
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-neutral-400 text-sm align-top">
                      Certifications
                    </td>
                    <td className="py-3 text-white text-end">
                      {validator.certifications.map((cert, index) => (
                        <div key={index} className="mb-1 last:mb-0">
                          {cert}
                        </div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#161113] rounded-md p-5">
            <div className="border-b border-[#211A1D]">
              <h3 className="text-lg font-medium text-white mb-4">
                Means of Identification
              </h3>
            </div>

            <div>
              <table className="w-full">
                <tbody>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm w-1/3">
                      Identity Document Type
                    </td>
                    <td className="py-3 text-white text-end">
                      {validator.identityDocumentType}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-3 text-neutral-400 text-sm">
                      Front of Document
                    </td>
                    <td className="py-3 text-end">
                      <a
                        href={validator.identityDocumentFront}
                        className="text-blue-500 hover:underline"
                      >
                        View Image
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-neutral-400 text-sm">
                      Back of Document
                    </td>
                    <td className="py-3 text-end">
                      <a
                        href={validator.identityDocumentBack}
                        className="text-blue-500 hover:underline"
                      >
                        View Image
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
       <div className="p-6 flex justify-end gap-4">
          <button
            onClick={() => window.open("#", "_blank")}
            className="px-6 py-2 bg-[#0000FF] text-white font-medium rounded-md"
          >
            View Audited Reports
          </button>
          <button
            onClick={onSuspend}
            className="bg-[#FF3737] text-white px-4 py-2 rounded-lg"
          >
            Suspend User
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidatorProfileModal;
