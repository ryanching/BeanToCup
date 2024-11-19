import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const NewRoastModal = ({ isRoastModalOpen ,closeRoastModal, roast, beans, handleRoastChange, handleRoastSave }) => {
  const history = useNavigate();
  if (!isRoastModalOpen) return null;

  const handleBeanNameChange = (event, beans) => {
    const { value } = event.target;
    if (value === 'nEWBeANnn') {
      closeRoastModal();
      history('/beans?modal=newBeanModal');
    } else {
      handleRoastChange(event, beans);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Roast</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="roastName" name="roastName" value={roast.roastName} onChange={handleRoastChange} />
        <label htmlFor="beanName">Bean Type:</label>
        <select id="beanName" name="beanName" value={roast.beanName} onChange={(event) => handleBeanNameChange(event, beans)}>
          <option value="">Select Bean Name</option>
          {beans.map((bean, index) => (
            <option key={index} value={bean.id}>{bean.beanName}</option>
          ))}
          <option value="nEWBeANnn">New Bean</option>
        </select>
        <label htmlFor="roastLevel">Roast Level:</label>
        <input type="text" id="roastLevel" name="roastLevel" value={roast.roastLevel} onChange={handleRoastChange} />
        <label htmlFor="firstCracksTime">First Cracks Time:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            id="firstCracksTime" 
            name="firstCracksTime" 
            value={roast.firstCracksTime ? dayjs(roast.firstCracksTime, 'mm:ss') : null} 
            onChange={(newValue) => {
              const formattedTime = dayjs(newValue).format('mm:ss');
              handleRoastChange({ target: { name: 'firstCracksTime', value: formattedTime } });
            }}
            defaultValue={dayjs('2999-12-31T00:00')}
            format="mm:ss"
            className="no-inner-border"
          />
        </LocalizationProvider>
        <label htmlFor="secondCracksTime">Second Cracks Time:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            id="secondCracksTime" 
            name="secondCracksTime" 
            value={roast.secondCracksTime ? dayjs(roast.secondCracksTime, 'mm:ss') : null} 
            onChange={(newValue) => {
              const formattedTime = dayjs(newValue).format('mm:ss');
              handleRoastChange({ target: { name: 'secondCracksTime', value: formattedTime } });
            }}
            defaultValue={dayjs('2999-12-31T00:00')}
            format="mm:ss"
            className="no-inner-border"
          />
        </LocalizationProvider>
        <label htmlFor="endRoastTime">End Roast Time:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            id="endRoastTime" 
            name="endRoastTime" 
            value={roast.endRoastTime ? dayjs(roast.endRoastTime, 'mm:ss') : null} 
            onChange={(newValue) => {
              const formattedTime = dayjs(newValue).format('mm:ss');
              handleRoastChange({ target: { name: 'endRoastTime', value: formattedTime } });
            }}
            defaultValue={dayjs('2999-12-31T00:00')}
            format="mm:ss"
            className="no-inner-border"
          />
        </LocalizationProvider>
        <label htmlFor="roastRating">Rating:</label>
        <Rating name="roastRating" precision={0.25} defaultValue={0} id="roastRating" value={roast.roastRating} size="medium" onChange={handleRoastChange} />
        <div className="modal-buttons">
          <button className="styled-button" onClick={handleRoastSave}>Save</button>
          <button className="styled-button" onClick={closeRoastModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default NewRoastModal;