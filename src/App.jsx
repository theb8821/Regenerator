import React from 'react';
import Header from './components/Header';
import LotteryCard from './components/LotteryCard';
import Footer from './components/Footer';
import { generatePick, generateLotto, generatePowerball, generateMegaMillions } from './utils/lotteryGenerators';
import './App.css';

function App() {
  const games = [
    { name: "Pick 3", placeholder: "X - X - X", generator: () => generatePick(3) },
    { name: "Pick 4", placeholder: "X - X - X - X", generator: () => generatePick(4) },
    { name: "Pick 5", placeholder: "X - X - X - X - X", generator: () => generatePick(5) },
    { name: "Lotto", placeholder: "XX - XX - XX - XX - XX - XX", generator: generateLotto },
    { name: "Powerball", placeholder: "XX - XX - XX - XX - XX | PB: XX", generator: generatePowerball },
    { name: "Mega Millions", placeholder: "XX - XX - XX - XX - XX | MB: XX", generator: generateMegaMillions }
  ];

  return (
    <div className="app-container">
      <Header />
      <main className="games-grid">
        {games.map(game => (
          <LotteryCard key={game.name} game={game} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;
