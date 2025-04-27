'use client';

import { useState } from 'react';

interface TicketModalProps {
  ticket: {
    ticketId: string;
    category: string;
    status: string;
    description?: string;
    attachments?: string[];
  };
  onClose: () => void;
  onOpenDetails: () => void;
}

export default function TicketModal({ ticket, onClose, onOpenDetails }: TicketModalProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleReply = async () => {
    await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticketId: ticket.ticketId,
        description: message,
        attachments: ticket.attachments,
      }),
    });
    onOpenDetails();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            {ticket.description || 'Ticket Details'}
          </h2>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-md text-sm sm:text-base ${
                ticket.status === 'OPEN'
                  ? 'bg-gray-600'
                  : ticket.status === 'IN_PROGRESS'
                  ? 'bg-blue-600'
                  : 'bg-green-600'
              } text-white`}
            >
              {ticket.status.replace('_', ' ')}
            </span>
            <span className="bg-gray-600 text-white px-3 py-1 rounded-md text-sm sm:text-base">
              {ticket.category}
            </span>
          </div>
        </div>

        {/* Ticket Content */}
        <div className="text-gray-300 text-sm sm:text-base mb-4">
          <p className="mb-2">
            Hello Support Team,
          </p>
          <p className="mb-2">
            I tried sending ETH from my MetaConnect Wallet to another address, but the transaction has been stuck as "pending" for over an hour. I used the recommended gas fees, but it still hasn't gone through. My wallet address is 0x1234abcd5678efgh9012jklmnopqrstuvwx, and the transaction hash is 0xa1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef.
          </p>
          <p>
            I've tried refreshing and reconnecting my wallet, but the issue persists. Can you help me resolve this?
          </p>
        </div>

        {/* Attachments */}
        <div className="mb-4">
          <p className="text-gray-300 text-sm sm:text-base mb-2">2 attachments</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center bg-gray-700 rounded-md p-2 w-full sm:w-auto">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm0 2h7v4h4v12H6V4zm2 6h8v2H8v-2zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/>
              </svg>
              <span className="text-gray-300 text-sm sm:text-base">doc.pdf 5MB</span>
            </div>
            <div className="flex items-center bg-gray-700 rounded-md p-2 w-full sm:w-auto">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm0 2h7v4h4v12H6V4zm2 6h8v2H8v-2zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/>
              </svg>
              <span className="text-gray-300 text-sm sm:text-base">doc.pdf 5MB</span>
            </div>
          </div>
        </div>

        {/* Reply Section */}
        <div className="bg-gray-700 rounded-md p-4 mb-4">
          <h3 className="text-gray-300 text-sm sm:text-base font-semibold mb-2">Your Reply</h3>
          <input
            type="text"
            placeholder="Enter reply subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-gray-800 text-white rounded px-3 py-2 mb-2"
          />
          <textarea
            placeholder="Write your reply"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-800 text-white rounded px-3 py-2 h-24 mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleReply}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-blue-700"
            >
              Send Reply & Close Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}