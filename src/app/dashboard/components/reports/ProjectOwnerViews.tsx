"use client";

import React, { useState, SetStateAction, Dispatch } from "react";
import ProjectOwnerReport from "./ProjectOwnerReport";
import VulnerabilityReport from "./vulnerabilityreport";
import ProjectOwnerReportDetails from "./ProjectOwnerReportDetails";

const Views = () => {
    const [currentView, setCurrentView] = useState<number>(0);
    const [reportIndex, setReportIndex] = useState<number | null>(null);
    const [vulnerabilityIndex, setVulnerabilityIndex] = useState<number | null>(null);

    const renderCurrentView = () => {
        switch (currentView) {
            case 0:
                return (
                    <ProjectOwnerReport
                        reportIndex={reportIndex}
                        setCurrentView={setCurrentView as Dispatch<SetStateAction<number>>}
                        setReportIndex={setReportIndex}
                    />
                );
            case 1:
                return (
                    <VulnerabilityReport
                        reportIndex={reportIndex}
                        setCurrentView={setCurrentView as Dispatch<SetStateAction<number>>}
                        setReportIndex={setReportIndex}
                        setVulnerabilityIndex={setVulnerabilityIndex}
                    />
                );
            case 2:
                return (
                    <ProjectOwnerReportDetails 
                        vulnerabilityIndex={vulnerabilityIndex}
                        setCurrentView={setCurrentView as Dispatch<SetStateAction<number>>}
                    />
                );
            default:
                return (
                    <ProjectOwnerReport
                        reportIndex={reportIndex}
                        setCurrentView={setCurrentView as Dispatch<SetStateAction<number>>}
                        setReportIndex={setReportIndex}
                    />
                );
        }
    };

    return <>{renderCurrentView()}</>;
};

export default Views;