import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Logout from './components/Logout';
// import ProtectedRoute from './components/ProtectedRoute';
import UserInfoUpdateForm from './components/UserInfoUpdateForm';
import CreateNewUserForm from './components/CreateNewUserForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Logout />} />
          <Route path='profile' element={<Profile />} />
          <Route path='userInfoUpdateForm' element={<UserInfoUpdateForm />} />
          <Route path='createNewUserForm' element={<CreateNewUserForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// import DashboardAdmin from './components/DashboardAdmin';
// import DashboardDoctor from './components/DashboardDoctor';
