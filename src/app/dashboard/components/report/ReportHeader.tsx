import React from "react";
import { StatusBadge } from "./StatusBadge";

interface ReportHeaderProps {
  title: string;
  status?: string;
  actionButton?: React.ReactNode;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({
  title,
  status,
  actionButton,
}) => {
  return (
    <div className="w-full py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div className="font-sora font-semibold text-2xl leading-tight text-white">
        {title}
      </div>

      {status ? <StatusBadge status={status} /> : actionButton}
    </div>
  );
};
