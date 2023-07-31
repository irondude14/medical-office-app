import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='login' element={<Login />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
