import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Logout from './components/Logout';
import UserInfoUpdateForm from './components/UserInfoUpdateForm';
import CreateNewUserForm from './components/CreateNewUserForm';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardDoctor from './components/DashboardDoctor';

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
          <Route path='dashboardAdmin' element={<DashboardAdmin />} />
          <Route path='dashboardDoctor' element={<DashboardDoctor />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
