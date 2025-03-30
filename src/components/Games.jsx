import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
//Οργάνωση παιχνιδιων σε λίστα για clean code
const gamesList = [
  {
    path: "/FindCorrectEnding",
    name: "Βρες την σωστή κατάληξη",
    color: "bg-blue-500 hover:bg-blue-400",
  },
  {
    path: "/WordBuilderGame",
    name: "Φτιάξε τις λέξεις",
    color: "bg-yellow-400 hover:bg-yellow-300",
  },
];

const Games = () => {
  const [hoveredGame, setHoveredGame] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Διάλεξε ένα παιχνίδι!
      </h1>
      {/* //Mapping games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gamesList.map((game, index) => (
          <Link key={index} to={game.path}>
            <button
              className={`px-6 py-3 text-white rounded-lg shadow-md transition-all duration-300 ${
                game.color
              } ${hoveredGame === index ? "scale-105" : ""}`}
              onMouseEnter={() => setHoveredGame(index)}
              onMouseLeave={() => setHoveredGame(null)}
            >
              {game.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Games;
