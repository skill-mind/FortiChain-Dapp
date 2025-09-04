import React from 'react';
import { Validator } from '@/types/report';

interface ValidatorCardProps {
  validator: Validator;
}

const ValidatorCard: React.FC<ValidatorCardProps> = ({ validator }) => {
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

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <td className="px-6 py-4 text-white font-medium">{validator.rank}</td>
      <td className="px-6 py-4 text-white font-medium">{validator.username}</td>
      <td className="px-6 py-4 text-gray-400 font-mono text-sm">
        {formatAddress(validator.address)}
      </td>
      <td className="px-6 py-4 text-white text-center">{validator.audits}</td>
      <td className="px-6 py-4 text-white text-center">{validator.reputation}</td>
      <td className="px-6 py-4 text-white font-semibold">
        {formatCurrency(validator.earned)}
      </td>
    </tr>
  );
};

export default ValidatorCard;