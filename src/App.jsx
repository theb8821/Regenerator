import React from 'react';
import Header from './components/Header';
import LotteryCard from './components/LotteryCard';
import Footer from './components/Footer';
import './App.css';

function App() {
  const games = [
    { name: "Pick 3", placeholder: "1 - 2 - 3" },
    { name: "Pick 4", placeholder: "1 - 2 - 3 - 4" },
    { name: "Pick 5", placeholder: "1 - 2 - 3 - 4 - 5" },
    { name: "Lotto", placeholder: "05 - 12 - 23 - 34 - 39 - 41" },
    { name: "Powerball", placeholder: "10 - 22 - 31 - 45 - 50 | PB: 12" },
    { name: "Mega Millions", placeholder: "04 - 15 - 26 - 37 - 48 | MB: 09" }
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
