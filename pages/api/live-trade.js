export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://public-api.birdeye.so/public/txs/token/8VhT6pBXAfutsKdbRXr9s1Z6waw6sVmzXK3t4x7ys6Ee?limit=1",
      {
        headers: {
          "X-API-KEY": "demo", // Replace with your actual Birdeye API key
        },
      }
    );
    const data = await response.json();

    const tx = data.data?.txList?.[0];

    const output = {
      wallet: tx?.buyer || "Unknown",
      amount: tx?.amount || "0",
      type: tx?.type || "N/A",
      timestamp: tx?.blockTime || new Date().toISOString(),
    };

    res.status(200).json(output);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch live trade" });
  }
}