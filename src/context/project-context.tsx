"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Project } from "@/types/project";
// import { useToast } from "@/components/ui/toast";

interface ProjectsContextType {
  projects: Project[];
  stats: {
    totalProjects: number;
    activeBounties: number;
  };
  wallet: string;
  disconnectWallet: () => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  stats: {
    totalProjects: 0,
    activeBounties: 0,
  },
  wallet: "",
  disconnectWallet: () => {},
  addProject: () => {},
  updateProject: () => {},
  deleteProject: () => {},
});

interface ProjectsProviderProps {
  children: ReactNode;
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  // const { toast } = useToast();
  const [wallet, setWallet] = useState("0x04ba8b3f324a...");

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Skillnet",
      category: "DeFi",
      bountyAllocated: "5,000.13",
      bountyPaid: "5,124.11",
      status: "Completed",
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
      contactInfo: "contact@skillnet.com",
    },
    {
      id: "2",
      name: "Skillnet",
      category: "DeFi",
      bountyAllocated: "5,000.44",
      bountyPaid: null,
      status: "Ongoing",
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
      contactInfo: "contact@skillnet.com",
    },
    {
      id: "3",
      name: "Skillnet",
      category: "DeFi",
      bountyAllocated: "5,000.11",
      bountyPaid: "2,600.23",
      status: "Closed",
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
      contactInfo: "contact@skillnet.com",
    },
    {
      id: "4",
      name: "Skillnet",
      category: "DeFi",
      bountyAllocated: "5,000.11",
      bountyPaid: null,
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
      contactInfo: "contact@skillnet.com",
      status: "Ongoing",
      description:
        "A decentralized platform for skill sharing and learning in the Web3 ecosystem.",
      stats: {
        commits: 87,
        linesOfCode: "8.3k",
        contributors: 5,
        lastUpdated: "5 days ago",
      },
      languages: [
        { name: "JavaScript", percentage: 65, color: "#f7df1e" },
        { name: "Solidity", percentage: 25, color: "#363636" },
        { name: "TypeScript", percentage: 10, color: "#3178c6" },
      ],
      vulnerabilities: [
        { name: "Low vulnerability on API", severity: "low", count: 2 },
      ],
    },
    {
      id: "5",
      name: "DeFi Guard",
      category: "Security",
      bountyAllocated: "4,000.00",
      bountyPaid: "2,500.00",
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
      contactInfo: "contact@skillnet.com",
      status: "Ongoing",
      description:
        "A decentralized Security Audit & protocol that finds codes for vulnerabilities in DeFi protocols and finds exploits faster.",
    },
  ]);

  const [stats, setStats] = useState({
    totalProjects: 5,
    activeBounties: 5,
  });

  useEffect(() => {
    // Update stats when projects change
    setStats({
      totalProjects: projects.length,
      activeBounties: projects.filter((p) => p.status === "Ongoing").length,
    });
  }, [projects]);

  const disconnectWallet = () => {
    // toast({
    //   title: "Wallet disconnected",
    //   description: "Your wallet has been disconnected successfully.",
    // });
  };

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
    // toast({
    //   title: "Project added",
    //   description: "Your project has been added successfully.",
    // });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      )
    );
    // toast({
    //   title: "Project updated",
    //   description: "Your project has been updated successfully.",
    // });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => {
      const updatedProjects = prev.map((project) =>
        project.id === id ? { ...project, status: "Closed" as "Closed" } : project
      );
      return updatedProjects;
    });

    // toast({
    //   title: "Project closed",
    //   description: "Your project has been closed successfully.",
    // });
  };
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        stats,
        wallet,
        disconnectWallet,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
