import React from 'react';

const NewRoastModal = ({ isRoastModalOpen, closeRoastModal, roast, beans, handleRoastChange, handleRoastSave }) => {
  if (!isRoastModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Roast</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={roast.name} onChange={handleRoastChange} />
        <label htmlFor="beanType">Bean Type:</label>
        <select id="beanType" name="beanType" value={roast.beanType} onChange={handleRoastChange}>
          <option value="">Select Bean Type</option>
          {beans.map((bean, index) => (
            <option key={index} value={bean.origin}>{bean.origin}</option>
          ))}
          <option value="newBean">New Bean</option>
        </select>
        <label htmlFor="roastLevel">Roast Level:</label>
        <input type="text" id="roastLevel" name="roastLevel" value={roast.roastLevel} onChange={handleRoastChange} />
        <label htmlFor="firstCracksTime">First Cracks Time:</label>
        <input type="text" id="firstCracksTime" name="firstCracksTime" value={roast.firstCracksTime} onChange={handleRoastChange} />
        <label htmlFor="secondCracksTime">Second Cracks Time:</label>
        <input type="text" id="secondCracksTime" name="secondCracksTime" value={roast.secondCracksTime} onChange={handleRoastChange} />
        <label htmlFor="endRoastTime">End Roast Time:</label>
        <input type="text" id="endRoastTime" name="endRoastTime" value={roast.endRoastTime} onChange={handleRoastChange} />
        <div className="modal-buttons">
          <button className="styled-button" onClick={handleRoastSave}>Save</button>
          <button className="styled-button" onClick={closeRoastModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default NewRoastModal;