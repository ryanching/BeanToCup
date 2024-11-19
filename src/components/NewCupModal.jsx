import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';


const NewCupModal = ({ isCupModalOpen, closeCupModal, cup, roasts, handleCupChange, handleCupSave }) => {
  const history = useNavigate();  
  if (!isCupModalOpen) return null;
  
  const handleRoastChange = (event) => {
    const { value } = event.target;
    if (value === 'newRoast') {
      closeCupModal();
      history('/roasts?modal=newRoastModal');
    } else {
      handleCupChange(event, roasts);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Cup</h2>
        <label htmlFor="timeOfDay">Time of Day:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            id="timeOfDay"
            name="timeOfDay"
            value={cup.timeOfDay ? dayjs(cup.timeOfDay, 'HH:mm') : null}
            onChange={(newValue) => {
              const formattedTime = dayjs(newValue).format('HH:mm');
              handleCupChange({ target: { name: 'timeOfDay', value: formattedTime } });
            }}
            defaultValue={dayjs('2999-12-31T00:00')}
            format="HH:mm"
            className="no-inner-border"
          />
        </LocalizationProvider>
        <label htmlFor="roast">Roast:</label>
        <select id="roastName" name="roastName" value={cup.roastName} onChange={handleRoastChange}>
          <option value="">Select Roast</option>
          {roasts.map((roast, index) => (
            <option key={index} value={roast.id}>{roast.roastName || roast.beanName || roast.id}</option>
          ))}
          <option value="newRoast">New Roast</option>
        </select>
        <label htmlFor="brewMethod">Brew Method:</label>
        <input type="text" id="brewMethod" name="brewMethod" value={cup.brewMethod} onChange={handleCupChange} />
        <label htmlFor="tastingNotes">Tasting Notes:</label>
        <input type="text" id="tastingNotes" name="tastingNotes" value={cup.tastingNotes} onChange={handleCupChange} />
        <label htmlFor="brewTime">Brew Time:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            id="brewTime"
            name="brewTime"
            value={cup.brewTime ? dayjs(cup.brewTime, 'mm:ss') : null}
            onChange={(newValue) => {
              const formattedTime = dayjs(newValue).format('mm:ss');
              handleCupChange({ target: { name: 'brewTime', value: formattedTime } });
            }}
            defaultValue={dayjs('2999-12-31T00:00')}
            format="mm:ss"
            className="no-inner-border"
          />
        </LocalizationProvider>
        <label htmlFor="cupRating">Rating:</label>
        <Rating name="cupRating" precision={0.25} defaultValue={2.5} id="cupRating" value={cup.cupRating} size="medium" onChange={handleCupChange} />
        <div className="modal-buttons">
          <button className="styled-button" onClick={handleCupSave}>Save</button>
          <button className="styled-button" onClick={closeCupModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default NewCupModal;