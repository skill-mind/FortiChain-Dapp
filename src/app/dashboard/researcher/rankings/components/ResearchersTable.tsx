import React from 'react';
import { Researcher } from '@/types/report';
import ResearcherCard from './ResearcherCard';

interface ResearchersTableProps {
  researchers: Researcher[];
  userRank?: number;
}

const ResearchersTable: React.FC<ResearchersTableProps> = ({ researchers, userRank }) => {
  return (
    <div className="overflow-x-auto px-4">
      <table className="w-full">
        <thead className="border-b border-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
              User name
            </th>
            <th className="px-6 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-4 text-center text-gray-400 font-medium text-sm uppercase tracking-wider">
              Reports
            </th>
            <th className="px-6 py-4 text-center text-gray-400 font-medium text-sm uppercase tracking-wider">
              Reputation
            </th>
            <th className="px-6 py-4 text-left text-gray-400 font-medium text-sm uppercase tracking-wider">
              Earned
            </th>
          </tr>
        </thead>
        <tbody>
          {researchers.map((researcher) => (
            <ResearcherCard 
              key={researcher.address} 
              researcher={researcher}
              userRank={userRank}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResearchersTable;
