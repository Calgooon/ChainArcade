import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          ChainArcade
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Experience the future of gaming on the blockchain
        </p>
        <button
          onClick={startGame}
          className="px-8 py-4 text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg 
                   hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
                   shadow-lg hover:shadow-xl"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}; 