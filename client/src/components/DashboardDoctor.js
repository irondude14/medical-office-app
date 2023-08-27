import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DashboardDoctor() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.type !== 'Doctor') {
      navigate('/profile');
    }
  }, [user, navigate]);

  const patientList =
    user.patients &&
    user.patients.map((patient) => (
      <Link to={`/patient-details/${patient.id}`} key={patient.id}>
        <div className='patient-card'>
          <h3>{patient.name}</h3>
          <p>Phone #: {patient.phone}</p>
          <p>Email: {patient.email}</p>
        </div>
      </Link>
    ));

  return (
    <div className='wrapper-dashboard'>
      <h1>Patients</h1>
      <div className='card-container'>{patientList}</div>
    </div>
  );
}

export default DashboardDoctor;
