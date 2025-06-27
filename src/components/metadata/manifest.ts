import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FortiChain - Decentralized Blockchain Security Platform",
    short_name: "FortiChain",
    description: "Enhance blockchain security through automated vulnerability disclosure and bug bounty processes.",
    start_url: "/",
    display: "standalone",
    background_color: "#1e293b",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["security", "blockchain", "finance"],
    lang: "en",
    orientation: "portrait-primary",
    scope: "/",
  }
}
