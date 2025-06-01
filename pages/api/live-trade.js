export default async function handler(req, res) {
  try {
    const response = await fetch("https://public-api.birdeye.so/public/last-trade?pairAddress=DwSfpmu1ovgcMocdib4y1v7NXnyf4VDEVR81H8Ynpump", {
      headers: {
        "X-API-KEY": "demo" // Replace with your real API key
      }
    });

    const result = await response.json();
    const trade = result?.data;

    res.status(200).json({
      wallet: trade?.txHash || "Unknown",
      amount: trade?.amount || 0,
      type: trade?.side || "unknown",
      timestamp: new Date().toLocaleTimeString(),
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch trade data" });
  }
}