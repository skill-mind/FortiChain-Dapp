import React from 'react';
import { Validator } from '@/types/report';
import ValidatorCard from './ValidatorCard';

interface ValidatorsTableProps {
  validators: Validator[];
}

const ValidatorsTable: React.FC<ValidatorsTableProps> = ({ validators }) => {
  return (
    <div className="overflow-x-auto px-4">
      <table className="w-full">
        <thead className="border-b border-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-[#6C6C6C] font-medium text-sm uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-4 text-left text-[#6C6C6C]  font-medium text-sm uppercase tracking-wider">
              User name
            </th>
            <th className="px-6 py-4 text-left text-[#6C6C6C] font-medium text-sm uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-4 text-center text-[#6C6C6C]  font-medium text-sm uppercase tracking-wider">
              Audits
            </th>
            <th className="px-6 py-4 text-center text-[#6C6C6C] font-medium text-sm uppercase tracking-wider">
              Reputation
            </th>
            <th className="px-6 py-4 text-left text-[#6C6C6C]  font-medium text-sm uppercase tracking-wider">
              Earned
            </th>
          </tr>
        </thead>
        <tbody>
          {validators.map((validator) => (
            <ValidatorCard key={validator.address} validator={validator} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValidatorsTable;