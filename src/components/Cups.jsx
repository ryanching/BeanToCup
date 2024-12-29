import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModalHandlers } from '../utils/CommonHandlers';
import NewCupModal from './NewCupModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import '../index.css'; // Assuming you have a CSS file for styling
import { removeCup, saveCup } from '../redux/actions';
import Navigator from './Navigator';


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
  const [cupToEdit, setCupToEdit] = useState(null);

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

  const editCup = (cup) => {
    // cup = cups[index];
    setCupToEdit(cup);
    openCupModal(cup);
  };

  const handleCupSaveWithEdit = () => {
    if (cupToEdit !== null) {
      dispatch(saveCup({ ...cup, id: cupToEdit.id }));
      setCupToEdit(null);
    } else {
      handleCupSave();
    }
    closeCupModal();
  };

  return (
    <div>
      <Navigator />
      <h2>Cups</h2>
      <div className="data-table-container">
      <table className="data-table">
          <thead>
            <tr>
              <th>Time of Day</th>
              <th>Roast</th>
              <th>Brew Method</th>
              <th>Notes</th>
              <th>Brew Time</th>
              <th>Rating</th>
              <th>Aroma</th>
              <th>Acidity</th>
              <th>Sweetness</th>
              <th>Body</th>
              <th>Finish</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cups.map((cup, index) => (
              <tr key={index}>
                <td>{cup.timeOfDay}</td>
                <td>{cup.roastName}</td>
                <td>{cup.brewMethod}</td>
                <td>{cup.cupNotes}</td>
                <td>{cup.brewTime}</td>
                <td>{cup.cupRating}</td>
                <td>
                  Intensity: {cup.cupAromaIntensity}<br />
                  Quality: {cup.cupAromaQuality}
                </td>
                <td>
                  Intensity: {cup.cupAcidityIntensity}<br />
                  Quality: {cup.cupAcidityQuality}
                </td>
                <td>
                  Intensity: {cup.cupSweetnessIntensity}<br />
                  Quality: {cup.cupSweetnessQuality}
                </td>
                <td>
                  Intensity: {cup.cupBodyIntensity}<br />
                  Quality: {cup.cupBodyQuality}
                </td>
                <td>
                  Intensity: {cup.cupFinishIntensity}<br />
                  Quality: {cup.cupFinishQuality}
                </td>
                <td>
                  <IconButton onClick={() => openConfirmDialog(index)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => editCup(cup)}>
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
        handleCupSave={handleCupSaveWithEdit}
      />

      {isConfirmDialogOpen && (
        <div className="modal-overlay" onClick={(e) => { if(e.target.className === "modal-overlay") closeConfirmDialog()}}>
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