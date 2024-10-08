import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css'; // Assuming you have a CSS file for styling

const Ribbon = () => {
  return (
    <div className="ribbon">
      <NavLink to="/" className="ribbon-link" activeClassName="active-link">Home</NavLink>
      <span className="separator">|</span>
      <NavLink to="/roasts" className="ribbon-link" activeClassName="active-link">Roasts</NavLink>
      <span className="separator">|</span>
      <NavLink to="/beans" className="ribbon-link" activeClassName="active-link">Beans</NavLink>
      <span className="separator">|</span>
      <NavLink to="/cups" className="ribbon-link" activeClassName="active-link">Cups</NavLink>
    </div>
  );
};

export default Ribbon;