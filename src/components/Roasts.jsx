import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModalHandlers } from '../utils/CommonHandlers';
import NewRoastModal from './NewRoastModal';
import '../index.css'; // Assuming you have a CSS file for styling
import Navigator from './Navigator';

const Roasts = () => {
  const {
    isRoastModalOpen,
    roast,
    openRoastModal,
    closeRoastModal,
    handleRoastChange,
    handleRoastSave
  } = useModalHandlers();

  const roasts = useSelector((state) => state.roasts);
  const beans = useSelector((state) => state.beans);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isNewRoastModalOpen = queryParams.get('modal') === 'newRoastModal';

  useEffect(() => {
    if (isNewRoastModalOpen) {
      // Logic to open the newRoastModal
      openRoastModal();
    }
  }, [isNewRoastModalOpen, openRoastModal]);

  return (
    <div>
      <Navigator />
      <h2>Roasts</h2>
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Bean</th>
              <th>Roast Level</th>
              <th>First Cracks Time</th>
              <th>Second Cracks Time</th>
              <th>End Roast Time</th>
              <th>Notes</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {roasts.map((roast, index) => (
              <tr key={index}>
                <td>{roast.roastName}</td>
                <td>{roast.beanName}</td>
                <td>{roast.roastLevel}</td>
                <td>{roast.firstCracksTime}</td>
                <td>{roast.secondCracksTime}</td>
                <td>{roast.endRoastTime}</td>
                <td>{roast.roastNotes}</td>
                <td>{roast.roastRating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="styled-button" onClick={openRoastModal}>New Roast</button>

      <NewRoastModal
        isRoastModalOpen={isRoastModalOpen}
        closeRoastModal={closeRoastModal}
        roast={roast}
        beans={beans}
        handleRoastChange={handleRoastChange}
        handleRoastSave={handleRoastSave}
      />
    </div>
  );
};

export default Roasts;