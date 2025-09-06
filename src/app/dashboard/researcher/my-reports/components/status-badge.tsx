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
    'available': 'bg-[#0073E6]',
    'unavailable': 'bg-gray-500',
  };
  
  const key = (status || '').toLowerCase();
  return statusConfig[key] || 'bg-gray-500';
};


interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, size = 'md' }) => {
  const statusDisplay = getStatusDisplayName(status);
  const bgColor = getStatusColor(status);
  
  return (
    <span className={`px-3 py-1 flex items-center text-white text-sm rounded-full ${className || ''} ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}`}>
      <div className={`rounded-full ${size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5'} ${bgColor} mr-2`}></div>{statusDisplay}
    </span>
  );
};