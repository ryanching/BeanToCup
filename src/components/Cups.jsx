import React from 'react';
import { useSelector } from 'react-redux';
import { useModalHandlers } from '../utils/CommonHandlers';
import Ribbon from './Ribbon';
import NewCupModal from './NewCupModal';
import '../index.css'; // Assuming you have a CSS file for styling

const Cups = () => {
  const {
    isCupModalOpen,
    cup,
    openCupModal,
    closeCupModal,
    handleCupChange,
    handleCupSave
  } = useModalHandlers();

  const cups = useSelector((state) => state.cups);
  const roasts = useSelector((state) => state.roasts);

  return (
    <div>
      <Ribbon />
      <h2>List of Cups</h2>
      <div class="roasts-table-container">
        <table className="roasts-table">
          <thead>
            <tr>
              <th>Time of Day</th>
              <th>Roast</th>
              <th>Brew Method</th>
              <th>Body</th>
              <th>Sweetness</th>
              <th>Tasting Notes</th>
              <th>Brew Time</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {cups.map((cup, index) => (
              <tr key={index}>
                <td>{cup.timeOfDay}</td>
                <td>{cup.roast}</td>
                <td>{cup.brewMethod}</td>
                <td>{cup.body}</td>
                <td>{cup.sweetness}</td>
                <td>{cup.tastingNotes}</td>
                <td>{cup.brewTime}</td>
                <td>{cup.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="styled-button" onClick={openCupModal}>New Cup</button>

      <NewCupModal
        isCupModalOpen={isCupModalOpen}
        closeCupModal={closeCupModal}
        cup={cup}
        roasts={roasts}
        handleCupChange={handleCupChange}
        handleCupSave={handleCupSave}
      />
    </div>
  );
};

export default Cups;