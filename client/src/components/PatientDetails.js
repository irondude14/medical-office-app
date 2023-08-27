import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import AppointmentList from './AppointmentList';
import TestResultList from './TestResultList';

function PatientDetails() {
  const { patientID } = useParams();
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.type !== 'Doctor') {
      navigate('/profile');
    }
  }, [user, navigate]);

  const patient = user.patients.find((p) => p.id === parseInt(patientID));

  return (
    <div className='wrapper-general'>
      <h1>{patient.name}</h1>
      <AppointmentList
        patientId={parseInt(patientID)}
        appointments={user.appointments}
      />
      <TestResultList
        patientId={parseInt(patientID)}
        testResults={user.test_results}
      />
      <button className='btn'>
        <Link to={`/new-test/${patientID}`}>New Test</Link>
      </button>
    </div>
  );
}

export default PatientDetails;
