import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

// Load wallet connect button dynamically (avoids hydration error)
const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

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
            <p>You may now swap NJG tokens at launch.</p>

            {/* Jupiter Swap Widget */}
            <div className="mt-6">
              <iframe
                src="https://widget.jup.ag/?inputMint=So11111111111111111111111111111111111111112&outputMint=NJg5fisDp1rHTcLjzRG2fWd6PQGMBJCEV2hdJitgxmp"
                title="Jupiter Swap"
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
