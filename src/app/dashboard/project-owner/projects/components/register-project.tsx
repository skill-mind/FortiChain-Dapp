"use client";

import type React from "react";

import { useContext, useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Github,
  GitlabIcon,
  Calendar,
  Check,
  X,
  Lock,
  Search,
  ChevronLeft,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { ProjectsContext } from "@/context/project-context";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calender";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import ReviewSubmissionPage from "./review-submission";
import { BitbucketIcon, DocumentIcon, ImageIcon } from "@/components/svg/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { auth0Config } from "@/lib/auth0Config";

const availableTags = [
  { value: "defi", label: "DeFi" },
  { value: "finance", label: "Finance" },
  { value: "web3", label: "Web3" },
  { value: "nft", label: "NFT" },
  { value: "dao", label: "DAO" },
  { value: "gaming", label: "Gaming" },
  { value: "marketplace", label: "Marketplace" },
  { value: "social", label: "Social" },
  { value: "identity", label: "Identity" },
  { value: "privacy", label: "Privacy" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "depin", label: "DePIN" },
];

export function RegisterProject() {
  const route = useRouter();
  const { addProject } = useContext(ProjectsContext);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "waiting" | "verified"
  >("idle");
  const [showCalendar, setShowCalendar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [searchTag, setSearchTag] = useState("");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Auth0 connection states
  const [connectedProvider, setConnectedProvider] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  // Get Auth0 functions and state
  const { loginWithPopup, logout, isAuthenticated, user } = useAuth0();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "Secure Chain",
    description:
      "A decentralized Web3 platform empowering users with secure, transparent, and seamless blockchain interactions. Enables DeFi services, manages digital assets, and verifies ownership—all in one intuitive interface.",
    category: "DeFi",
    contractAddress: "0xA1234B28893...",
    contactInfo: "securechain@gmail.com",
    repository: "https://github.com/repository-name",
    gitProvider: "github",
    amount: "$4,000.00",
    documentFile: null as File | null,
    logoFile: null as File | null,
    documentPreview: "",
    logoPreview: "",
    autoTopUp: true,
  });

  // Update connectedProvider when Auth0 authentication state changes
  useEffect(() => {
    if (isAuthenticated && connectedProvider) {
      // Keep existing connected provider
    } else if (!isAuthenticated) {
      setConnectedProvider(null);
    }
  }, [isAuthenticated, connectedProvider]);

  const filteredTags = availableTags.filter((tag) =>
    tag.label.toLowerCase().includes(searchTag.toLowerCase())
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "document" | "logo"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "document") {
        setFormData((prev) => ({
          ...prev,
          documentFile: file,
          documentPreview: reader.result as string,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          logoFile: file,
          logoPreview: reader.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Function to handle connecting with Git providers through Auth0
  const handleConnect = async (providerName: 'github' | 'gitlab' | 'bitbucket') => {
    setConnectionError(null);
    console.log(`Attempting to connect with ${providerName}`);
    
    // If trying to connect to a new provider, disconnect from the current one first
    if (connectedProvider && connectedProvider !== providerName) {
      await handleDisconnect();
    }

    try {
      console.log("Auth0 config:", {
        domain: auth0Config.domain,
        clientId: auth0Config.clientId,
        redirectUri: auth0Config.redirectUri
      });
      
      // Define the connection scope and parameters based on provider
      let connectionParams = {};
      
      // Provider-specific configuration
      if (providerName === 'github') {
        connectionParams = {
          connection: 'github',
          scope: 'openid profile email repo'
        };
      } else if (providerName === 'gitlab') {
        connectionParams = {
          connection: 'gitlab',
          scope: 'openid profile email',
          audience: 'https://gitlab.com/'
        };
      } else if (providerName === 'bitbucket') {
        connectionParams = {
          connection: 'bitbucket',
          scope: 'openid profile email repository account',
          audience: 'https://api.bitbucket.org/'
        };
      }
      
      console.log(`Using connection params:`, connectionParams);
      
      // Use Auth0's loginWithPopup with the connection parameter
      await loginWithPopup({
        authorizationParams: connectionParams,
      });
      
      // If successful, set the connected provider
      setConnectedProvider(providerName);
      setFormData((prev) => ({ ...prev, gitProvider: providerName }));
      console.log(`Successfully connected with ${providerName}`);
      console.log("User info:", user);
      
    } catch (error) {
      console.error(`Error connecting with ${providerName}:`, error);
      // More detailed error logging
      if (error instanceof Error) {
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      setConnectionError(`Failed to connect with ${providerName}. Please try again. Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Function to disconnect the current provider
  const handleDisconnect = async () => {
    if (connectedProvider) {
      await logout({ logoutParams: { returnTo: window.location.origin } });
      setConnectedProvider(null);
      setConnectionError(null);
      // Reset repository input when disconnecting
      setFormData(prev => ({ ...prev, repository: "" }));
    }
  };

  const triggerFileInput = (type: "document" | "logo") => {
    if (type === "document" && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (type === "logo" && logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!connectedProvider) {
        setConnectionError("Please connect a Git provider before continuing.");
        return;
      }
      setShowSignatureModal(true);
      return;
    }

    if (currentStep === 3) {
      setCurrentStep(4);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const success = Math.random() > 0.3;

      if (success) {
        addProject({
          id: Math.random().toString(36).substring(2, 9),
          name: formData.name,
          category: formData.category,
          bountyAllocated: formData.amount.replace("$", ""),
          bountyPaid: null,
          status: "Ongoing",
          repository: formData.repository,
          contractAddress: formData.contractAddress,
          contactInfo: formData.contactInfo,
        });
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
      }

      setSubmitting(false);
    }, 2000);
  };

  const handleVerification = () => {
    setVerificationStatus("waiting");
    setTimeout(() => {
      setVerificationStatus("verified");
    }, 2000);
  };

  const continueAfterVerification = () => {
    setShowSignatureModal(false);
    setVerificationStatus("idle");
    setCurrentStep(3);
  };

  const retrySubmission = () => {
    setSubmissionStatus("idle");
    setSubmitting(true);
    setTimeout(() => {
      addProject({
        id: Math.random().toString(36).substring(2, 9),
        name: formData.name,
        category: formData.category,
        bountyAllocated: formData.amount.replace("$", ""),
        bountyPaid: null,
        status: "Ongoing",
        repository: formData.repository,
        contractAddress: formData.contractAddress,
        contactInfo: formData.contactInfo,
      });
      setSubmissionStatus("success");
      setSubmitting(false);
    }, 2000);
  };

  const goToDashboard = () => {
    router.push("/dashboard/project-owner/projects");
  };

  const handleTagSelection = (tagValue: string) => {
    if (!selectedTags.includes(tagValue)) {
      setSelectedTags([...selectedTags, tagValue]);
    }
    setTagsOpen(false);
  };

  const handleDateSelection = (newDate: Date | undefined) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  const formatDateForDisplay = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, "dd-MM-yyyy");
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              route.back();
            }}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-gray-400">Back to Project Overview</span>
        </div>
      </div>

      <Card className="bg-[#1A1A1A] border-gray-800 p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          {currentStep === 4 ? "Review Submission" : " Register Project"}
        </h1>
        {currentStep !== 4 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center w-full">
              <div
                className={`relative flex-1 ${
                  currentStep >= 1 ? "text-white" : "text-gray-500"
                }`}
              >
                <div
                  className={`text-xs font-light w-44 h-10 gap-2 rounded-full border flex items-center justify-center ${
                    currentStep >= 1
                      ? "border-[#0000FF] text-white"
                      : "bg-transparent border-gray-700 text-gray-500"
                  }`}
                >
                  <span
                    className={`${
                      currentStep >= 1 ? "border-[#0000FF]" : "border-[#908C8E]"
                    } border rounded-full w-5 h-5 flex justify-center items-center `}
                  >
                    1
                  </span>
                  <span>Project Details</span>
                </div>
                {currentStep === 1 && (
                  <div className="absolute -inset-[3px] border-2 border-blue-600 rounded-full"></div>
                )}
              </div>

              <div className="w-full h-[1px] bg-gray-700 mx-2"></div>

              <div
                className={`relative flex-1 ${
                  currentStep >= 2 ? "text-white" : "text-gray-500"
                }`}
              >
                <div
                  className={`text-xs font-light w-44 h-10 gap-2 rounded-full border flex items-center justify-center ${
                    currentStep >= 2
                      ? "border-[#0000FF] text-white"
                      : "bg-transparent border-gray-700 text-gray-500"
                  }`}
                >
                  <span
                    className={`${
                      currentStep >= 2 ? "border-[#0000FF]" : "border-[#908C8E]"
                    } border rounded-full w-5 h-5 flex justify-center items-center `}
                  >
                    2
                  </span>
                  <span>Ownership Verification</span>
                </div>
                {currentStep === 2 && (
                  <div className="absolute -inset-[3px] border-2 border-blue-600 rounded-full"></div>
                )}
              </div>

              <div className="w-full h-[1px] bg-gray-700 mx-2"></div>

              <div
                className={`relative flex-1 ${
                  currentStep >= 3 ? "text-white" : "text-gray-500"
                }`}
              >
                <div
                  className={`text-xs font-light w-44 h-10 gap-2 rounded-full border flex items-center justify-center ${
                    currentStep >= 3
                      ? "border-[#0000FF] text-white"
                      : "bg-transparent border-gray-700 text-gray-500"
                  }`}
                >
                  <span
                    className={`${
                      currentStep >= 3 ? "border-[#0000FF]" : "border-[#908C8E]"
                    } border rounded-full w-5 h-5 flex justify-center items-center `}
                  >
                    3
                  </span>
                  <span>Bounty Allocation</span>
                </div>
                {currentStep === 3 && (
                  <div className="absolute -inset-[3px] border-2 border-blue-600 rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        )}

        {!submitting && submissionStatus === "idle" ? (
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-white">
                  Project Details
                </h2>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Project Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your project name"
                    className="bg-[#121212] border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Project Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project..."
                    className="bg-[#121212] border-gray-700 text-white min-h-[100px]"
                    required
                  />
                  <div className="text-right text-xs text-gray-500">50/500</div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Choose Category / Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-[#121212] hover:bg-[#1A1A1A] border border-gray-700 text-white flex items-center"
                      >
                        {availableTags.find((t) => t.value === tag)?.label}
                        <button
                          type="button"
                          className="ml-1 text-gray-400 hover:text-white"
                          onClick={() =>
                            setSelectedTags(
                              selectedTags.filter((t) => t !== tag)
                            )
                          }
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between bg-[#121212] border-gray-700 text-white"
                      onClick={() => setTagsOpen(!tagsOpen)}
                    >
                      Select tags...
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>

                    {tagsOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-[#121212] border border-gray-700 rounded-md shadow-lg">
                        <div className="p-2">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                              placeholder="Search"
                              className="pl-8 bg-[#121212] border-gray-700 text-white h-9"
                              value={searchTag}
                              onChange={(e) => setSearchTag(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {filteredTags.map((tag) => (
                            <div
                              key={tag.value}
                              className="flex items-center px-2 py-2 hover:bg-gray-800 cursor-pointer"
                              onClick={() => handleTagSelection(tag.value)}
                            >
                              <div className="flex-1 text-white">
                                {tag.label}
                              </div>
                              {selectedTags.includes(tag.value) && (
                                <Check className="h-4 w-4 text-white" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Smart Contract Address
                  </label>
                  <Input
                    name="contractAddress"
                    value={formData.contractAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your smart contract address"
                    className="bg-[#121212] border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Contact Information (Discord / Telegram)
                  </label>
                  <Input
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    placeholder="Enter your social or email handle info"
                    className="bg-[#121212] border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Supporting Document
                  </label>
                  <div className="border border-gray-700 rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        <DocumentIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-sm text-gray-400">
                        {formData.documentFile
                          ? formData.documentFile.name
                          : "Upload your document"}
                        <div className="text-xs text-gray-500">
                          PDF format • Max 5MB
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, "document")}
                    />
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => triggerFileInput("document")}
                      type="button"
                    >
                      Upload
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Project Logo (Optional)
                  </label>
                  <div className="border border-gray-700 rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {formData.logoPreview ? (
                        <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
                          <Image
                            src={formData.logoPreview || "/placeholder.svg"}
                            alt="Logo preview"
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      <div className="text-sm text-gray-400">
                        {formData.logoFile
                          ? formData.logoFile.name
                          : "Upload your logo"}
                        <div className="text-xs text-gray-500">
                          PNG/JPG/JPEG • Max 2MB
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={logoInputRef}
                      className="hidden"
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => handleFileChange(e, "logo")}
                    />
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => triggerFileInput("logo")}
                      type="button"
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-white mb-1">
                    Ownership Verification
                  </h2>
                  <p className="text-sm text-gray-400 mb-6">Step 2</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base text-white">
                    Where is Your Repository Hosted?
                  </h3>
                  <p className="text-sm text-gray-400">
                    To verify ownership, connect your account and select the
                    relevant repository.
                  </p>

                  {connectionError && (
                    <p className="text-sm text-red-500 mt-2">{connectionError}</p>
                  )}

                  <div className="flex gap-4 mt-4">
                    <Button
                      className={`flex-1 flex items-center justify-center gap-2 ${
                        connectedProvider === "github"
                          ? "bg-green-600 hover:bg-green-700 border-green-500"
                          : formData.gitProvider === "github"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-[#121212] hover:bg-[#1A1A1A]"
                      } text-white border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                      onClick={() => handleConnect('github')}
                      type="button"
                      disabled={!isAuthenticated && connectedProvider !== null}
                    >
                      <Github size={18} />
                      {connectedProvider === 'github' ? 'GitHub Connected' : 'Connect GitHub'}
                      {connectedProvider === 'github' && <Check size={18} className="ml-1" />}
                    </Button>
                    <Button
                      className={`flex-1 flex items-center justify-center gap-2 ${
                        connectedProvider === "gitlab"
                          ? "bg-green-600 hover:bg-green-700 border-green-500"
                          : formData.gitProvider === "gitlab"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-[#121212] hover:bg-[#1A1A1A]"
                      } text-white border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                      onClick={() => handleConnect('gitlab')}
                      type="button"
                      disabled={!isAuthenticated && connectedProvider !== null}
                    >
                      <GitlabIcon size={18} />
                      {connectedProvider === 'gitlab' ? 'GitLab Connected' : 'Connect GitLab'}
                      {connectedProvider === 'gitlab' && <Check size={18} className="ml-1" />}
                    </Button>
                    <Button
                      className={`flex-1 flex items-center justify-center gap-2 ${
                        connectedProvider === "bitbucket"
                          ? "bg-green-600 hover:bg-green-700 border-green-500"
                          : formData.gitProvider === "bitbucket"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-[#121212] hover:bg-[#1A1A1A]"
                      } text-white border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                      onClick={() => handleConnect('bitbucket')}
                      type="button"
                      disabled={!isAuthenticated && connectedProvider !== null}
                    >
                      <BitbucketIcon width={18} height={18} />
                      {connectedProvider === 'bitbucket' ? 'Bitbucket Connected' : 'Connect Bitbucket'}
                      {connectedProvider === 'bitbucket' && <Check size={18} className="ml-1" />}
                    </Button>
                  </div>

                  {connectedProvider && isAuthenticated && (
                    <>
                      <div className="mt-4">
                        <Button
                          onClick={handleDisconnect}
                          type="button"
                          variant="outline"
                          className="text-gray-400 border-gray-700 hover:text-white hover:bg-gray-800"
                        >
                          Disconnect {connectedProvider.charAt(0).toUpperCase() + connectedProvider.slice(1)}
                        </Button>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-base text-white mb-2">
                          Link to Public Repository on {connectedProvider.charAt(0).toUpperCase() + connectedProvider.slice(1)}
                        </h3>
                        <Input
                          name="repository"
                          value={formData.repository}
                          onChange={handleInputChange}
                          placeholder={`https://${connectedProvider}.com/your-username/repository-name`}
                          className="bg-[#121212] border-gray-700 text-white"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-white mb-1">
                    Bounty Allocation
                  </h2>
                  <p className="text-sm text-gray-400 mb-6">Step 3</p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">
                      Escrow Balance (Available for Allocation):
                    </p>
                    <p className="text-white font-medium">$10,000.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      Wallet Balance (Available for use):
                    </p>
                    <p className="text-white font-medium">$25,000.00</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Allocated Bounty
                    </label>
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-[#121212] border-gray-700 text-white w-20"
                          >
                            USD
                            <ChevronDown size={16} className="ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="bg-[#121212] border-gray-700"
                        >
                          <DropdownMenuItem className="text-white">
                            USD
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white">
                            ETH
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white">
                            BTC
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Input
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="Amount"
                        className="bg-[#121212] border-gray-700 text-white flex-1"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Approx. USD $4,000.00
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Date of Expiry
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="DD-MM-YYYY"
                        className="bg-[#121212] border-gray-700 text-white pr-10"
                        value={date ? formatDateForDisplay(date) : ""}
                        readOnly
                        onClick={() => setShowCalendar(!showCalendar)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCalendar(!showCalendar)}
                      >
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </Button>

                      {showCalendar && (
                        <div className="absolute z-10 mt-1 bg-[#121212] border border-gray-700 rounded-md shadow-lg">
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-white font-medium">
                                {format(currentMonth, "MMMM yyyy")}
                              </h3>
                            </div>
                           
                            <CalendarComponent
                              mode="single"
                              selected={date}
                              onSelect={handleDateSelection}
                              month={currentMonth}
                              onMonthChange={setCurrentMonth}
                              className="bg-[#121212] text-white border-none"
                              classNames={{
                                day_selected:
                                  "bg-blue-600 text-white hover:bg-blue-700",
                                day_today: "bg-gray-800 text-white",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoTopUp"
                    checked={formData.autoTopUp}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        autoTopUp: checked as boolean,
                      }))
                    }
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <label
                    htmlFor="autoTopUp"
                    className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Automatically top up from wallet if escrow balance is
                    insufficient
                  </label>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <ReviewSubmissionPage formData={formData}/>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent border-gray-700 text-white"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {currentStep < 4
                  ? currentStep === 3
                    ? "Continue to Review"
                    : "Next"
                  : "Submit and Launch"}
                {currentStep < 4 && <ChevronRight size={16} className="ml-1" />}
              </Button>
            </div>
          </form>
        ) : (
          <>
            {submitting && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-700 rounded-full animate-spin mb-4"></div>
                <p className="text-white">Submitting your project...</p>
              </div>
            )}

            {submissionStatus === "success" && (
              <div className="flex flex-col items-center justify-center py-8">
                <h2 className="text-xl font-bold text-white text-center mb-4">
                  Project Submitted Successfully!
                </h2>
                <p className="text-gray-400 text-center text-sm mb-6">
                  Your project is now live.
                </p>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <p className="text-white text-center mb-8">
                  You can now track projects in the dashboard.
                </p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={goToDashboard}
                >
                  Go to Dashboard
                </Button>
              </div>
            )}

            {submissionStatus === "error" && (
              <div className="flex flex-col items-center justify-center py-8">
                <h2 className="text-xl font-bold text-white text-center mb-4">
                  Submission Failed!
                </h2>
                <p className="text-gray-400 text-center text-sm mb-6">
                  Error ID: PROJ-1
                </p>
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-6">
                  <X className="w-8 h-8 text-white" />
                </div>
                <p className="text-white text-center mb-8">
                  Please check your wallet and try again in a few minutes.
                </p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={retrySubmission}
                >
                  Retry Submission
                </Button>
              </div>
            )}
          </>
        )}
      </Card>

      <Dialog open={showSignatureModal} onOpenChange={setShowSignatureModal}>
        <DialogContent className="bg-[#1A1A1A] border-gray-800 p-6 max-w-md">
          {verificationStatus === "idle" && (
            <>
              <div className="flex justify-center mb-4">
                <Lock className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="text-xl font-bold text-white text-center mb-4">
                Signature Request
              </h2>
              <p className="text-gray-400 text-center text-sm mb-6">
                Please sign the message below to verify that you own this
                project.
              </p>
              <div className="bg-[#121212] border border-gray-700 rounded-md p-4 mb-6">
                <p className="text-gray-300 text-sm">
                  I confirm I am the owner of the project{" "}
                  <span className="font-medium text-white">
                    {formData.name}
                  </span>
                  , address{" "}
                  <span className="font-medium text-white">
                    {formData.contractAddress}
                  </span>
                </p>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-700 text-white"
                  onClick={() => setShowSignatureModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleVerification}
                >
                  Approve
                </Button>
              </div>
            </>
          )}

          {verificationStatus === "waiting" && (
            <>
              <h2 className="text-xl font-bold text-white text-center mb-4">
                Complete Verification
              </h2>
              <p className="text-gray-400 text-center text-sm mb-6">
                Please approve the signature request in your wallet.
              </p>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-700 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-400 text-center text-sm">
                Waiting for confirmation...
              </p>
            </>
          )}

          {verificationStatus === "verified" && (
            <>
              <h2 className="text-xl font-bold text-white text-center mb-4">
                Complete Verification
              </h2>
              <p className="text-gray-400 text-center text-sm mb-6">
                Please approve the signature request in your wallet.
              </p>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-white text-center font-medium mb-6">
                Ownership Verified
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                onClick={continueAfterVerification}
              >
                Continue
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
