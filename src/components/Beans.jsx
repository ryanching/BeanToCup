import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModalHandlers } from '../utils/CommonHandlers';
import Navigator from './Navigator';
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
  }, [isNewBeanModalOpen, openBeanModal]);

  return (
    <div>
      <Navigator/>
      <h2>Beans</h2>
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