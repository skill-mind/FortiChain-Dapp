import React from 'react';

export const getStatusDisplayName = (status: string): string => {
  switch (status) {
    case "audited":
      return "Audited";
    case "progress":
      return "In Progress";
    case "rejected":
      return "Rejected";
    case "All":
      return "All";
    default:
      return status;
  }
};

export const getStatusColor = (status: string): string => {
  const statusConfig: Record<string, string> = {
    'audited': 'bg-[#0073E6]',
    'progress': 'bg-[#C1B700]',
    'rejected': 'bg-[#AE2727]',
  };
  
  return statusConfig[status] || 'bg-gray-500';
};


interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusDisplay = getStatusDisplayName(status);
  const bgColor = getStatusColor(status);
  
  return (
    <span className={`px-3 py-1 flex items-center text-white text-sm rounded-full ${className || ''}`}>
      <div className={`rounded-full w-2 h-2 ${bgColor} mr-2`}></div>{statusDisplay}
    </span>
  );
};