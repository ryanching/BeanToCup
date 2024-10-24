import React, { useState } from 'react';
import Ribbon from './Ribbon';
import '../index.css'; // Assuming you have a CSS file for styling
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Analysis = () => {
  const beans = useSelector((state) => state.beans);
  const roasts = useSelector((state) => state.roasts);
  const cups = useSelector((state) => state.cups);

  const [dataType, setDataType] = useState('Cups');
  const [xAttribute, setXAttribute] = useState('timeOfDay');
  const [yAttribute, setYAttribute] = useState('brewTime');

  const dataTypes = {
    Cups: cups,
    Roasts: roasts,
    Beans: beans,
  };

  const attributes = {
    Cups: ['timeOfDay', 'brewTime', 'roast', 'brewMethod', 'body', 'sweetness', 'tastingNotes'],
    Roasts: ['name', 'beanType', 'roastLevel', 'firstCracksTime', 'secondCracksTime', 'endRoastTime'],
    Beans: ['name', 'origin', 'roastLevel', 'processing', 'elevation', 'cost', 'tastingNotes'],
  };

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
    setXAttribute(attributes[event.target.value][0]);
    setYAttribute(attributes[event.target.value][1]);
  };

  const handleXAttributeChange = (event) => {
    setXAttribute(event.target.value);
  };

  const handleYAttributeChange = (event) => {
    setYAttribute(event.target.value);
  };

  const data = dataTypes[dataType].map((item) => ({
    x: item[xAttribute],
    y: item[yAttribute],
  }));

  return (
    <div>
      <Ribbon />
      <h2>Analysis Page</h2>
      <div>
        <FormControl fullWidth className="form-control">
          <InputLabel id="dataType-label" className="form-control">Data Type</InputLabel>
          <Select
            labelId="dataType-label"
            id="dataType"
            value={dataType}
            label="Data Type"
            className="form-control"
            onChange={handleDataTypeChange}
          >
            {Object.keys(dataTypes).map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
        <FormControl fullWidth className="form-control">
          <InputLabel id="xAttribute-label" className="form-control">X Attribute</InputLabel>
          <Select
            labelId="xAttribute-label"
            id="xAttribute"
            value={xAttribute}
            label="X Attribute"
            className="form-control"
            onChange={handleXAttributeChange}
          >
            {attributes[dataType].map((attr) => (
              <MenuItem key={attr} value={attr}>{attr}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className="form-control">
          <InputLabel id="yAttribute-label" className="form-control">Y Attribute</InputLabel>
          <Select
            labelId="yAttribute-label"
            id="yAttribute"
            value={yAttribute}
            label="Y Attribute"
            className="form-control"
            onChange={handleYAttributeChange}
          >
            {attributes[dataType].map((attr) => (
              <MenuItem key={attr} value={attr}>{attr}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20, 
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="white" />
          <XAxis type="number" dataKey="x" name={xAttribute} stroke="white" />
          <YAxis type="number" dataKey="y" name={yAttribute} stroke="white" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name={dataType} data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analysis;