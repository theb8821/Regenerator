import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} theb. All rights reserved.</p>
        <p className="footer-disclaimer">This application generates random numbers for entertainment purposes only.</p>
      </div>
    </footer>
  );
};

export default Footer;
