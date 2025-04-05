import React, { useEffect, useRef } from 'react';
import { GameClient } from '../core/GameClient';

export const GamePage: React.FC = () => {
  const gameRef = useRef<GameClient | null>(null);

  useEffect(() => {
    // Initialize game
    gameRef.current = new GameClient();
    gameRef.current.initializeGame();

    // Cleanup function
    return () => {
      if (gameRef.current) {
        gameRef.current.cleanup();
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div id="game-container" className="w-full h-screen bg-black">
      {/* Game will be rendered here */}
    </div>
  );
}; 