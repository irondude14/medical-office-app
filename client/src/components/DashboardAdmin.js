import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DoctorCard from './DoctorCard';
import PatientCard from './PatientCard';

function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState('doctors');
  const user = useSelector((state) => state.user.value);
  const doctors = useSelector((state) => state.doctors.value);
  const patients = useSelector((state) => state.patients.value);

  console.log(doctors);
  console.log(patients);

  return (
    <div>
      <div>
        <h3>This will be a dashboard for an Admin.</h3>
        <button>
          <Link to={'/createNewUserForm'}>Register New User</Link>
        </button>
        <button>
          <Link to={'/createNewPatientForm'}>Register New Patient</Link>
        </button>
      </div>
      <div>
        <div className='tabs'>
          <button
            onClick={() => setActiveTab('doctors')}
            className={activeTab === 'doctors' ? 'active' : ''}
          >
            Doctors
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={activeTab === 'patients' ? 'active' : ''}
          >
            Patients
          </button>
        </div>
        {activeTab === 'doctors' && (
          <div className='doctor-cards'>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}

        {activeTab === 'patients' && (
          <div className='patient-cards'>
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardAdmin;
