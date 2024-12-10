import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css'; // Assuming you have a CSS file for styling

const Ribbon = () => {
  return (
    <div>
      <h1 className='title'>Bean To Cup</h1>
      <div className="ribbon" style={{ justifyContent: 'space-between' }}>
        <div>
          <NavLink to="/" className="ribbon-link" activeclassname="active-link">Home</NavLink>
          <span className="separator">|</span>
          <NavLink to="/beans" className="ribbon-link" activeclassname="active-link">Beans</NavLink>
          <span className="separator">|</span>
          <NavLink to="/roasts" className="ribbon-link" activeclassname="active-link">Roasts</NavLink>
          <span className="separator">|</span>
          <NavLink to="/cups" className="ribbon-link" activeclassname="active-link">Cups</NavLink>
          <span className="separator">|</span>
          <NavLink to="/analysis" className="ribbon-link" activeclassname="active-link">Analysis</NavLink>
          <span className="separator">|</span>
        </div>
        <div>
          <NavLink to="/profile" className="ribbon-link" activeclassname="active-link" style={{marginRight: '20px'}}>Profile</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Ribbon;