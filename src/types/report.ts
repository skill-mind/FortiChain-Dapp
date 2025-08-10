export interface Report {
  id: string;
  report_uri: string;
  researcher_address: string;
  project_id: string;
  status: string;
  created_at: number;
  updated_at: number;
}

export interface ReportContent {
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  category: string;
  findings: {
    vulnerability: string;
    impact: string;
    recommendation: string;
    codeSnippet?: string;
    location?: string;
  }[];
  summary: string;
  methodology: string;
  tools_used?: string[];
  timeline?: {
    started: string;
    completed: string;
  };
  researcher_info?: {
    name: string;
    experience: string;
    specialization: string[];
  };
  cid?: string;
}

export interface GetReportState {
  report: Report | null;
  reportContent: ReportContent | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export interface GetReportProps {
  reportId: string;
  className?: string;
  onReportLoad?: (report: Report, content: ReportContent) => void;
  onError?: (error: string) => void;
  showSkeleton?: boolean;
  compact?: boolean;
}
