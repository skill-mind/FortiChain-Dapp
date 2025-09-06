export type Project = {
    id: number;
    status: string;
    title: string;
    priority: string;
    issueCount: number;
    description: string;
    deadline: string;
    submitted: string;
    action: string;
    logo: string;
    bounty: string;
    githubRepo: string;
    contractAddress: string;
    report: Report;
    available: boolean;
}

export type Report = {
    reportTitle: string;
    severity: "Low" | "Medium" | "High" | "Critical";
    category: string; // e.g., Logic Error, Security, Performance
    details?: string;
    reportDescription: string;
    reportPotentialRisk: string;
    reportRecommendations: string;
}