"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "../../../components/report/BackButton";
import { ReportHeader } from "../../../components/report/ReportHeader";
import { ReportInfoSection } from "../../../components/report/ReportInfoSection";
import { ReportTextSection } from "../../../components/report//ReportTextSection";
import { ImageGallery } from "../../../components/report/ImageGallery";
import { DetailsModal } from "../../../components/report/DetailsModal";
import { sampleReports } from "../../../components/type/sampleData";
import { ProvideMoreDetailsModal } from "@/app/dashboard/components/reports/ProvideMoreDetailsModal";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ReportDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = params;
  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);
  const [showProvideMoreDetailsModal, setShowProvideMoreDetailsModal] =
    useState(false);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    console.log("Report ID from URL:", id);
    const foundReport = sampleReports.find((r) => String(r.id) === id);
    console.log("Found report:", foundReport);
    setReport(foundReport);
  }, [id]);

  // Handle case when report is not found
  if (!report) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-white text-xl mb-4">
          Report not found or loading...
        </div>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => router.push("/dashboard/researcher/reports")}
        >
          Back to Reports
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#1C1618] rounded-xl border border-[#464043] p-6">
      <div onClick={() => router.push("/dashboard/researcher/reports")}>
        <BackButton />
      </div>

      <ReportHeader
        title={report.title}
        status={report.status === "Pending" ? undefined : report.status}
        actionButton={
          report.status === "Pending" ? (
            <button
              className="px-6 py-2 bg-[#0000FF] text-sm xl:text-base text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowProvideMoreDetailsModal(true)}
            >
              Provide More Details
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => setShowMoreDetailsModal(true)}
            >
              View More Details
            </button>
          )
        }
      />

      <ReportInfoSection
        severity={report.severity}
        cvssScore={report.cvssScore}
        vulnerableUrl={report.vulnerableUrl}
        vulnerableParam={report.vulnerableParam}
      />

      <ReportTextSection
        title="Vulnerability Description"
        content={report.description}
      />

      <ReportTextSection
        title="Impact of Vulnerability"
        content={report.impact}
      />

      <ReportTextSection
        title="Steps to reproduce"
        content={
          <ol className="list-decimal pl-5 space-y-2">
            {report.stepsToReproduce.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        }
      />

      <div className="w-full py-6 flex flex-col gap-3">
        <div className="font-sora font-semibold text-xl text-white">
          Proof of Concept (PoC)
        </div>
        <ImageGallery images={report.pocImages} />
      </div>

      {report.mitigationSteps && (
        <ReportTextSection
          title="Mitigation Steps"
          content={
            <ol className="list-decimal pl-5 space-y-2">
              {report.mitigationSteps.map((step: string, index: number) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          }
        />
      )}

      {report.status === "Approved" && (
        <div className="flex items-center gap-6 mt-8">
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg">
            View Project
          </button>
          <button className="px-8 py-3 border border-[#6B6668] text-[#FF3737] font-semibold rounded-lg">
            Delete Report
          </button>
        </div>
      )}

      {/* Create a modal for "View More Details" */}
      {showMoreDetailsModal && (
        <DetailsModal
          report={report}
          onClose={() => setShowMoreDetailsModal(false)}
          onProceed={() => {
            setShowMoreDetailsModal(false);
            router.push(`/dashboard/researcher/reports/edit/${id}`);
          }}
        />
      )}

      {/* Provide More Details Modal */}
      {showProvideMoreDetailsModal && (
        <ProvideMoreDetailsModal
          isOpen={showProvideMoreDetailsModal}
          onClose={() => setShowProvideMoreDetailsModal(false)}
          onSubmit={(details) => {
            console.log("Additional details provided:", details);
            // Here you would typically send the details to your 
            // For now, we'll just log it and close the modal
            setShowProvideMoreDetailsModal(false);
          }}
        />
      )}
    </div>
  );
}
