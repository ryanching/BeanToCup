import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isNewBeanModalOpen = queryParams.get('modal') === 'newBeanModal';

  useEffect(() => {
    if (isNewBeanModalOpen) {
      // Logic to open the newBeanModal
      openBeanModal();
    }
  }, [isNewBeanModalOpen]);

  return (
    <div>
      <Ribbon />
      <h2>List of Beans</h2>
      <div class="roasts-table-container">
        <table className="roasts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Origin</th>
              <th>Processing</th>
              <th>Elevation</th>
              <th>Cost</th>
              <th>Tasting Notes</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {beans.map((bean, index) => (
              <tr key={index}>
                <td>{bean.name}</td>
                <td>{bean.origin}</td>
                <td>{bean.processing}</td>
                <td>{bean.elevation}</td>
                <td>{bean.cost}</td>
                <td>{bean.tastingNotes}</td>
                <td>{bean.beanRating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="styled-button" onClick={openBeanModal}>New Bean</button>

      <NewBeanModal
        isBeanModalOpen={isBeanModalOpen}
        closeBeanModal={closeBeanModal}
        bean={bean}
        handleBeanChange={handleBeanChange}
        handleBeanSave={handleBeanSave}
      />
    </div>
  );
};

export default Beans;