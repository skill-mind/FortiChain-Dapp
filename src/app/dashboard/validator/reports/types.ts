export type Report = {
  id: string;
  title: string;
  date: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  cvssScore: number;
  researcher: string;
  url: string;
};

export type ProjectDetails = {
  name: string;
  description: string;
  tags: string[];
  prizePool: string;
  expiryDate: string;
  languages: {
    name: string;
    percentage: number;
  }[];
  repositories: string[];
};
