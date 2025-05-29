import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";

const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

// 🔁 Toggle this to false to go public
const WHITELIST_MODE = true;

const WHITELIST = [
  "cnvyhSvBrGLMZYovuPQWiRF9tz86U2ZNgwFJTGUmuzb",
  "P78EbCN7gBdrUMvVaXUbkQLvZCAfSSw4L8r7NxqMd5V",
  "EDzvcPkb2vYXZ7vMqXHAYuNZBUksc1nU2PebXZJFSkpr",
];

export default function Home() {
  const { publicKey } = useWallet();

  const isWhitelisted =
    !WHITELIST_MODE || (publicKey && WHITELIST.includes(publicKey.toBase58()));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">NINJAGA Swap UI</h1>
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
      )}
    </div>
  );
}