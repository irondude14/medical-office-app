import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addDoctor } from '../features/users/DoctorsSlice';

function CreateNewUserForm() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    type: '',
    specialization: '',
  });
  const [errorsList, setErrorsList] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  function handleUserInfo(e) {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (!user || user.type !== 'Admin') {
      navigate('/profile');
    }
  }, [user, navigate]);

  function createUser(e) {
    e.preventDefault();
    const user = { user: userInfo };
    fetch('/admins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((r) => r.json())
      .then((user) => {
        if (!user.errors) {
          if (user.type === 'Doctor') {
            dispatch(addDoctor(user));
            navigate('/admin-dashboard');
          } else {
            navigate('/admin-dashboard');
          }
        } else {
          setUserInfo({
            name: '',
            email: '',
            phone: '',
            password: '',
            type: '',
            specialization: '',
          });
          const currentErrors = user.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      });
  }

  return (
    <div>
      <form onSubmit={createUser}>
        <h3>Create User Account: </h3>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={userInfo.name}
          required
          onChange={handleUserInfo}
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          value={userInfo.email}
          required
          onChange={handleUserInfo}
        />
        <br />
        <label htmlFor='password_confirmation'>
          Password:
          <input
            type='password'
            name='password'
            value={userInfo.password}
            required
            onChange={handleUserInfo}
          />
        </label>
        <br />
        <label htmlFor='type'>
          Type of the account:
          <select
            type='text'
            name='type'
            value={userInfo.type}
            required
            onChange={handleUserInfo}
          >
            <option value=''>Select type</option>
            <option value='Admin'>Admin</option>
            <option value='Doctor'>Doctor</option>
          </select>
        </label>
        <br />
        <label htmlFor='specialization'>
          Specialization:
          <input
            type='text'
            name='specialization'
            value={userInfo.specialization}
            required
            onChange={handleUserInfo}
          />
        </label>
        <br />
        <label htmlFor='phone'>
          Phone #:
          <input
            type='text'
            name='phone'
            value={userInfo.phone}
            required
            onChange={handleUserInfo}
          />
        </label>
        <br />
        <input type='submit' value='Register' id='submitBtn' />
      </form>
      {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
    </div>
  );
}

export default CreateNewUserForm;
