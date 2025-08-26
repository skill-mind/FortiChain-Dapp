import React, { useRef, useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  Connector,
} from "@starknet-react/core";
import { ChevronsUpDown, X } from "lucide-react";
import { AccountTypeModal } from "./account-type-modal";
import Link from "next/link";
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit";
import { WebWalletConnector } from "starknetkit/webwallet";
import AddressBar from "./address-bar";

type ConnectButtonVariant = "default" | "navbar";

interface ConnectButtonProps {
  variant?: ConnectButtonVariant;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const truncateAddress = (address?: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function ConnectButton({
  variant = "default",
  isModalOpen,
  setIsModalOpen,
}: ConnectButtonProps) {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState<
    "project-owner" | "security-researcher" | "validator" | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Customize WebWalletConnector with an icon
  const customizedConnectors = connectors.map((connector) => {
    if (connector instanceof WebWalletConnector) {
      // Recreate the connector with the same network and new icon
      return new WebWalletConnector({});
    }
    return connector;
  });

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: customizedConnectors as StarknetkitConnector[],
  });

  const handleConnect = async () => {
    try {
      const { connector } = await starknetkitConnectModal();
      if (connector) {
        await connect({ connector: connector as Connector });
        setIsFirstTimeUser(true); // Trigger AccountTypeModal after connection
      }
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };
  useEffect(() => {
    if (isModalOpen && !isConnected) {
      handleConnect();
      //to prevent retrigerring
      setIsModalOpen(false);
    }
  }, [isModalOpen]);
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {isConnected && address ? (
        <AddressBar />
      ) : (
        <button
          onClick={handleConnect}
          className={`bg-[#0000FF] text-white hover:bg-blue-700 transition-colors ${
            variant === "navbar"
              ? "rounded-full px-4 py-2"
              : "rounded-lg px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl font-semibold"
          }`}
          aria-label="Connect wallet"
        >
          Connect Wallet
        </button>
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
