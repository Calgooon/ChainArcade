import React from 'react';
import { Header } from './Header';
import { WalletService } from '../services/WalletService';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const wallet = new WalletService();

  const handleWalletConnected = () => {
    // This can be used to trigger any global state updates when the wallet connects
    console.log('Wallet connected');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header wallet={wallet} onWalletConnected={handleWalletConnected} />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}; 