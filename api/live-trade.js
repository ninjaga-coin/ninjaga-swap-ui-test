export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://public-api.birdeye.so/public/txs/token/DwSfpmu1ovgcMocdib4y1v7NXnyf4VDEVR81H8Ynpump?limit=1",
      {
        headers: {
          "X-API-KEY": "38991d74b5554611bfa5d4aa3cdfc20d", // Replace with your actual Birdeye API key
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