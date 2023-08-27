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
import CreateNewAppointmentForm from './components/CreateNewAppointmentForm';
import AppointmentUpdateForm from './components/AppointmentUpdateForm';
import TestResultUpdateForm from './components/TestResultUpdateForm';
import CreateNewTest from './components/CreateNewTest';
import PatientDetails from './components/PatientDetails';

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
          <Route
            path='new-appointment'
            element={<CreateNewAppointmentForm />}
          />
          <Route
            path='appointment-edit/:appointmentID'
            element={<AppointmentUpdateForm />}
          />
          <Route
            path='test-result-edit/:testResultID'
            element={<TestResultUpdateForm />}
          />
          <Route path='new-test/:patientID' element={<CreateNewTest />} />
          <Route
            path='patient-details/:patientID'
            element={<PatientDetails />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
