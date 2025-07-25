import { clsx, type ClassValue } from "clsx";
import { CairoCustomEnum, RpcProvider } from "starknet";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: `0x${string}`, chars = 5): string {
  if (!address || address.length < chars * 2 + 2) return address;
  return `${address.slice(0, 4)}...${address.slice(-chars)}`;
}

export const myProvider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
});

// For converting Hex to contract address
export function bigIntToHex(value: bigint): `0x${string}` {
  return `0x${value.toString(16)}`;
}

export function toEpochTime(date: string | Date): number {
  const d = typeof date === "string" ? new Date(date) : date;
  return Math.floor(d.getTime() / 1000);
}

export function createCairoEnum(value: string): CairoCustomEnum {
  return new CairoCustomEnum({ [value]: {} });
}

// Report data interface
export interface ReportData {
  id: string;
  name: string;
  severity: "critical" | "low" | "high";
  status: "approved" | "rejected" | "pending";
}

// Pinata upload function
export async function uploadToPinata(reportData: ReportData): Promise<string> {
  const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

  if (!pinataApiKey || !pinataSecretApiKey) {
    throw new Error("Pinata API keys are not configured");
  }

  const data = {
    pinataContent: {
      reportId: reportData.id,
      reportName: reportData.name,
      severity: reportData.severity,
      status: reportData.status,
      timestamp: new Date().toISOString(),
    },
    pinataMetadata: {
      name: `Report-${reportData.name}-${reportData.id}`,
      keyvalues: {
        reportId: reportData.id,
        severity: reportData.severity,
        status: reportData.status,
      },
    },
  };

  try {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Pinata upload failed: ${errorData.error || response.statusText}`
      );
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw error;
  }
}

// Fetch project data from IPFS using hash
export async function fetchProjectFromIPFS(ipfsHash: string): Promise<any> {
  const pinataGatewayUrl = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL;
  const pinataGatewayToken = process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN;

  if (!pinataGatewayUrl) {
    throw new Error("Pinata gateway URL is not configured");
  }

  try {
    const url = pinataGatewayToken
      ? `${pinataGatewayUrl}${ipfsHash}?pinataGatewayToken=${pinataGatewayToken}`
      : `${pinataGatewayUrl}${ipfsHash}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from IPFS:", error);
    throw error;
  }
}
