import React from 'react';
import { useSelector } from 'react-redux';
import { useModalHandlers } from '../utils/CommonHandlers';
import Ribbon from './Ribbon';
import NewRoastModal from './NewRoastModal';
import '../index.css'; // Assuming you have a CSS file for styling

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

  return (
    <div>
      <h2>List of Roasts</h2>
      <Ribbon />
      <table className="roasts-table">
        <thead>
          <tr>
            <th>Bean Type</th>
            <th>Roast Level</th>
            <th>First Cracks Time</th>
            <th>Second Cracks Time</th>
            <th>End Roast Time</th>
          </tr>
        </thead>
        <tbody>
          {roasts.map((roast, index) => (
            <tr key={index}>
              <td>{roast.beanType}</td>
              <td>{roast.roastLevel}</td>
              <td>{roast.firstCracksTime}</td>
              <td>{roast.secondCracksTime}</td>
              <td>{roast.endRoastTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
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