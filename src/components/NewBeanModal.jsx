import React from 'react';

const NewBeanModal = ({ isBeanModalOpen, closeBeanModal, bean, handleBeanChange, handleBeanSave }) => {
  if (!isBeanModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Bean</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={bean.name} onChange={handleBeanChange} />
        <label htmlFor="origin">Origin:</label>
        <input type="text" id="origin" name="origin" value={bean.origin} onChange={handleBeanChange} />
        <label htmlFor="processing">Processing:</label>
        <input type="text" id="processing" name="processing" value={bean.processing} onChange={handleBeanChange} />
        <label htmlFor="elevation">Elevation:</label>
        <input type="text" id="elevation" name="elevation" value={bean.elevation} onChange={handleBeanChange} />
        <label htmlFor="cost">Cost:</label>
        <input type="text" id="cost" name="cost" value={bean.cost} onChange={handleBeanChange} />
        <label htmlFor="tastingNotes">Tasting Notes:</label>
        <input type="text" id="tastingNotes" name="tastingNotes" value={bean.tastingNotes} onChange={handleBeanChange} />
        <div className="modal-buttons">
          <button className="styled-button" onClick={handleBeanSave}>Save</button>
          <button className="styled-button" onClick={closeBeanModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default NewBeanModal;