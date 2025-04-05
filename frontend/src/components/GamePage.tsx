import React, { useEffect, useRef } from 'react';
import { GameClient } from '../core/GameClient';

export const GamePage: React.FC = () => {
  const gameRef = useRef<GameClient | null>(null);

  useEffect(() => {
    // Initialize game
    gameRef.current = new GameClient();
    gameRef.current.initializeGame();

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.cleanup();
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-start items-center">
      <div className="h-[30vh]"></div>
      <div id="game-container" className="w-full max-w-4xl mx-auto mt-40" />
    </div>
  );
}; 