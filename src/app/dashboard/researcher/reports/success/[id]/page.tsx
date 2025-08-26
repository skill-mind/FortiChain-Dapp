"use client";

import { ReportLayout } from '../../ReportLayout';
import { useParams } from 'next/navigation';
import { ReportHeader } from '../../../../components/report/ReportHeader';
import { ReportInfoSection } from '../../../../components/report/ReportInfoSection';
import { ReportTextSection } from '../../../../components/report/ReportTextSection';
import { ImageGallery } from '../../../../components/report/ImageGallery';
import { SuccessActions } from '../../../../components/report/ActionButtons';
import { useGetReport } from '@/hooks/useGetReport';


const Success = () => {
  const params = useParams();
  const reportId = params?.id as string;

  // Use the useGetReport hook to fetch full report data (blockchain + IPFS)
  const { report, loading, error, isEmpty, refetch } = useGetReport(Number(reportId));

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-white">Loading report...</div>
      </div>
    );
  }

  // Handle simple error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-yellow-600">Report Not Found</h2>
          <p className="text-gray-600 mb-4">
            The report with ID {reportId} could not be found.
          </p>
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (isEmpty || !report) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-yellow-600">Report Not Found</h2>
          <p className="text-gray-600 mb-4">The report with ID {reportId} could not be found.</p>
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const reportData = {
    id: report.id,
    title: report.title || "",
    status: report.status || "Unknown",
    severity: report.severity || "Medium",
    cvssScore: report.cvssScore?.toString() || "0",
    vulnerableUrl: report.url || report.report_uri || "",
    vulnerableParam: report.vulnerableParameter || "",
    description: report.vulnerabilityDescription || report.description || "",
    impact: report.vulnerabilityImpact || "",
    stepsToReproduce: report.stepsToReproduce && report.stepsToReproduce.length > 0 ? report.stepsToReproduce : null,
    mitigation: report.mitigationSteps && report.mitigationSteps.length > 0 ? report.mitigationSteps : null,
    pocImages: report.proofOfConcept && report.proofOfConcept.length > 0 ? 
      report.proofOfConcept.map((poc, index) => ({
        src: poc,
        alt: `PoC ${index + 1}`
      })) : null
  };



  return (
    <ReportLayout actions={<SuccessActions />}>
      <div className="w-full flex flex-col animate-fadeIn">
        <ReportHeader 
          title={reportData.title} 
          status={reportData.status}
        />
        
        <ReportInfoSection 
          severity={reportData.severity}
          cvssScore={reportData.cvssScore}
          vulnerableUrl={reportData.vulnerableUrl}
          vulnerableParam={reportData.vulnerableParam}
        />
        
        {reportData.description && (
          <div className="animate-slideUp transition-all duration-500 delay-100">
            <ReportTextSection 
              title="Vulnerability Description" 
              content={reportData.description}
            />
          </div>
        )}
        
        {reportData.impact && (
          <div className="animate-slideUp transition-all duration-500 delay-200">
            <ReportTextSection 
              title="Impact of Vulnerability" 
              content={reportData.impact}
            />
          </div>
        )}
        
        {reportData.stepsToReproduce && (
          <div className="animate-slideUp transition-all duration-500 delay-300">
            <ReportTextSection 
              title="Steps to reproduce" 
              content={
                <ol className="list-decimal pl-5 space-y-2">
                  {reportData.stepsToReproduce.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              }
            />
          </div>
        )}
        
        {reportData.pocImages && (
          <div className="animate-slideUp transition-all duration-500 delay-400">
            <ReportTextSection 
              title="Proof of Concept (PoC)" 
              content={<ImageGallery images={reportData.pocImages} />}
            />
          </div>
        )}
        
        {reportData.mitigation && (
          <div className="animate-slideUp transition-all duration-500 delay-500">
            <ReportTextSection 
              title="Mitigation Steps" 
              content={
                <ol className="list-decimal pl-5 space-y-2">
                  {reportData.mitigation.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              }
            />
          </div>
        )}
      </div>
    </ReportLayout>
  );
};

export default Success;