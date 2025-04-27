export interface Report {
    id: string;
    title: string;
    projectName: string;
    severity: string;
    status: string;
    description: string;
    cvssScore: string;
    vulnerableUrl: string;
    vulnerableParam: string;
    impact: string;
    stepsToReproduce: string[];
    pocImages: {
        src: string;
        alt: string;
    }[];
    mitigationSteps?: string[];
}
