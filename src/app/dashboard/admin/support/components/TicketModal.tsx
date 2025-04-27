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
}

export default function TicketModal({ ticket, onClose }: TicketModalProps) {
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
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">
            {ticket.description || 'Ticket Details'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <div className="flex space-x-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              ticket.status === 'OPEN'
                ? 'bg-gray-600'
                : ticket.status === 'IN_PROGRESS'
                ? 'bg-blue-600'
                : 'bg-green-600'
            }`}
          >
            {ticket.status.replace('_', ' ')}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-gray-600">
            {ticket.category}
          </span>
        </div>
        <p className="text-white mb-4">
          I tried sending ETH from my MetaConnect Wallet to another address, but the transaction has been stuck as "pending" for over an hour. I used the recommended gas fees, but it still hasn’t gone through. My wallet address is 0x1234abcd5678efgh9012jklmnopqrstuvwx, and the transaction hash is 0xa1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef.
          <br />
          I’ve tried refreshing and reconnecting my wallet, but the issue persists. Can you help me resolve this?
        </p>
        <div className="mb-4">
          <p className="text-gray-400">2 attachments</p>
          <div className="flex space-x-2">
            <div className="bg-gray-800 rounded p-2 flex items-center">
              <span className="text-red-500 mr-2">PDF</span>
              <span className="text-white">doc.pdf</span>
              <span className="text-gray-400 ml-2">5MB</span>
              <button className="ml-2 text-gray-400">⬇</button>
            </div>
            <div className="bg-gray-800 rounded p-2 flex items-center">
              <span className="text-red-500 mr-2">PDF</span>
              <span className="text-white">doc.pdf</span>
              <span className="text-gray-400 ml-2">5MB</span>
              <button className="ml-2 text-gray-400">⬇</button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Reply</h3>
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
          <div className="flex space-x-2">
            <button
              onClick={handleReply}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Send Reply & Close Ticket
            </button>
            <button
              onClick={() => alert('Marked as Resolved')}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Mark as Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}