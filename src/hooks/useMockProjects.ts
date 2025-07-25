import { useState, useCallback, useEffect } from "react";
import type { Project } from "@/types/project";

// Mock project data that matches our Project interface
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
  {
    id: "4",
    name: "StarkSwap",
    category: "DeFi",
    bountyAllocated: "30,000",
    bountyPaid: null,
    status: "Ongoing",
    repository: "https://github.com/starkswap/contracts",
    description:
      "A decentralized exchange built on StarkNet with advanced AMM features and low transaction costs.",
    tags: ["DEX", "AMM", "StarkNet"],
    contractAddress:
      "0x076c1d77832ce056bd13651518b3449c1e0e54413889da31bc261ba8aca0fbb0",
    contactInfo: "dev@starkswap.io",
    languages: [
      { name: "Cairo", percentage: 70, color: "#ff6b35" },
      { name: "TypeScript", percentage: 25, color: "#3178c6" },
      { name: "Python", percentage: 5, color: "#3776ab" },
    ],
    stats: {
      commits: 156,
      linesOfCode: "9.8k",
      contributors: 6,
      lastUpdated: "3 hours ago",
    },
  },
  {
    id: "5",
    name: "ZK Vault",
    category: "Privacy",
    bountyAllocated: "40,000",
    bountyPaid: null,
    status: "Paused",
    repository: "https://github.com/zkvault/core",
    description:
      "A zero-knowledge privacy solution for secure asset management and private transactions.",
    tags: ["Zero Knowledge", "Privacy", "Cryptography"],
    contractAddress:
      "0x076c1d77832ce056bd13651518b3449c1e0e54413889da31bc261ba8aca0fbb0",
    contactInfo: "privacy@zkvault.tech",
    languages: [
      { name: "Rust", percentage: 50, color: "#ce422b" },
      { name: "Cairo", percentage: 30, color: "#ff6b35" },
      { name: "TypeScript", percentage: 20, color: "#3178c6" },
    ],
    stats: {
      commits: 78,
      linesOfCode: "6.4k",
      contributors: 4,
      lastUpdated: "1 week ago",
    },
    vulnerabilities: [
      { name: "Cryptographic weakness", severity: "high", count: 1 },
    ],
  },
];

interface MockProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export function useMockProjects(
  type: "all" | "completed" | "in_progress" = "all"
) {
  const [state, setState] = useState<MockProjectsState>({
    projects: [],
    loading: false,
    error: null,
  });

  const fetchProjects = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      let filteredProjects = mockProjects;

      // Filter based on type
      if (type === "completed") {
        filteredProjects = mockProjects.filter((p) => p.status === "Completed");
      } else if (type === "in_progress") {
        filteredProjects = mockProjects.filter((p) => p.status === "Ongoing");
      }

      setState({
        projects: filteredProjects,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch projects";
      setState({
        projects: [],
        loading: false,
        error: errorMessage,
      });
    }
  }, [type]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const refetch = useCallback(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    ...state,
    refetch,
  };
}

export function useMockProjectView() {
  const [state, setState] = useState<{
    project: Project | null;
    loading: boolean;
    error: string | null;
  }>({
    project: null,
    loading: false,
    error: null,
  });

  const fetchProject = useCallback(async (projectId: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const project = mockProjects.find((p) => p.id === projectId);

      if (!project) {
        throw new Error("Project not found");
      }

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
  }, []);

  return {
    ...state,
    fetchProject,
  };
}
