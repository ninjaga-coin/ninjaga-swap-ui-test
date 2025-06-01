
export default async function handler(req, res) {
  // Simulated trade data
  const mockTrade = {
    wallet: "ExampleWallet123...abc",
    amount: "1,200",
    type: "Buy",
    timestamp: new Date().toLocaleString(),
  };

  res.status(200).json(mockTrade);
}
