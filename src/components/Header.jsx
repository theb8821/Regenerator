import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="brand-title">
          <span className="brand-accent">Re</span>generator
        </h1>
        <p className="brand-subtitle">Louisiana Lottery Number Generator</p>
      </div>
    </header>
  );
};

export default Header;
