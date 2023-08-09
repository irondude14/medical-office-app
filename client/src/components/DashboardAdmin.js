import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DashboardAdmin() {
  const user = useSelector((state) => state.user.value);
  const doctors = useSelector((state) => state.doctors.value);
  const patients = useSelector((state) => state.patients.value);

  console.log(user);
  console.log(doctors);
  console.log(patients);

  return (
    <div>
      <h3>This will be a dashboard for an Admin.</h3>
      <button>
        <Link to={'/createNewUserForm'}>Register New User</Link>
      </button>
      <button>
        <Link to={'/createNewPatientForm'}>Register New Patient</Link>
      </button>
    </div>
  );
}

export default DashboardAdmin;
