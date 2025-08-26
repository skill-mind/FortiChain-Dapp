"use client";

import { useEffect, useState } from "react";
import { FORTICHAIN_ABI } from "@/app/abi/fortichain-abi";
import { useContractFetch, fetchContentFromIPFS } from "@/hooks/useBlockchain";

// Simple hook that works with existing dashboard interfaces
export function useReportData(reportId: string) {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch report from blockchain
  const {
    readData: blockchainData,
    readIsError: contractError,
    readIsLoading: contractLoading,
    readError: contractErrorDetails,
    dataRefetch: refetchContract
  } = useContractFetch(FORTICHAIN_ABI, "get_report", [reportId]);

  useEffect(() => {
    const fetchCompleteReport = async () => {
      console.log("🔍 useReportData: Starting fetch for reportId:", reportId);
      
      if (!blockchainData || contractError || contractLoading) {
        console.log("⏳ useReportData: Waiting for blockchain data...", {
          hasBlockchainData: !!blockchainData,
          contractError,
          contractLoading
        });
        return;
      }

      try {
        console.log("📦 useReportData: Blockchain data received:", blockchainData);
        setLoading(true);
        setError(null);

        // Get IPFS hash from blockchain
        const ipfsHash = blockchainData.report_uri;
        console.log("🔗 useReportData: IPFS hash from blockchain:", ipfsHash);
        
        if (!ipfsHash) {
          console.error("❌ useReportData: No IPFS hash found in blockchain data");
          setError("Report URI not found on blockchain");
          setLoading(false);
          return;
        }

        // Fetch content from IPFS
        console.log("📡 useReportData: Fetching content from IPFS...");
        const ipfsContent = await fetchContentFromIPFS(ipfsHash);
        console.log("📄 useReportData: IPFS content received:", ipfsContent);
        
        if (!ipfsContent) {
          console.error("❌ useReportData: Failed to fetch IPFS content");
          setError("Failed to fetch report content from IPFS");
          setLoading(false);
          return;
        }

        // Combine blockchain and IPFS data
        console.log("🔄 useReportData: Combining blockchain and IPFS data...");
        const completeReport = {
          // Blockchain data
          id: blockchainData.id?.toString() || reportId,
          researcher_address: blockchainData.researcher_address || "",
          project_id: blockchainData.project_id?.toString() || "",
          status: blockchainData.status?.toString() || "",
          created_at: blockchainData.created_at ? Number(blockchainData.created_at) : 0,
          updated_at: blockchainData.updated_at ? Number(blockchainData.updated_at) : 0,
          
          // IPFS content - mapped to existing dashboard interfaces
          title: ipfsContent.title || "Untitled Report",
          projectName: ipfsContent.projectName || ipfsContent.project_name || "Unknown Project",
          reviewedBy: ipfsContent.reviewedBy || ipfsContent.reviewed_by || "Pending",
          submittedBy: ipfsContent.submittedBy || ipfsContent.submitted_by || blockchainData.researcher_address,
          bounty: ipfsContent.bounty || ipfsContent.researcher_reward || "0",
          researcherReward: ipfsContent.researcherReward || ipfsContent.researcher_reward || "0",
          validatorReward: ipfsContent.validatorReward || ipfsContent.validator_reward || "0",
          severity: ipfsContent.severity || "Medium",
          cvssScore: ipfsContent.cvssScore || ipfsContent.cvss_score || 0,
          url: ipfsContent.url || ipfsContent.vulnerable_url || "",
          vulnerableUrl: ipfsContent.vulnerableUrl || ipfsContent.vulnerable_url || "",
          vulnerableParameter: ipfsContent.vulnerableParameter || ipfsContent.vulnerable_parameter || "",
          
          // Additional content
          description: ipfsContent.description || "",
          vulnerabilityDescription: ipfsContent.vulnerabilityDescription || ipfsContent.vulnerability_description || "",
          vulnerabilityImpact: ipfsContent.vulnerabilityImpact || ipfsContent.vulnerability_impact || "",
          stepsToReproduce: ipfsContent.stepsToReproduce || ipfsContent.steps_to_reproduce || [],
          mitigationSteps: ipfsContent.mitigationSteps || ipfsContent.mitigation_steps || [],
          proofOfConcept: ipfsContent.proofOfConcept || ipfsContent.proof_of_concept || [],
          findings: ipfsContent.findings || [],
          summary: ipfsContent.summary || "",
          methodology: ipfsContent.methodology || "",
          tools_used: ipfsContent.tools_used || [],
          timeline: ipfsContent.timeline,
          researcher_info: ipfsContent.researcher_info,
          
          // IPFS metadata
          report_uri: ipfsHash,
          cid: ipfsContent.cid || ipfsHash
        };

        setReportData(completeReport);
        setLoading(false);
        console.log("✅ useReportData: Report data successfully combined and set:", completeReport);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        console.error("❌ useReportData: Error during fetch process:", error);
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchCompleteReport();
  }, [blockchainData, contractError, contractLoading, reportId]);

  // Handle contract errors
  useEffect(() => {
    if (contractError && contractErrorDetails) {
      const errorMessage = contractErrorDetails.message || "Failed to fetch report from blockchain";
      setError(errorMessage);
      setLoading(false);
    }
  }, [contractError, contractErrorDetails]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    refetchContract();
  };

  return {
    reportData,
    loading,
    error,
    refetch
  };
}
