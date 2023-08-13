import React, { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateNewAppointmentForm() {
  const [appointment, setAppointment] = useState({
    patient_id: '',
    user_id: '',
    date_time: new Date(),
    reason: '',
  });
  const [errorsList, setErrorsList] = useState(null);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.value);
  const doctors = useSelector((state) => state.doctors.value);
  const patients = useSelector((state) => state.patients.value);

  function handleInputChange(e) {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  }

  function handleDateChange(date) {
    setAppointment({
      ...appointment,
      date_time: date,
    });
  }

  useEffect(() => {
    if (!user || user.type !== 'Admin') {
      navigate('/profile');
    }
  }, [user, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    })
      .then((r) => r.json())
      .then((app) => {
        if (!app.errors) {
          navigate('/admin-dashboard');
        } else {
          const currentErrors = app.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      })
      .catch((error) => console.log('Error: ', error.message));
  }
  console.log(appointment);
  return (
    <form onSubmit={handleSubmit}>
      <h3>New Appointment</h3>
      <label>Doctors: </label>
      <select
        name='user_id'
        value={appointment.user_id}
        onChange={handleInputChange}
      >
        <option>Select a doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>
      <br />
      <label>Patients: </label>
      <select
        name='patient_id'
        value={appointment.patient_id}
        onChange={handleInputChange}
      >
        <option>Select a patient</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.name}
          </option>
        ))}
      </select>
      <br />
      <label>Reason: </label>
      <input
        type='text'
        name='reason'
        value={appointment.reason}
        placeholder='Reason for appointment'
        onChange={handleInputChange}
      />
      <br />
      <label>Choose Date & Time: </label>
      <Datetime value={appointment.date_time} onChange={handleDateChange} />
      <input type='submit' value='Create' id='submitBtn' />
      <div>
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
      </div>
    </form>
  );
}

export default CreateNewAppointmentForm;
