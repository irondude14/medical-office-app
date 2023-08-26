import React from 'react';
import { Link } from 'react-router-dom';

function DoctorCard({ doctor, onDeleteDoctor }) {
  function handleDelete() {
    fetch(`/doctors/${doctor.id}`, {
      method: 'DELETE',
    })
      .then((r) => {
        if (r.ok) {
          onDeleteDoctor(doctor.id);
        } else {
          console.log(r.errors);
        }
      })
      .catch((error) => {
        console.error('Error deleting doctor: ', error);
      });
  }

  return (
    <div className='card'>
      <h3>Name: {doctor.name}</h3>
      <p>Email: {doctor.email}</p>
      <p>Phone: {doctor.phone}</p>
      <p>Specialization: {doctor.specialization}</p>
      <div className='button-container'>
        <button>
          <Link to={`/doctor-edit/${doctor.id}`}>Edit</Link>
        </button>
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
}

export default DoctorCard;
