import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DashboardDoctor() {
  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.type !== 'Doctor') {
      navigate('/profile');
    }
  }, [user, navigate]);

  const filteredPatients =
    user.patients?.filter((patient) => {
      const lowerCaseTerm = searchTerm.toLowerCase();
      return (
        patient.name.toLowerCase().includes(lowerCaseTerm) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(lowerCaseTerm)
      );
    }) || [];

  const patientList = filteredPatients.map((patient) => (
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
      <input
        type='text'
        className='search-bar'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='card-container'>{patientList}</div>
    </div>
  );
}

export default DashboardDoctor;
