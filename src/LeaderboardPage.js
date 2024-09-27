import React from "react";

const Leaderboard = () => {
  // Sample data for users (modify based on your data structure)
  const topThree = [
    { name: "Malhar Kute", score: 40, rank: 1 },
    { name: "Chidu", score: 40, rank: 2 },
    { name: "Jagruti Londhe", score: 40, rank: 3, image: "path-to-image.jpg" },
  ];

  const otherPlayers = [
    { id: 104, name: "Star Captain", score: 4 },
    { id: 4, name: "Nirusha", score: 40 },
    { id: 5, name: "Sakshi Walunj", score: 40 },
    { id: 6, name: "Md Abu Danish", score: 40 },
  ];

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <button className="text-yellow-400 text-xl hover:underline">⬅ Back</button>
        <h1 className="text-4xl font-bold text-yellow-400">Leaderboard</h1>
      </header>

      {/* Top 3 podium */}
      <div className="flex justify-around items-end mb-12">
        {/* Second Place */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-2">
            <span className="absolute bottom-0 -mb-3 bg-blue-600 text-white py-1 px-3 rounded-full">2</span>
            {/* Placeholder image */}
            <div className="w-16 h-16 bg-yellow-300 rounded-full"></div>
          </div>
          <span className="text-lg font-semibold">{topThree[1].name}</span>
          <span className="text-yellow-400">{topThree[1].score}</span>
        </div>

        {/* First Place */}
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
            <span className="absolute -top-4 text-4xl text-yellow-300 crown">👑</span>
            {/* Placeholder image */}
            <div className="w-20 h-20 bg-yellow-300 rounded-full"></div>
          </div>
          <span className="text-lg font-semibold">{topThree[0].name}</span>
          <span className="text-yellow-400">{topThree[0].score}</span>
        </div>

        {/* Third Place */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-2">
            <span className="absolute bottom-0 -mb-3 bg-green-600 text-white py-1 px-3 rounded-full">3</span>
            {/* Placeholder for image */}
            <img
              src={topThree[2].image}
              alt={topThree[2].name}
              className="w-16 h-16 rounded-full"
            />
          </div>
          <span className="text-lg font-semibold">{topThree[2].name}</span>
          <span className="text-yellow-400">{topThree[2].score}</span>
        </div>
      </div>

      {/* Other players list */}
      <div className="bg-gray-800 p-4 rounded-lg">
        {otherPlayers.map((player) => (
          <div
            key={player.id}
            className="flex justify-between items-center p-4 mb-2 bg-gray-700 rounded-lg"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-300 rounded-full mr-4"></div>
              <div className="text-lg">{player.name}</div>
            </div>
            <div className="flex items-center space-x-4">
              <span>{player.id}</span>
              <span className="text-yellow-400">{player.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
