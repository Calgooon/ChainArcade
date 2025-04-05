import React from 'react';
import { Leaderboard } from './Leaderboard';

// Example data - in a real app, this would come from an API
const mockLeaderboardData = [
  { identityKey: 'PacMan', score: 3000 },
  { identityKey: 'Galaga', score: 2500 },
  { identityKey: 'SpaceInvader', score: 2000 },
  { identityKey: 'TetrisMaster', score: 1800 },
  { identityKey: 'DonkeyKong', score: 1500 },
  { identityKey: 'Mario', score: 1200 },
  { identityKey: 'Sonic', score: 1000 },
  { identityKey: 'Zelda', score: 900 },
  { identityKey: 'MegaMan', score: 800 },
  { identityKey: 'Contra', score: 700 },
  { identityKey: 'CurrentUser', score: 500 }, // This user would be outside top 10
];

export const LeaderboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-start justify-center p-4 pt-12">
      <Leaderboard 
        entries={mockLeaderboardData}
        currentUserKey="CurrentUser" // In a real app, this would be the actual user's key
      />
    </div>
  );
}; 