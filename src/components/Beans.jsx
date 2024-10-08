import React from 'react';
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

  return (
    <div>
      <h2>List of Beans</h2>
      <Ribbon />
      <table className="roasts-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Origin</th>
            <th>Processing</th>
            <th>Elevation</th>
            <th>Cost</th>
            <th>Tasting Notes</th>
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
            </tr>
          ))}
        </tbody>
      </table>
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