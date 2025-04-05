import React, { useState } from 'react';
import { WalletService } from '../services/WalletService';

interface ConnectWalletProps {
  wallet: WalletService;
  onConnected: () => void;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ wallet, onConnected }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      const connected = await wallet.connect();
      if (connected) {
        setIsConnected(true);
        onConnected();
      } else {
        setError('Authentication Failed');
      }
    } catch (err) {
      console.error('[ConnectWallet] Failed to connect wallet:', err);
      setError('Connection Failed');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting || isConnected}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isConnected
          ? 'bg-green-500 hover:bg-green-600'
          : error
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {isConnecting
        ? 'Connecting...'
        : isConnected
        ? 'Wallet Connected'
        : error || 'Connect Wallet'}
    </button>
  );
}; 