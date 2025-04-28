
'use client';

import Image from "next/image";
import good from '../../../../../../public/adminIcon/good.svg';

interface TicketClosedModalProps {
  onGoBack: () => void;
}

export default function TicketClosedModal({ onGoBack }: TicketClosedModalProps) {
  return (
    <div className="text-center item-center">
      <h2 className="text-white text-lg font-semibold mb-4">Ticket Closed Successfully</h2>
      <p className="text-gray-400 mb-6">
        You have successfully marked this ticket as resolved. The requester will be notified, and no further replies can be sent.
      </p>

      <hr className="border border-neutral-800 mb-8"/>
    <Image 
    src={good}
    alt="PDF Icon"
    width={150}
    height={80}
    className="mx-auto mb-6"/>

      <button
        onClick={onGoBack}
        className="bg-[#0000FF] text-white px-14 py-2 my-6 rounded-md"
      >
        Go Back
      </button>
    </div>
  );
}