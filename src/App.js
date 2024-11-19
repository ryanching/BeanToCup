import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './components/Home';
import Beans from './components/Beans';
import Roasts from './components/Roasts';
import Cups from './components/Cups';
import Analysis from './components/Analysis';

const App = () => (
  <Provider store={store}>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beans" element={<Beans />} />
          <Route path="/roasts" element={<Roasts />} />
          <Route path="/cups" element={<Cups />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </main>
  </Provider>
);

export default App;