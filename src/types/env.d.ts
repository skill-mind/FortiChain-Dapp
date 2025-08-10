declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_RPC_URL: string;
    NEXT_PUBLIC_PINATA_GATEWAY_URL: string;
    NEXT_PUBLIC_PINATA_API_KEY?: string;
    NEXT_PUBLIC_PINATA_GATEWAY_TOKEN?: string;
    NEXT_PUBLIC_BEARER_TOKEN?: string;
  }
}
