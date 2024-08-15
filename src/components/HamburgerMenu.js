import React, { useState } from 'react';
import { Link } from 'gatsby';
import '../styles/HamburgerMenu.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      {isOpen && (
        <nav className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/case-studies-list">Case Studies</Link></li>
            <li><Link to="/ethical-checklist">Ethical Checklist</Link></li>
            <li><Link to="/about">About</Link></li> {/* Updated About link */}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
