import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { removeRoast, saveRoast } from '../redux/actions';
import { useModalHandlers } from '../utils/CommonHandlers';
import NewRoastModal from './NewRoastModal';
import ConfirmDialog from './ConfirmDialog';
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
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isNewRoastModalOpen = queryParams.get('modal') === 'newRoastModal';

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [roastToDelete, setRoastToDelete] = useState(null);
  const [roastToEdit, setRoastToEdit] = useState(null);

  useEffect(() => {
    if (isNewRoastModalOpen) {
      openRoastModal();
    }
  }, [isNewRoastModalOpen, openRoastModal]);

  const openConfirmDialog = (index) => {
    setRoastToDelete(index);
    setIsConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setRoastToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (roastToDelete !== null) {
      dispatch(removeRoast(roastToDelete));
      closeConfirmDialog();
    }
  };

  const editRoast = (index) => {
    const roast = roasts[index];
    setRoastToEdit(index);
    openRoastModal(roast);
  };

  const handleRoastSaveWithEdit = () => {
    if (roastToEdit !== null) {
      dispatch(saveRoast({ ...roast, id: roasts[roastToEdit].id }));
      setRoastToEdit(null);
    } else {
      handleRoastSave();
    }
    closeRoastModal();
  };

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
              <th></th>
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
                <td>
                  <IconButton onClick={() => openConfirmDialog(index)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => editRoast(index)}>
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="styled-button" onClick={() => openRoastModal({})}>New Roast</button>

      <NewRoastModal
        isRoastModalOpen={isRoastModalOpen}
        closeRoastModal={closeRoastModal}
        roast={roast}
        handleRoastChange={handleRoastChange}
        handleRoastSave={handleRoastSaveWithEdit}
        beans={beans}
      />
      {isConfirmDialogOpen && (
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={closeConfirmDialog}
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete this roast?"
        />
      )}
    </div>
  );
};

export default Roasts;