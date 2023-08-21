import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/users/UsersSlice';
import { setDoctors } from '../features/users/DoctorsSlice';
import { setPatients } from '../features/users/PatientsSlice';
import { setAppointments } from '../features/users/AppointmentsSlice';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handleCredentials(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error('Invalid email or password');
        }
      })
      .then((data) => {
        if (data.user && data.user.type === 'Admin') {
          dispatch(login(data.user));
          dispatch(setDoctors(data.doctors));
          dispatch(setPatients(data.patients));
          dispatch(setAppointments(data.appointments));
          navigate('/profile');
        } else if (data && data.type === 'Doctor') {
          dispatch(login(data));
          navigate('/profile');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className='wrapper-login'>
      <form className='login-form'>
        <h1>Login</h1>
        {error ? <p className='error-list'>{error}</p> : null}
        <div class='input-box'>
          <input
            type='text'
            placeholder='Email...'
            value={credentials.email}
            name='email'
            onChange={handleCredentials}
          />
          <box-icon name='envelope' type='solid'></box-icon>
        </div>
        <div className='input-box'>
          <input
            type='password'
            placeholder='Password...'
            value={credentials.password}
            name='password'
            onChange={handleCredentials}
          />
          <box-icon name='lock-alt' type='solid'></box-icon>
        </div>
        <button
          id='submitBtn'
          className='btn'
          type='submit'
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
