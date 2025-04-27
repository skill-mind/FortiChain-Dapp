import React from 'react';

const ResolveTicket: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-[#1E2528] rounded-lg p-6 w-full max-w-[480px] sm:max-w-[560px] md:max-w-[640px] lg:max-w-[820px] text-white">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-[18px] sm:text-[20px] font-semibold">
            Issue with MetaConnect Wallet - Transaction Stuck
          </h2>
        </div>

          <div className="flex gap-2 pb-8">
            <button className="bg-[#22C55E] text-white px-3 py-1 rounded-md text-[14px] sm:text-[16px] hover:bg-[#16A34A]">
              Resolved
            </button>
            <button className="bg-[#2A3236] text-white px-3 py-1 rounded-md text-[14px] sm:text-[16px] hover:bg-[#3A4448]">
              Vulnerability Reports
            </button>
          </div>

        <div className="text-[#B0BEC5] text-[14px] sm:text-[16px] mb-4">
          <p className="mb-2">Hello Support Team,</p>
          <p className="mb-2">
            I tried sending ETH from my MetaConnect Wallet to another address, but the transaction has been stuck as “pending” for over an hour. I used the recommended gas fees, but it still hasn’t gone through. My wallet address is 0x1234abcd5678efg9012jklmnqprstuvwx, and the transaction hash is 0xa1b2c3d4e5f67890123456789abcdef0123456789abcdef.
          </p>
          <p>
            I’ve tried refreshing and reconnecting my wallet, but the issue persists. Can you help me resolve this?
          </p>
        </div>

        <div className="mb-4">
          <p className="text-[#B0BEC5] text-[14px] sm:text-[16px] mb-2">2 attachments</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center bg-[#2A3236] rounded-md p-2 w-full sm:w-auto">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm0 2h7v4h4v12H6V4zm2 6h8v2H8v-2zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/>
              </svg>
              <span className="text-[#B0BEC5] text-[14px] sm:text-[16px]">doc.pdf 5MB</span>
            </div>
            <div className="flex items-center bg-[#2A3236] rounded-md p-2 w-full sm:w-auto">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm0 2h7v4h4v12H6V4zm2 6h8v2H8v-2zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/>
              </svg>
              <span className="text-[#B0BEC5] text-[14px] sm:text-[16px]">doc.pdf 5MB</span>
            </div>
          </div>
        </div>

     
        <div className="mb-4">
          <h3 className="text-[16px] sm:text-[18px] font-semibold mb-2">Your Reply</h3>
          <div className="bg-[#2A3236] rounded-md p-4">
            <p className="text-[#B0BEC5] text-[14px] sm:text-[16px]">
              Thank you for reaching out. We’ve looked into your transaction, and it appears to be stuck due to low gas fees or network congestion. Here’s what you can do to resolve it:
            </p>
            <ul className="list-disc list-inside text-[#B0BEC5] text-[14px] sm:text-[16px] mt-2">
              <li>Speed Up the Transaction - If your wallet allows, try increasing the gas fee and resubmitting the transaction.</li>
            </ul>
            <p className="text-[#B0BEC5] text-[14px] sm:text-[16px] mt-2">
              If you need assistance with these steps, let us know. We’re happy to guide you through the process!
            </p>
          </div>
        </div>

        <div className="flex ">
          <button className="bg-[#4A565C] text-white px-4 py-2 rounded-md text-[14px] sm:text-[16px] hover:bg-[#5A666C]">
            Ticket Closed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveTicket;