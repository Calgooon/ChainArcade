import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectWallet } from './ConnectWallet';
import { WalletService } from '../services/WalletService';

interface HeaderProps {
  wallet: WalletService;
  onWalletConnected: () => void;
}

export const Header: React.FC<HeaderProps> = ({ wallet, onWalletConnected }) => {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          ChainArcade
        </Link>
        <div className="flex items-center space-x-6">
          <div className="space-x-4">
            <Link 
              to="/" 
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/game" 
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Game
            </Link>
            <Link 
              to="/leaderboard" 
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Leaderboard
            </Link>
          </div>
          <ConnectWallet wallet={wallet} onConnected={onWalletConnected} />
        </div>
      </nav>
    </header>
  );
}; 