import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './Search';
import Contenido from './Contenido';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/contenido/:animeId" element={<Contenido />} />
      </Routes>
    </Router>
  )
}

export default App
