import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  // console.log(user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (user) {
    return (
      <div>
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Position: {user.type}</p>
        <button>
          <Link to={`/userInfoUpdateForm`}>Update Info</Link>
        </button>
        {user.type === 'Admin' ? (
          <button>
            <Link to={'/createNewUserForm'}>Register New User</Link>
          </button>
        ) : null}
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
