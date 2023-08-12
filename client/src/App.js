import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Logout from './components/Logout';
import UserInfoUpdateForm from './components/UserInfoUpdateForm';
import CreateNewUserForm from './components/CreateNewUserForm';
import CreateNewPatientForm from './components/CreateNewPatientForm';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardDoctor from './components/DashboardDoctor';
import DoctorInfoUpdateForm from './components/DoctorInfoUpdateForm';
import PatientInfoUpdateForm from './components/PatientInfoUpdateForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Logout />} />
          <Route path='profile' element={<Profile />} />
          <Route path='user-edit' element={<UserInfoUpdateForm />} />
          <Route path='new-user' element={<CreateNewUserForm />} />
          <Route path='admin-dashboard' element={<DashboardAdmin />} />
          <Route path='doctor-dashboard' element={<DashboardDoctor />} />
          <Route path='new-patient' element={<CreateNewPatientForm />} />
          <Route
            path='doctor-edit/:doctorID'
            element={<DoctorInfoUpdateForm />}
          />
          <Route
            path='patient-edit/:patientID'
            element={<PatientInfoUpdateForm />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
