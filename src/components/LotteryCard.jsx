import React, { useState } from 'react';
import './LotteryCard.css';

const LotteryCard = ({ game }) => {
  const [numbers, setNumbers] = useState(game.placeholder);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      // In phase 2, we will call the actual algorithm here
      setNumbers(game.placeholder); 
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="lottery-card">
      <div className="card-header">
        <h2 className="game-name">{game.name}</h2>
        <div className="game-logo-placeholder">
          {/* Logo will go here later */}
          <div className="logo-circle">LA</div>
        </div>
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
