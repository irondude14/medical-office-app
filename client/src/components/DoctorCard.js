import React from 'react';

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
      <button>Edit</button>
      <button onClick={handleDelete}>Remove</button>
    </div>
  );
}

export default DoctorCard;
