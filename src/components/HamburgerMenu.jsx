import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    const navElement = document.querySelector('nav');
    if (mainElement && navElement) {
      const navWidth = isOpen ? navElement.offsetWidth : 0;
      mainElement.style.marginLeft = `${navWidth}px`;
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="hamburger" onClick={toggleMenu}>☰</button>
      <nav className={isOpen ? 'open' : ''}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/beans" onClick={toggleMenu}>Beans</Link></li>
          <li><Link to="/roasts" onClick={toggleMenu}>Roasts</Link></li>
          <li><Link to="/cups" onClick={toggleMenu}>Cups</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default HamburgerMenu;