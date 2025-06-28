


import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { StructuredData } from "../components/metadata/structured-data"
import ClientProviders from "@/providers/client-providers";



export const metadata: Metadata = {
  title: "FortiChain - Decentralized Blockchain Security Platform",
  description:
    "Enhance blockchain security through automated vulnerability disclosure and bug bounty processes. Trustless, transparent, and secure smart contract auditing on FortiChain.",
  keywords: [
    "blockchain security",
    "smart contract auditing",
    "bug bounty",
    "vulnerability disclosure",
    "decentralized security",
    "FortiChain",
    "DeFi security",
    "smart contract vulnerabilities",
    "security researchers",
    "automated rewards",
    "trustless auditing",
    "Web3 security",
  ],
  authors: [{ name: "FortiChain Team" }],
  creator: "FortiChain",
  publisher: "FortiChain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fortichain.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fortichain.io",
    title: "FortiChain - Decentralized Blockchain Security Platform",
    description:
      "Enhance blockchain security through automated vulnerability disclosure and bug bounty processes. Trustless, transparent, and secure smart contract auditing.",
    siteName: "FortiChain",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FortiChain - Decentralized Blockchain Security Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FortiChain - Decentralized Blockchain Security Platform",
    description: "Enhance blockchain security through automated vulnerability disclosure and bug bounty processes.",
    images: ["/twitter-image.png"],
    creator: "@fortichain",
    site: "@fortichain",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
          <body className="bg-[#0F0A0AFA]">
         <ClientProviders>{children}</ClientProviders>
       </body>
    </html>
  )
}
