export interface Project {
  id: string;
  name: string;
  category: string;
  bountyAllocated: string;
  bountyPaid: string | null;
  status: "Completed" | "Ongoing" | "Closed" | "Paused";
  repository?: string;
  description?: string;
  tags?: string[];
  contractAddress: string;
  contactInfo: string;
  languages?: { name: string; percentage: number; color: string }[];
  stats?: {
    commits: number;
    linesOfCode: string;
    contributors: number;
    lastUpdated: string;
  };
  vulnerabilities?: { name: string; severity: string; count: number }[];
}
