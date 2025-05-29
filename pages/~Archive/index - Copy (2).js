import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
  () =>
    import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

const whitelist = [
  'cnvyhSvBrGLMZYovuPQWiRF9tz86U2ZNgwFJTGUmuzb',
  'P78EbCN7gBdrUMvVaXUbkQLvZCAfSSw4L8r7NxqMd5V',
  'EDzvcPkb2vYXZ7vMqXHAYuNZBUksc1nU2PebXZJFSkpr',
  '4dam2GksGbgW3zT3SdEtbqAjzUQH1SkQki5tzSQ7Z31b'
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">NINJAGA Swap UI</h1>
      <img src="/logo.png" alt="NINJAGA Logo" className="w-32 mb-6" />
      <WalletMultiButtonDynamic className="mb-4" />

      {publicKey ? (
        isWhitelisted ? (
          <div className="bg-green-900 p-4 rounded-lg">
            <p className="mb-2">✅ Wallet is whitelisted!</p>
            <p>You may now swap NJG tokens at launch.</p>
          </div>
        ) : (
          <div className="bg-red-900 p-4 rounded-lg">
            <p className="mb-2">🚫 This wallet is not on the whitelist.</p>
            <p>Only pre-approved wallets can trade at launch.</p>
          </div>
        )
      ) : (
        <p>🔌 Please connect your wallet above to check access.</p>
      )}
    </div>
  );
}
