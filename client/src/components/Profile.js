import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.user.value);
  // const navigate = useNavigate();

  // console.log(user);

  if (user) {
    return (
      <div>
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Position: {user.type}</p>
        <p>Phone: {user.phone}</p>
        <button>
          <Link to={`/userInfoUpdateForm`}>Update Info</Link>
        </button>
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
