import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModalHandlers } from '../utils/CommonHandlers';
import Ribbon from './Ribbon';
import NewCupModal from './NewCupModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import '../index.css'; // Assuming you have a CSS file for styling
import { removeCup } from '../redux/actions';

const Cups = () => {
  const {
    isCupModalOpen,
    cup,
    openCupModal,
    closeCupModal,
    handleCupChange,
    handleCupSave
  } = useModalHandlers();
  
  const dispatch = useDispatch();
  const cups = useSelector((state) => state.cups);
  const roasts = useSelector((state) => state.roasts);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [cupToDelete, setCupToDelete] = useState(null);

  const openConfirmDialog = (index) => {
    setCupToDelete(index);
    setIsConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setCupToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (cupToDelete !== null) {
      dispatch(removeCup(cupToDelete));
      closeConfirmDialog();
    }
  };

  return (
    <div>
      <Ribbon />
      <h2>List of Cups</h2>
      <div className="roasts-table-container">
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
              <th></th>
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
                <td>{cup.cupRating}</td>
                <td>
                  <IconButton onClick={() => openConfirmDialog(index)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </td>
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

      {isConfirmDialogOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure you want to delete this cup?</h2>
            <div className="modal-buttons">
              <button className="styled-button" onClick={handleConfirmDelete}>Delete</button>
              <button className="styled-button" onClick={closeConfirmDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cups;