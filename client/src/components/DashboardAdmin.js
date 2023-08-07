import React from 'react';
import { Link } from 'react-router-dom';

function DashboardAdmin() {
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
