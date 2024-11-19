import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css'; // Assuming you have a CSS file for styling

const Ribbon = () => {
  return (
    <div>
    <h1 className='title'>Bean To Cup</h1>
    <div className="ribbon">
      <NavLink to="/" className="ribbon-link" activeClassName="active-link">Home</NavLink>
      <span className="separator">|</span>
      <NavLink to="/beans" className="ribbon-link" activeClassName="active-link">Beans</NavLink>
      <span className="separator">|</span>
      <NavLink to="/roasts" className="ribbon-link" activeClassName="active-link">Roasts</NavLink>
      <span className="separator">|</span>
      <NavLink to="/cups" className="ribbon-link" activeClassName="active-link">Cups</NavLink>
      <span className="separator">|</span>
      <NavLink to="/analysis" className="ribbon-link" activeClassName="active-link">Analysis</NavLink>
    </div>
    </div>
  );
};

export default Ribbon;