import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateField, TimeField } from '@mui/x-date-pickers';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';


const NewCupModal = ({ isCupModalOpen, closeCupModal, cup, roasts, handleCupChange, handleCupSave }) => {
  const history = useNavigate();  
  const [date, setDate] = useState(cup.timeOfDay ? dayjs(cup.timeOfDay.split(' ')[0]) : dayjs());
  const [time, setTime] = useState(cup.timeOfDay ? dayjs(cup.timeOfDay.split(' ')[1], 'HH:mm') : dayjs());
  
  useEffect(() => {
    if (cup.timeOfDay) {
      setDate(dayjs(cup.timeOfDay.split(' ')[0]));
      setTime(dayjs(cup.timeOfDay.split(' ')[1], 'HH:mm'));
    }
  }, [cup.timeOfDay]);
  
  if (!isCupModalOpen) return null;
  
  const handleRoastChange = (event) => {
    const { value } = event.target;
    if (value === 'newRoast') {
      closeCupModal();
      history('/roasts?modal=newRoastModal');
    } else {
      const roastName = event.target.selectedOptions[0].text;
      const roastId = event.target.value;
      if (roastName && roastId) {
        handleCupChange({ roastId, roastName });
      }    
    }
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
    const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
    const formattedTime = dayjs(time).format('h:mm A');
    handleCupChange({ target: { name: 'timeOfDay', value: `${formattedDate} ${formattedTime}` } });
  };

  const handleTimeChange = (newValue) => {
    setTime(newValue);
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const formattedTime = dayjs(newValue).format('h:mm A');
    handleCupChange({ target: { name: 'timeOfDay', value: `${formattedDate} ${formattedTime}` } });
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if(e.target.className === "modal-overlay") closeCupModal()}}>
      <div className="modal">
        <h2>New Cup</h2>
        <label htmlFor="timeOfDay">Date:</label>
        <div style={{ display: 'flex'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            id="date"
            name="date"
            value={date}
            onChange={handleDateChange}
            // format="YYYY-MM-DD"
            className="no-inner-border"
          />
        </LocalizationProvider>
        <label htmlFor="timeOfDay"></label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            id="time"
            name="time"
            value={time}
            onChange={handleTimeChange}
            // format="HH:mm"
            className="no-inner-border"
          />
        </LocalizationProvider>
        </div>
        <label htmlFor="roast">Roast:</label>
        <select id="roastName" name="roastName" value={cup.roastName} onChange={handleRoastChange}>
          <option value={cup.roastName}>{cup.roastName === "" ? "Select Roast" : cup.roastName}</option>
          {roasts.map((roast, index) => (
            <option key={index} value={roast.id} data-roastname={roast.roastName}>{roast.roastName || roast.beanName || roast.id}</option>
          ))}
          <option value="newRoast">New Roast</option>
        </select>
        <label htmlFor="brewMethod">Brew Method:</label>
        <input type="text" id="brewMethod" name="brewMethod" value={cup.brewMethod} onChange={handleCupChange} />
        <label htmlFor="tastingNotes">Tasting Notes:</label>
        <input type="textbox" id="cupNotes" name="cupNotes" value={cup.cupNotes} onChange={handleCupChange} />
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
        <label htmlFor="cupRating">Overall Rating:</label>
        <Rating name="cupRating" precision={0.5} defaultValue={5} max={10} id="cupRating" value={parseFloat(cup.cupRating)} size="medium" onChange={handleCupChange} />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Sub Ratings
          </AccordionSummary>
          <AccordionDetails>
            <label htmlFor="cupAroma">Aroma:</label>
            <Rating name="cupAroma" precision={0.5} defaultValue={5} max={10} id="cupAroma" value={parseFloat(cup.cupAroma)} size="small" onChange={handleCupChange} />
            <label htmlFor="cupAcidity">Acidity:</label>
            <Rating name="cupAcidity" precision={0.5} defaultValue={5} max={10} id="cupAcidity" value={parseFloat(cup.cupAcidity)} size="small" onChange={handleCupChange} />
            <label htmlFor="cupSweetness">Sweetness:</label>
            <Rating name="cupSweetness" precision={0.5} defaultValue={5} max={10} id="cupSweetness" value={parseFloat(cup.cupSweetness)} size="small" onChange={handleCupChange} />
            <label htmlFor="cupBody">Body:</label>
            <Rating name="cupBody" precision={0.5} defaultValue={5} max={10} id="cupBody" value={parseFloat(cup.cupBody)} size="small" onChange={handleCupChange} />
            <label htmlFor="cupFinish">Finish:</label>
            <Rating name="cupFinish" precision={0.5} defaultValue={5} max={10} id="cupFinish" value={parseFloat(cup.cupFinish)} size="small" onChange={handleCupChange} />
          </AccordionDetails>
        </Accordion>
        <div className="modal-buttons">
          <button className="styled-button" onClick={handleCupSave}>Save</button>
          <button className="styled-button" onClick={closeCupModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default NewCupModal;