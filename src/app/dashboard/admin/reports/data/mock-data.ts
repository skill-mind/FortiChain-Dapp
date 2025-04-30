import type { ReportStats } from "../types"

export const reportStats: ReportStats = {
  total: 55,
  approved: 25,
  pending: 20,
  rejected: 10,
}

export const mockReports = {
  all: [
    {
      id: "#24084",
      projectName: "InheritX",
      reviewedBy: "Favour Stephen",
      submittedBy: "0xabcd...1234",
      bounty: "$5,001.23",
      reviewerReward: "$5,001.23",
      status: "Approved" as const,
    },
    {
      id: "#24084",
      projectName: "FortiChain",
      reviewedBy: "Daniel Ochoja",
      submittedBy: "0xabcd...1234",
      bounty: "N/A",
      reviewerReward: "N/A",
      status: "Rejected" as const,
    },
    {
      id: "#24084",
      projectName: "SkillNet",
      reviewedBy: "Aisha Murtala",
      submittedBy: "0xabcd...1234",
      bounty: "N/A",
      reviewerReward: "N/A",
      status: "Pending" as const,
    },
    {
      id: "#24084",
      projectName: "Defi Guard",
      reviewedBy: "Daniel Ochoja",
      submittedBy: "0xabcd...1234",
      bounty: "$521.22",
      reviewerReward: "$521.22",
      status: "Approved" as const,
    },
    {
      id: "#24084",
      projectName: "InheritX",
      reviewedBy: "Daniel Ochoja",
      submittedBy: "0xabcd...1234",
      bounty: "$23.51",
      reviewerReward: "$23.51",
      status: "Approved" as const,
    },
  ],
}

export const vulnerabilityDescription = `
Attackers can exploit the Filename parameter to access sensitive files (e.g., /etc/passwd) by sending a crafted request, exposing critical server data.
`

export const vulnerabilityImpact = `
The vulnerability of Local File Inclusion (LFI) on the home page "https://example.com/home" can be attributed to the impact of the filename parameter. This vulnerability allows an attacker to manipulate the filename parameter in the URL to include arbitrary local files from the server.
`

export const stepsToReproduce = [
  "Go to the Home Page (https://example.com/home).",
  "Select any file from the selection section.",
  "Intercept the request in the Burp Suite Proxy tool and send it to the request repeater tab in Burp Suite Proxy tool.",
]

export const mitigationSteps = [
  "Implement input validation and sanitize user input to prevent the inclusion of unauthorized file paths or malicious input.",
  "Avoid using user-supplied input directly in file inclusion functions. Instead, use a whitelist approach or predefined file mappings.",
]
