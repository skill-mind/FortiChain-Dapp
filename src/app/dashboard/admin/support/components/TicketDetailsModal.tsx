'use client';

interface TicketDetailsModalProps {
  ticket: {
    ticketId: string;
    category: string;
    status: string;
    message: string;
    description?: string;
    attachments: string[];
  };
  onClose: () => void;
  onSendReply: () => void;
  onMarkResolved: () => void;
}

export default function TicketDetailsModal({
  ticket,
  onClose,
  onSendReply,
  onMarkResolved,
}: TicketDetailsModalProps) {
  return (
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">{ticket.description}</h2>
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
      <p className="text-white mb-4 whitespace-pre-line">{ticket.message}</p>
      <div className="mb-4">
        <p className="text-gray-400">{ticket.attachments.length} attachments</p>
        <div className="flex space-x-2">
          {ticket.attachments.map((attachment, index) => (
            <div key={index} className="bg-gray-800 rounded p-2 flex items-center">
              <span className="text-red-500 mr-2">PDF</span>
              <span className="text-white">{attachment}</span>
              <span className="text-gray-400 ml-2">5MB</span>
              <button className="ml-2 text-gray-400">⬇</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-white text-lg font-semibold mb-2">Reply</h3>
        <p className="text-white mb-4 border border-gray-700 rounded p-3">
          Thank you for reaching out. We’ve looked into your transaction, and it appears to be stuck due to low gas fees or network congestion. Here’s what you can do to resolve it:
          <br />
          • <strong>Speed Up the Transaction</strong> – If your wallet allows, try increasing the gas fee and resubmitting the transaction.
          <br />
          If you need assistance with these steps, let us know. We’re happy to guide you through the process!!
        </p>
        <div className="flex space-x-2">
          <button
            onClick={onSendReply}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send Reply & Close Ticket
          </button>
          <button
            onClick={onMarkResolved}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  );
}