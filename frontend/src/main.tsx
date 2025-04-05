// src/main.ts

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { GamePage } from './components/GamePage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { Layout } from './components/Layout';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);

// Export the game instance if needed for debugging or external use
// export const game = new GameClient(); // Uncomment if needed for dev tools