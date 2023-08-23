import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/users/UsersSlice';

function UserInfoUpdate() {
  const [errorsList, setErrorsList] = useState(null);
  const [updateInfo, setUpdateInfo] = useState({});

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  function updateUser(e) {
    e.preventDefault();
    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateInfo),
    })
      .then((r) => r.json())
      .then((updatedUserInfo) => {
        if (!updatedUserInfo.errors) {
          dispatch(login({ ...user, ...updatedUserInfo }));
          navigate('/profile');
        } else {
          setUpdateInfo({});
          const currentErrors = updatedUserInfo.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      });
  }

  useEffect(() => {
    setUpdateInfo(user || {});
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  function handleUserInfo(e) {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='wrapper-general'>
      <form onSubmit={updateUser}>
        <h1>Update Your Info</h1>
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
        <div className='input-box'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={updateInfo.name || ''}
            required
            onChange={handleUserInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={updateInfo.email || ''}
            required
            onChange={handleUserInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='phone'
            placeholder='Phone'
            value={updateInfo.phone || ''}
            required
            onChange={handleUserInfo}
          />
        </div>
        <input type='submit' value='UPDATE' id='submitBtn' className='btn' />
      </form>
    </div>
  );
}

export default UserInfoUpdate;
