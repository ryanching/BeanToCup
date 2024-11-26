import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { removeBean, saveBean } from '../redux/actions';
import { useModalHandlers } from '../utils/CommonHandlers';
import Ribbon from './Ribbon';
import NewBeanModal from './NewBeanModal';
import '../index.css'; // Assuming you have a CSS file for styling

const Beans = () => {
  const {
    isBeanModalOpen,
    bean,
    openBeanModal,
    closeBeanModal,
    handleBeanChange,
    handleBeanSave
  } = useModalHandlers();

  const beans = useSelector((state) => state.beans);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isNewBeanModalOpen = queryParams.get('modal') === 'newBeanModal';

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [beanToDelete, setBeanToDelete] = useState(null);
  const [beanToEdit, setBeanToEdit] = useState(null);

  useEffect(() => {
    if (isNewBeanModalOpen) {
      openBeanModal();
    }
  }, [isNewBeanModalOpen, openBeanModal]);

  const openConfirmDialog = (index) => {
    setBeanToDelete(index);
    setIsConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setBeanToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (beanToDelete !== null) {
      dispatch(removeBean(beanToDelete));
      closeConfirmDialog();
    }
  };

  const editBean = (index) => {
    const bean = beans[index];
    setBeanToEdit(index);
    openBeanModal(bean);
  };

  const handleBeanSaveWithEdit = () => {
    if (beanToEdit !== null) {
      dispatch(saveBean({ ...bean, id: beans[beanToEdit].id }));
      setBeanToEdit(null);
    } else {
      handleBeanSave();
    }
    closeBeanModal();
  };

  return (
    <div>
      <Ribbon />
      <h2>List of Beans</h2>
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Origin</th>
              <th>Processing</th>
              <th>Elevation</th>
              <th>Cost</th>
              <th>Notes</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {beans.map((bean, index) => (
              <tr key={index}>
                <td>{bean.beanName}</td>
                <td>{bean.origin}</td>
                <td>{bean.processing}</td>
                <td>{bean.elevation}</td>
                <td>{bean.cost}</td>
                <td>{bean.beanNotes}</td>
                <td>{bean.beanRating}</td>
                <td>
                  <IconButton onClick={() => openConfirmDialog(index)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => editBean(index)}>
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="styled-button" onClick={() => openBeanModal({})}>New Bean</button>

      <NewBeanModal
        isBeanModalOpen={isBeanModalOpen}
        closeBeanModal={closeBeanModal}
        bean={bean}
        handleBeanChange={handleBeanChange}
        handleBeanSave={handleBeanSaveWithEdit}
      />
      {isConfirmDialogOpen && (
      <div className="modal-overlay" onClick={(e) => { if(e.target.className === "modal-overlay") closeConfirmDialog()}}>
        <div className="modal">
          <h2>Are you sure you want to delete this bean?</h2>
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

export default Beans;