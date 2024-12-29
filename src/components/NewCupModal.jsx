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
        <Rating name="cupRating" precision={0.5} defaultValue={5} max={5} id="cupRating" value={parseFloat(cup.cupRating)} size="medium" onChange={handleCupChange} />
        <Accordion style={{ width: '105%', marginLeft:'-6px'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Sub Ratings
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <label htmlFor="cupAroma">Aroma:</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="cupAromaIntensity" style={{ fontSize: '0.8em', marginRight: '8px' }}>Intensity:</label>
                <Rating name="cupAromaIntensity" precision={0.5} defaultValue={5} max={5} id="cupAromaIntensity" value={parseFloat(cup.cupAromaIntensity)} size="small" onChange={handleCupChange} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="cupAromaQuality" style={{ fontSize: '0.8em', marginRight: '8px' }}>Quality:</label>
                <Rating name="cupAromaQuality" precision={0.5} defaultValue={5} max={5} id="cupAromaQuality" value={parseFloat(cup.cupAromaQuality)} size="small" onChange={handleCupChange} />
              </div>
            </div>
            <hr />
            <div>
              <label htmlFor="cupAcidity">Acidity:</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="cupAcidityIntensity" style={{ fontSize: '0.8em', marginRight: '8px' }}>Intensity:</label>
                <Rating name="cupAcidityIntensity" precision={0.5} defaultValue={5} max={5} id="cupAcidityIntensity" value={parseFloat(cup.cupAcidityIntensity)} size="small" onChange={handleCupChange} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="cupAcidityQuality" style={{ fontSize: '0.8em', marginRight: '8px' }}>Quality:</label>
                <Rating name="cupAcidityQuality" precision={0.5} defaultValue={5} max={5} id="cupAcidityQuality" value={parseFloat(cup.cupAcidityQuality)} size="small" onChange={handleCupChange} />
              </div>
            </div>
            <hr />
            <div>
              <label htmlFor="cupSweetness">Sweetness:</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="cupSweetnessIntensity" style={{ fontSize: '0.8em', marginRight: '8px' }}>Intensity:</label>
                <Rating name="cupSweetnessIntensity" precision={0.5} defaultValue={5} max={5} id="cupSweetnessIntensity" value={parseFloat(cup.cupSweetnessIntensity)} size="small" onChange={handleCupChange} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="cupSweetnessQuality" style={{ fontSize: '0.8em', marginRight: '8px' }}>Quality:</label>
                <Rating name="cupSweetnessQuality" precision={0.5} defaultValue={5} max={5} id="cupSweetnessQuality" value={parseFloat(cup.cupSweetnessQuality)} size="small" onChange={handleCupChange} />
              </div>
            </div>
            <hr />
            <div>
              <label htmlFor="cupBody">Body:</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="cupBodyIntensity" style={{ fontSize: '0.8em', marginRight: '8px' }}>Intensity:</label>
                <Rating name="cupBodyIntensity" precision={0.5} defaultValue={5} max={5} id="cupBodyIntensity" value={parseFloat(cup.cupBodyIntensity)} size="small" onChange={handleCupChange} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="cupBodyQuality" style={{ fontSize: '0.8em', marginRight: '8px' }}>Quality:</label>
                <Rating name="cupBodyQuality" precision={0.5} defaultValue={5} max={5} id="cupBodyQuality" value={parseFloat(cup.cupBodyQuality)} size="small" onChange={handleCupChange} />
              </div>
            </div>
            <hr />
            <div>
              <label htmlFor="cupFinish">Finish:</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="cupFinishIntensity" style={{ fontSize: '0.8em', marginRight: '8px' }}>Intensity:</label>
                <Rating name="cupFinishIntensity" precision={0.5} defaultValue={5} max={5} id="cupFinishIntensity" value={parseFloat(cup.cupFinishIntensity)} size="small" onChange={handleCupChange} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="cupFinishQuality" style={{ fontSize: '0.8em', marginRight: '8px' }}>Quality:</label>
                <Rating name="cupFinishQuality" precision={0.5} defaultValue={5} max={5} id="cupFinishQuality" value={parseFloat(cup.cupFinishQuality)} size="small" onChange={handleCupChange} />
              </div>
            </div>
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