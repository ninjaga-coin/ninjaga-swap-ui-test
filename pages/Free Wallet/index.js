import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">NINJAGA Swap UI</h1>
      <img src="/logo.png" alt="NINJAGA Logo" className="w-32 mb-6" />
      <WalletMultiButtonDynamic className="mb-4" />
      <p className="mb-4">Swap NJG securely and directly.</p>

      {/* Jupiter Swap - Replace outputMint with real NJG address */}
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
    </div>
  );
}
