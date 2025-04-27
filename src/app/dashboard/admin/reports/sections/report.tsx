import React, { useState } from "react";
import { reports, ReportData } from "../data";

interface Props {
    dataIndex: number | null;
    setCurrentView: (view: number) => void;
    setDataIndex: (e: number | null) => void;
}

const Report: React.FC<Props> = ({ setCurrentView, setDataIndex }) => {
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedSeverity, setSelectedSeverity] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"Pending" | "Validated" | "Rejected">("Pending");

    const handleViewDetails = (index: number) => {
        setDataIndex(index);
        setCurrentView(1);
    };

    const handleLanguageChange = (language: string) => {
        setSelectedLanguages((prev) =>
            prev.includes(language)
                ? prev.filter((lang) => lang !== language)
                : [...prev, language]
        );
    };

    const handleSeverityChange = (severity: string) => {
        setSelectedSeverity((prev) =>
            prev.includes(severity)
                ? prev.filter((sev) => sev !== severity)
                : [...prev, severity]
        );
    };

    const filteredReports = reports.filter((report) => {
        const matchesTab = report.status === activeTab;
        const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSeverity =
            selectedSeverity.length === 0 || selectedSeverity.includes(report.severity);
        // For simplicity, we're not filtering by language in the data (since language isn't in ReportData)
        return matchesTab && matchesSearch && matchesSeverity;
    });

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Reports</h2>

            {/* Tabs */}
            <div className="flex space-x-4 mb-4">
                <button
                    className={`px-4 py-2 rounded-full ${activeTab === "Pending" ? "bg-gray-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("Pending")}
                >
                    Pending ({reports.filter((r) => r.status === "Pending").length})
                </button>
                <button
                    className={`px-4 py-2 rounded-full ${activeTab === "Validated" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("Validated")}
                >
                    Validated ({reports.filter((r) => r.status === "Validated").length})
                </button>
                <button
                    className={`px-4 py-2 rounded-full ${activeTab === "Rejected" ? "bg-red-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("Rejected")}
                >
                    Rejected ({reports.filter((r) => r.status === "Rejected").length})
                </button>
            </div>

            {/* Filters */}
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="border p-2 rounded"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    multiple
                    className="border p-2 rounded"
                    onChange={(e) =>
                        handleLanguageChange(e.target.value)
                    }
                >
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Rust">Rust</option>
                    <option value="Cairo">Cairo</option>
                </select>
                <select
                    multiple
                    className="border p-2 rounded"
                    onChange={(e) =>
                        handleSeverityChange(e.target.value)
                    }
                >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            {/* Report Cards */}
            <div className="grid grid-cols-3 gap-4">
                {filteredReports.map((report, index) => (
                    <div
                        key={index}
                        className="border p-4 rounded-lg bg-gray-800 text-white cursor-pointer"
                        onClick={() => handleViewDetails(index)}
                    >
                        <div className="flex justify-between">
                            <span>{report.id}</span>
                            <span>{report.date}</span>
                        </div>
                        <h3 className="font-bold">{report.title}</h3>
                        <div className="flex justify-between mt-2">
                            <span
                                className={`px-2 py-1 rounded-full ${
                                    report.severity === "Critical"
                                        ? "bg-red-600"
                                        : report.severity === "High"
                                        ? "bg-orange-600"
                                        : report.severity === "Medium"
                                        ? "bg-blue-600"
                                        : "bg-gray-600"
                                }`}
                            >
                                {report.severity} {report.score}
                            </span>
                            <span>{report.researcher}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Report;