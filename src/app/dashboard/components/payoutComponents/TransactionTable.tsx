// src/app/dashboard/payout/components/TransactionTable.tsx
'use client';

import { Check } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

export default function TransactionTable() {
  // Sample data - in a real application, this would come from an API
  const transactions: Transaction[] = [
    {
      id: '#4422',
      date: '24-01-2025',
      type: 'Deposit to Escrow',
      amount: 5124.11,
      status: 'Completed'
    },
    {
      id: '#4422',
      date: '24-01-2025',
      type: 'Withdrawal from Escrow',
      amount: 5124.11,
      status: 'Completed'
    },
    {
      id: '#4422',
      date: '24-01-2025',
      type: 'Withdrawal from Escrow',
      amount: 5124.11,
      status: 'Completed'
    },
    {
      id: '#4422',
      date: '24-01-2025',
      type: 'Auto top-up from wallet',
      amount: 5124.11,
      status: 'Completed'
    },
    {
      id: '#4422',
      date: '24-01-2025',
      type: 'Bounty Payment',
      amount: 5124.11,
      status: 'Completed'
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#211a1d] text-white">
            <th className="py-4 px-4 text-left">Date</th>
            <th className="py-4 px-4 text-left">Transaction ID</th>
            <th className="py-4 px-4 text-left">Type</th>
            <th className="py-4 px-4 text-left">Amount</th>
            <th className="py-4 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr 
              key={index} 
              className="border-b border-gray-800 text-white"
            >
              <td className="py-4 px-4">{transaction.date}</td>
              <td className="py-4 px-4">{transaction.id}</td>
              <td className="py-4 px-4">{transaction.type}</td>
              <td className="py-4 px-4">${transaction.amount.toLocaleString()}</td>
              <td className="py-4 px-4">
                <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
                  transaction.status === 'Completed' 
                    ? 'bg-[#01A901] text-white' 
                    : transaction.status === 'Pending'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {transaction.status === 'Completed'}
                  {transaction.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}