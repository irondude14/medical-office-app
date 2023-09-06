import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateAppointment } from '../features/users/AppointmentsSlice';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

function AppointmentUpdateForm() {
  const { appointmentID } = useParams();

  const [errorsList, setErrorsList] = useState(null);
  const [updateInfo, setUpdateInfo] = useState({
    date_time: '',
    reason: '',
  });
  const [loading, setLoading] = useState(true);

  const appointment = useSelector((state) =>
    state.appointments.value.find((p) => p.id === parseInt(appointmentID, 10))
  );

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (appointment) {
      setUpdateInfo(appointment);
      setLoading(false);
    }
  }, [appointment]);

  useEffect(() => {
    if (!user && user.type !== 'Admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  function handleAppointmentInfo(e) {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleDateChange(date) {
    setUpdateInfo({
      ...updateInfo,
      date_time: date,
    });
  }

  function updateAppointmentInfo(e) {
    e.preventDefault();
    fetch(`/appointments/${appointmentID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateInfo),
    })
      .then((r) => r.json())
      .then((updatedAppointmentInfo) => {
        if (!updatedAppointmentInfo.errors) {
          dispatch(updateAppointment(updatedAppointmentInfo));
          navigate('/admin-dashboard');
        } else {
          const currentErrors = updatedAppointmentInfo.errors.map(
            (e, index) => <li key={index}>{e}</li>
          );
          setErrorsList(currentErrors);
        }
      });
  }

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  const date = new Date(updateInfo.date_time);

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
    <div className='wrapper-general'>
      <form onSubmit={updateAppointmentInfo}>
        <h1>Update Appointment</h1>
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
        <div className='input-box'>
          <input
            type='text'
            name='reason'
            value={updateInfo.reason}
            placeholder='Reason for appointment'
            onChange={handleAppointmentInfo}
          />
        </div>
        <h3>Choose Date & Time: </h3>
        <Datetime value={formattedDate} onChange={handleDateChange} />
        <div className='button-container'>
          <input type='submit' value='EDIT' id='submitBtn' className='btn' />
          <button onClick={() => navigate('/admin-dashboard')} className='btn'>
            BACK
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentUpdateForm;
