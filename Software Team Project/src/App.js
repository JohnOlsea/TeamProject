import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import React, { useState } from 'react';

// Pages
import Home from './pages/Home'
import PersonalInfo from './pages/PersonalInfo'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='personalInfo' element={<PersonalInfo />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
