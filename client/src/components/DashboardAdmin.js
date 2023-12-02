import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DoctorCard from './DoctorCard';
import PatientCard from './PatientCard';
import AppointmentCard from './AppointmentCard';
import DashboardCalendar from './DashboardCalendar';
import { removeDoctor } from '../features/users/DoctorsSlice';
import { removePatient } from '../features/users/PatientsSlice';
import { removeAppointment } from '../features/users/AppointmentsSlice';
import { removeAppointmentFromPatient } from '../features/users/PatientsSlice';

function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState('doctors');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const doctors = useSelector((state) => state.doctors.value);
  const patients = useSelector((state) => state.patients.value);
  const appointments = useSelector((state) => state.appointments.value);

  function onDeleteDoctor(id) {
    dispatch(removeDoctor(id));
  }

  function onDeletePatient(id) {
    dispatch(removePatient(id));
  }

  function onDeleteAppointment(id) {
    dispatch(removeAppointment(id));
  }

  function onDeleteAppointmentFromPatient(appointment) {
    dispatch(removeAppointmentFromPatient(appointment));
  }

  useEffect(() => {
    if (!user || user.type !== 'Admin') {
      navigate('/profile');
    }
  }, [user, navigate]);

  const filteredDoctors = doctors.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPatients = patients.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAppointments = appointments.filter(({ user, patient }) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerCaseTerm) ||
      patient.name.toLowerCase().includes(lowerCaseTerm)
    );
  });

  return (
    <div className='wrapper-dashboard'>
      <div className='dashboard-header'>
        <button>
          <Link to={'/new-user'}>Register New User</Link>
        </button>
        <button>
          <Link to={'/new-patient'}>Register New Patient</Link>
        </button>
        <button>
          <Link to={'/new-appointment'}>New Appointment</Link>
        </button>
      </div>
      <div className='dashboard-main'>
        <div className='tab'>
          <button
            onClick={() => setActiveTab('doctors')}
            className={activeTab === 'doctors' ? 'active' : ''}
          >
            Doctors
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={activeTab === 'patients' ? 'active' : ''}
          >
            Patients
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={activeTab === 'appointments' ? 'active' : ''}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={activeTab === 'calendar' ? 'active' : ''}
          >
            Calendar
          </button>
        </div>

        {activeTab === 'doctors' && (
          <div>
            <input
              className='search-bar'
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='card-container'>
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onDeleteDoctor={onDeleteDoctor}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div>
            <input
              className='search-bar'
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className='card-container'>
              {filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onDeletePatient={onDeletePatient}
                />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'appointments' && (
          <div>
            <input
              className='search-bar'
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='card-container'>
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onDeleteAppointment={onDeleteAppointment}
                  onDeleteAppointmentFromPatient={
                    onDeleteAppointmentFromPatient
                  }
                />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'calendar' && (
          <div className='card-container'>
            <DashboardCalendar appointments={appointments} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardAdmin;
