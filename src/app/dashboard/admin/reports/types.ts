export type Report = {
    id: string
    title?: string
    projectName: string
    reviewedBy: string
    submittedBy: string
    bounty?: string
    reviewerReward?: string
    researcherReward?: string
    validatorReward?: string
    status: "Approved" | "Rejected" | "Pending"
    severity?: "Critical" | "High" | "Medium" | "Low"
    cvssScore?: number
    vulnerableUrl?: string
    vulnerableParameter?: string
  }
  
  export type ReportStats = {
    total: number
    approved: number
    pending: number
    rejected: number
  }
  