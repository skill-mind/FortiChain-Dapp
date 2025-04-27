'use client';

interface ConfirmClosureModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmClosureModal({ onConfirm, onCancel }: ConfirmClosureModalProps) {
  return (
    <div className="text-center">
      <h2 className="text-white text-lg font-semibold mb-4">Confirm Ticket Closure</h2>
      <p className="text-gray-400 mb-6">
        Are you sure you want to close this ticket?
        <br />
        Make sure you’re <strong className="text-white">once closed, you won’t be able to reply or reopen the ticket</strong>. If your issue isn’t resolved, you can keep it open for further assistance connected to the internet.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="bg-gray-700 text-white px-6 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Close Ticket
        </button>
      </div>
    </div>
  );
}