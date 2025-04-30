import type { Report, ProjectDetails } from "../types";

export const mockReports: Record<string, Report[]> = {
  pending: Array.from({ length: 11 }, (_, i) => ({
    id: `#8793`,
    title: "Filename parameter on Home Page - https://example.com/home",
    date: "3 Jan, 4:35 PM",
    severity:
      i % 3 === 0
        ? "Critical"
        : i % 3 === 1
        ? "High"
        : i % 2 === 0
        ? "Medium"
        : "Low",
    cvssScore: i % 3 === 0 ? 9.0 : i % 3 === 1 ? 8.9 : i % 2 === 0 ? 4.0 : 2.2,
    researcher: "@Hypelab",
    url: "https://example.com/home",
  })),
  validated: Array.from({ length: 4 }, (_, i) => ({
    id: `#8793`,
    title: "Filename parameter on Home Page - https://example.com/home",
    date: "3 Jan, 4:35 PM",
    severity: i % 2 === 0 ? "Medium" : "Low",
    cvssScore: i % 2 === 0 ? 4.0 : 3.9,
    researcher: "@Hypelab",
    url: "https://example.com/home",
  })),
  rejected: Array.from({ length: 5 }, (_, i) => ({
    id: `#8793`,
    title: "Filename parameter on Home Page - https://example.com/home",
    date: "3 Jan, 4:35 PM",
    severity: i % 2 === 0 ? "Critical" : "Low",
    cvssScore: i % 2 === 0 ? 9.0 : 2.2,
    researcher: "@Hypelab",
    url: "https://example.com/home",
  })),
};

export const mockProjectDetails: ProjectDetails = {
  name: "DeFi Guard",
  description:
    "A decentralized finance (DeFi) protection tool that scans for vulnerabilities in DeFi protocols and helps prevent hacks.",
  tags: ["DeFi", "Storage", "NFTs"],
  prizePool: "$6,350.56",
  expiryDate: "25-04-2025",
  languages: [
    { name: "TypeScript", percentage: 45 },
    { name: "Python", percentage: 25 },
    { name: "Cairo", percentage: 20 },
    { name: "Rust", percentage: 10 },
  ],
  repositories: ["DeFi-Guard-Smartcontract", "DeFi-Guard-Smartcontract"],
};

export const vulnerabilityDescription = `
Attackers can exploit the Filename parameter to access sensitive files (e.g., /etc/passwd) by sending a crafted request, exposing critical server data.
`;

export const vulnerabilityImpact = `
The vulnerability of Local File Inclusion (LFI) on the home page "https://example.com/home" can be attributed to the impact of the filename parameter. This vulnerability allows an attacker to manipulate the filename parameter in the URL to include arbitrary local files from the server.
`;

export const stepsToReproduce = [
  "Go to the Home Page (https://example.com/home).",
  "Select any file from the selection section.",
  "Intercept the request in the Burp Suite Proxy tool and send it to the request repeater tab in Burp Suite Proxy tool.",
];

export const mitigationSteps = [
  "Implement input validation and sanitize user input to prevent the \n inclusion of unauthorized file paths or malicious input.",
  "Avoid using user-supplied input directly in file inclusion functions. \n Instead, use a whitelist approach or predefined file mappings.",
];
