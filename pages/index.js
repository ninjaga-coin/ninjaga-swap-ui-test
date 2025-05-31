import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
fetch("/api/live-trade")
const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

const WHITELIST_MODE = true;

const WHITELIST = [
  "cnvyhSvBrGLMZYovuPQWiRF9tz86U2ZNgwFJTGUmuzb",
  "P78EbCN7gBdrUMvVaXUbkQLvZCAfSSw4L8r7NxqMd5V",
  "EDzvcPkb2vYXZ7vMqXHAYuNZBUksc1nU2PebXZJFSkpr",
  "BnNDWFeTg8Bx8xuEvtfuB2Eu9UamTBqYSmiPiUfnbXAm",
];

export default function Home() {
  const { publicKey } = useWallet();
  const isWhitelisted =
    !WHITELIST_MODE || (publicKey && WHITELIST.includes(publicKey.toBase58()));
  const isAdmin = publicKey && publicKey.toBase58() === "BnNDWFeTg8Bx8xuEvtfuB2Eu9UamTBqYSmiPiUfnbXAm";

  const [lastTrade, setLastTrade] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;
    const interval = setInterval(() => {
      fetch("/api/mock-trade-data.json")
        .then((res) => res.json())
        .then((data) => setLastTrade(data));
    }, 8000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">NINJAGA Swap UI - OLD</h1>
      <img src="/logo.png" alt="NINJAGA Logo" className="w-32 mb-6" />
      <WalletMultiButtonDynamic className="mb-4" />
      <p className="mb-4">
        {WHITELIST_MODE
          ? isWhitelisted
            ? "Access granted: whitelisted wallet"
            : "Whitelist only — restricted access"
          : "Public trading enabled"}
      </p>

      {isWhitelisted && (
        <div className="mt-6 w-full max-w-2xl">
          <iframe
            src="https://widget.jup.ag/?inputMint=So11111111111111111111111111111111111111112&outputMint=DwSfpmu1ovgcMocdib4y1v7NXnyf4VDEVR81H8Ynpump"
            title="Jupiter Swap"
            width="100%"
            height="500"
            frameBorder="0"
            style={{ borderRadius: "12px", background: "#111" }}
            />
        </div>
      )}

      {isAdmin && (
        <div className="mt-10 p-4 bg-gray-900 rounded-lg w-full max-w-2xl">
          <h2 className="text-lg font-bold mb-2">🛡️ Real-Time Trade Monitor</h2>
          {
            lastTrade ? (
              <div>
                <p>💳 Wallet: {lastTrade.wallet}</p>
                <p>💰 Amount: {lastTrade.amount} NJG</p>
                <p>🔍 Type: {lastTrade.type}</p>
                <p>⏰ Time: {lastTrade.timestamp}</p>
              </div>
            ) : (
              <p>⏳ Waiting for trade data...</p>
            )
          }
        </div>
      )}
    </div>
  );
}