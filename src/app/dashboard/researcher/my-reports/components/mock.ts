import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    status: "audited",
    title: "Smart contract audit",
    priority: "Low",
    available: true,
    issueCount: 4,
    description: "SQL injection vulnerability in user profile update functionality allowing data exfiltration.",
    deadline: "17th - Aug - 2025",
    submitted: "17th - Aug - 2025",
    action: "Go to Project",
    logo: "/researcherIcon/avatar.svg",
    bounty: "$1,200",
    githubRepo: "https://github.com/example/repo",
    contractAddress: "0x1234...5678",
    report: {
      reportTitle: "Smart contract audit",
      severity: "Medium",
      category: "Logic Error",
      details: "Smart Contract Audit is a planned, thorough evaluation of a smart contract’s codebase, designed to equip researchers with a clear framework for assessing its security, functionality, and efficiency within the Mindblitz ecosystem or related blockchain applications. The audit, to be conducted by specialized security experts, will utilize automated analysis tools and in-depth manual code review to uncover potential vulnerabilities, logical errors, or inefficiencies that could lead to exploits or operational issues. Researchers will focus on verifying the contract’s alignment with its specified requirements, compliance with blockchain industry best practices, and robustness against common attack vectors, such as reentrancy, integer overflows, or unauthorized access. The process will result in a detailed report that identifies any issues, evaluates their severity, and provides actionable recommendations for remediation, enabling researchers to ensure the smart contract’s reliability, security, and trustworthiness prior to its deployment in decentralized systems.",
      reportDescription: `This comprehensive evaluation of the operational system reveals several critical areas requiring immediate attention and strategic intervention. The assessment encompasses multiple dimensions of system performance, user experience, and infrastructure utilization.

Key areas of focus include:

• **System Performance**: Detailed analysis of processing speed, error rates, and CPU usage patterns reveals significant bottlenecks in data processing workflows that impact overall system efficiency.

• **User Experience**: Feedback from user surveys and interviews indicates interface lag and navigation complexity issues that hinder user productivity and satisfaction.

• **Infrastructure Utilization**: Review of current hardware configurations, software versions, and network bandwidth utilization shows outdated components and inefficient resource allocation.

Key findings include bottlenecks in data processing workflows, outdated hardware components, and inconsistent user training, all contributing to operational inefficiencies.`,
      reportPotentialRisk: `If these issues are not addressed promptly, the following risks may materialize:

• **Productivity Loss**: Continued system inefficiencies will result in decreased productivity and increased operational costs.

• **Increased Costs**: Outdated infrastructure and inefficient processes will lead to higher maintenance and operational expenses.

• **System Downtime**: Critical bottlenecks may cause system failures and unplanned downtime, affecting business continuity.

• **User Dissatisfaction**: Poor user experience will lead to decreased user engagement and potential loss of users.

• **Scalability Challenges**: Current infrastructure limitations will hinder future growth and expansion capabilities.

• **Data Integrity**: Potential security vulnerabilities may compromise data integrity and system reliability.`,
      reportRecommendations: `Based on the comprehensive analysis, the following recommendations are proposed:

• **System Optimization**: Implement performance monitoring tools and optimize data processing workflows to eliminate bottlenecks and improve system efficiency.

• **Infrastructure Upgrade**: Replace outdated hardware components and upgrade software versions to ensure optimal performance and security.

• **User Training**: Conduct comprehensive user training programs to improve system utilization and reduce user-related errors.

• **Monitoring and Maintenance**: Establish regular monitoring protocols and preventive maintenance schedules to ensure system reliability.

• **Follow-Up Evaluation**: Schedule periodic reviews to assess the effectiveness of implemented solutions and identify areas for continuous improvement.`,
    },
  },
  {
    id: 2,
    status: "progress",
    title: "Platform migration",
    priority: "Medium",
    available: true,
    issueCount: 3,
    description: "Migration to new hosting service for improved performance and scalability.",
    deadline: "30th - Sep - 2025",
    submitted: "10th - Sep - 2025",
    action: "Edit Report",
    logo: "/researcherIcon/avatar.svg",
    bounty: "$1,200",
    githubRepo: "https://github.com/example/repo",
    contractAddress: "0x1234...5678",
    report: {
      reportTitle: "Platform migration",
      severity: "Medium",
      category: "Logic Error",
      reportDescription: "Migration to new hosting service for improved performance and scalability.",
      reportPotentialRisk: "Potential downtime and data migration risks if not planned properly.",
      reportRecommendations: "Perform staged rollout with backups and monitoring.",
    },
  },
  {
    id: 3,
    status: "progress",
    title: "User interface redesign",
    priority: "High",
    available: true,
    issueCount: 5,
    description: "Complete overhaul of the user interface to enhance user experience.",
    deadline: "22nd - Oct - 2025",
    submitted: "01st - Oct - 2025",
    action: "Edit Report",
    logo: "/researcherIcon/avatar.svg",
    bounty: "$1,200",
    githubRepo: "https://github.com/example/repo",
    contractAddress: "0x1234...5678",
    report: {
      reportTitle: "User interface redesign",
      severity: "High",
      category: "Performance",
      reportDescription: "Complete overhaul of the user interface to enhance user experience.",
      reportPotentialRisk: "Scope creep and inconsistency across components.",
      reportRecommendations: "Adopt a design system and component library.",
    },
  },
  {
    id: 4,
    status: "audited",
    title: "New feature implementation",
    priority: "High",
    available: true,
    issueCount: 2,
    description: "Implementation of dark mode feature based on user feedback and requests.",
    deadline: "12th - Nov - 2025",
    submitted: "12th - Nov - 2025",
    action: "Go to Project",
    logo: "/researcherIcon/avatar.svg",
    bounty: "$1,200",
    githubRepo: "https://github.com/example/repo",
    contractAddress: "0x1234...5678",
    report: {
      reportTitle: "New feature implementation",
      severity: "High",
      category: "Security",
      reportDescription: "Implementation of dark mode feature based on user feedback and requests.",
      reportPotentialRisk: "Accessibility issues and increased maintenance.",
      reportRecommendations: "Follow WCAG guidelines and add automated tests.",
    },
  },
];
