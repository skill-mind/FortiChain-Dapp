'use client';

interface ConfirmClosureModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmClosureModal({ onConfirm, onCancel }: ConfirmClosureModalProps) {
  return (
    <div className="text-center px-6 pb-4 pt-6 w-full max-w-md mx-auto">
      <h2 className="text-white text-lg font-semibold mb-4">Confirm Ticket Closure</h2>
      <p className="text-gray-400 mb-4">
        Are you sure you want to close this ticket? </p>
        <hr className="border border-neutral-800 mb-10"/>
      <p className="text-gray-400 mb-6">
      Once closed, you will not be able to reply or reopen the ticket.
      If your issue is not resolved, you can keep it open for further assistance connected to the internet.
      </p>
      <div className="flex justify-center my-6 space-x-4">
        <button
          onClick={onCancel}
          className="bg-[#161113] border border-neutral-800 text-white px-10 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-[#0000FF] text-white px-10 py-2 rounded-md"
        >
          Close Ticket
        </button>
      </div>
    </div>
  );
}