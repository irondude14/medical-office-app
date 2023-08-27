import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppointmentList from './AppointmentList';
import TestResultList from './TestResultList';

function DashboardDoctor() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.type !== 'Doctor') {
      navigate('/profile');
    }
  }, [user, navigate]);

  return (
    <div className='wrapper-dashboard'>
      <h3>Patients:</h3>
      <ul className='card-container'>
        {user.patients &&
          user.patients.map((patient) => (
            <li
              key={patient.id}
              className={`patient-card ${
                selectedPatientId === patient.id ? 'active' : ''
              } ${
                selectedPatientId && selectedPatientId !== patient.id
                  ? 'blur'
                  : ''
              }`}
            >
              <div
                onClick={() => {
                  if (selectedPatientId === patient.id) {
                    setSelectedPatientId(null);
                  } else {
                    setSelectedPatientId(patient.id);
                  }
                }}
              >
                <h3>{patient.name}</h3>
                <p>Phone #: {patient.phone}</p>
                <p>Email: {patient.email}</p>
              </div>

              {selectedPatientId === patient.id && (
                <div className='patient-details'>
                  <AppointmentList
                    patientId={selectedPatientId}
                    appointments={user.appointments}
                  />
                  <TestResultList
                    patientId={selectedPatientId}
                    testResults={user.test_results}
                  />
                  <button>
                    <Link to={`/new-test/${patient.id}`}>New Test</Link>
                  </button>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DashboardDoctor;
