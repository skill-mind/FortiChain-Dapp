import React, { useRef, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, Connector } from "@starknet-react/core";
import { ChevronsUpDown, ArrowLeft, X } from "lucide-react";
import { AccountTypeModal } from "./account-type-modal";

type ConnectButtonVariant = 'default' | 'navbar';

interface ConnectButtonProps {
  variant?: ConnectButtonVariant;
}

const truncateAddress = (address?: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function ConnectButton({ variant = 'default' }: ConnectButtonProps) {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState<"project-owner" | "security-researcher" | "validator" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleConnect = (connector: Connector) => {
    connect({ connector });
    setIsModalOpen(false);
    setIsFirstTimeUser(true);
  };
  
  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  const handleAccountCreation = () => {
    if (selectedAccountType) {
      console.log(`Creating ${selectedAccountType} account`);
      setIsFirstTimeUser(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {isConnected && address ? (
        <div className={`relative ${variant === "default" ? "mx-auto w-fit" : ""}`}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 border border-[#6B6668] text-white transition-colors ${
              variant === 'navbar' 
                ? 'rounded px-4 py-2' 
                : 'rounded-lg px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl font-semibold'
            }`}
            aria-label="Account menu"
          >
            {truncateAddress(address)}
            <ChevronsUpDown className="w-4 h-4" />
          </button>
          
          {isDropdownOpen && (
            <div className={`absolute right-0 mt-2 bg-[#1C1D1F] overflow-hidden shadow-lg z-10 ${
              variant === "default" 
                ? "rounded-lg px-8 py-3 sm:py-4 md:py-5 text-base font-semibold w-fit" 
                : "rounded-md w-48"
            }`}>
              <button 
                onClick={handleDisconnect}
                className="w-full text-left px-4 py-2 hover:bg-[#2a2b2e] transition-colors"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      ) : (
        <button 
          onClick={() => setIsModalOpen(true)}
          className={`bg-[#0000FF] text-white hover:bg-blue-700 transition-colors ${
            variant === 'navbar' 
              ? 'rounded px-4 py-2' 
              : 'rounded-lg px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl font-semibold'
          }`}
          aria-label="Connect wallet"
        >
          Connect Wallet
        </button>
      )}
      
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#211a1d] text-white rounded-3xl p-8 w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-bold text-white">Connect Wallet</h1>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-white hover:text-gray-300"
                aria-label="Close modal"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <p className="text-xl text-white mb-12">Select the wallet you want to connect below</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {connectors.map((connector) => {
                const isAvailable = connector.available();
                const connectorId = connector.id.toLowerCase();
                const connectorName = connector.name.toLowerCase();

                let bgColor = "#211a1d";
                let iconBgColor = "#ffffff";
                let borderStyle = "border border-[#a09fa9]";

                if (connectorId.includes("argent") && connectorName.includes("mobile")) {
                  bgColor = "#000080";
                  borderStyle = "border-2 border-white";
                } else if (connectorId.includes("braavos")) {
                  iconBgColor = "#1b0055";
                }

                return (
                  <button
                    key={connector.id}
                    onClick={() => handleConnect(connector)}
                    disabled={!isAvailable}
                    className={`${borderStyle} rounded-xl overflow-hidden ${
                      isAvailable ? "cursor-pointer hover:opacity-90" : "opacity-50 cursor-not-allowed"
                    } transition-opacity`}
                  >
                    <div className="flex flex-col items-center justify-center p-8" style={{ backgroundColor: bgColor }}>
                      <div className="rounded-full p-3 mb-4" style={{ backgroundColor: iconBgColor }}>
                        {typeof connector.icon === "string" && (
                          <img 
                            src={connector.icon || "/placeholder.svg"} 
                            alt={connector.name} 
                            className="w-10 h-10" 
                            width={40}
                            height={40}
                          />
                        )}
                      </div>
                      <span className="text-xl font-medium text-white">{connector.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <AccountTypeModal
        isOpen={isFirstTimeUser}
        onClose={() => setIsFirstTimeUser(false)}
        selectedType={selectedAccountType}
        onSelectType={setSelectedAccountType}
        onSubmit={handleAccountCreation}
      />
    </div>
  );
}