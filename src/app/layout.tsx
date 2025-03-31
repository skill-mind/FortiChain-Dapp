import type { Metadata } from "next";
import "./globals.css";
import StarknetProvider from "@/providers/starknet-provider";
import { WalletProvider } from "@/providers/wallet-connect-context";

export const metadata: Metadata = {
  title: "FortiChain",
  description: "A decentralised smart contract auditing platform",
  openGraph: {
    title: "FortiChain - Decentralized Security for Blockchain",
    description:
      "FortiChain streamlines the vulnerability disclosure and bug bounty processes, ensuring secure collaboration among developers, security researchers, and validators.",
    url: "", // Replace with your actual domain
    siteName: "FortiChain",
    images: [
      {
        url: "", // Replace with actual Open Graph image URL
        width: 1200,
        height: 630,
        alt: "FortiChain DApp Preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0F0A0AFA]">
        <StarknetProvider>
          <WalletProvider>{children}</WalletProvider>
        </StarknetProvider>
      </body>
    </html>
  );
}
