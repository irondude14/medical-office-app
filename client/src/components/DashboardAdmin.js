import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DoctorCard from './DoctorCard';
import PatientCard from './PatientCard';
import AppointmentCard from './AppointmentCard';
import { removeDoctor } from '../features/users/DoctorsSlice';
import { removePatient } from '../features/users/PatientsSlice';
import { removeAppointment } from '../features/users/AppointmentsSlice';

function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState('doctors');
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

  useEffect(() => {
    if (!user || user.type !== 'Admin') {
      navigate('/profile');
    }
  }, [user, navigate]);

  console.log(appointments);

  return (
    <div>
      <div>
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
      <div>
        <div className='tabs'>
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
        </div>
        {activeTab === 'doctors' && (
          <div className='doctor-cards'>
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onDeleteDoctor={onDeleteDoctor}
              />
            ))}
          </div>
        )}

        {activeTab === 'patients' && (
          <div className='patient-cards'>
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onDeletePatient={onDeletePatient}
              />
            ))}
          </div>
        )}
        {activeTab === 'appointments' && (
          <div className='appointment-cards'>
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onDeleteAppointment={onDeleteAppointment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardAdmin;
