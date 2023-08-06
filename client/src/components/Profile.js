import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { logout } from '../features/users/UsersSlice';

function Profile() {
  const user = useSelector((state) => state.user.value);
  // const navigate = useNavigate();

  // console.log(user);

  // function logoutUser() {
  //   fetch('/logout', {
  //     method: 'DELETE',
  //   }).then(() => {
  //     logout();
  //     navigate('/');
  //   });
  // }

  if (user) {
    return (
      <div>
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Type: {user.type}</p>
        <p>Phone: {user.phone}</p>
        <button>Update Info</button>
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
