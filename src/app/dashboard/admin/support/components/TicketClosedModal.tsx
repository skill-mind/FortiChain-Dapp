
'use client';

interface TicketClosedModalProps {
  onGoBack: () => void;
}

export default function TicketClosedModal({ onGoBack }: TicketClosedModalProps) {
  return (
    <div className="text-center">
      <h2 className="text-white text-lg font-semibold mb-4">Ticket Closed Successfully</h2>
      <p className="text-gray-400 mb-6">
        You have successfully marked this ticket as resolved. The requester will be notified, and no further replies can be sent.
      </p>
      <div className="text-green-500 text-4xl mb-4">✔</div>
      <button
        onClick={onGoBack}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Go Back
      </button>
    </div>
  );
}