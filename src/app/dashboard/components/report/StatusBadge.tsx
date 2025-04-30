import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig: Record<string, string> = {
    'Fixed': 'bg-[#01A901]',
    'Rejected': 'bg-[#AE2727]',
    'Pending': 'bg-[#0000FF]',
    'Approved': 'bg-[#01A901]',
    'High': 'bg-[#AE2727]',
    'Medium': 'bg-[#FF7337]',
    'Low': 'bg-[#908C8E]',
    'Critical': 'bg-[#908C8E]',
    'Closed': 'bg-[#AE2727]'
  };
  
  const bgColor = statusConfig[status] || 'bg-gray-500';
  
  return (
    <span className={`px-3 py-1 ${bgColor} text-white text-sm rounded-full ${className || ''}`}>
      {status}
    </span>
  );
};