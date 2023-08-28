import React from 'react';
import { Link } from 'react-router-dom';

function PatientCard({ patient, onDeletePatient }) {
  function handleDelete() {
    fetch(`/patients/${patient.id}`, {
      method: 'DELETE',
    })
      .then((r) => {
        if (r.ok) {
          onDeletePatient(patient.id);
        } else {
          console.log(r.errors);
        }
      })
      .catch((error) => {
        console.error('Error deleting patient: ', error);
      });
  }
  console.log(patient);

  return (
    <div className='card'>
      <h3>Name: {patient.name}</h3>
      <p>Email: {patient.email}</p>
      <p>Phone: {patient.phone}</p>
      <p>Address: {patient.address}</p>
      <p>Insurance: {patient.insurance}</p>
      <h4>Doctors</h4>
      <p>
        {patient.users.map((doctor) => {
          return <li key={doctor.id}>{doctor.name}, MD</li>;
        })}
      </p>
      <div className='button-container'>
        <button>
          <Link to={`/patient-edit/${patient.id}`}>Edit</Link>
        </button>
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
}

export default PatientCard;
