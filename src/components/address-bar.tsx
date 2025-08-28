import { useAccount } from "@starknet-react/core";
import { Ellipsis } from "lucide-react";
import React from "react";

function AddressBar() {
  const { address } = useAccount();
  return (
    <div className="flex items-center gap-x-[14px]">
      <div
        className="p-[2px] rounded-full overflow-hidden w-fit lg:w-[170px]"
        style={{
          background: "linear-gradient(90deg, #10273E 0%, #2A67A4 100%)",
        }}
      >
        <div className="p-[6px] lg:p-2 flex items-center gap-x-[10px] bg-[#090909] rounded-full">
          <img
            src="/wallet_icons/braavos_icon.svg"
            className="w-6 h-6"
            alt=""
          />
          <span className="lg:flex hidden">
            {address?.slice(0, 6)}...{address?.slice(-5)}
          </span>
        </div>
      </div>
      <button className="p-3 flex items-center justify-center bg-[#101011] rounded-full rotate-90">
        <Ellipsis size={16} />
      </button>
    </div>
  );
}

export default AddressBar;
