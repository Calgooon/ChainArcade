import React, { useEffect, useState } from 'react';

interface LeaderboardEntry {
  identityKey: string;
  score: number;
  rank?: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserKey?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, currentUserKey }) => {
  const [displayedEntries, setDisplayedEntries] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  useEffect(() => {
    // Sort entries by score in descending order
    const sortedEntries = [...entries].sort((a, b) => b.score - a.score);
    
    // Calculate ranks, handling ties
    const rankedEntries = sortedEntries.map((entry, index) => {
      // If this score is the same as the previous entry, use the same rank
      if (index > 0 && entry.score === sortedEntries[index - 1].score) {
        return { ...entry, rank: sortedEntries[index - 1].rank };
      }
      return { ...entry, rank: index + 1 };
    });

    // Find current user's rank if provided
    if (currentUserKey) {
      const userEntry = rankedEntries.find(entry => entry.identityKey === currentUserKey);
      setCurrentUserRank(userEntry?.rank ?? null);
    }

    // Determine which entries to display
    if (currentUserRank && currentUserRank > 10) {
      // Show top 10 plus current user
      const topTen = rankedEntries.slice(0, 10);
      const userEntry = rankedEntries.find(entry => entry.identityKey === currentUserKey);
      if (userEntry) {
        setDisplayedEntries([...topTen, userEntry]);
      } else {
        setDisplayedEntries(topTen);
      }
    } else {
      // Show top 10
      setDisplayedEntries(rankedEntries.slice(0, 10));
    }
  }, [entries, currentUserKey]);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>HIGH SCORES</h1>
      </div>
      <div className="leaderboard-scroll-container">
        <div className="leaderboard-content">
          {displayedEntries.map((entry) => (
            <div 
              key={entry.identityKey} 
              className={`leaderboard-entry ${entry.identityKey === currentUserKey ? 'current-user' : ''}`}
            >
              <span className="rank">{entry.rank}.</span>
              <span className="name">{entry.identityKey}</span>
              <span className="score">{entry.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

          .leaderboard-container {
            background: #000;
            border: 4px solid #00ff00;
            border-radius: 8px;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            font-family: 'Press Start 2P', cursive;
            position: relative;
            overflow: hidden;
            height: 80vh;
            display: flex;
            flex-direction: column;
          }

          .leaderboard-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15) 0px,
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            );
            pointer-events: none;
            animation: scanline 8s linear infinite;
          }

          @keyframes scanline {
            0% { transform: translateY(0); }
            100% { transform: translateY(100%); }
          }

          .leaderboard-header {
            text-align: center;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
            padding: 20px;
            background: linear-gradient(45deg, #000000, #1a1a1a);
            border: 2px solid #ff00ff;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
          }

          .leaderboard-header h1 {
            color: #ff00ff;
            text-shadow: 
              0 0 5px #ff00ff,
              0 0 10px #ff00ff,
              0 0 20px #ff00ff,
              0 0 40px #ff00ff;
            font-size: 24px;
            margin: 0;
            letter-spacing: 2px;
            animation: neonPulse 1.5s ease-in-out infinite alternate;
            font-family: 'Press Start 2P', cursive;
            text-transform: uppercase;
          }

          @keyframes neonPulse {
            from {
              text-shadow: 
                0 0 5px #ff00ff,
                0 0 10px #ff00ff,
                0 0 20px #ff00ff,
                0 0 40px #ff00ff;
            }
            to {
              text-shadow: 
                0 0 10px #ff00ff,
                0 0 20px #ff00ff,
                0 0 30px #ff00ff,
                0 0 50px #ff00ff;
            }
          }

          .leaderboard-scroll-container {
            flex: 1;
            overflow-y: auto;
            position: relative;
            z-index: 1;
            padding-right: 10px;
          }

          .leaderboard-scroll-container::-webkit-scrollbar {
            width: 8px;
          }

          .leaderboard-scroll-container::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
          }

          .leaderboard-scroll-container::-webkit-scrollbar-thumb {
            background: #00ff00;
            border-radius: 4px;
            border: 2px solid #000;
          }

          .leaderboard-scroll-container::-webkit-scrollbar-thumb:hover {
            background: #00cc00;
          }

          .leaderboard-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .leaderboard-entry {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background: rgba(0, 0, 0, 0.5);
            border: 2px solid #00ff00;
            border-radius: 4px;
            color: #00ff00;
            text-shadow: 0 0 5px #00ff00;
            font-family: 'Press Start 2P', cursive;
            letter-spacing: 1px;
          }

          .leaderboard-entry.current-user {
            background: rgba(0, 255, 0, 0.1);
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { 
              border-color: #00ff00;
              box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
            }
            50% { 
              border-color: #00ffff;
              box-shadow: 0 0 20px rgba(0, 255, 255, 0.7);
            }
            100% { 
              border-color: #00ff00;
              box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
            }
          }

          .rank {
            width: 40px;
            text-align: right;
          }

          .name {
            flex: 1;
            margin: 0 20px;
            text-align: left;
          }

          .score {
            width: 100px;
            text-align: right;
          }

          @media (max-width: 600px) {
            .leaderboard-container {
              padding: 10px;
              height: 70vh;
            }

            .leaderboard-header h1 {
              font-size: 18px;
            }

            .leaderboard-entry {
              font-size: 12px;
              padding: 5px;
            }
          }
        `}
      </style>
    </div>
  );
}; 