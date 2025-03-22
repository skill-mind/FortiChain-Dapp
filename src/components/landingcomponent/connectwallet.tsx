import { FaX } from "react-icons/fa6";
import Image from "next/image";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import SelectRole from "./selectrole";

export default function ConnectWallet({
  open,
  onClose,
  onConnected,
}: {
  open: boolean;
  onClose: () => void;
  onConnected?: () => void;
}) {
  if (!open) return null;

  const wallets = [
    {
      name: "Argent (Mobile)",
      icon: "/argent.png",
    },
    {
      name: "Argent (Desktop)",
      icon: "/argent.png",
    },
    {
      name: "Braavos",
      icon: "/braavos.png",
    },
  ];

  const [selectedWallet, setSelectedWallet] = useState<string | null>(
    wallets[0].name
  );
  const [showConnecting, setShowConnecting] = useState(false);
  const [showSelectRole, setShowSelectRole] = useState(false);

  const handleConnect = () => {
    setShowConnecting(true);

    // Simulate connection delay
    setTimeout(() => {
      setShowConnecting(false);
      setShowSelectRole(true);
    }, 2000);
  };

  const handleWalletSelect = (walletName: string) => {
    setSelectedWallet(walletName);
  };

  const handleRoleSelected = () => {
    if (onConnected) {
      onClose();
      onConnected();
    }
  };

  const handleRoleGoBack = () => {
    setShowSelectRole(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-black/50 py-10 min-h-screen"
      >

        {!showConnecting && !showSelectRole && (
          <motion.section
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-50 max-w-2xl w-full m-4 p-4 md:p-8 bg-black rounded-2xl border border-white"
          >
            <section className="flex justify-between items-center mb-10">
              <section>
                <h1 className="text-white text-xl md:text-2xl font-bold">
                  Connect Wallet
                </h1>
                <p className="text-white font-light text-sm md:text-lg">
                  Select the wallet you want to connect below
                </p>
              </section>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaX />
              </button>
            </section>

            <section className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-8 md:mb-28">
              {wallets.map((wallet) => (
                <motion.button
                  key={wallet.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col justify-center items-center gap-4 w-full ${
                    wallet.name === selectedWallet
                      ? "bg-[#000080] border-2"
                      : "bg-black border"
                  } border-white rounded-lg p-4 h-full`}
                  onClick={() => handleWalletSelect(wallet.name)}
                >
                  <Image
                    src={wallet.icon}
                    alt={wallet.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <p className="text-white font-medium text-lg">
                    {wallet.name}
                  </p>
                </motion.button>
              ))}
            </section>

            <section className="flex flex-col justify-center items-start space-y-2">
              <p className="text-white text-lg">
                Don't have a wallet?{" "}
                <a href="#" className="text-[#0000FF]">
                  Create One
                </a>
              </p>
              <button className="bg-[#0000FF] text-white px-4 py-4 rounded w-full flex items-center justify-center gap-2" onClick={() =>  handleConnect() }>
                <FaLock/>
                Connect Wallet
                <FaLock/>
              </button>
            </section>
          </motion.section>
        )}

        {showConnecting && (
          <motion.section
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-50 max-w-md w-full m-4 p-8 bg-black rounded-2xl border border-white"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-6 w-16 h-16 border-4 border-t-[#0000FF] border-white rounded-full"
              />
              <h2 className="text-2xl font-bold text-white mb-4">
                Connecting to {selectedWallet}
              </h2>
              <p className="text-gray-400">
                Please approve the connection in your wallet...
              </p>
            </div>
          </motion.section>
        )}

        <SelectRole
          open={showSelectRole}
          onClose={() => {
            setShowSelectRole(false);
            handleRoleSelected();
            onClose();
          }}
          onGoBack={handleRoleGoBack}
        />
      </motion.div>
    </AnimatePresence>
  );
}
