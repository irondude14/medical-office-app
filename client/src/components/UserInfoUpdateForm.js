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
    <form onSubmit={updateUser} className='form'>
      <h3>Update Account Info: </h3>
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        name='name'
        value={updateInfo.name || ''}
        // required
        onChange={handleUserInfo}
      />
      <br />
      <label htmlFor='email'>Email:</label>
      <input
        type='text'
        name='email'
        value={updateInfo.email || ''}
        required
        onChange={handleUserInfo}
      />
      <br />
      <label htmlFor='phone'>Phone:</label>
      <input
        type='text'
        name='phone'
        value={updateInfo.phone || ''}
        required
        onChange={handleUserInfo}
      />
      <br />
      <input type='submit' value='Update' id='submitBtn' />
      {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
    </form>
  );
}

export default UserInfoUpdate;
