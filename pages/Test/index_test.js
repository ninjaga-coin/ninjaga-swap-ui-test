import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

// Dynamic import for wallet connect button
const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

// List of whitelisted wallet addresses
const whitelist = [
  "cnvyhSvBrGLMZYovuPQWiRF9tz86U2ZNgwFJTGUmuzb",
  "P78EbCN7gBdrUMvVaXUbkQLvZCAfSSw4L8r7NxqMd5V",
  "EDzvcPkb2vYXZ7vMqXHAYuNZBUksc1nU2PebXZJFSkpr",
  "4dam2GksGbgW3zT3SdEtbqAjzUQH1SkQki5tzSQ7Z31b"
];

export default function Home() {
  const { publicKey } = useWallet();
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  useEffect(() => {
    if (publicKey) {
      setIsWhitelisted(whitelist.includes(publicKey.toBase58()));
    }
  }, [publicKey]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">NINJAGA Swap UI</h1>
      <img src="/logo.png" alt="NINJAGA Logo" className="w-32 mb-6" />
      <WalletMultiButtonDynamic className="mb-4" />

      {publicKey ? (
        isWhitelisted ? (
          <div className="bg-green-900 p-4 rounded-lg w-full max-w-2xl text-center">
            <p className="mb-2">✅ Wallet is whitelisted!</p>
            <p>You may now access the swap interface.</p>

            {/* Simulated Jupiter Swap: SOL → USDC */}
            <div className="mt-6">
              <iframe
                src="https://widget.jup.ag/?inputMint=So11111111111111111111111111111111111111112&outputMint=Es9vMFrzaCERzjBpxc1Zrt3NZUM9WQpJ3WY6dM4UJvBS"
                title="Jupiter Swap Simulation"
                width="100%"
                height="500"
                frameBorder="0"
                style={{
                  borderRadius: "12px",
                  background: "#111",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-red-900 p-4 rounded-lg text-center w-full max-w-md">
            <p className="mb-2">🚫 This wallet is not on the whitelist.</p>
            <p>Only pre-approved wallets can trade at launch.</p>
          </div>
        )
      ) : (
        <p className="text-center">🔌 Please connect your wallet above to check access.</p>
      )}
    </div>
  );
}
