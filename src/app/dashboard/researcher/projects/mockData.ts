// types.ts

export type LanguageDetails = {
    percentage: number;
    logo: string;
    icon: string;
    bgColor: string;
  };
  
  export type Project = {
    id: number;
    logo: {
      logo: string;
      text: string;
      bgColor: string;
    };
    title: string;
    description: string;
    amount?: string; // optional, since you don’t use it yet
    priority: "Low" | "Medium" | "High" | "Critical";
    viewDetails: string;
    deadline: string;
    status: "Available" | "Completed";
    tags?: string[];
  };
  
  // ✅ Mock data
  export const projects: Project[] = [
    {
      id: 1,
      title: "Smart Contract Audit",
      logo: {
        logo: "/researcherIcon/P1.svg",
        text: "SC",
        bgColor: "bg-blue-800",
      },
      description: "Smart Contract Audit is a planned, thorough evaluation of a smart contract’s codebase, designed to equip researchers with a clear framework for assessing its security, functionality, and efficiency within the Mindblitz ecosystem or related blockchain applications. The audit, to be conducted by specialized security experts, will utilize automated analysis tools and in-depth manual code review to uncover potential vulnerabilities, logical errors, or inefficiencies that could lead to exploits or operational issues. Researchers will focus on verifying the contract’s alignment with its specified requirements, compliance with blockchain industry best practices, and robustness against common attack vectors, such as reentrancy, integer overflows, or unauthorized access. The process will result in a detailed report that identifies any issues, evaluates their severity, and provides actionable recommendations for remediation, enabling researchers to ensure the smart contract’s reliability, security, and trustworthiness prior to its deployment in decentralized systems.",
      priority: "High",
      viewDetails: "/projects/1",
      deadline: "17th - Aug - 2025",
      status: "Available",
      amount:"$1500"

    },
    {
      id: 2,
      title: "Funding Function Audit",
      logo: {
        logo: "/researcherIcon/P2.svg",
        text: "FF",
        bgColor: "bg-green-700",
      },
      description: "Security assessment of funding mechanisms in decentralized apps.",
      priority: "Critical",
      viewDetails: "/projects/2",
      deadline: "17th - Aug - 2025",
      status: "Available",
      amount:"$1200"

    },
    {
      id: 3,
      title: "Strategy Review Audit",
      logo: {
        logo: "/researcherIcon/P2.svg",
        text: "SR",
        bgColor: "bg-purple-600",
      },
      description: "Comprehensive audit of platform’s strategic security approach.",
      priority: "Medium",
      viewDetails: "/projects/3",
      deadline: "17th - Aug - 2025",
      status: "Available",
      amount:"$800"

    },
    {
      id: 4,
      title: "User Experience Testing",
      logo: {
        logo: "/researcherIcon/PC.svg",
        text: "UX",
        bgColor: "bg-red-600",
      },
      description: "Testing app usability and detecting issues with user flows.",
      priority: "High",
      viewDetails: "/projects/4",
      deadline: "17th - Aug - 2025",
      status: "Completed",
      amount:"$1200"
    },
    {
      id: 5,
      title: "Quarterly Financial Report",
      logo: {
        logo: "/researcherIcon/PC.svg",
        text: "FR",
        bgColor: "bg-yellow-600",
      },
      description: "Analysis and audit of the quarterly financial reporting system.",
      priority: "Low",
      viewDetails: "/projects/5",
      deadline: "17th - Aug - 2025",
      status: "Completed",
      amount:"$1800"

    },
    {
      id: 6,
      title: "Product Launch Plan",
      logo: {
        logo: "/researcherIcon/P2.svg",
        text: "PL",
        bgColor: "bg-teal-700",
      },
      description: "Audit and review of product launch security and workflows.",
      priority: "Medium",
      viewDetails: "/projects/6",
      deadline: "17th - Aug - 2025",
      status: "Completed",
      amount:"$1900"

    },
  ];
  
  // ------------------ Cards ------------------
  
  export type Card = {
    id: string;
    date: string;
    title: string;
    severity: "Low" | "Medium" | "High" | "Critical";
    score: number;
    reward: string;
  };
  
  // ✅ Mock data
  export const cards: Card[] = [
    {
      id: "#8793",
      date: "3 Jan, 4:35 PM",
      title: "Filename parameter vulnerability on Home Page",
      severity: "Critical",
      score: 9.0,
      reward: "$200",
    },
    {
      id: "#8794",
      date: "4 Jan, 2:15 PM",
      title: "SQL injection issue on login form",
      severity: "High",
      score: 8.5,
      reward: "$180",
    },
    {
      id: "#8795",
      date: "5 Jan, 11:00 AM",
      title: "Unprotected API endpoint exposing user data",
      severity: "Critical",
      score: 9.3,
      reward: "$300",
    },
    {
      id: "#8796",
      date: "6 Jan, 9:45 AM",
      title: "Cross-site scripting vulnerability in comments section",
      severity: "Medium",
      score: 6.7,
      reward: "$120",
    },
    {
      id: "#8797",
      date: "7 Jan, 5:30 PM",
      title: "Weak password hashing algorithm detected",
      severity: "High",
      score: 7.8,
      reward: "$150",
    },
  ];
  