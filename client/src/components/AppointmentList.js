import React from 'react';

function AppointmentList({ patientId, appointments }) {
  const patientAppointments = appointments.filter(
    (appointment) => appointment.patient_id === patientId
  );

  return (
    <>
      <h4>Upcoming appointments</h4>
      {patientAppointments.length > 0 ? (
        patientAppointments.map((appointment) => {
          const appointmentDate = new Date(appointment.date_time);
          const formattedDate = appointmentDate.toLocaleDateString();
          const formattedTime = appointmentDate.toLocaleTimeString();

          return (
            <div key={appointment.id} className='appointment-card'>
              <p>Appointment Date: {formattedDate}</p>
              <p>Appointment Time: {formattedTime}</p>
              <p>Reason: {appointment.reason}</p>
            </div>
          );
        })
      ) : (
        <p>No appointments scheduled.</p>
      )}
    </>
  );
}

export default AppointmentList;
