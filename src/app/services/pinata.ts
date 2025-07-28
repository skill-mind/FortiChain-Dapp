export const fetchPinataData = async (cid: string): Promise<any> => {
  try {
    const gatewayUrl = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/${cid}`;
    const res = await fetch(gatewayUrl, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
    });
    if (!res.ok) throw new Error(`Pinata fetch failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching Pinata data:", err);
    return {};
  }
};
