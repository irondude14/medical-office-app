import React from 'react';

function DoctorCard({ doctor }) {
  return (
    <div className='card'>
      <h3>Name: {doctor.name}</h3>
      <p>Email: {doctor.email}</p>
      <p>Phone: {doctor.phone}</p>
      <p>Specialization: {doctor.specialization}</p>
    </div>
  );
}

export default DoctorCard;
