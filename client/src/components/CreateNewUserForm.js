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
    <div className='wrapper-general'>
      <form onSubmit={createUser}>
        <h1>Create New User</h1>
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
        <div>
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
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={userInfo.name}
            required
            onChange={handleUserInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={userInfo.email}
            required
            onChange={handleUserInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={userInfo.password}
            required
            onChange={handleUserInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='specialization'
            placeholder='Specialization'
            value={userInfo.specialization}
            required
            onChange={handleUserInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='phone'
            placeholder='Phone #'
            value={userInfo.phone}
            required
            onChange={handleUserInfo}
          />
        </div>
        <input type='submit' value='Register' id='submitBtn' className='btn' />
      </form>
    </div>
  );
}

export default CreateNewUserForm;
