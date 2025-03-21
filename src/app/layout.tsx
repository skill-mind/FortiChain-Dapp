import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "FortiChain",
  description: "A decentralised smart contract auditing platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0F0A0AFA]">
       {children}
      </body>
    </html>
  );
}