import React from 'react';

const NewCupModal = ({ isCupModalOpen, closeCupModal, cup, roasts, handleCupChange, handleCupSave }) => {
  if (!isCupModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Cup</h2>
        <label htmlFor="timeOfDay">Time of Day:</label>
        <input type="text" id="timeOfDay" name="timeOfDay" value={cup.timeOfDay} onChange={handleCupChange} />
        <label htmlFor="roast">Roast:</label>
        <select id="roast" name="roast" value={cup.roast} onChange={handleCupChange}>
          <option value="">Select Roast</option>
          {roasts.map((roast, index) => (
            <option key={index} value={roast.beanType}>{roast.beanType}</option>
          ))}
        </select>
        <label htmlFor="brewMethod">Brew Method:</label>
        <input type="text" id="brewMethod" name="brewMethod" value={cup.brewMethod} onChange={handleCupChange} />
        <label htmlFor="body">Body:</label>
        <input type="text" id="body" name="body" value={cup.body} onChange={handleCupChange} />
        <label htmlFor="sweetness">Sweetness:</label>
        <input type="text" id="sweetness" name="sweetness" value={cup.sweetness} onChange={handleCupChange} />
        <label htmlFor="tastingNotes">Tasting Notes:</label>
        <input type="text" id="tastingNotes" name="tastingNotes" value={cup.tastingNotes} onChange={handleCupChange} />
        <label htmlFor="brewTime">Brew Time:</label>
        <input type="text" id="brewTime" name="brewTime" value={cup.brewTime} onChange={handleCupChange} />
        <div className="modal-buttons">
          <button className="styled-button" onClick={handleCupSave}>Save</button>
          <button className="styled-button" onClick={closeCupModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default NewCupModal;