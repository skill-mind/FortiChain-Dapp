'use client';

import { useState } from 'react';
import Modal from './Modal';
import TicketDetailsModal from './TicketDetailsModal';
import ConfirmClosureModal from './ConfirmClosureModal';
import TicketClosedModal from './TicketClosedModal';

interface Ticket {
  id: number;
  ticketId: string;
  submittedBy: string;
  category: string;
  status: string;
  description: string;
  message: string;
  attachments: string[];
}

interface TicketTableProps {
  tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [modalState, setModalState] = useState<'details' | 'confirm' | 'closed' | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredTickets = tickets.filter(
    (ticket) =>
      (!categoryFilter || ticket.category === categoryFilter) &&
      (!statusFilter || ticket.status === statusFilter)
  );

  const handleOpenDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setModalState('details');
  };

  const handleSendReply = () => {
    setModalState('confirm'); // Transition to Confirm Ticket Closure modal
  };

  const handleConfirmClosure = () => {
    setModalState('closed'); // Transition to Ticket Closed Successfully modal
  };

  const handleMarkResolved = () => {
    setModalState('closed'); // Directly transition to Ticket Closed Successfully modal
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
    setModalState(null);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-white text-lg font-semibold">Tickets</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search ticket name"
            className="bg-gray-800 text-white rounded px-3 py-1"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-800 text-white rounded px-3 py-1"
          >
            <option value="">Category</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Vulnerability Report">Vulnerability Report</option>
            <option value="Projects">Projects</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800 text-white rounded px-3 py-1"
          >
            <option value="">Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-2">Ticket ID</th>
            <th className="text-left py-2">Submitted By</th>
            <th className="text-left py-2">Category</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket.id} className="border-b border-gray-700">
              <td className="py-2">{ticket.ticketId}</td>
              <td className="py-2">{ticket.submittedBy}</td>
              <td className="py-2">{ticket.category}</td>
              <td className="py-2">
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
              </td>
              <td className="py-2">
                <button
                  onClick={() => handleOpenDetails(ticket)}
                  className="text-blue-400 hover:underline"
                >
                  Reply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTicket && modalState === 'details' && (
        <Modal onClose={handleCloseModal}>
          <TicketDetailsModal
            ticket={selectedTicket}
            onClose={handleCloseModal}
            onSendReply={handleSendReply}
            onMarkResolved={handleMarkResolved}
          />
        </Modal>
      )}

      {modalState === 'confirm' && (
        <Modal onClose={handleCloseModal}>
          <ConfirmClosureModal
            onConfirm={handleConfirmClosure}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}

      {modalState === 'closed' && (
        <Modal onClose={handleCloseModal}>
          <TicketClosedModal onGoBack={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}