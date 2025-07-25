import { useState, useCallback } from "react";
import { readContractWithStarknetJs } from "./useBlockchain";
import { fetchProjectFromIPFS } from "@/lib/utils";
import type { Project } from "@/types/project";

interface BlockchainProject {
  id: bigint;
  info_uri: string;
  project_owner: string;
  smart_contract_address: string;
  signature_request: boolean;
  is_active: boolean;
  is_completed: boolean;
  created_at: bigint;
  updated_at: bigint;
  deadline: bigint;
  validator_paid: boolean;
  researchers_paid: boolean;
}

interface ProjectViewState {
  project: Project | null;
  loading: boolean;
  error: string | null;
}

// Mock data to avoid infinite loops
const getMockProject = (projectId: string): Project => {
  const mockProjects: Project[] = [
    {
      id: "1",
      name: "DeFi Guard",
      category: "DeFi",
      bountyAllocated: "25,000",
      bountyPaid: "20,000",
      status: "Ongoing",
      repository: "https://github.com/defi-guard/smartcontract",
      description:
        "A decentralized finance (DeFi) protection tool that scans for vulnerabilities in DeFi protocols and helps prevent hacks.",
      tags: ["DeFi", "Security", "Smart Contracts"],
      contractAddress:
        "0x076c1d77832ce056bd13651518b3449c1e0e54413889da31bc261ba8aca0fbb0",
      contactInfo: "contact@defiguard.com",
      languages: [
        { name: "Solidity", percentage: 45, color: "#363636" },
        { name: "TypeScript", percentage: 35, color: "#3178c6" },
        { name: "JavaScript", percentage: 20, color: "#f7df1e" },
      ],
      stats: {
        commits: 127,
        linesOfCode: "12.5k",
        contributors: 8,
        lastUpdated: "2 days ago",
      },
      vulnerabilities: [
        { name: "Reentrancy vulnerability", severity: "high", count: 1 },
        { name: "Integer overflow", severity: "medium", count: 2 },
      ],
    },
    {
      id: "2",
      name: "Plankton Chain",
      category: "Infrastructure",
      bountyAllocated: "15,000",
      bountyPaid: null,
      status: "Ongoing",
      repository: "https://github.com/plankton-chain/core",
      description:
        "A Layer 2 blockchain solution that enhances security while abstracting complex processes for better user experience.",
      tags: ["Layer 2", "Blockchain", "Infrastructure"],
      contractAddress:
        "0x076c1d77832ce056bd13651518b3449c1e0e54413889da31bc261ba8aca0fbb0",
      contactInfo: "team@planktonchain.io",
      languages: [
        { name: "Rust", percentage: 60, color: "#ce422b" },
        { name: "Go", percentage: 25, color: "#00add8" },
        { name: "TypeScript", percentage: 15, color: "#3178c6" },
      ],
      stats: {
        commits: 89,
        linesOfCode: "8.2k",
        contributors: 5,
        lastUpdated: "1 day ago",
      },
    },
    {
      id: "3",
      name: "FortiChain",
      category: "Security",
      bountyAllocated: "50,000",
      bountyPaid: "35,000",
      status: "Completed",
      repository: "https://github.com/fortichain/platform",
      description:
        "A decentralized bug bounty and smart contract security platform that rewards researchers for finding vulnerabilities.",
      tags: ["Security", "Bug Bounty", "Smart Contracts"],
      contractAddress:
        "0x076c1d77832ce056bd13651518b3449c1e0e54413889da31bc261ba8aca0fbb0",
      contactInfo: "security@fortichain.io",
      languages: [
        { name: "Solidity", percentage: 40, color: "#363636" },
        { name: "TypeScript", percentage: 30, color: "#3178c6" },
        { name: "Python", percentage: 20, color: "#3776ab" },
        { name: "Rust", percentage: 10, color: "#ce422b" },
      ],
      stats: {
        commits: 234,
        linesOfCode: "18.7k",
        contributors: 12,
        lastUpdated: "5 days ago",
      },
      vulnerabilities: [
        { name: "Access control issue", severity: "low", count: 3 },
      ],
    },
  ];

  return mockProjects.find((p) => p.id === projectId) || mockProjects[0];
};

export function useProjectView() {
  const [state, setState] = useState<ProjectViewState>({
    project: null,
    loading: false,
    error: null,
  });

  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

  const fetchProject = useCallback(
    async (projectId: string) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // If mock data is enabled, use it directly
      if (useMockData) {
        try {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 800));

          const project = getMockProject(projectId);

          setState({
            project,
            loading: false,
            error: null,
          });
          return project;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
          setState({
            project: null,
            loading: false,
            error: errorMessage,
          });
          throw error;
        }
      }

      try {
        // First, try to get project data from blockchain
        const blockchainProject = (await readContractWithStarknetJs(
          "view_project",
          [projectId]
        )) as BlockchainProject;

        if (!blockchainProject) {
          throw new Error("No project data found");
        }

        // Then, fetch detailed project info from IPFS
        const ipfsData = await fetchProjectFromIPFS(blockchainProject.info_uri);

        // Transform blockchain + IPFS data to Project interface
        const project: Project = {
          id: blockchainProject.id.toString(),
          name: ipfsData.name || "Unknown Project",
          category: ipfsData.category || "Unknown",
          bountyAllocated: ipfsData.bountyAllocated || "0",
          bountyPaid: ipfsData.bountyPaid || null,
          status: blockchainProject.is_completed
            ? "Completed"
            : blockchainProject.is_active
            ? "Ongoing"
            : "Closed",
          repository: ipfsData.repository,
          description: ipfsData.description,
          tags: ipfsData.tags || [],
          contractAddress: blockchainProject.smart_contract_address,
          contactInfo: ipfsData.contactInfo || "",
          languages: ipfsData.languages || [],
          stats: ipfsData.stats,
          vulnerabilities: ipfsData.vulnerabilities || [],
        };

        setState({
          project,
          loading: false,
          error: null,
        });

        return project;
      } catch (error) {
        console.warn(
          "Blockchain call failed, falling back to mock data:",
          error
        );

        // Fallback to mock data
        try {
          const project = getMockProject(projectId);

          setState({
            project,
            loading: false,
            error: null,
          });
          return project;
        } catch (mockError) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
          setState({
            project: null,
            loading: false,
            error: errorMessage,
          });
          throw error;
        }
      }
    },
    [useMockData]
  );

  return {
    ...state,
    fetchProject,
  };
}
