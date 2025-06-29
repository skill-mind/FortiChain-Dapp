import React from "react";
import { ReportData } from "../../project-owner/reports/data";

interface Props {
    report: ReportData;
    onClick: () => void;
}

const ProjectOwnerReportCard: React.FC<Props> = ({ report, onClick }) => {
    const truncateTitle = (title: string, maxLength: number) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + "...";
        }
        return title;
    };

    const truncatedTitle = truncateTitle(report.title, 40);

    return (
        <div
            className="border border-[#464043] p-4 rounded-lg bg-[#110D0F] text-white cursor-pointer flex flex-col space-y-2 gap-4"
            onClick={onClick}
        >
            <div className="flex justify-between text-sm text-[#B5B3B4]">
                <span>{report.id}</span>
                <span>{report.date}</span>
            </div>
            <h3 className="font-bold text-md">{truncatedTitle}</h3>
            <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            report.severity === "Critical"
                                ? "bg-red-600"
                                : report.severity === "High"
                                ? "bg-orange-600"
                                : report.severity === "Medium"
                                ? "bg-[#0000FF]"
                                : "bg-gray-600"
                        }`}
                    >
                        {report.severity}
                    </span>
                    <p className=" text-[#B5B3B4]">{report.score}</p>
                </div>
                <span className="text-[#B5B3B4]">{report.amount}</span>
            </div>
        </div>
    );
};

export default ProjectOwnerReportCard;
