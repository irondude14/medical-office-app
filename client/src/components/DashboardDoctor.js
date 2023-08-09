import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DashboardDoctor() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const patientList =
    user.patients &&
    user.patients.map((patient) => (
      <div key={patient.id}>
        <h4>Patient Name: {patient.name}</h4>
        <p>Phone number: {patient.phone}</p>
        <p>Email: {patient.email}</p>

        <h4>Upcoming appointments:</h4>
        {user.appointments &&
        user.appointments.filter(
          (appointment) => appointment.patient_id === patient.id
        ).length > 0 ? (
          user.appointments
            .filter((appointment) => appointment.patient_id === patient.id)
            .map((appointment) => {
              const appointmentDate = new Date(appointment.date_time);
              const formattedDate = appointmentDate.toLocaleDateString();
              const formattedTime = appointmentDate.toLocaleTimeString();
              return (
                <div key={appointment.id} className='appointment-card'>
                  <p>Appointment Date: {formattedDate}</p>
                  <p>Appointment Time: {formattedTime}</p>
                </div>
              );
            })
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>
    ));

  console.log(user);
  return (
    <>
      <div>
        <h3>Patients:</h3>
        {patientList}
      </div>
    </>
  );
}

export default DashboardDoctor;
