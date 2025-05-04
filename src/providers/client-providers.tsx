"use client";

import StarknetProvider from "./starknet-provider";
import { WalletProvider } from "./wallet-connect-context";
import { Auth0ProviderWithRedirect } from "./auth0-provider";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <StarknetProvider>
      <WalletProvider>
        <Auth0ProviderWithRedirect>
          {children}
        </Auth0ProviderWithRedirect>
      </WalletProvider>
    </StarknetProvider>
  );
} 