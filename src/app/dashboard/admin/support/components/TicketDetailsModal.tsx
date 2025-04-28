'use client';

import Image from "next/image";
import pdf from '../../../../../../public/adminIcon/pdf.svg';

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
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
         <div className="bg-[#161113] border border-neutral-800 rounded-lg px-6 Pb-4 pt-6 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-[95vh] overflow-y-auto">
           {/* Header */}
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
   
   
           <hr className='bg-[#161113] border border-neutral-800 my-6' />
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Reply</h3>
        <h3 className="text-white text-lg font-semibold mb-2">How to fix your issue</h3>
        <div className="text-white mb-10 p-3">
        <p>
          Thank you for reaching out. We have looked into your transaction, and it appears to be stuck due to low gas fees or network congestion. Here is what you can do to resolve it:
          </p>
          <p className=" py-5"> • <strong className="px-6">Speed Up the Transaction</strong> – If your wallet allows, try increasing the gas fee and resubmitting the transaction. </p>
        <p>  If you need assistance with these steps, let us know. We are happy to guide you through the process!!</p>
          </div>
        <div className="flex space-x-2">
          <button
            onClick={onSendReply}
            className="bg-[#0000FF] text-white px-8 py-2 rounded-lg"
          >
            Send Reply & Close Ticket
          </button>
          <button
            onClick={onMarkResolved}
            className="bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}