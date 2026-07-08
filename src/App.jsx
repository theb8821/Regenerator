import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LotteryCard from './components/LotteryCard';
import Footer from './components/Footer';
import { generatePick, generateLotto, generatePowerball, generateMegaMillions } from './utils/lotteryGenerators';
import { extrapolatePick, extrapolateLotto, extrapolatePowerball, extrapolateMegaMillions } from './utils/extrapolationGenerators';
import './App.css';

function App() {
  const [method, setMethod] = useState('random'); // 'random' or 'extrapolate'
  const [historyData, setHistoryData] = useState({});

  useEffect(() => {
    if (method === 'extrapolate' && Object.keys(historyData).length === 0) {
      // Fetch live CSV data from our Node.js backend
      fetch('https://regenerator.onrender.com/api/history')
        .then(res => res.json())
        .then(data => setHistoryData(data))
        .catch(err => console.error("Failed to fetch history:", err));
    }
  }, [method]);

  // Pass only the specific game's history array into its extrapolator
  const games = [
    { name: "Pick 3", placeholder: "X - X - X", generator: () => generatePick(3), extrapolator: () => extrapolatePick(3, historyData.pick3) },
    { name: "Pick 4", placeholder: "X - X - X - X", generator: () => generatePick(4), extrapolator: () => extrapolatePick(4, historyData.pick4) },
    { name: "Pick 5", placeholder: "X - X - X - X - X", generator: () => generatePick(5), extrapolator: () => extrapolatePick(5, historyData.pick5) },
    { name: "Lotto", placeholder: "XX - XX - XX - XX - XX - XX", generator: generateLotto, extrapolator: () => extrapolateLotto(historyData.lotto) },
    { name: "Powerball", placeholder: "XX - XX - XX - XX - XX\nPB: XX", generator: generatePowerball, extrapolator: () => extrapolatePowerball(historyData.powerball) },
    { name: "Mega Millions", placeholder: "XX - XX - XX - XX - XX\nMB: XX", generator: generateMegaMillions, extrapolator: () => extrapolateMegaMillions(historyData.megaMillions) }
  ];

  return (
    <div className="app-container">
      <Header />
      
      <div className="method-selector">
        <label>Engine Mode: </label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="random">⚡ Standard Crypto-Random (Fast)</option>
          <option value="extrapolate">🧠 Smart Extrapolation (Live Data)</option>
        </select>
      </div>

      <main className="games-grid">
        {games.map(game => (
          <LotteryCard key={game.name} game={game} method={method} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;
