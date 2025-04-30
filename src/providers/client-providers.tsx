"use client";

import StarknetProvider from "./starknet-provider";
import { WalletProvider } from "./wallet-connect-context";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <StarknetProvider>
      <WalletProvider>{children}</WalletProvider>
    </StarknetProvider>
  );
} 