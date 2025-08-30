import React from 'react';
import { Researcher } from '@/types/report';

interface ResearcherCardProps {
  researcher: Researcher;
  userRank?: number; // For highlighting user's rank
}

const ResearcherCard: React.FC<ResearcherCardProps> = ({ researcher, userRank }) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const isUserRank = userRank && researcher.rank === userRank;

  return (
    <tr className={`border-b border-gray-800 hover:bg-gray-900/50 transition-colors ${
      isUserRank ? 'bg-blue-500/10' : ''
    }`}>
      <td className="px-6 py-4 text-white font-medium relative">
        {researcher.rank}
     
      </td>
      <td className="px-6 py-4 text-white font-medium">{researcher.username}</td>
      <td className="px-6 py-4 text-gray-400 font-mono text-sm">
        {formatAddress(researcher.address)}
      </td>
      <td className="px-6 py-4 text-white text-center">{researcher.reports}</td>
      <td className="px-6 py-4 text-white text-center">{researcher.reputation}</td>
      <td className="px-6 py-4 text-white font-semibold">
        {formatCurrency(researcher.earned)}
      </td>
    </tr>
  );
};

export default ResearcherCard;