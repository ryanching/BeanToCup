import React, { useState } from 'react';
import Ribbon from './Ribbon';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Analysis = () => {
  const [xAttribute, setXAttribute] = useState('');
  const [yAttribute, setYAttribute] = useState('');

  const beans = useSelector((state) => state.beans);
  const roasts = useSelector((state) => state.roasts);
  const cups = useSelector((state) => state.cups);

  const attributes = [...Object.keys(beans[0] || {}), ...Object.keys(roasts[0] || {}), ...Object.keys(cups[0] || {})];

  const numericAttributes = attributes.filter(attr => {
    const sampleValue = beans[0]?.[attr] || roasts[0]?.[attr] || cups[0]?.[attr];
    return !isNaN(Number(sampleValue));
  });

  const handleXAttributeChange = (event) => {
    setXAttribute(event.target.value);
  };

  const handleYAttributeChange = (event) => {
    setYAttribute(event.target.value);
  };

  const combinedData = cups.map(cup => {
    const roast = roasts.find(r => r.id === cup.roastId);
    const bean = beans.find(b => b.id === roast.beanId);
    return { ...cup,
      ...roast,
      ...bean,
      firstCracksTime: roast.firstCracksTime.replace(':', '.'),
      secondCracksTime: roast.secondCracksTime.replace(':', '.'),
      endRoastTime: roast.endRoastTime.replace(':', '.'),
      brewTime: cup.brewTime.replace(':', '.'),
      timeOfDay: cup.timeOfDay.replace(':', '.'),
    };
  });

  return (
    <div>
      <Ribbon />
      <h2>Analysis Page</h2>
      <div style={{ display: 'flex', gap: '1em', justifyContent: 'center'}}>
      <FormControl fullWidth className="form-control" variant="outlined" style={{ flex: 1 }}>
        <InputLabel className="form-control">X Axis</InputLabel>
        <Select value={xAttribute} onChange={handleXAttributeChange} label="X-Axis" sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
          {numericAttributes.map((attr) => (
            <MenuItem key={attr} value={attr}>
              {attr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth className="form-control" variant="outlined" style={{ flex: 1 }}>
        <InputLabel id="yAttribute-label" className="form-control">Y Axis</InputLabel>
        <Select value={yAttribute} onChange={handleYAttributeChange} label="Y-Axis" sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
          {attributes.map((attr) => (
            <MenuItem key={attr} value={attr}>
              {attr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20, }}
        >
          <CartesianGrid stroke="white" />
          <XAxis type="number" dataKey={xAttribute} name={xAttribute} stroke="white" tickMargin={15} label={xAttribute}/>
          <YAxis type="number" dataKey={yAttribute} name={yAttribute} stroke="white" label={yAttribute} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name={"Scatter Chart"} data={combinedData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

    </div>
  );
};

export default Analysis;
