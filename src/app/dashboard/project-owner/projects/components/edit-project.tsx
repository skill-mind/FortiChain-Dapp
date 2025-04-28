"use client";

import type React from "react";

import { useContext, useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, ChevronDown, Check, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProjectsContext } from "@/context/project-context";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  { value: "security", label: "Security" },
];

export function EditProject({ id }: { id: string }) {
  const { projects, wallet, updateProject } = useContext(ProjectsContext);
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Find the project by ID
  const project = projects.find((p) => p.id === id);
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    category: project?.category || "",
    contractAddress: project?.contractAddress || "",
    contactInfo: project?.contactInfo || "",
    repository: project?.repository || "",
    documentFile: null as File | null,
    logoFile: null as File | null,
    documentPreview: "",
    logoPreview: "",
  });

  // Initialize selected tags from project
  useState(() => {
    if (project?.tags) {
      setSelectedTags(project.tags.map((tag) => tag.toLowerCase()));
    } else if (project?.category) {
      setSelectedTags([project.category.toLowerCase()]);
    }
  });

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

  const triggerFileInput = (type: "document" | "logo") => {
    if (type === "document" && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (type === "logo" && logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Get tag labels from selected tag values
    const tagLabels = selectedTags.map(
      (tagValue) =>
        availableTags.find((t) => t.value === tagValue)?.label || tagValue
    );

    setTimeout(() => {
      updateProject(id, {
        name: formData.name,
        description: formData.description,
        category: formData.category || tagLabels[0] || "DeFi",
        tags: tagLabels,
        repository: formData.repository,
        contractAddress: formData.contractAddress,
        contactInfo: formData.contactInfo,
      });
      setSubmitting(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  const goBackToProject = () => {
    router.push(`/dashboard/project-owner/projects/${id}`);
  };

  if (!project) {
    return <div className="flex-1 p-6 text-white">Project not found</div>;
  }

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-gray-400">Back</span>
        </div>
      </div>

      <div className="bg-[#1C1618] border border-[#464043] p-4 rounded-xl">
        <h1 className="text-center text-2xl font-bold text-white mb-8">Edit Project</h1>
        {!submitting && !showSuccessModal ? (
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="text-right text-xs text-gray-500">
                {formData.description.length}/500
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                Project Category / Tags
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
                        setSelectedTags(selectedTags.filter((t) => t !== tag))
                      }
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
              <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button" // Add type="button" to prevent form submission
                    variant="outline"
                    role="combobox"
                    aria-expanded={tagsOpen}
                    className="w-full justify-between bg-[#121212] border-gray-700 text-white"
                  >
                    Select tags...
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-[#121212] border-gray-700">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search"
                        className="pl-8 bg-[#121212] border-gray-700 text-white h-9"
                      />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {availableTags.map((tag) => (
                      <div
                        key={tag.value}
                        className="flex items-center px-2 py-2 hover:bg-gray-800 cursor-pointer"
                        onClick={() => {
                          if (!selectedTags.includes(tag.value)) {
                            setSelectedTags([...selectedTags, tag.value]);
                          }
                          setTagsOpen(false);
                        }}
                      >
                        <div className="flex-1 text-white">{tag.label}</div>
                        {selectedTags.includes(tag.value) && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
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
              <label className="text-sm text-gray-400">Repository Link</label>
              <Input
                name="repository"
                value={formData.repository}
                onChange={handleInputChange}
                placeholder="https://github.com/repository-name"
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

            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </form>
        ) : submitting ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-700 rounded-full animate-spin mb-4"></div>
            <p className="text-white">Updating project...</p>
          </div>
        ) : null}

        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="bg-[#1A1A1A] border-gray-800 p-6 max-w-md">
            <h2 className="text-xl font-bold text-white text-center mb-4">
              Project Updated
            </h2>
            <p className="text-gray-400 text-center text-sm mb-6">
              Your changes have been saved successfully.
            </p>
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              onClick={goBackToProject}
            >
              Back to project
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function DocumentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
