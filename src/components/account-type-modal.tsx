import { ArrowLeft, X, Check } from "lucide-react";
// import { useRouter } from "next/router"; // For Next.js routing
// If using React Router, use: import { useNavigate } from "react-router-dom";

type AccountType = "project-owner" | "security-researcher" | "validator";

interface AccountTypeOption {
  id: AccountType;
  title: string;
  description: string;
  dashboardRoute: string;
}

interface AccountTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedType: AccountType | null;
  onSelectType: (type: AccountType) => void;
  onSubmit: () => void;
}

const accountTypeOptions: AccountTypeOption[] = [
  {
    id: "project-owner",
    title: "Project Owner",
    description:
      "Secure your smart contract by setting bounties, managing reports, and resolving vulnerabilities",
    dashboardRoute: "/dashboard/project-owner",
  },
  {
    id: "security-researcher",
    title: "Security Researcher",
    description:
      "Identify vulnerabilities, submit findings, and earn rewards for strengthening blockchain security",
    dashboardRoute: "/dashboard/researcher",
  },
  {
    id: "validator",
    title: "Validator",
    description:
      "Review reported vulnerabilities, vote on legitimacy, and ensure fair assessments in the ecosystem.",
    dashboardRoute: "/dashboard/validator",
  },
];

export function AccountTypeModal({
  isOpen,
  onClose,
  selectedType,
  onSelectType,
  onSubmit,
}: AccountTypeModalProps) {
  // const router = useRouter(); // For Next.js
  // const navigate = useNavigate(); // For React Router

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedType) {
      // Call the original onSubmit function
      onSubmit();

      // Find the selected account type option
      const selectedOption = accountTypeOptions.find(
        (option) => option.id === selectedType
      );

      if (selectedOption) {
        // Store the account type in localStorage for persistence
        localStorage.setItem("userAccountType", selectedType);

        // Redirect using window.location (works in any environment)
        window.location.href = selectedOption.dashboardRoute;

        // Alternative: Use Next.js router if available
        // router.push(selectedOption.dashboardRoute);
        // For React Router: navigate(selectedOption.dashboardRoute);

        // Close the modal
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#211a1d] text-white rounded-3xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white hover:text-gray-300"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg">Go Back</span>
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">
          Select Account Type
        </h1>

        <div className="space-y-4">
          {accountTypeOptions.map((option) => (
            <div
              key={option.id}
              className={`p-6 rounded-xl border border-[#464043] cursor-pointer transition-colors ${
                selectedType === option.id
                  ? "bg-[#000033]"
                  : "bg-[#1c1618] hover:bg-[#2a2225]"
              }`}
              onClick={() => onSelectType(option.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelectType(option.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {option.title}
                  </h2>
                  <p className="text-[#c0bfc6]">{option.description}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    selectedType === option.id
                      ? "bg-[#0000ff]"
                      : "border border-[#908c8e]"
                  }`}
                >
                  {selectedType === option.id && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={selectedType === null}
          className={`w-full text-white py-4 rounded-xl mt-8 text-xl font-medium transition-colors ${
            selectedType
              ? "bg-[#0000ff] hover:bg-blue-700"
              : "bg-[#8080ff] cursor-not-allowed"
          }`}
        >
          Create Account & Continue
        </button>
      </div>
    </div>
  );
}
