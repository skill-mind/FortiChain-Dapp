"use client";

import { useEffect, useState } from "react";
import { FORTICHAIN_ABI } from "@/app/abi/fortichain-abi";
import { useContractFetch, fetchContentFromIPFS } from "@/hooks/useBlockchain";

// Unified report data structure
export interface UnifiedReport {
  // Blockchain data
  id: string;
  report_uri: string;
  researcher_address: string;
  project_id: string;
  status: string;
  created_at: number;
  updated_at: number;
  
  // IPFS content
  title?: string;
  description?: string;
  severity?: "Critical" | "High" | "Medium" | "Low";
  cvssScore?: number;
  url?: string;
  vulnerableParameter?: string;
  vulnerabilityDescription?: string;
  vulnerabilityImpact?: string;
  stepsToReproduce?: string[];
  mitigationSteps?: string[];
  proofOfConcept?: string[];
  findings?: Array<{
    vulnerability: string;
    impact: string;
    recommendation: string;
    codeSnippet?: string;
    location?: string;
  }>;
  summary?: string;
  methodology?: string;
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

export interface UseGetReportReturn {
  report: UnifiedReport | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  refetch: () => void;
}

export function useGetReport(reportId: string): UseGetReportReturn {
  const [report, setReport] = useState<UnifiedReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  // Fetch report from blockchain
  const {
    readData: reportData,
    readIsError: contractError,
    readIsLoading: contractLoading,
    readError: contractErrorDetails,
    dataRefetch: refetchContract
  } = useContractFetch(FORTICHAIN_ABI, "get_report", [reportId]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    setIsEmpty(false);
    refetchContract();
  };

  useEffect(() => {
    const fetchReportContent = async () => {
      if (!reportData || contractError || contractLoading) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Parse blockchain report data
        const blockchainReport = {
          id: reportData.id?.toString() || reportId,
          report_uri: reportData.report_uri || "",
          researcher_address: reportData.researcher_address || "",
          project_id: reportData.project_id?.toString() || "",
          status: reportData.status?.toString() || "",
          created_at: reportData.created_at ? Number(reportData.created_at) : 0,
          updated_at: reportData.updated_at ? Number(reportData.updated_at) : 0,
        };

        if (!blockchainReport.report_uri) {
          setIsEmpty(true);
          setLoading(false);
          setError("Report URI not found on blockchain");
          return;
        }

        // Fetch content from IPFS
        const ipfsContent = await fetchContentFromIPFS(blockchainReport.report_uri);
        
        if (!ipfsContent) {
          setError("Failed to fetch report content from IPFS");
          setLoading(false);
          return;
        }

        // Combine blockchain and IPFS data into unified structure
        const unifiedReport: UnifiedReport = {
          ...blockchainReport,
          title: ipfsContent.title || "Untitled Report",
          description: ipfsContent.description || "",
          severity: ipfsContent.severity || "Medium",
          cvssScore: ipfsContent.cvssScore || ipfsContent.cvss_score,
          url: ipfsContent.url || ipfsContent.vulnerable_url,
          vulnerableParameter: ipfsContent.vulnerableParameter || ipfsContent.vulnerable_parameter,
          vulnerabilityDescription: ipfsContent.vulnerabilityDescription || ipfsContent.vulnerability_description,
          vulnerabilityImpact: ipfsContent.vulnerabilityImpact || ipfsContent.vulnerability_impact,
          stepsToReproduce: ipfsContent.stepsToReproduce || ipfsContent.steps_to_reproduce || [],
          mitigationSteps: ipfsContent.mitigationSteps || ipfsContent.mitigation_steps || [],
          proofOfConcept: ipfsContent.proofOfConcept || ipfsContent.proof_of_concept || [],
          findings: ipfsContent.findings || [],
          summary: ipfsContent.summary || "",
          methodology: ipfsContent.methodology || "",
          tools_used: ipfsContent.tools_used || [],
          timeline: ipfsContent.timeline,
          researcher_info: ipfsContent.researcher_info,
          cid: ipfsContent.cid
        };

        setReport(unifiedReport);
        setLoading(false);
        setError(null);
        setIsEmpty(false);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchReportContent();
  }, [reportData, contractError, contractLoading, reportId]);

  // Handle contract errors
  useEffect(() => {
    if (contractError && contractErrorDetails) {
      const errorMessage = contractErrorDetails.message || "Failed to fetch report from blockchain";
      setError(errorMessage);
      setLoading(false);
    }
  }, [contractError, contractErrorDetails]);

  return {
    report,
    loading,
    error,
    isEmpty,
    refetch
  };
}
