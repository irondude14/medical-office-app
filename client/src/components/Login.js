import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  function handleCredentials(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }
  const navigate = useNavigate();

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
      .then((user) => {
        console.log(user);
        // login(user);
        // navigate('/profile');
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <form className='form'>
      <h3>Log In:</h3>
      {error ? <p className='error-list'>{error}</p> : null}
      <label htmlFor='email'>Email:</label>
      <input
        type='text'
        value={credentials.email}
        name='email'
        onChange={handleCredentials}
      />
      <br />
      <label htmlFor='password'>Password:</label>
      <input
        type='password'
        value={credentials.password}
        name='password'
        onChange={handleCredentials}
      />
      <br />
      <button id='submitBtn' type='submit' onClick={handleLogin}>
        Log In
      </button>
    </form>
  );
}

export default Login;
