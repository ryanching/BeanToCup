import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './components/Home';
import Beans from './components/Beans';
import Roasts from './components/Roasts';
import Cups from './components/Cups';
import HamburgerMenu from './components/HamburgerMenu';

const App = () => (
  <Provider store={store}>
    <Router>
      {/* <HamburgerMenu /> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beans" element={<Beans />} />
          <Route path="/roasts" element={<Roasts />} />
          <Route path="/cups" element={<Cups />} />
        </Routes>
      </main>
    </Router>
  </Provider>
);

export default App;