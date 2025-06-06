"use client";

import { useState } from "react";
import Modal from "./components/Modal";
import TicketModal from "./components/TicketModal";
import TicketDetailsModal from "./components/TicketDetailsModal";
import ConfirmClosureModal from "./components/ConfirmClosureModal";
import TicketClosedModal from "./components/TicketClosedModal";
import ResolvedTicket from "./components/ResolvedTicket";
import SupportCard from "./components/SupportCard";
import TipsSection from "./components/TipSection";
import { motion } from "framer-motion";

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

const mockTickets: Ticket[] = [
  {
    id: 1,
    ticketId: "#24084",
    submittedBy: "Favour Stephen",
    category: "Inquiry",
    status: "OPEN",
    description: "How do I submit a vulnerability report?",
    message: "I need help understanding the vulnerability submission process.",
    attachments: [],
  },
  {
    id: 2,
    ticketId: "#24084",
    submittedBy: "Cally Stan",
    category: "Vulnerability Report",
    status: "IN_PROGRESS",
    description: "Critical vulnerability found in smart contract",
    message:
      "I have discovered a critical vulnerability in the smart contract.",
    attachments: ["report.pdf"],
  },
  {
    id: 3,
    ticketId: "#24084",
    submittedBy: "Aisha Murtala",
    category: "Projects",
    status: "RESOLVED",
    description: "Project submission issue",
    message: "Having trouble submitting my project for review.",
    attachments: [],
  },
  {
    id: 4,
    ticketId: "#24084",
    submittedBy: "Daniel Ojo",
    category: "Projects",
    status: "RESOLVED",
    description: "Project submission issue",
    message: "Having trouble submitting my project for review.",
    attachments: [],
  },
  {
    id: 5,
    ticketId: "#24084",
    submittedBy: "Kamsi Obomighe",
    category: "inquiry",
    status: "RESOLVED",
    description: "Project submission issue",
    message: "Having trouble submitting my project for review.",
    attachments: [],
  },
];

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [modalState, setModalState] = useState<
    "ticket" | "details" | "confirm" | "closed" | "resolved" | null
  >(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredTickets = mockTickets.filter(
    (ticket) =>
      (!categoryFilter || ticket.category === categoryFilter) &&
      (!statusFilter || ticket.status === statusFilter)
  );

  const handleOpenTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    if (ticket.status === "RESOLVED") {
      setModalState("resolved");
    } else if (ticket.status === "IN_PROGRESS") {
      setModalState("details");
    } else {
      setModalState("ticket");
    }
  };

  const handleOpenDetails = () => {
    setModalState("details");
  };

  const handleSendReply = () => {
    setModalState("confirm");
  };

  const handleConfirmClosure = () => {
    setModalState("closed");
  };

  const handleMarkResolved = () => {
    setModalState("closed");
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
    setModalState(null);
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <SupportCard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className={`bg-[#161113] rounded-[40px] p-4 sm:p-5 md:p-8 bg-[#110D0F] rounded-[20px] border border-neutral-800 cursor-pointer overflow-x-auto ${
          modalState ? "blur-sm" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <h2 className="text-white font-bold text-[20px] sm:text-[24px]">
            Tickets
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pb-5">
            <input
              type="text"
              placeholder="Search ticket name"
              className="bg-[#161113] text-start border border-neutral-800 text-white rounded-lg px-4 sm:px-16 py-2 w-full sm:w-auto"
            />
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#161113] border border-neutral-800 text-white rounded-lg px-2 py-2 w-full sm:w-auto"
              >
                <option value="">Category</option>
                <option value="Inquiry">Inquiry</option>
                <option value="Vulnerability Report">
                  Vulnerability Report
                </option>
                <option value="Projects">Projects</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#161113] border border-neutral-800 text-white rounded-lg px-2 py-2 w-full sm:w-auto"
              >
                <option value="">Status</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-white min-w-[600px]">
            <thead>
              <tr className="bg-[#211A1D] pb-5 border-b border-gray-700">
                <th className="text-left py-2 px-2 sm:px-4">Ticket ID</th>
                <th className="text-left py-2 px-2 sm:px-4">Submitted By</th>
                <th className="text-left py-2 px-2 sm:px-4">Category</th>
                <th className="text-left py-2 px-2 sm:px-4">Status</th>
                <th className="text-left py-2 px-2 sm:px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, index) => (
                <motion.tr
                  key={ticket.id}
                  className="border-b border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <td className="py-5 px-2 sm:px-4">{ticket.ticketId}</td>
                  <td className="py-5 px-2 sm:px-4">{ticket.submittedBy}</td>
                  <td className="py-5 px-2 sm:px-4">{ticket.category}</td>
                  <td className="py-5 px-2 sm:px-4">
                    <span
                      className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm ${
                        ticket.status === "OPEN"
                          ? "bg-[#908C8E]"
                          : ticket.status === "IN_PROGRESS"
                          ? "bg-[#000055]"
                          : "bg-[#01A901]"
                      }`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-[#0000FF]">
                    <button
                      onClick={() => handleOpenTicket(ticket)}
                      className="text-[#0000FF] hover:underline text-sm sm:text-base"
                    >
                      Reply
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>{" "}
          </table>
        </div>
      </motion.div>
      <TipsSection />

      {selectedTicket && modalState === "ticket" && (
        <Modal onClose={handleCloseModal}>
          <TicketModal
            ticket={selectedTicket}
            onClose={handleCloseModal}
            onOpenDetails={handleOpenDetails}
          />
        </Modal>
      )}

      {selectedTicket && modalState === "details" && (
        <Modal onClose={handleCloseModal}>
          <TicketDetailsModal
            ticket={selectedTicket}
            onClose={handleCloseModal}
            onSendReply={handleSendReply}
            onMarkResolved={handleMarkResolved}
          />
        </Modal>
      )}

      {selectedTicket && modalState === "resolved" && (
        <ResolvedTicket onClose={handleCloseModal} />
      )}

      {modalState === "confirm" && (
        <Modal onClose={handleCloseModal}>
          <ConfirmClosureModal
            onConfirm={handleConfirmClosure}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}

      {modalState === "closed" && (
        <Modal onClose={handleCloseModal}>
          <TicketClosedModal onGoBack={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
