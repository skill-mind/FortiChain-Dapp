"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { FORTICHAIN_ABI } from "@/app/abi/fortichain-abi";
import { useContractFetch, fetchContentFromIPFS } from "@/hooks/useBlockchain";

export interface UnifiedReport {
  id: string;
  report_uri: string;
  researcher_address: string;
  project_id: string;
  status: string;
  created_at: number;
  updated_at: number;
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

const createBlockchainReport = (reportData: any, normalizedId: string) => ({
  id: reportData.id?.toString() || normalizedId,
  report_uri: reportData.report_uri || "",
  researcher_address: reportData.researcher_address || "",
  project_id: reportData.project_id?.toString() || "",
  status: "",
  created_at: reportData.created_at ? Number(reportData.created_at) : 0,
  updated_at: reportData.updated_at ? Number(reportData.updated_at) : 0,
});

const transformIpfsContent = (
  ipfsContent: any,
  blockchainReport: any
): UnifiedReport => ({
  ...blockchainReport,
  title: ipfsContent.reportName || "Untitled Report",
  description: ipfsContent.description || "",
  severity: ipfsContent.severity || "Medium",
  cvssScore: ipfsContent.cvssScore || 0,
  url: ipfsContent.url || "",
  status: ipfsContent.status || "",
  vulnerableParameter: ipfsContent.vulnerableParameter || "",
  vulnerabilityDescription: ipfsContent.vulnerabilityDescription || "",
  vulnerabilityImpact: ipfsContent.vulnerabilityImpact || "",
  stepsToReproduce: ipfsContent.stepsToReproduce || [],
  mitigationSteps: ipfsContent.mitigationSteps || [],
  proofOfConcept: ipfsContent.proofOfConcept || [],
  findings: ipfsContent.findings || [],
  summary: ipfsContent.summary || "",
  methodology: ipfsContent.methodology || "",
  tools_used: ipfsContent.tools_used || [],
  timeline: ipfsContent.timeline,
  researcher_info: ipfsContent.researcher_info,
  cid: ipfsContent.cid,
});

export function useGetReport(reportId: string | number): UseGetReportReturn {
  const [state, setState] = useState<{
    report: UnifiedReport | null;
    loading: boolean;
    error: string | null;
    isEmpty: boolean;
  }>({
    report: null,
    loading: true,
    error: null,
    isEmpty: false,
  });

  const normalizedId = useMemo(
    () => (typeof reportId === "number" ? reportId.toString() : reportId),
    [reportId]
  );

  const {
    readData: reportData,
    readIsError: contractError,
    readIsLoading: contractLoading,
    readError: contractErrorDetails,
    dataRefetch: refetchContract,
  } = useContractFetch(FORTICHAIN_ABI, "get_report", [normalizedId]);

  const refetch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      isEmpty: false,
    }));
    refetchContract();
  }, [refetchContract]);

  const setReportData = useCallback(
    (
      report: UnifiedReport | null,
      loading: boolean,
      error: string | null,
      isEmpty: boolean
    ) => {
      setState({ report, loading, error, isEmpty });
    },
    []
  );

  // Memoized blockchain report to prevent unnecessary recalculations
  const blockchainReport = useMemo(() => {
    if (!reportData) return null;
    return createBlockchainReport(reportData, normalizedId);
  }, [reportData, normalizedId]);

  useEffect(() => {
    if (!reportData || contractError || contractLoading) return;

    const fetchReportContent = async () => {
      try {
        if (!blockchainReport?.report_uri) {
          setReportData(
            null,
            false,
            "Report URI not found on blockchain",
            true
          );
          return;
        }

        const ipfsContent = await fetchContentFromIPFS(
          blockchainReport.report_uri
        );

        if (!ipfsContent) {
          setReportData(
            null,
            false,
            "Report content not available from IPFS",
            true
          );
          return;
        }

        const unifiedReport = transformIpfsContent(
          ipfsContent,
          blockchainReport
        );
        setReportData(unifiedReport, false, null, false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        setReportData(null, false, errorMessage, false);
      }
    };

    fetchReportContent();
  }, [
    reportData,
    contractError,
    contractLoading,
    blockchainReport,
    setReportData,
  ]);



  // Contract error handling effect
  useEffect(() => {
    if (contractError && contractErrorDetails) {
      const errorMessage =
        contractErrorDetails.message ||
        "Failed to fetch report from blockchain";
      setReportData(null, false, errorMessage, false);
    }
  }, [contractError, contractErrorDetails, setReportData]);

  return {
    ...state,
    refetch,
  };
}
