"use client";

import React, { useState, SetStateAction, Dispatch } from "react";
import Report from "./sections/report";
import VulnerabilityReport from "./sections/vulnerabilityreport";
import Details from "./sections/details";

const Views = () => {
    const [currentView, setCurrentView] = useState<number>(0);
    const [reportIndex, setReportIndex] = useState<number | null>(null);
    const [vulnerabilityIndex, setVulnerabilityIndex] = useState<number | null>(null);

    const renderCurrentView = () => {
        switch (currentView) {
            case 0:
                return (
                    <Report
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
                    <Details 
                        vulnerabilityIndex={vulnerabilityIndex}
                        setCurrentView={setCurrentView as Dispatch<SetStateAction<number>>}
                    />
                );
            default:
                return (
                    <Report
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