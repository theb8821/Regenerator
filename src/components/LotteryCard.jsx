import React, { useState } from 'react';
import './LotteryCard.css';

const LotteryCard = ({ game, method }) => {
  const [numbers, setNumbers] = useState(game.placeholder);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      // Use the chosen engine based on the global dropdown
      if (method === 'extrapolate') {
        setNumbers(game.extrapolator());
      } else {
        setNumbers(game.generator()); 
      }
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="lottery-card">
      <div className="card-header">
        <h2 className="game-name">{game.name}</h2>
      </div>
      <div className="card-body">
        <div className={`numbers-display ${isGenerating ? 'generating' : ''}`}>
          {numbers}
        </div>
        <button 
          className="generate-btn" 
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Numbers'}
        </button>
      </div>
    </div>
  );
};

export default LotteryCard;
