import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shortener from './pages/Shortener';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shortener />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
