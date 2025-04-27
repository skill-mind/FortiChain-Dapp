'use client';

import { useState } from 'react';
import Modal from './components/Modal';
import TicketDetailsModal from './components/TicketDetailsModal';
import ConfirmClosureModal from './components/ConfirmClosureModal';
import TicketClosedModal from './components/TicketClosedModal';
import SupportCard from './components/SupportCard';
import TipsSection from './components/TipSection';

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

// Mock ticket data
const mockTickets: Ticket[] = [
  {
    id: 1,
    ticketId: '#24084',
    submittedBy: 'Favour Stephen',
    category: 'Inquiry',
    status: 'OPEN',
    description: 'How do I submit a vulnerability report?',
    message: 'I need help understanding the vulnerability submission process.',
    attachments: []
  },
  {
    id: 2,
    ticketId: '#24084',
    submittedBy: 'Cally Stan',
    category: 'Vulnerability Report',
    status: 'IN_PROGRESS',
    description: 'Critical vulnerability found in smart contract',
    message: 'I have discovered a critical vulnerability in the smart contract.',
    attachments: ['report.pdf']
  },
  {
    id: 3,
    ticketId: '#24084',
    submittedBy: 'Aisha Murtala',
    category: 'Projects',
    status: 'RESOLVED',
    description: 'Project submission issue',
    message: 'Having trouble submitting my project for review.',
    attachments: []
  },
  {
    id: 4,
    ticketId: '#24084',
    submittedBy: 'Daniel Ojo',
    category: 'Projects',
    status: 'RESOLVED',
    description: 'Project submission issue',
    message: 'Having trouble submitting my project for review.',
    attachments: []
  },  
  {
    id: 5,
    ticketId: '#24084',
    submittedBy: 'Kamsi Obomighe',
    category: 'inquiry',
    status: 'RESOLVED',
    description: 'Project submission issue',
    message: 'Having trouble submitting my project for review.',
    attachments: []
  }
];

export default function TicketTable({ tickets = mockTickets }: TicketTableProps) {
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
    console.log('Opening ticket details:', ticket); // Debug log
    setSelectedTicket(ticket);
    setModalState('details');
  };

  const handleSendReply = () => {
    setModalState('confirm');
  };

  const handleConfirmClosure = () => {
    setModalState('closed');
  };

  const handleMarkResolved = () => {
    setModalState('closed');
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
    setModalState(null);
  };

  return (
    <div className='max-w-8xl mx-auto'>
      <SupportCard/>
      <div className="bg-[#161113] rounded-[40px] p-8 p-5 bg-[#110D0F] rounded-[20px] border border-neutral-800 cursor-pointer">
        <div className="flex justify-between mb-4">
          <h2 className="text-white font-bold text-[24px]">Tickets</h2>
          <div className="flex pb-5 space-x-2">
            <input
              type="text"
              placeholder="Search ticket name"
              className="bg-[#161113] text-start border border-neutral-800 text-white rounded-lg px-16  py-2"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className=" bg-[#161113] border border-neutral-800 text-white rounded-lg px-2 py-2"
            >
              <option value="">Category</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Vulnerability Report">Vulnerability Report</option>
              <option value="Projects">Projects</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#161113] border border-neutral-800 text-white rounded-lg px-2 py-2"
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
            <tr className="bg-[#211A1D] pb-5 border-b border-gray-700">
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
                <td className="py-5">{ticket.ticketId}</td>
                <td className="py-5">{ticket.submittedBy}</td>
                <td className="py-5">{ticket.category}</td>
                <td className="py-5">
                  <span
                    className={`px-8 py-3 rounded-full text-sm ${
                      ticket.status === 'OPEN'
                        ? 'bg-[#908C8E]'
                        : ticket.status === 'IN_PROGRESS'
                        ? 'bg-[#000055]'
                        : 'bg-[#01A901]'
                    }`}
                  >
                    {ticket.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-2 text-[#0000FF]">
                  <button
                    onClick={() => handleOpenDetails(ticket)}
                    className="text-[#0000FF] hover:underline"
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
      <TipsSection/>
    </div>
  );
}