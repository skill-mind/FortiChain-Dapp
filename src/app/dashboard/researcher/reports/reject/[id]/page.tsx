"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { ReportLayout } from '../../ReportLayout';
import { BackButton } from '../../../../components/report/BackButton';
import { ReportHeader } from '../../../../components/report/ReportHeader';
import { ReportInfoSection } from '../../../../components/report/ReportInfoSection';
import { ReportTextSection } from '../../../../components/report/ReportTextSection';
import { ImageGallery } from '../../../../components/report/ImageGallery';

const getReportData = (id: string) => {
  return {
    id,
    title: "Local File Inclusion (LFI) on Home Page – https://example.com/home",
    status: "Rejected",
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
    pocImages: [
      { src: "/download3.svg", alt: "PoC 1" },
      { src: "/poc.svg", alt: "PoC 2" },
      { src: "/download.svg", alt: "PoC 3" }
    ]
  };
}

const Reject = () => {
  const params = useParams();
  const reportId = params.id as string;
  const reportData = getReportData(reportId);

  const actionButton = (
    <button className="w-[189px] h-[48px] rounded-[10px] bg-[#AE2727] px-4 py-3 flex items-center justify-center gap-[10px]">
      <span className="text-white text-[14px] font-medium">Rejected</span>
    </button>
  );

  return (
    <ReportLayout>
            <ReportHeader 
              title={reportData.title}
              status={reportData.status}
              actionButton={actionButton}
            />
            
            <ReportInfoSection
              severity={reportData.severity}
              cvssScore={reportData.cvssScore}
              vulnerableUrl={reportData.vulnerableUrl}
              vulnerableParam={reportData.vulnerableParam}
            />
            
            <ReportTextSection
              title="Vulnerability Description"
              content={reportData.description}
            />
            
            <div className="flex flex-col gap-6">
              <ReportTextSection
                title="Impact of Vulnerability"
                content={reportData.impact}
              />
              
              <ReportTextSection
                title="Steps to reproduce"
                content={reportData.stepsToReproduce}
              />
            </div>
            
            <ReportTextSection
              title="Proof of Concept (PoC)"
              content={<ImageGallery images={reportData.pocImages} />}
            />
    </ReportLayout>
  );
};

export default Reject;