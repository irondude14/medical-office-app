import React from 'react';
import { Link } from 'react-router-dom';

function AppointmentCard({ appointment, onDeleteAppointment }) {
  function handleDelete() {
    fetch(`/appointments/${appointment.id}`, {
      method: 'DELETE',
    })
      .then((r) => {
        if (r.ok) {
          onDeleteAppointment(appointment.id);
        } else {
          console.log(r.errors);
        }
      })
      .catch((error) => {
        console.error('Error deleting doctor: ', error);
      });
  }

  const date = new Date(appointment.date_time);

  const formattedDate = `${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}/${String(date.getDate()).padStart(
    2,
    '0'
  )}/${date.getFullYear()} ${date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}`;

  return (
    <div className='card'>
      <p>Doctor's Name: {appointment.user.name}</p>
      <p>Patient's Name: {appointment.patient.name}</p>
      <p>Date & Time: {formattedDate}</p>
      <p>Reason: {appointment.reason}</p>
      <div className='button-container'>
        <button>
          <Link to={`/appointment-edit/${appointment.id}`}>Edit</Link>
        </button>
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
}

export default AppointmentCard;
