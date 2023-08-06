import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ element, ...rest }) {
  const user = useSelector((state) => state.user.value);
  return user ? (
    React.cloneElement(element, rest)
  ) : (
    <Navigate to='/login' replace />
  );
}

export default ProtectedRoute;
