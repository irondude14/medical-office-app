import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.user.value);

  console.log(user);

  if (user) {
    return (
      <div>
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Type: {user.type}</p>
        <p>Phone: {user.phone}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please Log In or contact Administartor</h1>
      </div>
    );
  }
}

export default Profile;
