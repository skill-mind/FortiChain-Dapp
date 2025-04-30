// pages/reports/success.tsx or app/reports/success/page.tsx (depending on your Next.js version)
"use client";

import { useState, useEffect} from 'react';
import { ReportLayout } from '../../ReportLayout';
import { useParams } from 'next/navigation';
import { ReportHeader } from '../../../../components/report/ReportHeader';
import { ReportInfoSection } from '../../../../components/report/ReportInfoSection';
import { ReportTextSection } from '../../../../components/report/ReportTextSection';
import { ImageGallery } from '../../../../components/report/ImageGallery';
import { SuccessActions } from '../../../../components/report/ActionButtons';

const getReportData = (id: string) => {
  // This would typically be an API call
  return {
    id,
    title: "Local File Inclusion (LFI) on Home Page – https://example.com/home",
    status: "Fixed",
    severity: "High",
    cvssScore: "8.6",
    vulnerableUrl: "https://example.com/home - Home Page",
    vulnerableParam: "Broken Access Control",
    description: "Attackers can exploit the Filename parameter to access sensitive files (e.g., /etc/passwd) by sending a crafted request, exposing critical server data.",
    impact: "The vulnerability of Local File Inclusion (LFI) on the home page \"https://example.com/home\" can be attributed to the impact of the filename parameter. This vulnerability allows an attacker to manipulate the filename parameter in the URL to include arbitrary local files from the server.",
    stepsToReproduce: (
      <ol className="list-decimal pl-5 space-y-2">
        <li>Go to the Home Page (https://example.com/home).</li>
        <li>Select any file from the selection section.</li>
        <li>Intercept the request in the Burp Suite Proxy tool and send it to the request repeater tab in Burp Suite Proxy tool.</li>
      </ol>
    ),
    mitigation: (
      <ol className="list-decimal pl-5 space-y-2">
        <li>Implement input validation and sanitize user input to prevent the inclusion of unauthorized file paths or malicious input.</li>
        <li>Avoid using user-supplied input directly in file inclusion functions. Instead, use a whitelist approach or predefined file mappings.</li>
      </ol>
    ),
    pocImages: [
      { src: "/download3.svg", alt: "PoC 1" },
      { src: "/poc.svg", alt: "PoC 2" },
      { src: "/download.svg", alt: "PoC 3" }
    ]
  };
};

const Success = () => {
  const params = useParams();
  const reportId = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<any>(null);
  
  useEffect(() => {
    if (reportId) {
      setTimeout(() => {
        const data = getReportData(reportId);
        setReportData(data);
        setLoading(false);
      }, 300);
    }
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-white">Loading report...</div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Report not found</div>
      </div>
    );
  }
    
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
        
        <div className="animate-slideUp transition-all duration-500 delay-100">
          <ReportTextSection 
            title="Vulnerability Description" 
            content={reportData.description}
          />
        </div>
        
        <div className="animate-slideUp transition-all duration-500 delay-200">
          <ReportTextSection 
            title="Impact of Vulnerability" 
            content={reportData.impact}
          />
        </div>
        
        <div className="animate-slideUp transition-all duration-500 delay-300">
          <ReportTextSection 
            title="Steps to reproduce" 
            content={reportData.stepsToReproduce}
          />
        </div>
        
        <div className="animate-slideUp transition-all duration-500 delay-400">
          <ReportTextSection 
            title="Proof of Concept (PoC)" 
            content={<ImageGallery images={reportData.pocImages} />}
          />
        </div>
        
        <div className="animate-slideUp transition-all duration-500 delay-500">
          <ReportTextSection 
            title="Mitigation Steps for Local File Inclusion" 
            content={reportData.mitigation}
          />
        </div>
      </div>
    </ReportLayout>
  );
};

export default Success;