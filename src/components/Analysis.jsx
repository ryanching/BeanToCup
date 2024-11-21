import React, { useState } from 'react';
import Ribbon from './Ribbon';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ScatterChart, BarChart, Bar, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Analysis = () => {
  const [xAttribute, setXAttribute] = useState('');
  const [yAttribute, setYAttribute] = useState('');

  const beans = useSelector((state) => state.beans);
  const roasts = useSelector((state) => state.roasts);
  const cups = useSelector((state) => state.cups);
  
  const categorical = ['beanName', 'origin', 'processing', 'roastLevel', 'brewMethod', 'timeOfDay', 'rating'];
  const numeric = ['elevation', 'cost', 'firstCracksTime', 'secondCracksTime', 'endRoastTime', 'brewTime', 'beanRating', 'roastRating', 'cupRating', ''];

  const attributes = [...Object.keys(beans[0] || {}), ...Object.keys(roasts[0] || {}), ...Object.keys(cups[0] || {})];
  const numericAttributes = attributes.filter(attr => numeric.includes(attr));
  const categoricalAttributes = attributes.filter(attr => categorical.includes(attr));


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

  const averageData = combinedData.reduce((acc, item) => {
    const xValue = item[xAttribute];
    const yValue = parseFloat(item[yAttribute]);
    if (!acc[xValue]) {
      acc[xValue] = { xValue, yValues: [], yValueSum: 0, count: 0 };
    }
    acc[xValue].yValues.push(yValue);
    acc[xValue].yValueSum += yValue;
    acc[xValue].count += 1;
    return acc;
  }, {});

  const barChartData = Object.values(averageData).map(item => {
    const sortedYValues = item.yValues.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedYValues.length / 2);
    const median = sortedYValues.length % 2 === 0 ? (sortedYValues[middleIndex - 1] + sortedYValues[middleIndex]) / 2 : sortedYValues[middleIndex];
    return {
      [xAttribute]: item.xValue,
      [`${yAttribute} Average`]: (item.yValueSum / item.count).toFixed(2),
      [`${yAttribute} Median`]: median.toFixed(2),
    };
  });

  return (
    <div>
      <Ribbon />
      <h2>Analysis Page</h2>
      <div style={{ display: 'flex', gap: '1em', justifyContent: 'center'}}>
        <FormControl fullWidth className="form-control" variant="outlined" style={{ flex: 1, fontSize:12}}>
          <InputLabel id="yAttribute-label" className="form-control">Y Axis</InputLabel>
          <Select value={yAttribute} onChange={handleYAttributeChange} label="Y-Axis" sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
            {numericAttributes.map((attr) => (
              <MenuItem key={attr} value={attr}>
                {attr}
              </MenuItem>
            ))}
          </Select>
          (Numerical values only)
        </FormControl> 
        <FormControl fullWidth className="form-control" variant="outlined" style={{ flex: 1, fontSize:12}}>
          <InputLabel className="form-control">X Axis</InputLabel>
          <Select value={xAttribute} onChange={handleXAttributeChange} label="X-Axis" sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
            {[...numericAttributes, ...categoricalAttributes].map((attr) => (
              <MenuItem key={attr} value={attr}>
                {attr}
              </MenuItem>
            ))}
          </Select>
          (Numerical or categorical values)
        </FormControl>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        {numeric.includes(xAttribute) && <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0, }}>
          <CartesianGrid stroke="white" />
          <XAxis type="number" dataKey={xAttribute} name={xAttribute} stroke="white" label={{value: xAttribute, position: 'bottom' }}/>
          <YAxis type="number" dataKey={yAttribute} name={yAttribute} stroke="white" label={{ value: yAttribute, angle: -90, position: 'insideLeft' }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name={"Scatter Chart"} data={combinedData} fill="#8884d8" />
        </ScatterChart>}
        {categorical.includes(xAttribute) && 
          <BarChart margin={{ top: 20, right: 20, bottom: 20, left: 0, }} data={barChartData} fill="#8884d8">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAttribute} name={xAttribute} stroke="white" label={{value: xAttribute, position: 'bottom' }} />
            <YAxis type="number" name={yAttribute} stroke="white" label={{ value: yAttribute, angle: -90, position: 'insideLeft' }} />
            <Tooltip cursor={{fill: 'transparent'}}/>
            <Legend align='center' verticalAlign='top' />
            <Bar classname= "bar" dataKey={`${yAttribute} Average`} fill="#99595f" />
            <Bar dataKey={`${yAttribute} Median`} fill="#474792" />
          </BarChart>}
      </ResponsiveContainer>
    </div>
  );
};

export default Analysis;
