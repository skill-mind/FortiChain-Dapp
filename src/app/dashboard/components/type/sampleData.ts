import { Report } from '../type/Report';

export const sampleReports: Report[] = [
  {
    id: "1142",
    title: "Local File Inclusion (LFI) on Home Page – https://example.com/home",
    projectName: "InheritX",
    severity: "Critical",
    status: "Approved",
    description: "Attackers can exploit the Filename parameter to access sensitive files (e.g., /etc/passwd) by sending a crafted request, exposing critical server data.",
    cvssScore: "8.6",
    vulnerableUrl: "https://example.com/home - Home Page",
    vulnerableParam: "Broken Access Control",
    impact: "The vulnerability of Local File Inclusion (LFI) on the home page \"https://example.com/home\" can be attributed to the impact of the filename parameter. This vulnerability allows an attacker to manipulate the filename parameter in the URL to include arbitrary local files from the server.",
    stepsToReproduce: [
      "Go to the Home Page (https://example.com/home).",
      "Select any file from the selection section.",
      "Intercept the request in the Burp Suite Proxy tool and send it to the request repeater tab in Burp Suite Proxy tool."
    ],
    pocImages: [
      { src: "/download3.svg", alt: "PoC 1" },
      { src: "/poc.svg", alt: "PoC 2" },
      { src: "/download.svg", alt: "PoC 3" }
    ],
    mitigationSteps: [
      "Implement input validation and sanitize user input to prevent the inclusion of unauthorized file paths or malicious input.",
      "Avoid using user-supplied input directly in file inclusion functions. Instead, use a whitelist approach or predefined file mappings."
    ]
  },
  {
    id: "2516",
    title: "Cross-Site Scripting (XSS) on Login Page",
    projectName: "InheritX",
    severity: "High",
    status: "Rejected",
    description: "The login page is vulnerable to XSS attacks due to unsanitized user input.",
    cvssScore: "7.5",
    vulnerableUrl: "https://example.com/login - Login Page",
    vulnerableParam: "username parameter",
    impact: "An attacker can inject malicious scripts that execute when other users view the page, potentially stealing session cookies or personal information.",
    stepsToReproduce: [
      "Navigate to the login page.",
      "Enter '<script>alert('XSS')</script>' in the username field.",
      "Submit the form."
    ],
    pocImages: [
      { src: "/download3.svg", alt: "PoC 1" },
      { src: "/poc.svg", alt: "PoC 2" }
    ]
  },
  {
    id: "2879",
    title: "SQL Injection in Search Function",
    projectName: "InheritX",
    severity: "High",
    status: "Approved",
    description: "The search function is vulnerable to SQL injection attacks.",
    cvssScore: "8.2",
    vulnerableUrl: "https://example.com/search - Search Page",
    vulnerableParam: "query parameter",
    impact: "An attacker can execute arbitrary SQL commands on the database, potentially accessing, modifying, or deleting sensitive data.",
    stepsToReproduce: [
      "Navigate to the search page.",
      "Enter a payload like ' OR 1=1 -- in the search field.",
      "Submit the search form."
    ],
    pocImages: [
      { src: "/download.svg", alt: "PoC 1" },
      { src: "/poc.svg", alt: "PoC 2" }
    ],
    mitigationSteps: [
      "Use parameterized queries or prepared statements.",
      "Implement proper input validation and sanitization.",
      "Apply the principle of least privilege to database accounts."
    ]
  },
  {
    id: "2456",
    title: "Insecure Direct Object Reference (IDOR)",
    projectName: "InheritX",
    severity: "Critical",
    status: "Pending",
    description: "Users can access resources belonging to other users by manipulating resource identifiers.",
    cvssScore: "7.8",
    vulnerableUrl: "https://example.com/profile - User Profile",
    vulnerableParam: "userId parameter",
    impact: "An attacker can access or modify other users' data by manipulating object references in requests.",
    stepsToReproduce: [
      "Log in to a user account.",
      "Navigate to the profile page.",
      "Change the userId parameter in the URL to another user's ID."
    ],
    pocImages: [
      { src: "/download3.svg", alt: "PoC 1" }
    ]
  }
];


// New dummy report for modal testing - Fixed TypeScript errors
export const dummyReport: Report = {
  id: "1982",
  title: "UI Glitch in Wallet Connection Modal",
  projectName: "Dummy Report ",
  severity: "Medium",
  status: "Pending",
  cvssScore: "5.4", 
  vulnerableUrl: "https://example.com/wallet",
  vulnerableParam: "wallet_address",
  description:
    "A UI glitch occurs when connecting wallet through the modal interface, causing display inconsistencies and potential user confusion.",
  impact:
    "Users may experience confusion during wallet connection process, potentially leading to failed transactions.",
  stepsToReproduce: [
    "Navigate to wallet connection page",
    "Click 'Connect Wallet' button",
    "Select MetaMask option",
    "Observe the UI glitch in modal display",
  ],
  pocImages: [
    {
      src: "/placeholder.svg?height=200&width=300",
      alt: "UI Glitch Screenshot",
    },
  ],
  mitigationSteps: [
    "Update CSS styling for modal component",
    "Test across different screen resolutions",
    "Implement responsive design fixes",
  ],
}
