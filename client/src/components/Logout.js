import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/users/UsersSlice';
import { persistor } from '../store';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('/logout', {
      method: 'DELETE',
    })
      .then((r) => {
        if (r.ok) {
          dispatch(logout());
          persistor.purge();
          navigate('/login');
        } else {
          throw new Error(r.statusText);
        }
      })
      .catch((error) => console.log('Logout Error: ', error));
  }, [dispatch, navigate]);
  return null;
};

export default Logout;
