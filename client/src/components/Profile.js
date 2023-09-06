import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (user) {
    return (
      <div className='wrapper-general'>
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Position: {user.type}</p>
        <div className='button-container'>
          <button className='btn'>
            <Link to={`/user-edit`}>UPDATE</Link>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please Log In or contact Administrator</h1>
      </div>
    );
  }
}

export default Profile;
