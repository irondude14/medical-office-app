import React from 'react';

function PatientCard({ patient }) {
  return (
    <div className='card'>
      <h3>Name: {patient.name}</h3>
      <p>Email: {patient.email}</p>
      <p>Phone: {patient.phone}</p>
      <p>Address: {patient.address}</p>
      <p>Insurance: {patient.insurance}</p>
    </div>
  );
}

export default PatientCard;
