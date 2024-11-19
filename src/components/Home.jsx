import React from 'react';
import { useSelector } from 'react-redux';
import { useModalHandlers } from '../utils/CommonHandlers';
import NewRoastModal from './NewRoastModal';
import NewBeanModal from './NewBeanModal';
import NewCupModal from './NewCupModal';
import Ribbon from './Ribbon';

const Home = () => {
  const {
    isRoastModalOpen,
    isBeanModalOpen,
    isCupModalOpen,
    roast,
    bean,
    cup,
    openRoastModal,
    closeRoastModal,
    openBeanModal,
    closeBeanModal,
    openCupModal,
    closeCupModal,
    handleRoastChange,
    handleBeanChange,
    handleCupChange,
    handleRoastSave,
    handleBeanSave,
    handleCupSave
  } = useModalHandlers();

  const beans = useSelector((state) => state.beans);
  const roasts = useSelector((state) => state.roasts);

  return (
    <>
      <Ribbon />
      <h2>Home Page</h2>
      <div className="button-container">
        <button className="styled-button" onClick={openBeanModal}>New Bean</button>
        <button className="styled-button" onClick={openRoastModal}>New Roast</button>
        <button className="styled-button" onClick={openCupModal}>New Cup</button>
      </div>

      <NewRoastModal
        isRoastModalOpen={isRoastModalOpen}
        closeRoastModal={closeRoastModal}
        roast={roast}
        beans={beans}
        handleRoastChange={handleRoastChange}
        handleRoastSave={handleRoastSave}
      />

      <NewBeanModal
        isBeanModalOpen={isBeanModalOpen}
        closeBeanModal={closeBeanModal}
        bean={bean}
        handleBeanChange={handleBeanChange}
        handleBeanSave={handleBeanSave}
      />

      <NewCupModal
        isCupModalOpen={isCupModalOpen}
        closeCupModal={closeCupModal}
        cup={cup}
        roasts={roasts}
        handleCupChange={handleCupChange}
        handleCupSave={handleCupSave}
      />
    </>
  );
};

export default Home;