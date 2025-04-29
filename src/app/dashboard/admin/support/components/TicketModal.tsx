'use client';

import Image from 'next/image';
import { useState } from 'react';
import pdf from '../../../../../../public/adminIcon/pdf.svg';

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
      <div className="bg-[#161113] border border-neutral-800 rounded-lg px-6 Pb-4 pt-6 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-[95vh] overflow-y-auto">
 
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
         <p className='font-700 text-[24px]'> Issue with MetaConnect Wallet - Transaction Stuck</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white ml-4"
          >
            ✕
          </button>
        </div>

          <div className="flex mb-4 gap-2">
            <span
              className={`px-6 py-1 rounded-[40px] text-sm sm:text-base ${
                ticket.status === 'Open'
                  ? 'bg-[#6B6668] text-gray-400'
                  : ticket.status === 'IN_PROGRESS'
                  ? 'bg-blue-600'
                  : 'bg-green-600'
              } text-white`}
            >
              {ticket.status.replace('_', ' ')}
            </span>
            <span className="bg-[#161113] border border-neutral-800 text-white px-8 py-1 rounded-[40px] text-sm sm:text-base">
                 Vulnerability Reports
            </span>
          </div>


        
        <div className="text-gray-300 text-sm sm:text-base mb-4">
          <p className="mb-6">
            Hello Support Team,
          </p>
          <p className="mb-4">
            I tried sending ETH from my MetaConnect Wallet to another address, but the transaction has been stuck as "pending" for over an hour. I used the recommended gas fees, but it still hasn't gone through. My wallet address is 0x1234abcd5678efgh9012jklmnopqrstuvwx, and the transaction hash is 0xa1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef.
          </p>
          <p>
            I've tried refreshing and reconnecting my wallet, but the issue persists. Can you help me resolve this?
          </p>
        </div>

    
        
                <div className="mb-4">
                  <p className="text-gray-300 text-sm sm:text-base mb-2">2 attachments</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div>
                      <Image
                        src={pdf}
                        alt="PDF Icon"
                        width={350}
                        height={150}
                      />
                    </div>
                    <div>
                      <Image
                        src={pdf}
                        alt="PDF Icon"
                        width={350}
                        height={150}
                      />
                    </div>
                  </div>
                </div>


        <hr className='bg-[#161113] border border-neutral-800 my-4' />
      

        <div className="mb-2">
          <h3 className="text-gray-300 text-sm sm:text-base font-semibold mb-2">Your Reply</h3>

          <p className="text-gray-300 text-sm sm:text-base font-semibold mb-2">Subject</p>
          <input
            type="text"
            placeholder="Enter reply subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-[#161113] border border-neutral-800 text-white rounded px-3 py-5 mb-2"
          />
          <p className="text-gray-300 text-sm sm:text-base font-semibold mb-2">Message</p>
          <textarea
            placeholder="Write your reply"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#161113] border border-neutral-800 text-white rounded px-3 py-2 h-36 mb-2"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleReply}
              className="bg-[#8080ff] text-gray-400 px-8 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-700"
            >
              Send Reply & Close Ticket
            </button>
            <button
              onClick={onClose}
              className="bg-[#FF3737] px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-gray-500"
            >
              Mark as Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}