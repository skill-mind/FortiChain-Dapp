"use client";

import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { BackButton } from '../../../../components/report/BackButton';
import { ReportHeader } from '../../../../components/report/ReportHeader';
import { ReportInfoSection } from '../../../../components/report/ReportInfoSection';
import { ReportTextSection } from '../../../../components/report/ReportTextSection';
import { ReportLayout } from '../../ReportLayout';
import { ImageGallery } from '../../../../components/report/ImageGallery';
import { DetailsModal } from '../../../../components/report/DetailsModal';

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
}

const Details = () => {
  const params = useParams();
  const router = useRouter();
  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);

  // Initialize report data, this would be an API call in a real application
  useEffect(() => {
    const reportData = {
      id: params.id,
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
    const imageData = [
      { src: "/download3.svg", alt: "PoC 1" },
      { src: "/poc.svg", alt: "PoC 2" },
      { src: "/download.svg", alt: "PoC 3" }
    ];

    setReport(reportData);
    setImages(imageData);
  }, [params.id]);

  const actionButton = (
    <button 
      onClick={() => setShowMoreDetailsModal(true)}
      className="w-[189px] h-[48px] rounded-[10px] bg-[#0000FF] px-4 py-3 flex items-center justify-center gap-[10px]"
    >
      <span className="text-white text-[14px] font-medium">Provide More Details</span>
    </button>
  );

  return (
    <ReportLayout>
      <div className="w-full p-5">
        <div className="max-w-[1057px] mx-auto flex flex-col gap-4">
        {showMoreDetailsModal && report && (
            <DetailsModal
              report={report}
              onClose={() => setShowMoreDetailsModal(false)}
              onProceed={() => {
                setShowMoreDetailsModal(false);
                router.push(`/dashboard/researcher/reports/edit/${report.id}`);
              }}
            />
          )}

          <BackButton />
          
          <div className="border border-[#464043] rounded-xl p-5 bg-[#1C1618] flex flex-col gap-10">
            <ReportHeader 
              title="Local File Inclusion (LFI) on Home Page – https://example.com/home"
              actionButton={actionButton}
            />
            
            <ReportInfoSection
              severity="High"
              cvssScore="8.6"
              vulnerableUrl="https://example.com/home - Home Page"
              vulnerableParam="Broken Access Control"
            />
            
            <ReportTextSection
              title="Vulnerability Description"
              content="Attackers can exploit the Filename parameter to access sensitive files (e.g., /etc/passwd) by sending a crafted request, exposing critical server data."
            />
            
            <div className="flex flex-col gap-6">
              <ReportTextSection
                title="Impact of Vulnerability"
                content="The vulnerability of Local File Inclusion (LFI) on the home page 'https://example.com/home' can be attributed to the impact of the filename parameter. This vulnerability allows an attacker to manipulate the filename parameter in the URL to include arbitrary local files from the server."
              />
              
              <ReportTextSection
                title="Steps to reproduce"
                content={
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Go to the Home Page (https://example.com/home).</li>
                    <li>Select any file from the selection section.</li>
                    <li>Intercept the request in the Burp Suite Proxy tool and send it to the request repeater tab in Burp Suite Proxy tool.</li>
                  </ol>
                }
              />
            </div>
            
            <ReportTextSection
              title="Proof of Concept (PoC)"
              content={<ImageGallery images={images} />}
            />
          </div>
        </div>
      </div>
    </ReportLayout>
  );
};

export default Details;